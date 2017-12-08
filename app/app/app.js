import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import Routes from './routes/';

import configureStore from './store/configureStore';

// App css
require('style!css!sass!applicationStyles');
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={Routes} store={store}/>
  </Provider>,
  document.getElementById('app')
);
