const mysql = require('mysql2/promise');

async function connectDB() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '', // Default XAMPP/MAMP password
            database: 'loginregister'
        });
        
        console.log('✅ MySQL Connected Successfully');
        return connection;
    } catch (error) {
        console.error('❌ Database Connection Failed:', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
