const User = require('../models/user');

const getUserData = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserPoints = async (req, res) => {
  const { username } = req.params;
  const { points, energy } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { username },
      { points, energy },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateReferralLink = async (req, res) => {
  const { userId } = req.params;
  try {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Replace with your frontend URL
    const referralLink = `${baseUrl}/referral?user=${userId}`;
    res.json({ referralLink });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate referral link' });
  }
};

module.exports = {
  getUserData,
  updateUserPoints,
  generateReferralLink // Export the function
};
