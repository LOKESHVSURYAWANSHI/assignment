const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc Register new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Registration attempt:", { name, email });

    // check if user exists
    const existingUser = await User.findOne({ email });
    console.log("Existing user found:", existingUser ? "Yes" : "No");
    if (existingUser) {
      console.log("User already exists with email:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", { email });

    // check user
    const user = await User.findOne({ email });
    console.log("User found for login:", user ? "Yes" : "No");
    if (!user) {
      console.log("No user found with email:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
