const User = require("../models/user.model");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // 1. Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    // 3. Create User
    const user = await User.create({
      name,
      email,
      password // Note: Aapko yaha password hash karke save karna chahiye (bcrypt use karke)
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
      password
    }
  });
  res.json({
    message: "User logged in successfully",
    user
  });
}

module.exports = {
  registerUser,
  loginUser
}