import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';
import Login from './components/Login';
import Menu from './components/Menu';


class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <Login />
          <RaisedButton label="Default" />
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;

// <Routes history={history}/>
