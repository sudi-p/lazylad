import React, { Component } from "react";
import { Container } from "flux/utils";
import CustomerCurrentStore from "../../stores/customerCurrentStore";
import CustomerActions from "../../actions/customerActions";
import CurrentView from "./CurrentView";
import "../styles/Customer.module.css";
import PropTypes from "prop-types";
import { Consumer } from "../App";

class Current extends Component {
  static getStores() {
    return [CustomerCurrentStore];
  }
  static calculateState() {
    const state = CustomerCurrentStore.getState();
    return {
      status: state.get("status"),
      menu: state.get("menu")
    };
  }
  static contextTypes = {
    router: PropTypes.object
  };
  componentWillMount() {
    const email = this.props.app_state.user.get("email");
    CustomerActions.getCurrentDishes(email, this.context.router.history);
  }
  render() {
    return (
      <React.Fragment>
      <CurrentView {...this.state}/>
      </React.Fragment>
    );
  }
}

const CurrentContainer = Container.create(Current);

class CurrentWrapper extends Component {
  render() {
    return (
      <Consumer>
        {app_state => <CurrentContainer app_state={app_state.state} />}
      </Consumer>
    );
  }
}

export default CurrentWrapper;
