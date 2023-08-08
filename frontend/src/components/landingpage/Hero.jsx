import React, { Component } from "react";
import { Input, Icon } from "antd";

class Hero extends Component {
  constructor() {
    super();
    this.state = {
      zipcode: ""
    };
  }
  enterZipcode() {
    if (this.state.zipcode) {
    }
  }
  textChange(e) {
    this.setState({
      zipcode: e.target.value
    });
  }
  render() {
    return (
      <div className="hero">
        <div className="content">
          <div className="hero-text">
            <div className="info-wrapper">
              <span className="title-primary">
                Get healthy mealplans from top restaurants & save health and
                money!
              </span>
            </div>
            <div className="input-wrapper">
              <Input
                placeholder="Enter your zipcode"
                onChange={this.textChange.bind(this)}
                addonAfter={
                  <Icon
                    type="search"
                    onClick={this.enterZipcode.bind(this)}
                    className="search-icon"
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero;
