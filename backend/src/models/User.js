const { pool } = require('../db/db');

const User = {
    // Create users table (called on server start)
    createTable: async () => {
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(sql);
    },

    // Find user by email
    findByEmail: async (email) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0] || null;
    },

    // Find user by ID
    findById: async (id) => {
        const [rows] = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [id]);
        return rows[0] || null;
    },

    // Create new user
    create: async ({ name, email, password }) => {
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );
        return { id: result.insertId, name, email };
    },

    // Get all users (password excluded)
    findAll: async () => {
        const [rows] = await pool.query('SELECT id, name, email, created_at FROM users');
        return rows;
    },

    // Update user by ID
    updateById: async (id, { name, email }) => {
        const [result] = await pool.query(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [name, email, id]
        );
        return result.affectedRows > 0;
    },

    // Delete user by ID
    deleteById: async (id) => {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
};

module.exports = User;
