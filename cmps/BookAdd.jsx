const { useState, useCallback } = React
import { addGoogleBook } from "../services/book.service.js"
import { debounce } from "../services/util.service.js"

export  function BookAdd(){

    const [books, setBooks] = useState([])
    const [inputValue, setInputValue] = useState("Dragon")

    const debouncedApiRequest = useCallback(debounce((filters) => addGoogleBook(filters)), [])


    async function onHandleChange(event) {
        setInputValue(event.target.value);
        const data = await debouncedApiRequest({ title: event.target.value });
        console.log(data);
        const booksToLoad = [];
        data.items.forEach(book => {
            booksToLoad.push({
                title: book.volumeInfo.title,
                thumbnail: (book.volumeInfo.imageLinks.thumbnail && book.volumeInfo.imageLinks.thumbnail) || 'default-thumbnail-url.jpg'
            });
        });
        
        setBooks(booksToLoad);
    }

    return (
        <section>
            <form>
                <input type="text" name="value" id="value" value={inputValue} onChange={onHandleChange}/>
            </form>
            <ul>
            {books.map((book, index) => (
                    <li key={index}>
                        <img src={book.thumbnail} alt={book.title} style={{width:"150px"}}/>
                        {book.title}
                    </li>
                ))}
            </ul>
        </section>
    )
}