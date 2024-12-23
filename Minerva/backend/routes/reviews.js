// Add a review by user for a specific course
const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.post('/user/:userId/course/:courseId', (req, res) => {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    const { rating, comment } = req.body;

    // Ensure required fields are provided
    if (!rating || !userId || !courseId) {
        return res.status(400).json({ error: 'Please provide user ID, course ID, rating, and comment.' });
    }

    db.query(
        `INSERT INTO Review (user_id, course_id, rating, comment) VALUES (?, ?, ?, ?)`,
        [userId, courseId, rating, comment],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error creating review' });
            }
            res.status(201).json({ message: 'Review created successfully', reviewId: results.insertId });
        }
    );
});

// Fetch all reviews by a specific user
router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;

    db.query('SELECT * FROM Review WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching reviews' });
        }
        res.json(results);
    });
});
module.exports = router;