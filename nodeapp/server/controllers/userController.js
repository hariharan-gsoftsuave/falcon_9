// controllers/userController.js
require('dotenv').config();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { _id: 0, name: 1, age: 1, city: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

// Add a new user
const createUser = async (req, res) => {
  const { username, password,email, name, age, city } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email, name, age, city });
    await newUser.save();
    res.status(201).json({ message: "New user has been created!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving user", error: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password fields are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token:token , id: user._id, username: user.username,name:user.username,age:user.age,city:user.city});
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

const profileController = async (req, res) => {
  try {
    const userId = req.query.user_id;
    if (!userId) {
      return res.status(400).json({ message: "user_id query parameter is required" });
    }
    const user = await User.findById(userId).select('-password').select('-__v'); // omit password from response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};


module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  profileController,
};
