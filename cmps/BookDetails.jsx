const {useNavigate, useLocation, useParams,Outlet,Link } = ReactRouterDOM
const { useEffect, useState,useCallback  } = React

import { addBookReview, bookService, removeBookReview } from '../services/book.service.js'
import { LongTxt } from "./LongTxt.jsx";
import { AddReview, remo} from "./AddReview.jsx"
import { BookReviews } from './BookReviews.jsx';
export function BookDetails({ onClose }) {

  const { bookId } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const isModal = location.state && location.state.modal;

  const [book, setBook] = useState(null);

  useEffect(() => { 
      bookService.get(bookId)
        .then((bookData) => {
          setBook(bookData)
          })
        .catch((err) => {
          console.log(err)
        })
        
  }, [bookId])

  if (!book) return (
    <div className={`book-details ${isModal ? "modal" : ""}`}>
      <div className="blank"></div>
      <div className="loading">Loading...</div>
    </div>
    )

  const bookDetails = [
    { label: "Author(s)", value: book.authors.join(", ")},
    { label: "Published", value: book.publishedDate, comment:getAge(book.publishedDate) },
    { label: "Pages", value: book.pageCount, comment: getReadingLevel(book.pageCount) },
    { label: "Published", value: book.publishedDate,status:getAge(book.publishedDate) },
    { label: "Pages", value: book.pageCount, status: getReadingLevel(book.pageCount) },
    { label: "Categories", value: book.categories.join(", ") },
    { label: "Language", value: book.language },
    { label: "Price", value: book.listPrice.amount + " " + book.listPrice.currencyCode, style:getPriceStyle(book.listPrice.amount)},
  ]

  function getAge(year){
    const age = Date.now()-year

    if (age>10) return "Vintage"

    if (age<1) return "new"

    return ""

  }

  function getReadingLevel(pageCount)
  {
    if (pageCount>500) return "Serious Reading"
    
    if (pageCount  >200 ) return "Decent Reading"
    
    if(pageCount<100) return "Light Reading"
    
    return ""
  }

  function getPriceStyle(bookPrice)
  {
    if (bookPrice>150) return "red"
    if (bookPrice<20) return "green"
  }

  function onAddReview(event)
  {
    event.preventDefault();
    const formData = new FormData(event.target)
    const data = Object.fromEntries([...formData.entries()])
    if (data.date && data.name && data.rating)
    {
      addBookReview(bookId,data.date, data.name, data.rating)
      .then(updatedbook => setBook(updatedbook))
    }
    
  }

  function onRemoveReview(reviewId)
  {
     removeBookReview(bookId, reviewId)   
     .then(updatedbook => setBook(updatedbook))
  }

  return (
    <div className={`book-details ${isModal ? "modal" : ""}`}>
      <img src={book.thumbnail} alt={book.title} />
      <div className="prev-next">
        <button onClick={()=>navigate(`/book/${book.prevbookId}`, { state: { modal: isModal } })}>Prev</button>
        <button onClick={()=>navigate(`/book/${book.nextbookId}`, { state: { modal: isModal } })}>Next</button>
      </div>
      <h2>{book.title}</h2>
      {book.listPrice.isOnSale ? <p className = "on-sale">On Sale!</p> : ""}
      <h3>{book.subtitle}</h3>
      <dl>
        {bookDetails.map((detail, index) => (
          <React.Fragment key={index} >
            <dt >{detail.label}:</dt>
            <dd  className={detail.style && detail.style}>{detail.value}
              {detail.comment && <span className="comment"> {detail.comment}</span>} 
            </dd> 
          </React.Fragment>
        ))}
      </dl>
      <LongTxt>{book.description}</LongTxt>
      <form  onSubmit={onAddReview}> 
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name"></input>
        </div>
        <div>
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date"></input>
        </div>
        <div>
            <label htmlFor="rate">Rating 1-5</label>
            <select name="rating" id="rating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <div>
            <button type="submit">Submit</button>
            {/* <button onClick="onCancel">Cancel</button> */}
        </div>                    
      </form>
      <BookReviews bookReviews={book.reviews} onRemoveReview={onRemoveReview} onAddReview={onAddReview}/>
      {isModal ? <button className = "close-button" onClick={() => (onClose ? onClose() : navigate("/book"))}>x</button> : ""}
    </div>
  );
}