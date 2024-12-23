import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchbarIcon from "../../assets/images/search.png";

function Hero() {
    const [query, setQuery] = useState("");
    const navigate= useNavigate();
    const handleSearch = async (e) => {
        e.preventDefault();
        if (query) {
            // Navigate to the search results page with the query parameter
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };
    const [userName, setUserName] = useState('');

  useEffect(() => {
    // Retrieve the user's name from localStorage
    const name = localStorage.getItem('userName');
    console.log(name);
    if (name) {
      setUserName(name); // Set the user's name in the state
    }
  }, []);
    return (
        <div className="hero_section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-1">
                            <h1 className="greet-user">Hii <span style={{"color":"green"}}>{userName} </span> </h1>
                            <h2 className="hero_caption">Find Your Perfect Course</h2>
                            <p className="hero_tagline">
                                Discover thousands of online courses from top universities and
                                institutions.
                            </p>
                            <form onSubmit={handleSearch} className="form-inline">
                                <div className="searchbar">
                                    <input
                                        className="search-input"
                                        type="search"
                                        placeholder="Search for any course"
                                        aria-label="Search"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-outline-success my-2 my-sm-0"
                                        type="submit">
                                        <img src={searchbarIcon} alt="" />
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                        {/* Section 2 */}
                        <div className="section-2">
                            <h2>Why Choose Minerva?</h2>
                            <div className="reasons">
                                {/* Reasons */}
                                {["Diverse Selection", "Quality Content", "Flexible Learning"].map(
                                    (reason, index) => (
                                        <div key={index} className={`reason-${index + 1}`}>
                                            <h3>{reason}</h3>
                                            <p>
                                                {reason === "Diverse Selection"
                                                    ? "Access courses from various top institutions worldwide."
                                                    : reason === "Quality Content"
                                                    ? "Curated courses ensuring high-quality learning experiences."
                                                    : "Learn at your own pace with online and self-paced options."}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
