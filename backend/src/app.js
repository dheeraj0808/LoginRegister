const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.Routes");
const app = express();

// Enable CORS for frontend
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);

module.exports = app;