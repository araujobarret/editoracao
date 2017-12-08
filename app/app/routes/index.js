import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import * as actions from '../actions/UsuarioActions';
import Login from '../components/Login';
import Menu from '../components/Menu';
import { TOKEN_LOCAL_STORAGE } from '../constants/Api';
import configureStore from '../store/configureStore';

class Routes extends Component {

  requireLogin(nextState, replace, next) {
    let token = window.localStorage.getItem(TOKEN_LOCAL_STORAGE);

    // If is there a token, check if it is valid
    if(token) {
      dispatch(startCheckToken(token));
    }
    else {
      replace('/');
    }
    next();
  }

  render() {
    <Router history={hashHistory}>
      <Route path="/">
        <IndexRoute component={Login}/>
        <Route path="app" component={Menu} onEnter={this.requireLogin} />
      </Route>
    </Router>
  }
}

let requireLogin = function(nextState, replace, next) {
  let token = window.localStorage.getItem(TOKEN_LOCAL_STORAGE);  
  // If is there a token, check if it is valid
  if(token) {
    dispatch(startCheckToken(token));
  }
  else {
    replace('/');
  }
  next();
}


export default (
  <Router history={hashHistory}>
    <Route path="/">
      <IndexRoute component={Login}/>
      <Route path="app" component={Menu} onEnter={requireLogin} />
    </Route>
  </Router>
);
