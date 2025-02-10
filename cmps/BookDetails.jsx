const {useNavigate, useLocation, useParams } = ReactRouterDOM
const { useEffect, useState } = React

import { bookService } from '../services/book.service.js'
import { LongTxt } from "./LongTxt.jsx";

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
  }, [book])

  if (!book) return (
    <div className={`book-details ${isModal ? "modal" : ""}`}>
      <div className="blank"></div>
      <div className="loading">Loading...</div>
    </div>
    )

  const bookDetails = [
    { label: "Author(s)", value: book.authors.join(", ")},
<<<<<<< HEAD
    { label: "Published", value: book.publishedDate, comment:getAge(book.publishedDate) },
    { label: "Pages", value: book.pageCount, comment: getReadingLevel(book.pageCount) },
=======
    { label: "Published", value: book.publishedDate,status:getAge(book.publishedDate) },
    { label: "Pages", value: book.pageCount, status: getReadingLevel(book.pageCount) },
>>>>>>> 94787f6f657dab1531f9426c37529efb6542786b
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
<<<<<<< HEAD
            <dd  className={detail.style && detail.style}>{detail.value}
              {detail.comment && <span className="comment"> {detail.comment}</span>} 
            </dd> 
=======
            <dd  className={detail.style && detail.style}>{detail.value}{detail.status && <span className="status"> {detail.status}</span>}</dd> 
>>>>>>> 94787f6f657dab1531f9426c37529efb6542786b
          </React.Fragment>
        ))}
      </dl>
      <LongTxt>{book.description}</LongTxt>
      {isModal ? <button className = "close-button" onClick={() => (onClose ? onClose() : navigate("/book"))}>x</button> : ""}
    </div>
  );
}