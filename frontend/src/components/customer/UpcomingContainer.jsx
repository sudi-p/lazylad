import React, { Component } from "react";
import UpcomingMenuView from "./UpcomingMenuView";
import { Container } from "flux/utils";
import CustomerUpcomingStore from "../../stores/customerUpcomingStore";
import CustomerActions from "../../actions/customerActions";
import "../styles/Customer.module.css";
import PropTypes from "prop-types";
import { Consumer } from "../App";

class Upcoming extends Component {
  constructor() {
    super();
    this.handleSkip = this.handleSkip.bind(this);
    this.changeDish = this.changeDish.bind(this);
    this.cancelDishChange = this.cancelDishChange.bind(this);
    this.handleUnskip = this.handleUnskip.bind(this);
    this.changeDishList = this.changeDishList.bind(this);
    this.saveDishChange = this.saveDishChange.bind(this);
  }
  static getStores() {
    return [CustomerUpcomingStore];
  }
  static calculateState() {
    const state = CustomerUpcomingStore.getState();
    return {
      status: state.get("status"),
      menus: state.get("menus"),
      dish_change_week_id: state.get("dish_change_week_id"),
      new_dish_list: state.get("new_dish_list")
    };
  }
  static contextTypes = {
    router: PropTypes.object
  };
  componentWillMount() {
    const email = this.props.app_state.user.get("email");
    CustomerActions.getUpcomingDishes(email, this.context.router.history);
  }
  handleSkip(weeklyorder_id) {
    const email = this.props.app_state.user.get("email");
    CustomerActions.handleSkip(email, weeklyorder_id);
  }
  handleUnskip(weeklyorder_id) {
    const email = this.props.app_state.user.get("email");
    CustomerActions.handleUnskip(email, weeklyorder_id);
  }
  cancelDishChange() {
    CustomerActions.cancelChangeDish();
  }
  saveDishChange(weeklyorder_id, dish_list) {
    CustomerActions.saveDishChange(
      this.props.app_state.user.get("email"),
      weeklyorder_id,
      dish_list
    );
  }
  changeDish(weeklyorder_id) {
    CustomerActions.changeDish(weeklyorder_id);
  }
  changeDishList(dish_list) {
    CustomerActions.changeDishList(dish_list);
  }
  componentDidMount() {
    CustomerActions.resetState();
  }
  render() {
    return (
      <UpcomingMenuView
        {...this.state}
        {...this.props}
        handleSkip={this.handleSkip}
        changeDish={this.changeDish}
        changeDishList={this.changeDishList}
        cancelDishChange={this.cancelDishChange}
        saveDishChange={this.saveDishChange}
        handleUnskip={this.handleUnskip}
      />
    );
  }
}

const UpcomingContainer = Container.create(Upcoming);

class UpcomingWrapper extends Component {
  render() {
    return (
      <Consumer>
        {app_state => <UpcomingContainer app_state={app_state.state} />}
      </Consumer>
    );
  }
}

export default UpcomingWrapper;
