import React, { Component } from "react";

class Input extends Component {
  handleChange(e, name) {
    this.props.handleChange(name, e.target.value);
  }
  render() {
    return (
      <input
        type={this.props.type}
        value={this.props.value}
        className="input"
        onChange={e => this.handleChange(e, this.props.name)}
      />
    );
  }
}

export default Input;
