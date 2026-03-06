const connectionToDb = require("../db/db");

// ========== REGISTER ==========
const register = (req, res) => {
    // Step 1: Body se data nikalo
    const { username, email, password } = req.body;

    // Step 2: Check karo sab fields bhare hain ya nahi
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Sab fields bharo!" });
    }

    // Step 3: DB connection lo
    const db = connectionToDb();

    // Step 4: Pehle check karo ki email already exist toh nahi karti
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "DB error", error: err.message });
        }

        // Agar user mil gaya toh matlab already registered hai
        if (results.length > 0) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Step 5: Naya user insert karo
        db.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, password],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Registration failed", error: err.message });
                }

                // Step 6: Success response bhejo
                res.status(201).json({ message: "User registered successfully!" });
            }
        );
    });
};

module.exports = { register };