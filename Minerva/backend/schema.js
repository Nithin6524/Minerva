const db = require("./config/db");

const dropTables = () => {
    const queries = [
        "DROP TABLE IF EXISTS Bookmark",
        "DROP TABLE IF EXISTS Review",
        "DROP TABLE IF EXISTS Course",
        "DROP TABLE IF EXISTS Provider",
        "DROP TABLE IF EXISTS Category",
        "DROP TABLE IF EXISTS User",
    ];

    queries.forEach((query) => {
        db.query(query, (err) => {
            if (err) {
                console.error("Error dropping table:", err);
            } else {
                console.log("Table dropped or does not exist.");
            }
        });
    });
};

const createTables = () => {
    const queries = [
        {
            name: "User",
            query: `CREATE TABLE User (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,
        },
        {
            name: "Category",
            query: `CREATE TABLE Category (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                description TEXT,  -- New column
                image_url VARCHAR(255)  -- New column
            )`,
        },

        {
            name: "Provider",
            query: `CREATE TABLE Provider (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                website VARCHAR(255)
            )`,
        },
        {
            name: "Course",
            query: `CREATE TABLE Course (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                category_id INT,
                provider_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES Category(id),
                FOREIGN KEY (provider_id) REFERENCES Provider(id)
            )`,
        },
        {
            name: "Review",
            query: `CREATE TABLE Review (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                course_id INT,
                rating INT CHECK (rating BETWEEN 1 AND 5),
                comment TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES User(id),
                FOREIGN KEY (course_id) REFERENCES Course(id)
            )`,
        },
        {
            name: "Bookmark",
            query: `CREATE TABLE Bookmark (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                course_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES User(id),
                FOREIGN KEY (course_id) REFERENCES Course(id)
            )`,
        },
    ];

    queries.forEach(({ name, query }) => {
        db.query(query, (err) => {
            if (err) {
                console.error(`Error creating table ${name}:`, err);
            } else {
                console.log(`Table '${name}' created or already exists.`);
            }
        });
    });
};

// // Run the dropTables and createTables functions
// dropTables(); // Drop existing tables
// createTables(); // Create new tables

const updateCategoryTable = () => {
    const alterTableQuery = `
        ALTER TABLE Category 
        ADD COLUMN description TEXT, 
        ADD COLUMN image_url VARCHAR(255)
    `;

    db.query(alterTableQuery, (err, results) => {
        if (err) {
            console.error("Error updating Category table:", err);
        } else {
            console.log("Category table updated successfully.");
        }
    });
};

// Call the function to update the table
updateCategoryTable();


