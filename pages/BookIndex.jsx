const { useEffect, useState , } = React
const { useNavigate, useLocation, Outlet, useParams } = ReactRouterDOM

import { BookFilter }   from '../cmps/BookFilter.jsx'
import { BookList }     from '../cmps/BookList.jsx'
import { bookService }  from "../services/book.service.js"

export function BookIndex() {

    const navigate = useNavigate();
    const location = useLocation();
    const { bookId } = useParams();

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    const isModal = location.state && location.state.modal===true

    const closeModal = () => {
        navigate(`/book`, { state: { modal: false }})
    };

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        setBooks(null)
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('Cannot get books:', err)
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!books) return <div className="loader">Loading...</div>

    if (bookId && !isModal) {
        return <Outlet />;
    }

    return (
        <section className="book-index">
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <BookList books={books}/>
            {/* <Link to="/car/edit">Add Car</Link> */}

            {isModal && (
                <div className="overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <Outlet />
                    </div>
                </div>
            )}
        </section>
    )

}