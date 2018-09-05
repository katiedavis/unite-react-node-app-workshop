import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.SHOPIFY_API_KEY || 'api key fart';
const secret = process.env.SHOPIFY_SECRET || 'secrets ;)';
const hostName = process.env.HOST_NAME || 'should be url';

const config = {
  apiKey,
  secret,
  hostName,
};

export default config;
