const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Get user data
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user data
router.put('/:username', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Generate referral link
router.get('/referral-link/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Replace with your frontend URL
    const referralLink = `${baseUrl}/referral?user=${userId}`;
    res.json({ referralLink });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate referral link' });
  }
});

module.exports = router;
