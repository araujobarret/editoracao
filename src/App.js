import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div style={{height: "100%"}}>
            <Login />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
