import React, { Component } from 'react';
import PropTypes from 'prop-types';


import ReactCSSTransitionReplace from 'react-css-transition-replace';
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
      value: '',
    }

    this.fields = props.fields;
  }

  next = () => {
    if(this.state.currentIndex !== this.props.fields.length-1) {
      let index = this.state.currentIndex;
      if(this.refs["input"+index].input.value.length >= 2) {
        this.fields[index]['value'] = this.refs["input"+index].input.value;
        this.refs["input"+index].input.value = "";
        this.setState({
          currentIndex: index+1,
          errorMessage: "",
          value: this.fields[index+1].value ? this.fields[index+1].value : '',
        });
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
    let index = this.state.currentIndex;
    if(this.state.currentIndex !== 0) {
      this.refs["input"+index].input.value = this.fields[index-1].value;
      this.setState({
        value: this.fields[index-1].value ? this.fields[index-1].value : '',
        currentIndex: this.state.currentIndex-1,
        errorMessage: ""});
    }
  }

  // Last element trigger the onSubmit property
  save() {
    let index = this.state.currentIndex;
    this.fields[index]['value'] = this.refs["input"+index].input.value;
    this.props.onSave();
  }

  renderItem = (index) => (
    <div className="minimalFormContainer" key={"fieldKey" + index}>

      <strong className="label">{this.props.fields[index].label}</strong>

      <div className="inputContainer">
        <TextField
          id="input"
          ref={"input" + index}
          value={this.state.value}
          onChange={(e) => this.setState({value: e.target.value})}
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
      <span>Passo {this.state.currentIndex+1} de { this.props.fields.length } </span>
    </div>
  )

  render() {
    return (
      <ReactCSSTransitionReplace transitionName="component" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        <section key={"keyIndex" + this.state.currentIndex}>
          {this.renderItem(this.state.currentIndex)}
          { this.props.showPagination ? this.renderPagination() : null}
        </section>
      </ReactCSSTransitionReplace>
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
