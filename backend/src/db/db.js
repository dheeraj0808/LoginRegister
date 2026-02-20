const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool (better than single connection)
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'loginRegister',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
});

// Connect and initialize tables using models
async function connectDB() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL Connected Successfully');
        connection.release();

        // Create tables using User model
        const User = require('../models/User');
        await User.createTable();
        console.log('✅ Users table ready');
    } catch (error) {
        console.error('❌ Database Connection Failed:', error.message);
        process.exit(1);
    }
}

module.exports = { pool, connectDB };
