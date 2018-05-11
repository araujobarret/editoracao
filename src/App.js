import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Login from './containers/Login';
import Menu from './containers/Menu';

class App extends Component {
  constructor(props) {
    super(props);
    this.onAuthenticated = this.onAuthenticated.bind(this);

    this.state = {
      isAuthenticated: false,
    };
  }

  onAuthenticated() {
    this.setState({ isAuthenticated: true });
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider>
          { this.state.isAuthenticated ? <Menu /> : <Login onAuth={this.onAuthenticated} /> }
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
