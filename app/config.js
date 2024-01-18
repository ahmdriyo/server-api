const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  urlDb : process.env.URL_MONGODB_DEV,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtExpiration : '12h',
  gmail: process.env.GMAIL,
  password: process.env.PASSWORD
};