import React, { Component } from "react";
import { Container } from "flux/utils";
import LogInView from "./LogInView";

import LogInActions from "../actions/logInActions";
import LogInStore from "../stores/logInStore";

class LogInContainer extends Component {
  static getStores() {
    return [LogInStore];
  }
  static calculateState(prevState, props) {
    const state = LogInStore.getState();
    return {
      login_error: state.get("login_error")
    };
  }
  componentDidMount() {
    this.setState({
      login_error: ""
    });
  }
  handleSubmit(login_data) {
    console.log(login_data)
    LogInActions.login(login_data, this.props.history);
  }
  render() {
    return (
      <LogInView handleSubmit={this.handleSubmit.bind(this)} {...this.state} />
    );
  }
}

export default Container.create(LogInContainer);
