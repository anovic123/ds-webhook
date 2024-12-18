require('dotenv').config();

const SETTINGS = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
};

module.exports = SETTINGS;
