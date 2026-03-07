const User = require("../models/user.model");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password
  });
  res.json({
    message: "User registered successfully",
    user
  });


}


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