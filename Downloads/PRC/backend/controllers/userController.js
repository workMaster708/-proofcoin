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

module.exports = {
  getUserData,
  updateUserPoints
};
