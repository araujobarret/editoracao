import React, { Component } from 'react';
import { connect } from 'react-redux';

import MinimalForm from '../Util/MinimalForm';
import './Entrada.styles.css';

class Entrada extends Component {
  save = () => {
    console.log("Saving...");
  }
  render() {
    return (
      <section className="containerEntrada">
        <span className="title">Vamos começar com a entrada de livros :)</span>
        <br/>
        <MinimalForm
          onSave={this.save}
          fields={[
            {
              type: "text",
              label: "Qual o número da nota de empenho?",
              maxLength: 20,
              errorMessage: 'A nota de empenho deve ser preenchida'
            },
            {
              type: "text2",
              label: "Simple Component2",
              maxLength: 20,
              errorMessage: 'The simple component2 must have data'
            },
          ]}/>
      </section>
    );
  }
}

export default connect()(Entrada);
