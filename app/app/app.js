import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import Routes from './routes/index';

import configureStore from './store/configureStore';

// App css
require('style!css!sass!applicationStyles');
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
