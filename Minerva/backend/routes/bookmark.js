// In routes/bookmark.js

const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Bookmark a course
router.post('/add',  (req, res) => {
    const { courseId, userId } = req.body;
    try {
         db.execute(
            'INSERT INTO bookmark (course_id, user_id, created_at) VALUES (?, ?, NOW())',
            [courseId, userId]
        );
        res.status(201).json({ success: true, message: "Bookmark added successfully." });
    } catch (error) {
        console.error("Error adding bookmark:", error);
        res.status(500).json({ success: false, message: "Failed to add bookmark." });
    }
});

// Unbookmark a course
router.delete('/remove',  (req, res) => {
    const { courseId, userId } = req.body;
    try {
         db.execute(
            'DELETE FROM bookmark WHERE course_id = ? AND user_id = ?',
            [courseId, userId]
        );
        res.status(200).json({ success: true, message: "Bookmark removed successfully." });
    } catch (error) {
        console.error("Error removing bookmark:", error);
        res.status(500).json({ success: false, message: "Failed to remove bookmark." });
    }
});



module.exports=router;