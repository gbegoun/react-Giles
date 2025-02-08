const { useNavigate } = ReactRouterDOM

export function BookPreview({book}){
    
    const navigate = useNavigate();

    return (
        <article className="book-preview" onClick={() => navigate(`/book/${book.id}`, { state: { modal: true } })}>
            <img src={book.thumbnail} alt={book.title}/>
            <h2>{book.title}</h2>
            <h4>{book.authors.join(", ")}</h4>
        </article>
    )
}