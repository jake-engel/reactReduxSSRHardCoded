// Startup point for client side app
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import 'babel-polyfill';

import Routes from './Routes';
import reducers from './reducers';

// Basically prepends /api into whatever our URL we are searching with.
// Need because cookie based authentication has to be proxied in SSR.
const axiosInstance = axios.create({
  baseURL: '/api'
});

// The second object is the initial values for the store (seeds) on the browser side
// For initial data on the server-side you need to use the loadData methods
const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
