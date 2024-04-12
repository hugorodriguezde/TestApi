// Import required libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();


// Initialize Express app
const app = express();
const env = process.env.PORT || 5000;
// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Define Mongoose Schema
const StringSchema = new mongoose.Schema({
    content: String
});

// Define Mongoose Model
const StringModel = mongoose.model('String', StringSchema);

// Define POST endpoint
app.post('/api/strings', (req, res) => {
    const newString = new StringModel({
        content: req.body.content
    });

    newString.save()
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));