import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Login from './containers/Login';
import Menu from './containers/Menu';

let isAuthenticated = true;

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          { isAuthenticated ? <Menu/> : <Login /> }
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
