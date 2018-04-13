import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { startGetAutores } from '../../actions/AutorActions';
import { Loader } from '../util/Loader';

class AutorList extends Component {

  constructor(props) {
    super(props);

    this.state = { isLoading: true, };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.autor.autores) {
      this.setState({isLoading: false});
    }
  }

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch(startGetAutores());
  }

  _renderTable() {
    if( this.state.isLoading ) {
      return <Loader />;
    }
    else {
      const tableRows = this.props.autor.autores.map((autor) =>
        <TableRow key={autor._id} style={{border: "none"}}>
          <TableRowColumn style={text}>{ autor.nome }</TableRowColumn>
        </TableRow>
      );

      return (
        <Table style={{backgroundColor: "#1abc9c"}}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}  style={{border: "none"}}>
            <TableRow style={{border: "none"}}>
              <TableHeaderColumn style={header}>Nome do autor</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} >
            { tableRows }
          </TableBody>
        </Table>
      );
    }
  }

  render() {
    return (
      <section className="containerEntrada">
        { this._renderTable() }
      </section>
    );
  }
}

const text = {
  color: '#2c3e50',
  fontSize: '0.9em',
  fontRamily: 'Source Sans Pro',
};

const header = {
  ...text,
  color: '#ffffff',
  fontSize: '1.1em',
  fontWeight: 'normal',
};

const mapStateToProps = (store) => {
  return {
    autor: store.autor
  }
}

export default connect(mapStateToProps)(AutorList);
