import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
    return (
        <div className="nav_section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="nav">
                            <div className="nav_left">
                                <Link className="minerva" to="/">
                                    <h3>Minerva</h3>
                                </Link>
                            </div>
                            <div className="nav_right">
                                <Link className="courses" to="/courses">
                                    Courses
                                </Link>
                                <Link className="categories" to="/categories">
                                    Categories
                                </Link>
                                <Link className="about" to="/About">
                                    About
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
