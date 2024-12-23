const express = require("express");
const db = require("../config/db");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();


// Get all users
router.get("/", (req, res) => {
    console.log("GET request to /api/users");
    db.query("SELECT id, name, email FROM User", (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: "An error occurred" });
        }
        console.log("Query results:", results);
        res.json(results);
    });
});

module.exports = router;
