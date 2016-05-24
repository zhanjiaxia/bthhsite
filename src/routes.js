import React from 'react'
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router'

import App from './components/app'
// import Home from './components/home'
import NotFound from './components/404'

import Search from './components/search/index'

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/category/bthh" />
    { /* <IndexRoute components={{ main: Home}} /> */ }
    <Route path="category/">
      <Route path="bthh" components={{ body: Search }} />
    </Route>
    <Route path="404.html" component={NotFound} />
    <Redirect from="*" to='404.html' />
  </Route>
);
