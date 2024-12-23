import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CourseCard from '../CourseCard/CourseCard';
import CommonLayout from '../CommonLayout/CommonLayout';
const SearchResults = () => {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    console.log(typeof(query));
    useEffect(() => {
        const searchCourses = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/search?keyword=${query}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const resultsData = await response.json();
                setResults(resultsData); // Corrected here
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        if (query) {
            searchCourses();
        }
    }, [query]);
    console.log(results);

    return (
        <CommonLayout>
            <h2
            style={{"text-align":"center",
                "margin":"2rem auto"
            }}>Search Results for "{query}"</h2>
            {results.length > 0 ? (
                <div className="courses-cards">
                {results.map((course) => (
                    <CourseCard 
                    id={course.id}
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
            ) : (
                <p
                style={{"text-align":"center",
                    "margin":"2rem auto",
                    "width":"fit-content",
                    "font-size":"1.2rem",
                    "color":"red"
                }}>No courses found for this search.</p> // Added message for no results
            )}
        </CommonLayout>
    );
};

export default SearchResults;