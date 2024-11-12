const express = require('express');
const connection = require('./db');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Serve static files
app.use(express.static(path.join(__dirname)));

// Route to add a new recipe (with image upload)
app.post('/add-recipe', upload.single('recipe-image'), (req, res) => {
    const { name, ingredients, directions } = req.body;
    const owner = req.body.owner || null;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const query = `INSERT INTO recipes (name, ingredients, directions, owner, image) VALUES (?, ?, ?, ?, ?)`;
    const values = [name, ingredients, directions, owner, image];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error("Error inserting recipe:", err);
            res.status(500).send('Failed to add recipe');
        } else {
            res.status(201).send('Recipe added successfully');
        }
    });
});

// Route to get all recipes
app.get('/recipes', (req, res) => {
    const query = "SELECT * FROM recipes";

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error retrieving recipes:", err);
            res.status(500).send('Failed to retrieve recipes');
        } else {
            res.json(results);
        }
    });
});

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
