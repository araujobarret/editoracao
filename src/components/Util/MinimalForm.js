import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import 'font-awesome/css/font-awesome.min.css';
import './MinimalForm.styles.css';

// fields
/*
  {
    type: text, dataSource, datePicker, number, checkBox,
    data: ,
    label: ,
    maxLength: ,
    errorMessage: ,
  }

*/

class MinimalForm extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);

    this.state = {
      currentIndex: 0,
      errorMessage: '',
    }

    this.fields = props.fields;
  }

  next = () => {
    if(this.state.currentIndex !== this.props.fields.length-1) {
      let index = this.state.currentIndex;
      if(this.refs.input.input.value.length >= 2) {
        this.fields[index]['value'] = this.refs.input.input.value;
        this.refs.input.input.value = "";
        this.setState({currentIndex: index+1, errorMessage: ""});
      }
      else {
        this.setState({ errorMessage: this.props.fields[index].errorMessage })
      }
    }
    else {
      // Check the last field and call save
      this.save();
    }
  }

  previous = () => {
    if(this.state.currentIndex !== 0) {
      this.refs.input.input.value = this.fields[this.state.currentIndex-1].value;
      this.setState({
        currentIndex: this.state.currentIndex-1,
        errorMessage: ""});
    }
  }

  // Last element trigger the onSubmit property
  save() {
    this.props.onSave();
  }

  renderItem = (index) => (
    <div className="minimalFormContainer">

      <strong className="label">{this.props.fields[index].label}</strong>

      <div className="inputContainer">
        <TextField
          ref='input'
          inputStyle={{color: "#2c3e50"}}
          underlineStyle={{borderColor: "#08aa8a"}}
          underlineFocusStyle={{borderColor: "#1abc9c"}}/>

        <div className="iconContainer" onClick={this.next}>
          <span className="fa fa-arrow-right iconNext"></span>
        </div>
      </div>
      <strong className="errorText">{this.state.errorMessage}</strong>
    </div>
  );

  renderBack = () => (
    <div className="iconContainer" onClick={this.previous}>
      <span className="fa fa-arrow-left iconNext"></span>
    </div>
  )

  renderPagination = () => (
    <div className="steps">
      { this.state.currentIndex != 0 ? this.renderBack() : null }
      <span>Step {this.state.currentIndex+1} of { this.props.fields.length } </span>
    </div>
  )

  render() {
    return (
      <section>
        {this.renderItem(this.state.currentIndex)}
        { this.props.showPagination ? this.renderPagination() : null}
      </section>
    );
  }
}

MinimalForm.defaultProps = {
  showPagination: true,
}

MinimalForm.propTypes = {
  fields: PropTypes.array.isRequired,
};

export default MinimalForm;
