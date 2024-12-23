import React, { useEffect ,useState} from 'react';
import CourseCard from '../CourseCard/CourseCard';
import CommonLayout from '../CommonLayout/CommonLayout';
function Courses(props) {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/courses`)
            .then((response) => response.json())
            .then((data) => setCourses(data));
    }, []);
  
    return (
        <CommonLayout>
        <h1 className="courses-heading" 
            style={{"text-align":"center",
                "margin":"2rem auto"
            }}>
            Check out our Courses 
        </h1>
        <div className="courses-cards">
                {courses.map((course) => (
                    <CourseCard 
                    id={course.course_id}
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

export default Courses;