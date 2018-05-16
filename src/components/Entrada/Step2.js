import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';

import 'font-awesome/css/font-awesome.min.css';

import './Entrada.styles.css';

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      livro: null,
    };
  }

  next = () => {
    const data = {
      step2: {
        livro: this.state.livro,
        quantidade: 0,
        valor: 0.00,
      },
    };
    this.props.onNext(data);
  }

  previous = () => {
    this.props.onPrevious();
  }

  renderPagination = () => (
    <div className="steps">
      <div className="iconContainer" onClick={this.previous}>
        <span className="fa fa-arrow-left iconNext" />
      </div>

      <span>Passo { this.props.index + 1 } de 3 </span>
    </div>
  )

  render() {
    const icon = this.props.index !== 2 ? <span className="fa fa-arrow-right iconNext" /> : <span className="fa fa-check iconNext" />;

    return (
      <section>
        <div className="inputContainer">
          <AutoComplete
            searchText={this.state.value}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleNewRequest}
            filter={AutoComplete.fuzzyFilter}
            openOnFocus
            maxSearchResults={10}
            dataSource={this.props.livros}
            dataSourceConfig={{ value: '_id', text: 'titulo' }}
            inputStyle={{ color: '#2c3e50' }}
            underlineStyle={{ borderColor: '#08aa8a' }}
            underlineFocusStyle={{ borderColor: '#1abc9c' }}
            floatingLabelFocusStyle={{ color: '#fefefe' }}
            floatingLabelStyle={{ color: '#2c3e50' }}
            floatingLabelText="Livro"
          />
          <TextField
            value={this.state.quantidade}
            onChange={(e) => {
              if (e.target.value.toString().length <= 4) {
                this.setState({ quantidade: e.target.value });
              }
            }}
            style={{ marginLeft: '20px', marginRight: '20px' }}
            inputStyle={{ color: '#2c3e50' }}
            underlineStyle={{ borderColor: '#08aa8a' }}
            underlineFocusStyle={{ borderColor: '#1abc9c' }}
            floatingLabelFocusStyle={{ color: '#fefefe' }}
            floatingLabelStyle={{ color: '#2c3e50' }}
            floatingLabelText="Quantidade"
            type="number"
          />
          <TextField
            value={this.state.valor}
            onChange={(e) => {
              // validation of decimal part
              if (e.target.value.toString().length <= 10) {
                if (e.target.value.toString().indexOf('.') !== -1) {
                  const parts = e.target.value.toString().split('.');
                  if (parts[1].length <= 2) {
                    this.setState({ valor: e.target.value });
                  }
                } else {
                  this.setState({ valor: e.target.value });
                }
              }
            }}
            inputStyle={{ color: '#2c3e50' }}
            underlineStyle={{ borderColor: '#08aa8a' }}
            underlineFocusStyle={{ borderColor: '#1abc9c' }}
            floatingLabelFocusStyle={{ color: '#fefefe' }}
            floatingLabelStyle={{ color: '#2c3e50' }}
            floatingLabelText="Valor Unitário"
            type="number"
            maxLength="10"
          />

          <IconButton tooltip="Adicionar livro" style={{ marginLeft: '20px', marginTop: '20px' }}>
            <AddCircleIcon color="#ff5252" hoverColor="#ffbaba" />
          </IconButton>
        </div>

        <div className="inputContainer">
          <strong className="label labelNext">{this.props.index !== 2 ? 'PRÓXIMO' : 'SALVAR'}</strong>
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
  livros: PropTypes.array.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func,
};

export default Step2;
