const { useNavigate, useLocation } = ReactRouterDOM
const { useState, useEffect } = React


export function BookFilter() {

    const [filterByToEdit, setFilterByToEdit] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const filters = [
        {label:"Title",type:"text", field:"title", id:"title"},
        {label:"Subtitle", type:"string",field:"subtitle", id:"subtitle"},
        {label:"Min Price", type:"number", field:"listPrice.amount", id:"minPrice"},
        {label:"Max Price", type:"number", field:"listPrice.amount", id:"maxPrice"},
        {label:"Publish Date From", type:"number", field:"publishedDate", id:"minPublishedDate"},
        {label:"Publish Date To", type:"number", field:"publishedDate", id:"maxPublishedDate"},
    ]

    useEffect(()=>{
        const hash = window.location.hash.split("?")[1];
        const params = new URLSearchParams(hash)
        const filterValues = {};

        filters.forEach((filter)=>{
            if (params.has(filter.id)) {
                filterValues[filter.id] = params.get(filter.id)
            }
        })
        setFilterByToEdit(filterValues)
    },[])
    

    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function getInputEl(filter) {
        return (
            <input
                onChange={handleChange}
                value={filterByToEdit[filter.id] || ""}
                type={filter.type}
                name={filter.id}
                id={filter.id}
            />
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const params = new URLSearchParams();

        Object.entries(filterByToEdit).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });

        window.history.pushState(null, "", `#/book?${params.toString()}`);
        navigate(`/book?${params.toString()}`, {replace:true})
    }


    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={handleSubmit}>
                {filters.map((filter) => (
                    <div className="filter-field" key={filter.id}>
                        <label htmlFor={filter.id}>{filter.label}</label>
                        {getInputEl(filter)}
                    </div>
                ))}
                <button type="submit">Filter</button>
            </form>
        </section>
    )
}