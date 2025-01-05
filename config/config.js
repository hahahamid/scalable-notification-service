const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  ONE_SIGNAL_APP_ID: process.env.ONE_SIGNAL_APP_ID,
  ONE_SIGNAL_REST_API_KEY: process.env.ONE_SIGNAL_REST_API_KEY,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
};