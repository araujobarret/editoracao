import React, { Component } from 'react';
import { ConnectedRouter as Router} from 'react-router-redux';

//import Routes from './routes/index';

import Login from './components/Login';
import Menu from './components/Menu';


class App extends Component {
  render() {
    return (
      <Router>
        <Login />
      </Router>
    );
  }
}

export default App;

// <Routes history={history}/>
