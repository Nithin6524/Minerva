import React, { useState, useEffect } from "react";
import CommonLayout from "../CommonLayout/CommonLayout";
import { useNavigate } from "react-router-dom";

function Categories(props) {
    const navigate = useNavigate();

    const handleViewCourses = (categoryId, category) => {
        navigate(`/categories/${categoryId}/${encodeURIComponent(category)}`);
    };

    const [categInfo, setCategInfo] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/categories")
            .then((response) => response.json())
            .then((data) => setCategInfo(data));
    }, []);

    return (
        <CommonLayout>
            <h1 className="categories-heading">Explore our categories</h1>
            <div className="category-cards">
                {categInfo.map((InfoObj) => (
                    <div className="category-card" key={InfoObj.id}>
                        <div className="category-image">
                            <img src={InfoObj.image_url} alt="" />
                        </div>
                        <p className="category-name">{InfoObj.name}</p>
                        <div className="category-description">{InfoObj.description}</div>
                        <p className="category-courses">
                            Number of courses: {InfoObj.course_count}
                        </p>
                        <button
                            className="view-courses"
                            onClick={() => handleViewCourses(InfoObj.id, InfoObj.name)}
                        >
                            View Courses
                        </button>
                    </div>
                ))}
            </div>
        </CommonLayout>
    );
}

export default Categories;
