const React = require('react');

let Login = React.createClass({
  onLogin: function(data){
    data.preventDefault();
  },
  render: function() {
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
});

module.exports = Login;
