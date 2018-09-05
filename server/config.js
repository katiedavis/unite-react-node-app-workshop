import dotenv from 'dotenv';

dotenv.config();
export default async function() {
  const apiKey = process.env.SHOPIFY_API_KEY || 'shopify_app_api_key';
  const secret = process.env.SHOPIFY_SECRET || 'shopify_app_secret';
  const scopes = ['read_customers', 'write_customers'];
  const hostName = process.env.HOST_NAME;
  return {
    apiKey,
    secret,
    scopes,
    hostName,
  };
}
