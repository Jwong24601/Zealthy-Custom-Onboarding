//Routes for admin page
const express = require('express');
const router = express.Router();
const StateModel = require('../models/stateModel');

//Get current state of configuration and sends back configuration.
router.get('/state', async (req, res) => {
  try {
    const state = await StateModel.findOne();
    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get and updates current state and update if no state, creates one if not.
router.post('/state', async (req, res) => {
  try {
    const state = await StateModel.findOne();
    if (!state) {
      const session = await StateModel.create({
        email: '',
        page2Components: ['birthdate', 'address'],
        page3Components: ['aboutMe'],
      });
      console.log('default created');
    }
    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update state for pages 2 and 3 components, sets default if none.
router.put('/state', async (req, res) => {
  try {
    const { page2Components, page3Components } = req.body;
    if (page2Components === undefined || page2Components == 0)
      page2Components[0] = 'birthdate';
    if (page3Components === undefined || page3Components == 0)
      page3Components[0] = 'aboutMe';
    const state = await StateModel.findOneAndUpdate(
      {},
      { page2Components, page3Components },
      { new: true, upsert: true }
    );
    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
