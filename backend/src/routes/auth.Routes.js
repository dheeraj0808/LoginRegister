const express = require("express");
const router = express.Router();


const { registerUser, loginUser, getProfile, updateProfile } = require("../controllers/auth.controller");
const verifyToken = require("../middleware/auth.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getProfile);
router.patch("/profile", verifyToken, updateProfile);

module.exports = router;