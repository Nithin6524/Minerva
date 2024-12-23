const express = require('express');
const db = require('../config/db');

const router = express.Router();



router.get('/', (req, res) => {
    const query = `
        SELECT Category.id, Category.name, Category.description, Category.image_url, COUNT(Course.id) AS course_count
        FROM Category
        LEFT JOIN Course ON Category.id = Course.category_id
        GROUP BY Category.id;
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching categories' });
        }
        res.json(results);
    });
});


router.get('/:id/courses', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM Course WHERE category_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching courses' });
        }
        res.json(results);
    });
});

module.exports = router;