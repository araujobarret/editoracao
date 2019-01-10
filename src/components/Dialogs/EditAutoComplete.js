import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

export default class EditAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }
  render() {
    return (
      <AutoComplete
        floatingLabelText={this.props.field.label}
        key={`inputKey_${this.props.field.label}`}
        id={`inputId_${this.props.field.label}`}
        searchText={this.state.value ? this.state.value[this.state.dataSourceConfig.text] : ''}
        onNewRequest={(chosenOne) => {
          this.props.field.value[this.props.field.dataSourceConfig.text] = chosenOne[this.props.field.label.text];
          this.props.field.value[this.props.field.dataSourceConfig.value] = chosenOne[this.props.field.label.value];
          this.props.onNewRequest(this.props.field, this.props.index);
          this.setState({ value: this.props.field.value[this.state.dataSourceConfig.text] });
        }}
        onUpdateInput={(searchText) => {
          if (this.state.value) {
            this.state.value[this.props.field.dataSourceConfig.text] = searchText;
          } else {
            this.state.value = {};
            this.state.value[this.props.field.dataSourceConfig.text] = searchText;
          }
          this.props.onUpdateInput(this.props.field, this.props.index);
        }}
        filter={AutoComplete.fuzzyFilter}
        openOnFocus
        maxSearchResults={10}
        dataSource={this.props.field.dataSource}
        dataSourceConfig={this.props.field.dataSourceConfig}
      />
    );
  }
}
