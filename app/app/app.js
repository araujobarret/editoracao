import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import * as actions from './actions/UsuarioActions';
import routes from './routes/';

import configureStore from './store/configureStore';

// App css
require('style!css!sass!applicationStyles');
const store = configureStore();
store.dispatch(actions.startLogin("test@mail.com", "12312asd!"));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
