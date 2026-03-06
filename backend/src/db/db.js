const mysql = require("mysql2");

// Ek hi connection banaata hai aur baar baar reuse karta hai
let connection;

const connectionToDb = () => {
    if (!connection) {
        connection = mysql.createConnection({
            host: process.env.DB_HOST,       // .env se value le raha hai
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
    }
    return connection;
};

module.exports = connectionToDb;