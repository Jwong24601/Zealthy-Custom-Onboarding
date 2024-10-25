//User Routes middlewares
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const sessionController = require('../controllers/sessionController.js');

//Create user (Page 1), checks if email exits in database and creates new one with pw if doesn't exist.  Sends user back to the front with status code 201.
router.post('/onboard', sessionController.startSession, async (req, res) => {
  try {
    const email = res.locals.user;
    const password = res.locals.password;
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.status(409).json({ message: 'User already exists' });
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update onboarding data for current page and sends back user.
router.patch('/update/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;
    const user = await User.findOneAndUpdate({ email }, updateData, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User by email
router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;
    const user = await User.findOne({ email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get all users (for Data Table)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
