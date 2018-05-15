import React, { Component } from 'react';
import * as Redux from 'react-redux';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

import * as actions from '../actions/UsuarioActions';
import './Login.styles.css';

// import { TOKEN_LOCAL_STORAGE } from '../constants/Api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.state = {
      errorEmail: '',
      errorSenha: '',
      isLoading: false,
      response: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    if (nextProps.usuario.erro !== '') {
      this.setState({ isLoading: false, response: nextProps.usuario.erro });
      dispatch(actions.erroLogin(''));
    } else if (nextProps.usuario.token !== '') {
      this.props.onAuth();
    }
  }

  onLogin() {
    if (this.refs.email.input.value.length < 8) {
      this.setState({ errorEmail: 'Email inválido' });
    } else if (this.refs.senha.input.value.length < 8) {
      this.setState({ errorSenha: 'A senha precisa ter no mínimo 8 dígitos' });
    } else {
      this.setState({ isLoading: true, errorEmail: '', errorSenha: '' });
      const { dispatch } = this.props;
      const login = this.refs.email.input.value;
      const senha = this.refs.senha.input.value;
      dispatch(actions.startLogin(login, senha));
    }
  }

  handleRequestClose = () => {
    this.setState({
      response: '',
    });
  };

  render() {
    return (
      <div className="editoracao-container">

        <div className="editoracao-container2">
          <div className="login-header">
            <span className="login-header-text">CONTROLE DE LIVROS</span>
          </div>

          <form onSubmit={this.onLogin}>
            {this.state.isLoading ? <LinearProgress mode="indeterminate" color="#F1BB5B" style={{ backgroundColor: '#0c7563' }} /> : null}

            <div className="form-row">
              <TextField
                ref="email"
                inputStyle={{ color: '#ffffff' }}
                errorStyle={{ color: '#ffffff' }}
                floatingLabelFocusStyle={{ color: '#ffffff' }}
                floatingLabelShrinkStyle={{ color: '#F1BB5B' }}
                floatingLabelStyle={{ color: '#fefefe' }}
                underlineFocusStyle={{ borderColor: '#F1BB5B' }}
                errorText={this.state.errorEmail}
                floatingLabelText="Email"
              />
            </div>

            <div className="form-row">
              <TextField
                ref="senha"
                type="password"
                inputStyle={{ color: '#ffffff' }}
                errorStyle={{ color: '#ffffff' }}
                floatingLabelFocusStyle={{ color: '#ffffff' }}
                floatingLabelShrinkStyle={{ color: '#F1BB5B' }}
                floatingLabelStyle={{ color: '#fefefe' }}
                underlineFocusStyle={{ borderColor: '#F1BB5B' }}
                errorText={this.state.errorSenha}
                floatingLabelText="Senha"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    this.onLogin();
                  }
                }}
              />
            </div>

            <div className="form-row">
              <RaisedButton
                label="Entrar"
                disabled={this.state.isLoading}
                style={{ marginBottom: '20px' }}
                onClick={() => this.onLogin()}
              />
            </div>

            <Snackbar
              open={this.state.response.length > 0}
              message={this.state.response}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  usuario: store.usuario,
});

Login.propTypes = {
  /* eslint react/forbid-prop-types: 0 */
  usuario: PropTypes.object.isRequired,
  dispatch: PropTypes.any.isRequired,
  onAuth: PropTypes.any.isRequired,
};


export default Redux.connect(mapStateToProps)(Login);
