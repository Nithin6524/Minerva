import React from "react";
import searchbarIcon from "../../assets/images/search.png";
function Hero() {
    return (
        <div className="hero_section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-1">
                            <h1 className="hero_caption">
                                Find Your Perfect Course
                            </h1>
                            <p className="hero_tagline">
                                Discover thousands of online courses from top
                                universities and institutions.
                            </p>
                            <form class="form-inline">
                                <div className="searchbar">
                                    <input
                                        class="search"
                                        type="search"
                                        placeholder="Search for any course "
                                        aria-label="Search"
                                    />
                                    <button
                                        class="btn btn-outline-success my-2 my-sm-0"
                                        type="submit"
                                    >
                                        <img src={searchbarIcon} alt="" />
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="section-2">
                            <h2>
                            Why Choose Minerva?
                            </h2>
                            <div className="reasons">
                                <div className="reason-1">
                                    <h3>Diverse Selection</h3>
                                    <p>Access courses from various top institutions worldwide.</p>
                                </div>
                                <div className="reason-2">
                                    <h3>Quality Content</h3>
                                    <p>Curated courses ensuring high-quality learning experiences.</p>
                                </div>
                                <div className="reason-3">
                                    <h3>Flexible Learning</h3>
                                    <p>Learn at your own pace with online and self-paced options.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
