import React, { Component } from "react";
import { Affix, Icon } from "antd";
import SkipModal from "./SkipModal";
import BillModal from "./BillModal.jsx";
import { Consumer } from "../App";

const ArrivalInformation = props => (
  <div className="arrival-information">
    <div className="arrival_icon">
      <Icon
        type={props.arrival_icon_type}
        className={props.arrival_icon_class}
      />
    </div>
    <div>
      <span className="arrival_status">{props.arrival_status}</span>
      <span className="arrival_week">
        Week Of {props.plan_week_month} {props.plan_week_day}
      </span>
    </div>
  </div>
);

class SkippedMenuOptions extends Component {
  constructor() {
    super();
    this.handleUnskip = this.handleUnskip.bind(this);
  }
  handleUnskip() {
    this.props.handleUnskip(this.props.weeklyorder_id);
  }
  render() {
    return (
      <button onClick={this.handleUnskip} className="button button--dark">
        <strong>Unskip</strong>
      </button>
    );
  }
}

class UnskippedMenuOptions extends Component {
  constructor() {
    super();
    this.state = {
      skip_modal_visible: false,
      bill_modal_visible: false
    };
    this.showBillModal = this.showBillModal.bind(this);
    this.handleSkipOk = this.handleSkipOk.bind(this);
    this.handleSkipCancel = this.handleSkipCancel.bind(this);
    this.handleBillModalOk = this.handleBillModalOk.bind(this);
    this.showSkipModal = this.showSkipModal.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    this.changeDish = this.changeDish.bind(this);
  }
  showSkipModal = () => {
    this.setState({
      skip_modal_visible: true
    });
  };
  handleSkipOk(weeklyorder_id) {
    this.handleSkip(weeklyorder_id);
    this.setState({
      skip_modal_visible: false
    });
  }
  handleSkipCancel() {
    this.setState({
      skip_modal_visible: false
    });
  }
  showBillModal = () => {
    this.setState({
      bill_modal_visible: true
    });
  };
  handleBillModalOk() {
    this.setState({
      bill_modal_visible: false
    });
  }
  handleSkip(weeklyorder_id) {
    this.props.handleSkip(weeklyorder_id);
  }
  changeDish() {
    this.props.changeDish(this.props.weeklyorder_id);
  }
  render() {
    let subtotal = 54.46;
    let shipping = 2;
    return (
      <React.Fragment>
        <div onClick={this.changeDish} className="button button--dark">
          Change Dish
        </div>
        <div onClick={this.showSkipModal} className="button button--light">
          Skip This Delivery
        </div>
        <div onClick={this.showBillModal} className="button button--light">
          <Icon type="wallet" />
        </div>
        <SkipModal
          visible={this.state.skip_modal_visible}
          weeklyorder_id={this.props.weeklyorder_id}
          handleOk={this.handleSkipOk}
          plan_week_day={this.props.plan_week_day}
          plan_week_month={this.props.plan_week_month}
          handleCancel={this.handleSkipCancel}
        />
        <BillModal
          visible={this.state.bill_modal_visible}
          next_date={this.props.next_date}
          subtotal={subtotal}
          shipping={shipping}
          handleOk={this.handleBillModalOk}
        />
      </React.Fragment>
    );
  }
}

class NormalMenuHeader extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    this.setState({
      visible: false
    });
  };
  render() {
    let menu = this.props.menu;
    let plan_week_year = menu.get("week_start_date").slice(0, 3);
    let plan_week_month = menu.get("week_start_date").slice(5, 7);
    let plan_week_day = menu.get("week_start_date").slice(8, 10);
    let plan_date = new Date(plan_week_year, plan_week_month, plan_week_day);
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    plan_week_month = months[parseInt(plan_week_month, 10) - 1];
    let next_date = new Date();
    next_date.setDate(plan_date.getDate() + 7);
    let arrival_status = "Arrives";
    let arrival_icon_type = "check";
    let arrival_icon_class = "arrival_icon arrival_icon--check";
    let options = (
      <UnskippedMenuOptions
        handleSkip={this.props.handleSkip}
        changeDish={this.props.changeDish}
        dish_change_week_id={this.props.dish_change_week_id}
        app_state={this.props.app_state}
        handleShowBill={this.handleShowBill}
        next_date={next_date}
        plan_week_month={plan_week_month}
        plan_week_day={plan_week_day}
        weeklyorder_id={menu.get("id")}
      />
    );
    if (menu.get("skipped")) {
      arrival_status = "Skipped";
      arrival_icon_type = "close";
      arrival_icon_class = "arrival_icon arrival_icon--close";
      options = (
        <SkippedMenuOptions
          handleUnskip={this.props.handleUnskip}
          weeklyorder_id={menu.get("id")}
        />
      );
    }
    let weeklymenu_header = (
      <React.Fragment>
        <ArrivalInformation
          arrival_icon_type={arrival_icon_type}
          arrival_icon_class={arrival_icon_class}
          arrival_status={arrival_status}
          plan_week_month={plan_week_month}
          plan_week_day={plan_week_day}
        />
        <div className="menu-header--options">
          <div className="menu-header--optionswrapper">{options}</div>
        </div>
      </React.Fragment>
    );
    return (
      <React.Fragment>
        <div className="menu-header--large">
          <Affix offsetTop={78}>
            <div className="menu-header-wrapper">{weeklymenu_header}</div>
          </Affix>
        </div>
        <div className="menu-header--small">{weeklymenu_header}</div>
      </React.Fragment>
    );
  }
}

