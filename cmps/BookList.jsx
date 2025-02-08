import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onBookClick }) {

    const ulAttributes = {
        title: 'Some Pop Up',
        className: 'book-list'
    }

    
    return (
        <ul {...ulAttributes}>
            {books.map(book => (
                <BookPreview key={book.id} book={book} onBookClick={onBookClick} />
            ))}
        </ul>
    )
}