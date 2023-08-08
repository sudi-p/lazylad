import React, { Component } from "react";
import "../styles/BlueButton.module.css";

class BlueButton extends Component {
  handleChange(name, e) {
    this.props.handleChange(name, e.target.value);
  }
  render() {
    return (
      <input
        type={this.props.type}
        value={this.props.value}
        className="input"
        onChange={this.handleChange.bind(this, this.props.name)}
      />
    );
  }
}

export default BlueButton;
