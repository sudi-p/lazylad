import React, { Component } from 'react';
import{
	Input,
	Icon
} from 'antd';

class Hero extends Component{
  constructor(){
    super()
    this.state={
      'zipcode': ''
    }
  }
  enterZipcode(){
    if (this.state.zipcode){
      console.log("Hello")
    }
    console.log('Hi')
  }
  textChange(e){
    this.setState({
      'zipcode': e.target.value
    })
  }
  render(){
    return(
      <div className="hero">
      	<div className="cover-image">
          <div className="hero-text">
            <div className="info-wrapper">
              <span className="title-primary">Get healthy cooked meals delivered to your door.</span>
            </div> 
            <div className="input-wrapper">
              <div className="zipcode">Enter your zipcode</div>
              <Input onChange={this.textChange.bind(this)}addonAfter={<Icon type="search" onClick={this.enterZipcode.bind(this)}className="search-icon"/>} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero