import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Entrada.styles.css';

class Entrada extends Component {

  render() {
    return (
      <section className="containerEntrada">
        <span className="title">Vamos começar com a entrada de livros :)</span>
        <br/>
        <span className="question">Qual a Nota de Emepenho?</span>
      </section>
    );
  }
}

export default connect()(Entrada);
