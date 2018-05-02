import React from 'react';

import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import AdminsListPage from './pages/AdminsListPage';
import NotFoundPage from './pages/NotFoundPage';

export default [
  {
    ...App,
    routes: [
      {
        // Pulls out properties from export of HomePage.js
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...AdminsListPage,
        path: '/admins'
      },
      {
        // Pulls out properties from export of UsersList.js (including component AND loadData)
        ...UsersListPage,
        path: '/users'
      },
      {
        ...NotFoundPage
        // By not providing a path, react router assumes this is for pages not matching any address
      }
    ]
  }
];
