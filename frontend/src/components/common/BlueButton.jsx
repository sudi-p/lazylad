import React, { Component } from 'react';
import '../styles/BlueButton.module.css';

class BlueButton extends Component{
  render(){
    const text = this.props.text;

    return(
      <div className="button button--blue">
        {text}
      </div>
    )
  }
}

export default BlueButton