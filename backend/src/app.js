const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./db/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('LoginRegister API with MySQL is running!');
});

app.use('/api/auth', authRoutes);

module.exports = app;
