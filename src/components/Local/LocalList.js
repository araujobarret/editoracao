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

import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';

import { startGetLocais } from '../../actions/LocalActions';
import { Loader } from '../util/Loader';
import EditDialog from '../Dialogs/EditDialog';

class LocalList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editDialogOpen: false,
      isLoading: true,
      autor: null,
      response: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    let {isLoading, response, editDialogOpen} = this.state

    if(nextProps.local.erro !== "") {
      isLoading = false;
      response = nextProps.local.erro;
    }
    else {
      if(nextProps.local.mensagem !== "") {
        isLoading = false;
        response = nextProps.local.mensagem;
        editDialogOpen = false;
      }
      else if(nextProps.local.locais) {
        isLoading = false;
      }
    }

    this.setState({isLoading, response, editDialogOpen});
  }

  componentDidMount() {
    let {dispatch} = this.props;
    dispatch(startGetLocais());
  }

  onSave = (local) => {
    let {dispatch} = this.props;
    
  }

  handleDialog = () => {
    this.setState({editDialogOpen: !this.state.editDialogOpen});
  }

  openEditDialog = (local) => {
    this.setState({editDialogOpen: true, local});
  }

  _renderTable() {
    if( this.state.isLoading ) {
      return <Loader />;
    }
    else {
      const tableRows = this.props.local.locais.map((local) =>
        <TableRow key={local._id} style={{borderColor: "#ffffff"}}>
          <TableRowColumn style={text}>{ local.descricao }</TableRowColumn>

          <TableRowColumn style={text}>{ local._idSubLocal ? local._idSubLocal.descricao : null }</TableRowColumn>

          <TableRowColumn style={{...text, ...actionText, overflow: "visible"}}>
            <div className="tooltipContainer">
              <IconButton tooltip="Editar Local" onClick={() => this.openEditDialog(local)}>
                <ModeEditIcon color={"#e2ecf7"} hoverColor={"#ffffff"}/>
              </IconButton>
              <IconButton tooltip="Apagar Local">
                <DeleteIcon color={"#ff5252"} hoverColor={"#ffbaba"}/>
              </IconButton>
            </div>
          </TableRowColumn>

        </TableRow>
      );

      return (
        <Table style={{backgroundColor: "#1abc9c"}}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}  style={{border: "none"}}>
            <TableRow style={{borderColor: "#ffffff"}}>

              <TableHeaderColumn style={header}>Descrição</TableHeaderColumn>
              <TableHeaderColumn style={header}>Local associado</TableHeaderColumn>
              <TableHeaderColumn style={{...header, ...actionText}}>Ações</TableHeaderColumn>

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

        <EditDialog visible={this.state.editDialogOpen} title="Autor"
          onCancel={() => this.setState({editDialogOpen: false})} onSave={(local) => this.onSave(local)}
          id={this.state.local ? this.state.local._id : null}
          fields={[
            {
              label: "Descrição",
              minLength: 5,
              paramName: "descricao",
              value: this.state.local ? this.state.local.descricao : null,
              type: "text"
            },
            {
              label: "Local Associado",
              allowNull: true,
              minLength: 5,
              paramName: "_idSubLocal",
              value: this.state.local ? this.state.local._idSubLocal : null,
              type: "datasource",
              dataSource: this.props.local.locais,
              dataSourceConfig: { value: '_id', text: 'descricao' }
            }
          ]} />

        <Snackbar
          open={this.state.response.length > 0}
          message={this.state.response}
          autoHideDuration={2000}
          onRequestClose={() => this.setState({response: ''})}
        />
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
    local: store.local
  }
}

export default connect(mapStateToProps)(LocalList);
