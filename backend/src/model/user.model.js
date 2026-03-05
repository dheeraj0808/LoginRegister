const pool = require("../db/db").promise(); // Use promise wrapper for easier async/await

const User = {
    // Create users table if it doesn't exist
    init: async () => {
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        try {
            await pool.query(sql);
            console.log("Users table ready.");
        } catch (err) {
            console.error("Error creating users table:", err);
        }
    },

    // Find user by email
    findByEmail: async (email) => {
        const sql = "SELECT * FROM users WHERE email = ?";
        const [rows] = await pool.query(sql, [email]);
        return rows[0];
    },

    // Create a new user
    create: async (userData) => {
        const { name, email, password } = userData;
        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        const [result] = await pool.query(sql, [name, email, password]);
        return result.insertId;
    }
};

// Initialize table on load
User.init();

module.exports = User;
