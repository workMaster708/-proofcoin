const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  referralCode: { type: String, required: true, unique: true },
});

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
