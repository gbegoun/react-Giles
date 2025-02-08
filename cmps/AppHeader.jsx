const { Link, NavLink } = ReactRouterDOM


export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section>
                    <img className="logo" src="./assets/img/header-logo.png" alt="Giles is watching you"/>
                
                <div>
                    <h1>Oh, great. Are you, like, the new librarian?</h1>
                    <nav className="app-nav">
                        <NavLink to="/home" >Home</NavLink>
                        <NavLink to="/about"  >About</NavLink>
                        <NavLink to="/book" >Books</NavLink>
                    </nav>
                </div>
                
            </section>
        </header>
    )
}