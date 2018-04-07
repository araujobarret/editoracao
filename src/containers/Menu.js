import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { Home } from '../components/Home';
import Entrada from '../components/Entrada/Entrada';
import './Menu.styles.css';

class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  }

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <Router>
        <div className="container">
          <div className="header">
            <AppBar
                title="Controle de Livros Rui Google Design"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                style={{flex: "1", backgroundColor: "#0c7563"}}
                onLeftIconButtonClick={() => this.setState({open: !this.state.open})}
              />

            <Drawer
              docked={false}
              open={this.state.open}
              containerStyle={{paddingTop: "5vh"}}
              onRequestChange={(open) => this.setState({open})}>
              <Link to="/">
                <MenuItem style={menuItemStyles} onClick={this.handleClose}>Estoque</MenuItem>
              </Link>
              <Link to="/entrada">
                <MenuItem style={menuItemStyles} onClick={this.handleClose}>Entrada de Livros</MenuItem>
              </Link>

            </Drawer>
          </div>

          <div className="body">
            <Route exact path="/" component={Home} />
            <Route path="/entrada" component={Entrada} />
          </div>
        </div>
      </Router>
    );
  }
};

const menuItemStyles = {
  color: "#0c7563",
  fontWeight: "bold",
  paddingLeft: "4vw"
};

const mapStateToProps = (store) => {

}

export default connect(mapStateToProps)(Menu);
