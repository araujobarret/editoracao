import React, { Component } from 'react';
import * as Redux from 'react-redux';
import * as actions from '../actions/UsuarioActions';
import '../index.css';
import { TOKEN_LOCAL_STORAGE } from '../constants/Api';

class Login extends Component {
  constructor(props) {
      super(props);
      this.onLogin = this.onLogin.bind(this);
  }

  onLogin(e){
    e.preventDefault();
    let {dispatch} = this.props;
    let login = this.refs.login.value;
    let senha = this.refs.senha.value;
    dispatch(actions.startLogin(login, senha));
  }

  render() {
    return (
      <div className="editoracao-container">
        <div className="editoracao-container2">
          <div className="login-header">
            <span className="login-header-text">CONTROLE DE LIVROS</span>
          </div>

          <form onSubmit={this.onLogin}>
            <div className="form-row">
              <label for="login" className="users-form-element">Login</label>
              <input type="text" id="login" ref="login" />
            </div>

            <div className="form-row">
              <label for="senha" className="users-form-element">Senha</label>
              <input type="password" id="senha" ref="senha" />
            </div>

            <div className="form-row">
              <button className="users-btn users-btn-login">Entrar</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default Redux.connect()(Login);
