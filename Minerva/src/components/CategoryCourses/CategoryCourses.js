import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommonLayout from "../CommonLayout/CommonLayout";
import CourseCard from "../CourseCard/CourseCard";
function CategoryCourses() {
    const { id, name } = useParams();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/categories/${id}/courses`)
            .then((response) => response.json())
            .then((data) => setCourses(data));
    }, [id]);
    return (
        <CommonLayout>
            <p class="category-heading">Courses in {decodeURIComponent(name)}</p>
            <div className="courses-cards">
                {courses.map((course) => (
                    <CourseCard 
                    id={id}
                    title={course.title}
                    description={course.description}
                    image_url={course.image_url}
                    duration={course.duration}
                    level={course.level}
                    name={course.name}
                    rating={course.rating}
                    />
                ))}
            </div>
        </CommonLayout>
    );
}

export default CategoryCourses;
