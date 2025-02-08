const {useNavigate, useLocation, useParams } = ReactRouterDOM
const { useEffect, useState } = React
import { bookService } from '../services/book.service.js'

export function BookDetails({ onClose }) {

  const { bookId } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const isModal = location.state && location.state.modal;

  const [book, setBook] = useState(null);
  console.log("123")
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

  
  return (
    <div className={`book-details ${isModal ? "modal" : ""}`}>
      <img src={book.thumbnail} alt={book.title} />
      <h1>{book.title}</h1>
      <h5>{book.authors.join(", ")}</h5>
      <p>{book.description}</p>
      <button onClick={() => (onClose ? onClose() : navigate("/"))}>Close</button>
    </div>
  );
}