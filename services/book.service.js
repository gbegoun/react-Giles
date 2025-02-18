import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { demo_books } from './books.js'
const STORAGE_KEY = 'booksDB'

_createBooks()

export const bookService = {
    query,
    get,
    // remove,
    // save,
    // getEmptyCar,
    getDefaultFilter,
    removeBookReview,
    addBookReview
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(books => {
            if (filterBy.title){
                const regExp = new RegExp(filterBy.title,"i")
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.minPrice){
                books = books.filter(book => book.listPrice.amount>=filterBy.minPrice)
            }
            if (filterBy.maxPrice){
                books = books.filter(book => book.listPrice.amount<=filterBy.maxPrice)
            }
            if (filterBy.minPublishedDate){
                books = books.filter(book => book.publishedDate>=filterBy.minPublishedDate)
            }
            if (filterBy.maxPublishedDate){
                books = books.filter(book => book.publishedDate<=filterBy.maxPublishedDate)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(STORAGE_KEY, bookId)
        .then(_setNextPrevBookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(STORAGE_KEY, book)
    } else {
        return storageService.post(STORAGE_KEY, book)
    }
}

// function remove(carId) {
//     return storageService.remove(CAR_KEY, carId)
// }

// function save(car) {
//     if (car.id) {
//         return storageService.put(CAR_KEY, car)
//     } else {
//         return storageService.post(CAR_KEY, car)
//     }
// }

// function getEmptyCar(vendor = '', speed = '') {
//     return { vendor, speed }
// }


function getDefaultFilter() {
    return { title: '', minPrice: '', maxPrice:''}
}


function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currbook) => currbook.id === book.id)
        const nextbook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevbook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextbookId = nextbook.id
        book.prevbookId = prevbook.id
        return book
    })
}

function _createBooks() {
    let books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length===0) {
        books = demo_books
        console.log("loading demo books")
        saveToStorage(STORAGE_KEY,books)
    }
}

export function addBookReview(bookId,name,rating,date){
    return get(bookId)
            .then((book)=>{
                if(!book.reviews) book.reviews=[]
                book.reviews = [...book.reviews, {id:_makeId(), name,rating,date}]
                return save(book).then(()=>book)})
}

export function removeBookReview(bookId, reviewId)
{
    return get(bookId)
    .then((book)=>{
        if (!book.reviews) return Promise.reject("No reviews found")
        book.reviews = book.reviews.filter((review)=>review.id!=reviewId)
        return save(book).then(()=>book)
        })
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

export async function addGoogleBook(filters)
{
    const api_key = "AIzaSyA4REMMGROHJ1jE2kdffCzdQ5BRcw6s2WA"
    const url = `https://www.googleapis.com/books/v1/volumes?`
    try {
        const fullUrl = `${url}q=${filters.title}&filter=full&key=${api_key}`
        const response = await fetch(fullUrl);
        const data = await response.json();
        console.debug(data)
        return data
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
}