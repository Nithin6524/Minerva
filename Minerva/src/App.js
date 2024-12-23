import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/styles/style.scss";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import CategoryCourses from "./components/CategoryCourses/CategoryCourses";
import SearchResults from "./components/SearchResults/SearchResults";
import Courses from "./components/Courses/Courses";
import Authpage from "./components/Authpage/Authpage";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                  
                    <Route path="/" element={<Authpage/>}/>
                    <Route path='/home' element={<Home/>}/>
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/categories/:id/:name" element={<CategoryCourses/>} />
                    <Route path="/search" element={<SearchResults/>}/>
                    <Route path="/courses" element={<Courses/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
