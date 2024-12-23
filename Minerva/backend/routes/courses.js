const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Add a new course
router.post('/add', (req, res) => {
    const { title, description, category_id, provider_id } = req.body;
    const createdAt = new Date();

    db.query(
        'INSERT INTO Course (title, description, category_id, provider_id, created_at) VALUES (?, ?, ?, ?, ?)',
        [title, description, category_id, provider_id, createdAt],
        (err, results) => {
            if (err) {
                console.error('Error adding course:', err);
                return res.status(500).json({ error: 'Error adding course' });
            }
            res.status(201).json({ message: 'Course added successfully', courseId: results.insertId });
        }
    );
});

// Get all courses
router.get('/', (req, res) => 
{
    try {
        db.execute(`CALL get_courses `,  (err, [results]) => {
            if (err) throw err;
            res.json(results); // Returning the first result set as the search results
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Database  error');
    }
});

router.get('/search', (req, res) => {
    const { keyword } = req.query;
    
    try {
        db.execute(`CALL search_courses(?)`, [keyword], (err, results) => {
            if (err) throw err;
            res.json(results[0]); // Returning the first result set as the search results
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Database search error');
    }
});

// Get a course by ID
router.get('/:id', (req, res) => {
    const courseId = req.params.id;

    db.query('SELECT * FROM Course WHERE id = ?', [courseId], (err, results) => {
        if (err) {
            console.error('Error fetching course:', err);
            return res.status(500).json({ error: 'Error fetching course' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(results[0]);
    });
});

// Update a course
router.put('/:id', (req, res) => {
    const courseId = req.params.id;
    const { title, description, category_id, provider_id } = req.body;

    db.query(
        'UPDATE Course SET title = ?, description = ?, category_id = ?, provider_id = ? WHERE id = ?',
        [title, description, category_id, provider_id, courseId],
        (err, results) => {
            if (err) {
                console.error('Error updating course:', err);
                return res.status(500).json({ error: 'Error updating course' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Course not found' });
            }
            res.json({ message: 'Course updated successfully' });
        }
    );
});

// Delete a course
router.delete('/:id', (req, res) => {
    const courseId = req.params.id;

    db.query('DELETE FROM Course WHERE id = ?', [courseId], (err, results) => {
        if (err) {
            console.error('Error deleting course:', err);
            return res.status(500).json({ error: 'Error deleting course' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully' });
    });
});

module.exports = router;
