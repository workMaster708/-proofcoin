// telegramBot.js
const TelegramBot = require('node-telegram-bot-api');
const User = require('./models/user'); // Adjust the path according to your project structure
const token = process.env.TELEGRAM_BOT_TOKEN; // Ensure you have this in your .env file
const bot = new TelegramBot(token, { polling: true });

// Function to generate a referral link
const generateReferralLink = (userId) => {
  return `https://t.me/proofcoin_bot?start=${userId}`;
};

// Function to increase user points in the database
const increaseUserPoints = async (userId, points) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      user.points += points;
      await user.save();
    }
  } catch (error) {
    console.error(`Error increasing points for user ${userId}:`, error);
  }
};

// Function to award bonuses to users
const awardBonuses = async (referrerId, newUserId) => {
  await increaseUserPoints(referrerId, 2000); // Referrer gets 2000 points
  await increaseUserPoints(newUserId, 5000);   // New user gets 5000 points
};

// Handle new user start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id.toString();

  // Check if the user joined via a referral link
  if (msg.text.includes(' ')) {
    const referrerId = msg.text.split(' ')[1];
    await awardBonuses(referrerId, userId);
    bot.sendMessage(chatId, `Welcome! You were referred by user ${referrerId}.`);
  } else {
    const referralLink = generateReferralLink(userId);
    bot.sendMessage(chatId, `Welcome! Share this link with your friends: ${referralLink}`);
  }
});

module.exports = bot;
