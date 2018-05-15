import React, { Component } from 'react';
import { connect } from 'react-redux';

import Snackbar from 'material-ui/Snackbar';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

import { Loader } from '../util/Loader';
import Step1 from './Step1';
import Step2 from './Step2';
import './Entrada.styles.css';

class Entrada extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };
  }

  save = () => {}

  next = (data) => {
    let obj = { ...data };
    if (obj.step1) {
      this.setState({ step1: obj.step1, currentIndex: this.state.currentIndex + 1 });
    }
  }

  previous = () => {
    if(this.state.currentIndex > 0) {
      this.setState({ currentIndex: this.state.currentIndex - 1 });
    }
  }

  renderItem = () => {
    const components = [];
    switch (this.state.currentIndex) {
      case 0:
        components.push(<Step1 index={this.state.currentIndex} onNext={this.next} key="fieldKeyStep1" />);
        break;
      case 1:
        components.push(<Step2 index={this.state.currentIndex} onNext={this.next} onPrevious={this.previous} key="fieldKeyStep2" />);
        break;
      case 2:
        components.push(<Step1 />);
        break;
      default:
        return null;
    }
    return components;
  }

  render() {
    return (
      <section className="containerEntrada">

        <span className="title">Vamos registrar a entrada de livros :)</span>
        <br />

        <ReactCSSTransitionReplace transitionName="component" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          <section key={`keyIndex${this.state.currentIndex}`}>
            { this.renderItem() }
          </section>
        </ReactCSSTransitionReplace>
      </section>
    );
  }
}

export default connect()(Entrada);
