require('dotenv').config();

const env = process.env;

const development = {
    url: env.MONGO_URL,
    database: env.MONGO_DATABASE,
  };
  
  const production = {
    url: env.MONGO_URL,
    database: env.MONGO_DATABASE,
  };
  
  const test = {
    url: env.MONGO_URL,
    database: env.MONGO_DATABASE,
  };
  
  module.exports = { development, production, test };