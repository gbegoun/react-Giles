
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function AddReview({ onAddReview })
{

async function onSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target)
    const data = Object.fromEntries([...formData.entries()])
    if (data.date && data.name && data.rating)
    {
        onAddReview({name:data.name, rating:data.rating, date:data.date})
    }
}

    return (
        <section>
                <form  onSubmit={onSubmit}> 
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name"></input>
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" id="date"></input>
                    </div>
                    <div>
                        <label htmlFor="rate">Rating 1-5</label>
                        <select name="rating" id="rating">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>                    
                </form>
        </section>
    )
}

