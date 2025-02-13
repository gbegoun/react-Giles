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
        const params = new URLSearchParams(location.search);
        const filterValues = {};


        params.forEach((value,key) => {
            filterValues[key] = params.get(key)
        });

        setFilterBy(filterValues)
    }, [location.search]); 
    
    useEffect(() => {
        const params = new URLSearchParams();

        Object.entries(filterBy).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        window.history.pushState(null, "", `#/book?${params.toString()}`);
        navigate(`/book?${params.toString()}`, {replace:true})

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

    if (books && bookId && !isModal) {
        return <Outlet />;
    }

    return (
        <section className="book-index">
            <BookFilter setFilterBy={setFilterBy}/>
            <BookList books={books} />

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