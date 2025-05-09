const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

// @route   GET /api/userDetails
// @desc    Get all users
router.get('/userDetails', userController.getAllUsers);

// @route   POST /api/userDetails
// @desc    Create a new user
router.post('/register', userController.createUser);

// @route   POST /api/login
// @desc    User login
router.post('/login', userController.loginUser);

router.get('/profile', verifyToken, userController.profileController); // protected

module.exports = router;
