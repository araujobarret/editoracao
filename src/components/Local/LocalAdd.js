import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startGetLocais } from '../../actions/LocalActions';
import MinimalForm from '../util/MinimalForm';
import { Loader } from '../util/Loader';

class LocalAdd extends Component {

  constructor(props) {
    super(props);

    this.state = { isLoading: true, };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.local.locais) {
      this.setState({isLoading: false});
    }
  }

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch(startGetLocais());
  }

  save = () => {
    let {dispatch} = this.props;
    let {token} = this.props.usuario;
  }

  _renderForm() {
    if( this.state.isLoading ) {
      return <Loader />;
    }
    else {
      return (
        <MinimalForm
          onSave={this.save}
          fields={[
            {
              type: "datasource",
              allowNull: true,
              dataSource: this.props.local.locais,
              dataSourceConfig: { value: '_id', text: 'descricao' },
              label: "Este local está associado a algum outro local?",
              maxLength: 20,
            },
            {
              type: "text",
              label: "Qual o nome do local?",
              maxLength: 20,
              errorMessage: 'O nome do local deve ser preenchido'
            }
          ]}/>
      );
    }
  }

  render() {
    return (
      <section className="containerEntrada">
        <span className="title">Vamos adicionar um novo local!</span>
        { this._renderForm() }
      </section>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    usuario: store.usuario,
    local: store.local
  }
}

export default connect(mapStateToProps)(LocalAdd);
