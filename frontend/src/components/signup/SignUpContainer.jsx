import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "flux/utils";
import SignUpHeader from "../headers/SignUpHeader";
import SignUpWelcome from "./SignUpWelcome";
import SignUpPricing from "./SignUpPricing";
import SignUpCheckout from "./SignUpCheckout";
import SignUpActions from "../../actions/signUpActions";
import SignUpStore from "../../stores/signUpStore";
import PageNotFound from "../error/PageNotFound";
import PropTypes from "prop-types";
import { StoreState } from "../../constants/StoreState.js";
import { Consumer } from "../App";

import "../styles/SignUp.Module.css";

class SignUp extends Component {
  static getStores() {
    return [SignUpStore];
  }

  static calculateState(prevState, props) {
    const state = SignUpStore.getState();
    return {
      signup_error: state.get("signup_error"),
      loading: state.get("loading"),
      status: state.get("status")
    };
  }
  static contextTypes = {
    router: PropTypes.object
  };
  SignUpWelcomeRoute = () => {
    return (
      <SignUpWelcome
        handleSubmit={this.createCustomer.bind(this)}
        data={this.state}
        app_state={this.props}
        history={this.context.router.history}
        AdjustHeader={this.AdjustHeader.bind(this)}
      />
    );
  };
  SignUpPricingRoute = () => {
    return (
      <SignUpPricing
        app_state={this.props}
        AdjustHeader={this.AdjustHeader.bind(this)}
        selectPlan={this.selectPlan.bind(this)}
      />
    );
  };
  SignUpCheckoutRoute = () => {
    if (this.props.status === StoreState.READY) {
      return (
        <SignUpCheckout
          app_state={this.props}
          AdjustHeader={this.AdjustHeader.bind(this)}
          submitData={this.completeSignUp.bind(this)}
        />
      );
    } else {
      return <div>Loading</div>;
    }
  };
  selectPlan(plan) {
    SignUpActions.selectPlan(
      this.props.user.get("email"),
      plan,
      this.context.router.history
    );
  }

  completeSignUp(customer) {
    SignUpActions.completeSignUp(customer, this.context.router.history);
  }

  createCustomer(new_customer) {
    SignUpActions.createCustomer(new_customer, this.context.router.history);
  }

  AdjustHeader(value) {
    this.setState({
      signup_status: value
    });
  }

  render() {
    return (
      <Fragment>
        <SignUpHeader {...this.state} />
        <Switch>
          <Route path="/signup/user/" render={this.SignUpWelcomeRoute} />
          <Route path="/signup/pricing/" render={this.SignUpPricingRoute} />
          <Route path="/signup/checkout/" render={this.SignUpCheckoutRoute} />
          <Route component={PageNotFound} />
        </Switch>
      </Fragment>
    );
  }
}

const SignUpContainer = Container.create(SignUp);

const SignUpWrapper = () => {
  return (
    <Consumer>{app_state => <SignUpContainer {...app_state.state} />}</Consumer>
  );
};

export default SignUpWrapper;
