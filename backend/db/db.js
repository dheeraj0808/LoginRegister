const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect('mongodb+srv://dheerajsingh8887088_db_user:YOUR_PASSWORD@cluster0.4oqnx3r.mongodb.net/loginregister');
    console.log('MongoDB Connected');
}

module.exports = connectDB;