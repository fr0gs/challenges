import React, { Component } from 'react';
import './InputArticle.css';

class InputArticle extends React.Component {

  constructor(props) {
    super(props);

    this.searchString = this.props.searchString;

    this.state = {
      inputText: "Tell me what to search.."
    }
  }

  _onChange(evt) {
    this.setState({
      inputText: evt.target.value
    });
  }

  _onKeyPress(e) {
    if (e.charCode === 13) {
      this.searchString(this.state.inputText);
    }
  }

  _clearState() {
    if (this.state.inputText === "Tell me what to search..") {
      this.setState({
        inputText: ""
      });
    }
  }

  render() {
    return (
      <div className="wrap center">
        <div className="wrap-label">
           <label for="name">Search in wikipedia</label>
           <p className="iconicfill-pen-alt2"></p>
        </div>
        <input
          className="input-article"
          type="text"
          value={this.state.inputText}
          onChange={this._onChange.bind(this)}
          onKeyPress={this._onKeyPress.bind(this)}
          onClick={this._clearState.bind(this)}
        />
      </div>
    );
  }
};

export default InputArticle;
