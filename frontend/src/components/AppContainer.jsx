import React, { Component } from "react";
import { Container } from "flux/utils";
import AppActions from "../actions/appActions";
import AppStore from "../stores/appStore";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

class AppContainer extends Component {
  static getStores() {
    return [AppStore];
  }

  static calculateState(prevState, props) {
    const state = AppStore.getState();
    return {
      status: state.get("status"),
      user: state.get("user"),
      plan: state.get("plan"),
      signup_complete: state.get("signup_complete")
    };
  }
  componentWillMount() {
    if (document.cookie) {
      const cookie = document.cookie;
      const customer_id = cookie.slice(9, cookie.length);
      AppActions.getAppState(customer_id);
    }
  }
  render() {
    return (
      <BrowserRouter>
        <App {...this.state} />
      </BrowserRouter>
    );
  }
}

export default Container.create(AppContainer);
