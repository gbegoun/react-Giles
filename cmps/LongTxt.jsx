const { useEffect, useState , } = React

export function LongTxt({children,length=100}) {


    const [isExpanded, setIsExpanded] = useState(false)
    const shownText = !isExpanded && children.length > length ? children.substring(0, length) + "... " : children

    
    return (
        <div>
            <p>{shownText} <span className = "expand-text-Button" onClick={()=>setIsExpanded(!isExpanded)}>{isExpanded ? "Show Less":"Read More"}</span></p>
        </div>
    )
}