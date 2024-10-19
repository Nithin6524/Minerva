import React from "react";
import BottomNav from "./BottomNav";
import Navbar from "./Navbar";

function CommonLayout(props) {
    return (
        <div>
            <Navbar />
            {props.children} 
            <BottomNav />
        </div>
    );
}

export default CommonLayout;
