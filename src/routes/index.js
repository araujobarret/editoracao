import React from 'react';
import { connect } from 'react-redux';
import { Route, Router, IndexRoute } from 'react-router';
import * as actions from '../actions/UsuarioActions';
import Login from '../components/Login';
import Menu from '../components/Menu';
import { TOKEN_LOCAL_STORAGE } from '../constants/Api';
import configureStore from '../store/configureStore';

let requireLogin = function(nextState, replace, next) {
  let token = localStorage.getItem(TOKEN_LOCAL_STORAGE);
  // If is there a token, check if it is valid
  if(token) {
    console.log("Token", token);
    //dispatch(startCheckToken(token));
  }
  else {
    replace('/');
  }
  next();
}

class Routes extends React.Component{

  constructor(props){
    super(props);
    console.log("Props", props);
    this.state = {
      history: this.props.history
    };
  }

  render(){
    return (
      <Router history={this.state.history}>
        <Route path="/">
          <IndexRoute component={Login} />
          <Route path="app" component={Menu} />
        </Route>
      </Router>
    );
  }
}

export default Routes;