class DishChangeActiveHeader extends Component {
  constructor() {
    super();
    this.state = {
      dish_list: []
    };
    this.cancelDishChange = this.cancelDishChange.bind(this);
    this.saveDishChange = this.saveDishChange.bind(this);
  }
  cancelDishChange() {
    this.props.cancelDishChange();
  }
  saveDishChange() {
    this.props.saveDishChange(
      this.props.dish_change_week_id,
      this.props.dish_list
    );
  }
  render() {
    const customer_number_of_dishes = this.props.app_state.plan.get(
      "number_of_dishes"
    );
    const number_of_dishes_selected = this.props.dish_list.length;
    let save_button_wrapper = {};
    if (number_of_dishes_selected !== parseInt(customer_number_of_dishes, 10)) {
      save_button_wrapper = {
        zIndex: "99",
        pointerEvents: "none",
        opacity: "0.5"
      };
    }
    return (
      <React.Fragment>
        <div className="menu-header--large">
          <Affix offsetTop={78}>
            <div className="menu-header--change">
              Select {customer_number_of_dishes} dishes.
              <div className="menu-header--options">
                <div className="menu-header--optionstext">
                  {number_of_dishes_selected} Dishes Selected.
                </div>
                <div
                  onClick={this.cancelDishChange}
                  className="button cancel-button"
                >
                  Cancel
                </div>
                <div>
                  <div
                    style={save_button_wrapper}
                    onClick={this.saveDishChange}
                    className="button save-button"
                  >
                    Save
                  </div>
                </div>
              </div>
            </div>
          </Affix>
        </div>
        <div className="menu-header menu-header--small">
          <Affix offsetTop={0}>
            <div className="menu-header--change">
              <p>Select {customer_number_of_dishes} dishes.</p>
              <div className="menu-header--options">
                <div className="menu-header--optionstext">
                  {number_of_dishes_selected} Dishes Selected.
                </div>
                <div
                  onClick={this.cancelDishChange}
                  className="button cancel-button"
                >
                  Cancel
                </div>
                <div style={save_button_wrapper}>
                  <div
                    onClick={this.saveDishChange}
                    className="button save-button"
                  >
                    Save
                  </div>
                </div>
              </div>
            </div>
          </Affix>
        </div>
      </React.Fragment>
    );
  }
}

class MenuHeader extends Component {
  constructor() {
    super();
    this.handleSkip = this.handleSkip.bind(this);
    this.handleUnskip = this.handleUnskip.bind(this);
  }
  handleSkip(id) {
    this.props.handleSkip(id);
  }
  handleUnskip(id) {
    this.props.handleUnskip(id);
  }
  render() {
    let header = (
      <NormalMenuHeader
        handleUnskip={this.handleUnskip}
        handleSkip={this.handleSkip}
        {...this.props}
      />
    );
    if (this.props.dish_change_week_id) {
      if (this.props.dish_change_week_id === this.props.menu.get("id"))
        header = <DishChangeActiveHeader {...this.props} />;
    }
    return <React.Fragment>{header}</React.Fragment>;
  }
}

class MenuHeaderWrapper extends Component {
  render() {
    return (
      <Consumer>
        {app_state => (
          <MenuHeader {...this.props} app_state={app_state.state} />
        )}
      </Consumer>
    );
  }
}

export default MenuHeaderWrapper;
