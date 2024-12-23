const express = require('express');
const db = require('../config/db');

const router = express.Router();



// Get all providers
router.get('/', (req, res) => {
    db.query('SELECT * FROM Provider', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching providers' });
        }
        res.json(results);
    });
});


// Get provider by course ID
router.get('/course/:courseId', (req, res) => {
    const { courseId } = req.params;

    db.query(
        `SELECT Provider.* FROM Provider 
         JOIN Course ON Provider.id = Course.provider_id 
         WHERE Course.id = ?`, 
        [courseId], 
        (err, results) => {
            if (err) {
                console.error('Database error:', err); // Log the error for debugging
                return res.status(500).json({ error: 'Error fetching provider' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Provider not found for this course' });
            }
            res.json(results[0]); // Return the provider details
        }
    );
});

module.exports = router;
