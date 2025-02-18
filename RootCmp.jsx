const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM


import { Home }         from "./pages/Home.jsx"
import { AppHeader }    from "./cmps/AppHeader.jsx"
import { About }        from "./pages/About.jsx"
import { BookIndex }    from "./pages/BookIndex.jsx"
import { BookDetails }  from "./cmps/BookDetails.jsx"
import { NotFound }     from "./cmps/NotFound.jsx"
import { UserMsg }      from "./cmps/UserMsg.jsx"
import { BookAdd } from "./cmps/BookAdd.jsx"

// import { Team } from "./cmps/AboutCmps/Team.jsx"
// import { Vision } from "./cmps/AboutCmps/Vision.jsx"
// import { CarEdit } from "./pages/CarEdit.jsx"
// import { CarIndex } from "./pages/CarIndex.jsx"


export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                            {/* <Route path="/about/team" element={<Team />} /> */}
                            {/* <Route path="/about/vision" element={<Vision />} /> */}
                        {/* </Route> */}
                        <Route path="/book" element={<BookIndex />}>
                            <Route path="/book/:bookId" element={<BookDetails />}/>
                        </Route>
                        <Route path="/add" element={<BookAdd />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
}
