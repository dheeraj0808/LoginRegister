const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware");

const { registerUser ,loginUser , getProfile} = require("../controllers/auth.controller");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getProfile);

module.exports = router;