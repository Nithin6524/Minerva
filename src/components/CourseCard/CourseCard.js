import React, { useState, useEffect } from "react";
import "./courseCard.css";
function CourseCard({ id, image_url, title, duration, level, rating, description }) {
    // Get bookmarks array from localStorage or initialize as empty array
    const [bookmarks, setBookmarks] = useState(() => {
        const savedBookmarks = localStorage.getItem("bookmarks");
        return savedBookmarks ? JSON.parse(savedBookmarks) : [];
    });

    // Check if current course is bookmarked
    const [isBookmarked, setIsBookmarked] = useState(() => {
        return bookmarks.includes(id);
    });

    // Update localStorage whenever bookmarks change
    useEffect(() => {
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);

    const handleBookmarkToggle = () => {
        try {
            if (isBookmarked) {
                // Remove from bookmarks
                const updatedBookmarks = bookmarks.filter(bookmarkId => bookmarkId !== id);
                setBookmarks(updatedBookmarks);
            } else {
                // Add to bookmarks
                const updatedBookmarks = [...bookmarks, id];
                setBookmarks(updatedBookmarks);
            }
            setIsBookmarked(!isBookmarked);
            
            // Show feedback to user
            const message = isBookmarked ? "Course removed from bookmarks." : "Course bookmarked successfully!";
            alert(message);
        } catch (error) {
            console.error("Error managing bookmark:", error);
            alert("Error occurred while managing bookmark.");
        }
    };

    return (
        <div className="course-card" key={id}>
            <div className="course-image">
                <img src={image_url} alt={title} />
            </div>
            <p className="course-name">{title}</p>
            <div className="duration-level">
                <div className="duration">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor">
                        <path d="m624-298 38-38-154-156.02V-684h-54v216l170 170ZM480.17-100q-78.81 0-148.21-29.91T211.23-211.1q-51.34-51.28-81.28-120.59Q100-401.01 100-479.83q0-79.07 29.97-148.69t81.35-121.13q51.38-51.5 120.59-80.92Q401.13-860 479.83-860q79.06 0 148.67 29.39 69.62 29.39 121.13 80.85 51.52 51.46 80.94 121.02Q860-559.18 860-480.09t-29.39 148.15q-29.39 69.06-80.84 120.49-51.44 51.44-120.98 81.45-69.55 30-148.62 30ZM480-480Zm0 326q136 0 231-95t95-231q0-136-95-231t-231-95q-136 0-231 95t-95 231q0 136 95 231t231 95Z" />
                    </svg>
                    {duration}
                </div>
                <div className="level">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor">
                        <path d="M188-148v-184h102.31v184H188Zm263.16 0v-404h102.3v404h-102.3Zm258.53 0v-664H812v664H709.69Z" />
                    </svg>
                    {level}
                </div>
            </div>
            <div className="rating-bookmark">
                <div className="rating">
                    <span className="star">★</span>
                    {rating}
                </div>
                <button 
                    className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`} 
                    onClick={handleBookmarkToggle}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill={isBookmarked ? "#FF0000" : "#666666"}
                    >
                        <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z" />
                    </svg>
                    <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
            </div>
            <div className="course-description">{description}</div>
            <button className="enroll-course">Enroll now</button>
        </div>
    );
}

export default CourseCard;