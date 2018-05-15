import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import 'font-awesome/css/font-awesome.min.css';

import './Entrada.styles.css';

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      nf: '',
      ne: '',
      numeroProcesso: '',
      descricao: '',
      erroDate: '',
      erroNf: '',
      erroNe: '',
      erroNumeroProcesso: '',
    };
  }

  next = () => {
  }

  previous = () => {
    this.props.onPrevious();
  }

  renderPagination = () => (
    <div className="steps">
      <div className="iconContainer" onClick={this.previous}>
        <span className="fa fa-arrow-left iconNext" />
      </div>

      <span>Passo { this.props.index + 1 } de 2 </span>
    </div>
  )

  render() {
    const icon = this.props.index !== 1 ? <span className="fa fa-arrow-right iconNext" /> : <span className="fa fa-check iconNext" />;
    return (
      <section>
        <div className="inputContainer">
          <strong className="label labelNext">{this.props.index !== 1 ? 'PRÓXIMO' : 'SALVAR'}</strong>
          <div className="iconContainer" onClick={this.next}>
            { icon }
          </div>
        </div>

        { this.renderPagination() }
      </section>
    );
  }
}

Step2.propTypes = {
  /* eslint react/forbid-prop-types: 0 */
  index: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func,
};

export default Step2;
