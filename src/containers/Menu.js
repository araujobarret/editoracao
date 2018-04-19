import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import { Home } from '../components/Home';
import Entrada from '../components/Entrada/Entrada';
import LocalAdd from '../components/Local/LocalAdd';
import LocalList from '../components/Local/LocalList';
import AutorAdd from '../components/Autor/AutorAdd';
import AutorList from '../components/Autor/AutorList';
import RubricaAdd from '../components/Rubrica/RubricaAdd';
import RubricaList from '../components/Rubrica/RubricaList';

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
              containerStyle={{paddingTop: "2vh"}}
              onRequestChange={(open) => this.setState({open})}>

              <List>
                <Subheader>Menu</Subheader>
                <ListItem
                  key="locais"
                  style={menuItemHeaderStyles}
                  primaryText="Locais"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <Link to="/local/novo" style={{ textDecoration: "none" }} key="localNovo" >
                      <ListItem key={1} primaryText="Novo" style={subItemStyles}/>
                    </Link>,
                    <Link to="/local/lista" style={{ textDecoration: "none" }} key="localListar" >
                      <ListItem key={2} primaryText="Listar" style={subItemStyles}/>
                    </Link>,
                  ]}/>
              </List>

              <List>
                <ListItem
                  key="autor"
                  style={menuItemHeaderStyles}
                  primaryText="Autores"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <Link to="/autor/novo" style={{ textDecoration: "none" }} key="autorNovo" >
                      <ListItem key={1} primaryText="Novo" style={subItemStyles}/>
                    </Link>,
                    <Link to="/autor/lista" style={{ textDecoration: "none" }} key="autorListar" >
                      <ListItem key={2} primaryText="Listar" style={subItemStyles}/>
                    </Link>,
                  ]}/>
              </List>

              <List>
                <ListItem
                  key="autor"
                  style={menuItemHeaderStyles}
                  primaryText="Rubricas"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <Link to="/rubrica/novo" style={{ textDecoration: "none" }} key="rubricaNovo" >
                      <ListItem key={1} primaryText="Nova" style={subItemStyles}/>
                    </Link>,
                    <Link to="/rubrica/lista" style={{ textDecoration: "none" }} key="rubricaListar" >
                      <ListItem key={2} primaryText="Listar" style={subItemStyles}/>
                    </Link>,
                  ]}/>
              </List>


              <Link to="/" style={{ textDecoration: "none" }} >
                <MenuItem style={menuItemStyles} onClick={this.handleClose}>Estoque</MenuItem>
              </Link>
              <Link to="/entrada" style={{ textDecoration: "none" }} >
                <MenuItem style={menuItemStyles} onClick={this.handleClose}>Entrada de Livros</MenuItem>
              </Link>

            </Drawer>
          </div>

          <div className="body">
            <Route exact path="/" component={Home} />
            <Route path="/entrada" component={Entrada} />
            <Route path="/local/novo" component={LocalAdd} />
            <Route path="/local/lista" component={LocalList} />
            <Route path="/autor/novo" component={AutorAdd} />
            <Route path="/autor/lista" component={AutorList} />
            <Route path="/rubrica/novo" component={RubricaAdd} />
            <Route path="/rubrica/lista" component={RubricaList} />
          </div>
        </div>
      </Router>
    );
  }
};

const menuItemStyles = {
  fontFamily: "Source Sans Pro",
  fontWeight: "bold",
  color: "#0c7563",
  paddingLeft: "2vw"
};

const menuItemHeaderStyles = {
  fontFamily: "Source Sans Pro",
  fontWeight: "bold",
  color: "#000000",
  opacity: "0.54",
  paddingLeft: "2vw",
};

const subItemStyles = {
  fontFamily: "Source Sans Pro",
  fontWeight: "bold",
  color: "#0c7563",
  paddingLeft: "3vw"
};

const mapStateToProps = (store) => {
  return {
    user: store.user
  }
}

export default connect(mapStateToProps)(Menu);
