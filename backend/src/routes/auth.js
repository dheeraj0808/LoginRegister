const express = require('express');
const router = express.Router();

// Register endpoint
router.post('/register', (req, res) => {
    res.json({ message: 'Register endpoint working' });
});

// Login endpoint  
router.post('/login', (req, res) => {
    res.json({ message: 'Login endpoint working' });
});

// Get all users
router.get('/users', (req, res) => {
    res.json({ message: 'Get users endpoint working' });
});

module.exports = router;
