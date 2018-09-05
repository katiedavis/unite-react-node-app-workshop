import 'isomorphic-fetch';
import * as Koa from 'koa';
import * as session from 'koa-session';
import shopifyAuth, {verifyRequest} from '@shopify/koa-shopify-auth';
import graphQLProxy from '@shopify/koa-shopify-graphql-proxy';
import {ip, port} from '../config/server';
import config from '../config/app';
import renderApp from './render-app';
let app;
(async () => {
  const {apiKey, secret, scopes, hostName} = await config();
  app = new Koa();
  app.keys = [secret];
  app.use(session(app));
  app.use(
    shopifyAuth({
      apiKey,
      secret,
      scopes,
      afterAuth(ctx) {
        ctx.redirect('/');
      },
    }),
  );
  app.use(graphQLProxy());
  const fallbackRoute = hostName === '' ? undefined : `/auth?shop=${hostName}`;
  app.use(
    verifyRequest({
      fallbackRoute,
    }),
  );
  app.use(renderApp);
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`[init] listening on ${ip}:${port}`);
  });
})();
export default app;
