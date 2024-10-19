import React from "react";
import { Link } from "react-router-dom";
function BottomNav() {
    return (
        <div className="bottomnav_section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="bottomnav">
                            <div className="bottomnav_left">
                                <p>
                                © 2023 CourseHub. All rights reserved.
                                </p>
                            </div>
                            <div className="bottomnav_right">
                                <Link className="terms" to="/terms">
                                    Terms
                                </Link>
                                <Link className="privacy" to="/privacy">
                                    Privacy
                                </Link>
                                <Link className="contact" to="/contact">
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BottomNav;
