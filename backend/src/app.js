const express = require('express');
const connectDB = require('./db/db');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.send('LoginRegister API with MySQL is running!');
});

module.exports = app;