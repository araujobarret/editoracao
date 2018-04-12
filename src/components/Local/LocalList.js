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

import { startGetLocais } from '../../actions/LocalActions';
import { Loader } from '../util/Loader';

class LocalList extends Component {

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

  _renderItem = ({item}) => (
    <TableRow>
      <TableRowColumn>John Smith</TableRowColumn>
      <TableRowColumn>Employed</TableRowColumn>
    </TableRow>
  )

  _renderTable() {
    if( this.state.isLoading ) {
      return <Loader />;
    }
    else {
      const tableRows = this.props.local.locais.map((local) =>
        <TableRow key={local._id} style={{border: "none"}}>
          <TableRowColumn style={text}>{ local.descricao }</TableRowColumn>
          <TableRowColumn style={text}>{ local._idSubLocal ? local._idSubLocal.descricao : null }</TableRowColumn>
        </TableRow>
      );

      return (
        <Table style={{backgroundColor: "#1abc9c"}}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}  style={{border: "none"}}>
            <TableRow style={{border: "none"}}>
              <TableHeaderColumn style={header}>Local</TableHeaderColumn>
              <TableHeaderColumn style={header}>Local associado</TableHeaderColumn>
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
  color: '#576574',
  fontSize: '1.1em',
  fontWeight: 'bold',
};

const mapStateToProps = (store) => {
  return {
    local: store.local
  }
}

export default connect(mapStateToProps)(LocalList);
