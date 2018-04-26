import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class EditDialog extends Component {
  constructor(props) {
    super(props);

    this.actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={this.cancel}
      />,
      <FlatButton
        label="Salvar"
        primary={true}
        onClick={this.save}
      />,
    ];

    this.state = {
      ...props.fields
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps.fields});
  }

  cancel = () => this.props.onCancel();

  save = () => {
    // Validation for each field if it is correctly filled    
    this.props.onSave(this.state);
  }

  renderFields = () => {
    let items = [];

    for(let i = 0; i < this.props.fields.length; i++) {
      items.push(
        <TextField
          floatingLabelText={Object.values(this.state)[i].label}
          value={Object.values(this.state)[i].value}
          onChange={(e) => {
            let fields = this.state;
            fields[i].value = e.target.value;
            this.setState({...fields});
          }}
          key={"inputKey_" + this.props.fields[i].label}
          id={"inputId_" + this.props.fields[i].label}
          inputStyle={{color: "#2c3e50"}}/>
      )
    }
    return items;
  }

  render() {
    return (
      <Dialog
        title={this.props.title}
        actions={this.actions}
        modal={true}
        open={this.props.visible}>

        <div className="container">
          {this.renderFields()}
        </div>

      </Dialog>
    )
  }
}

EditDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired
};

export default EditDialog;
