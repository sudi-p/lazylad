import React, { Component } from "react";
import Plans from "../common/Plans";
import PropTypes from "prop-types";

class Pricing extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  planSelect = (plan) => {
    localStorage.setItem("pricing", JSON.stringify(plan));
    this.context.router.history.push('signup/user')
  }
  render() {
    return (
      <section className="pricing">
        <div className="section_header">
          <span className="section_header--primary">Pricing</span>
        </div>
        <Plans planSelect={this.planSelect} />
      </section>
    );
  }
}

export default Pricing;
