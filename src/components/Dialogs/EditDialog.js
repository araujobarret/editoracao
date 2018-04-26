import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class EditDialog extends PureComponent {
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
  }

  cancel = () => this.props.onCancel();

  save = () => {
    // Validation for each field if it is correctly filled
    this.props.onSave();
  }

  renderFields = () => {
    let items = [];
    for(let field of this.props.fields) {
      items.push(
        <TextField
          key={"inputKey_" + field.label}
          id={"inputId_" + field.label}
          value={field.value}
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

        {this.renderFields()}

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
