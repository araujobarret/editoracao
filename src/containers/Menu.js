import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { Home } from '../components/Home';
import Entrada from '../components/Entrada/Entrada';
import './Menu.styles.css';

class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      locaisMenuOpen: false,
    }
  }

  handleClose = () => this.setState({open: false});

  handleChange = (event, index, value) => {
    console.log("Event", event);
    console.log("Value", value);
    // this.setState({value});
  }

  // handleChange = (menuOpen) => {
  //   let obj = {};
  //   obj[menuOpen] = !this.state[menuOpen];
  //   this.setState(obj);
  // }

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
              <Link to="/" style={{ textDecoration: "none" }} >
                <MenuItem style={menuItemStyles} onClick={this.handleClose}>Estoque</MenuItem>
              </Link>
              <Link to="/entrada" style={{ textDecoration: "none" }} >
                <MenuItem style={menuItemStyles} onClick={this.handleClose}>Entrada de Livros</MenuItem>
              </Link>

              <DropDownMenu value={this.state.locaisMenuOpen} onChange={this.handleChange}>
                <MenuItem value={1} primaryText="Never" />
                <MenuItem value={2} primaryText="Every Night" />
                <MenuItem value={3} primaryText="Weeknights" />
                <MenuItem value={4} primaryText="Weekends" />
              </DropDownMenu>

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
