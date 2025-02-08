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
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(books => {
            if (filterBy.title){
                const regExp = new RegExp(filterBy.title,"i")
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.minPrice){
                books = books.filter(book => book.listPrice.amount>filterBy.minPrice)
            }
            if (filterBy.maxPrice){
                books = books.filter(book => book.listPrice.amount<filterBy.maxPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(STORAGE_KEY, bookId)
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


// function _setNextPrevCarId(car) {
//     return query().then((cars) => {
//         const carIdx = cars.findIndex((currCar) => currCar.id === car.id)
//         const nextCar = cars[carIdx + 1] ? cars[carIdx + 1] : cars[0]
//         const prevCar = cars[carIdx - 1] ? cars[carIdx - 1] : cars[cars.length - 1]
//         car.nextCarId = nextCar.id
//         car.prevCarId = prevCar.id
//         return car
//     })
// }

function _createBooks() {
    let books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.books) {
        books = demo_books
        saveToStorage(STORAGE_KEY,books)
    }
}

// function _createBook() {
//     const book = {
//         id: makeId   
//         title:

//     }
    
//     return null
// }