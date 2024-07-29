const express = require('express');
const router = express.Router();
const Referral = require('../models/Referral');
const User = require('../models/user');

// Generate referral link
router.post('/generate', async (req, res) => {
  const { userId } = req.body;

  let referral = await Referral.findOne({ userId });
  if (referral) {
    return res.json({ referralCode: referral.referralCode });
  }

  const referralCode = `${userId}-${Date.now().toString(36)}`;
  referral = new Referral({ userId, referralCode });
  await referral.save();

  res.json({ referralCode });
});

// Get referral link
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const referral = await Referral.findOne({ userId });

  if (!referral) {
    return res.status(404).json({ message: 'Referral not found' });
  }

  res.json({ referralCode: referral.referralCode });
});

module.exports = router;
