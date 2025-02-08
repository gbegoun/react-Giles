import { BookPreview } from "./BookPreview.jsx";
const { Link,useNavigate, useLocation } = ReactRouterDOM

export function BookList({ books, onBookClick }) {

    const ulAttributes = {
        title: 'Some Pop Up',
        className: 'book-list'
    }

    
    return (
        <ul {...ulAttributes}>
            {books.map(book => (
                <li key={book.id}>
                <Link
                    to={`/book/${book.id}`}
                    state={{ modal: true }} // Indicate modal navigation
                >
                    <BookPreview book={book} />
                </Link>
            </li>
            ))}
        </ul>
    )
}