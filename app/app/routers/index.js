import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <IndexRoute component={Login}/>
    </Route>
  </Router>
);
