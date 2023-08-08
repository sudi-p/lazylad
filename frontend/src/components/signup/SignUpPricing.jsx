import React, { Component } from "react";
import PropTypes from "prop-types";

import Plans from "../common/Plans";

class SignUpPricing extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    let pricing = JSON.parse(localStorage.getItem("pricing"))
    if (pricing){
      localStorage.removeItem("pricing")
      this.props.selectPlan(pricing)
    }
    else{
      this.props.AdjustHeader("pricing");
    }
  }

  planSelect(plan) {
    this.props.selectPlan(plan);
  }

  render() {
    return <Plans planSelect={this.planSelect.bind(this)} />;
  }
}

export default SignUpPricing;
