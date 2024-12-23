const express = require("express");
const bcrypt = require("bcryptjs");  // To hash passwords
const jwt = require("jsonwebtoken"); // For creating JWT tokens
const User = require("../models/User"); // Assuming you have a User model
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserQuery, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const insertUserQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(insertUserQuery, [name, email, hashedPassword], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error signing up' });
      }
      // Optionally, generate a JWT token for the user
      const token = jwt.sign({ userId: results.insertId, email }, 'your-secret-key', { expiresIn: '1h' });

      res.status(201).json({ message: 'Signup successful', token });
    });
  });
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Query to find the user by email
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    // If no user is found, return an error
    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    // Compare the hashed password with the entered password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  });
});

module.exports=router;