import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.SHOPIFY_API_KEY || 'api key fart';
const secret = process.env.SHOPIFY_SECRET || 'secrets ;)';

const config = {
  apiKey,
  secret,
};

export default config;
