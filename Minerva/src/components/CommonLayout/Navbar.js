import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Navbar() {
    return (
        <div className="nav">
            <div className="nav-left">
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
    );
}

export default Navbar;
