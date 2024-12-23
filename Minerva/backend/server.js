const express = require("express");
const dotenv = require("dotenv");
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require("./config/db"); // Import database connection
const app = require("./app"); // Import app from app.js

dotenv.config();

const PORT = process.env.PORT || 5000;

// Test database connection
app.get("/test-db", (req, res) => {
    db.query("SELECT 1 + 1 AS solution", (err, results) => {
        if (err) {
            console.error("Query error:", err);
            res.status(500).send("Database query error");
        } else {
            res.send(`Database connected. Test result: ${results[0].solution}`);
        }
    });
});
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists
        db.query('SELECT * FROM user WHERE email = ?', [email], async (err, result) => {
            if (err) throw err;

            if (result.length > 0) {
                return res.status(400).json({ success: false, message: 'Email already in use' });
            }

            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user into the database
            db.query(
                'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
                [name, email, hashedPassword],
                (err, result) => {
                    if (err) throw err;

                    res.status(201).json({ success: true, message: 'User created successfully!' });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Login API
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email exists
        db.query('SELECT * FROM user WHERE email = ?', [email], async (err, result) => {
            if (err) throw err;

            if (result.length === 0) {
                return res.status(400).json({ success: false, message: 'Invalid email or password' });
            }

            // Compare the provided password with the stored hashed password
            const user = result[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({ success: false, message: 'Invalid email or password' });
            }

            const token = jwt.sign({ userId: user.id }, 'your-jwt-secret', { expiresIn: '1h' });

            res.json({ success: true, message: 'Login successful!', token, name:user.name});
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

