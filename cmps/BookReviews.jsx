const { useEffect } = React

export function BookReviews({bookReviews, onRemoveReview}){

    return (
        <section>
        {bookReviews && bookReviews.map((review) => (
            <div key={review.id} className="book-review">
                <span className="review-name">{review.name} </span>
                <span className="review-date">{review.date} </span>
                <span className="review-rating">{review.rating} </span>
                <button onClick={()=>{onRemoveReview(review.id)}}>X</button>
            </div>
          ))}
        </section>
    )
}