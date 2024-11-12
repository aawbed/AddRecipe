// db.js
const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'addrecipe'
});

// Connect to the database and create the table if it doesn’t exist
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL!");

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS recipes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            ingredients TEXT NOT NULL,
            directions TEXT NOT NULL,
            owner VARCHAR(255),
            image VARCHAR(255)
        )
    `;
    connection.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Recipes table is ready.");
    });
});

module.exports = connection;
