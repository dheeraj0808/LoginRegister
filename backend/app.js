const express = require('express');
const connectDB = require('./db/db');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('LoginRegister API is running!');
});

module.exports = app;