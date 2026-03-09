const express = require("express");
const { registerUser, loginUser, getProfile, updateProfile } = require("../controllers/auth.controller");
const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateToken, getProfile);
router.patch("/profile", authenticateToken, updateProfile);

module.exports = router;