import dotenv from 'dotenv';
import Koa from 'koa';
import session from 'koa-session';
import createShopifyAuth, {
  createVerifyRequest,
} from '@shopify/koa-shopify-auth';
//very nice to have this auth package 😍, this is an outdated version, should be using verifyRequest
import webpack from 'koa-webpack';
import graphQLProxy from '@shopify/koa-shopify-graphql-proxy';

import renderReactApp from './render-react-app';

dotenv.config();
const {SHOPIFY_SECRET, SHOPIFY_API_KEY} = process.env;
//get the keys from enviroment, this is thanks to the dotenv package another delight!

const app = new Koa();
app.use(session(app));

app.keys = [SHOPIFY_SECRET];

console.log(SHOPIFY_SECRET, SHOPIFY_API_KEY);

app.use(
  createShopifyAuth({
    apiKey: SHOPIFY_API_KEY,
    secret: SHOPIFY_SECRET,
    // our app's permissions, could contain more
    scopes: ['write_products'],
    afterAuth(ctx) {
      const {shop, accessToken} = ctx.session;
      //I mean, it's called after auth, but after auth it does stuff.
      console.log('We did it!', shop, accessToken);

      ctx.redirect('/');
    },
  }),
);

app.use(createVerifyRequest());

app.use(webpack());
app.use(graphQLProxy);

app.use(renderReactApp);

export default app;
