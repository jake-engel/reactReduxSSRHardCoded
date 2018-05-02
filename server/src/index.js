import express from 'express';
import 'babel-polyfill';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';

import createStore from './helpers/createStore';
import renderer from './helpers/renderer';
import Routes from './client/Routes';

const app = express();

// Proxy must be first middleware. If browser makes request starting with /api send off to proxy server
app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    // This 3 lines below are only required for the api used in this course. NOT on future SSR sites
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    }
  })
);

// Tells express needs to treat public library as a static (public) directory available to the outside world
app.use(express.static('public'));

app.get('*', async (req, res) => {
  const store = createStore(req);

  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  // Gets server data from all of action creators. Then waits to it before rendering to server.
  // Thus, the store were passing below will be up to date with fetched data
  await Promise.all(promises);
  const context = {};
  const content = renderer(req, store, context);

  if (context.url) {
    return res.redirect(301, context.url);
  }
  if (context.notFound) {
    res.status(404);
  }

  res.send(content);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`You are now listening on port ${PORT}!`);
});
