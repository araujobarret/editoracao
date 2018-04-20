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
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';

import { startGetAutores } from '../../actions/AutorActions';
import { Loader } from '../util/Loader';

class AutorList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editDialogOpen: false,
      isLoading: true,
      autor: null
    };

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

  onRowSelected = (row) => {
    //row[0]
  }

  handleDialog = () => {
    this.setState({editDialogOpen: !this.state.editDialogOpen});
  }

  openEditDialog = (autor) => {
    this.setState({editDialogOpen: true, autor});
  }

  _renderTable() {
    if( this.state.isLoading ) {
      return <Loader />;
    }
    else {
      const tableRows = this.props.autor.autores.map((autor) =>
        <TableRow key={autor._id} style={{borderColor: "#ffffff", overflow: "visible"}}>
          <TableRowColumn style={text}>{ autor.nome }</TableRowColumn>
          <TableRowColumn style={{...text, ...actionText, overflow: "visible"}}>
            <div className="tooltipContainer">
              <IconButton tooltip="Editar Autor" onClick={() => this.openEditDialog(autor)}>
                <ModeEditIcon color={"#e2ecf7"} hoverColor={"#ffffff"}/>
              </IconButton>
              <IconButton tooltip="Apagar Autor">
                <DeleteIcon color={"#ff5252"} hoverColor={"#ffbaba"}/>
              </IconButton>
            </div>
          </TableRowColumn>
        </TableRow>
      );

      return (
        <Table style={{backgroundColor: "#1abc9c", overflow: "visible"}}
          onRowSelection={this.onRowSelected} wrapperStyle={{paddingBottom: "20px", height: "88%"}}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{border: "none"}}>
            <TableRow style={{borderColor: "#ffffff"}}>
              <TableHeaderColumn style={header}>Nome do autor</TableHeaderColumn>
              <TableHeaderColumn style={{...header, ...actionText}}>Ações</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} style={{overflow: "visible", paddingBottom: "40px"}}>
            { tableRows }
          </TableBody>
        </Table>
      );
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={this.handleDialog}
      />,
      <FlatButton
        label="Salvar"
        primary={true}
        onClick={this.handleDialog}
      />,
    ];

    return (
      <section className="containerTable">
        { this._renderTable() }

        <Dialog
          title="Autor"
          actions={actions}
          modal={true}
          open={this.state.editDialogOpen}>

          <TextField
            id="input"
            value={this.state.autor.nome}
            onChange={(e) => this.setState({autor: { ...this.state.autor, nome: e.target.value} })}
            inputStyle={{color: "#2c3e50"}}/>

        </Dialog>
      </section>
    );
  }
}

const text = {
  color: '#2c3e50',
  fontSize: '0.9em',
  fontRamily: 'Source Sans Pro',
};

const actionText = {
  textAlign: "right"
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
