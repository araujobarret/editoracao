import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore, routerReducer} from 'react-router-redux';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

// import Routes from './routes/index';

import configureStore from './store/configureStore';
import Login from './components/Login';
import Menu from './components/Menu';

// App css
// require('style!css!sass!applicationStyles');
require("./styles/app.scss");
const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={Login} />
        <Route path="app" component={Menu} />
      </Route>
    </Router>

  </Provider>,
  document.getElementById('root')
);

// <Routes history={history}/>
