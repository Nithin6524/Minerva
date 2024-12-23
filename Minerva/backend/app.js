const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/users"); // Adjust the path as necessary
const coursesRouter = require("./routes/courses");
const reviewsRouter = require("./routes/reviews");
const categoriesRouter = require("./routes/categories");
const bookmarkRouter = require("./routes/bookmark");
const providerRouter = require("./routes/provider");
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Built-in middleware to parse JSON

// Use the routers
app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/bookmark", bookmarkRouter);
app.use("/api/provider", providerRouter);
module.exports = app; // Export the app for use in server.js
