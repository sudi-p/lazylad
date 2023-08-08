import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Divider } from "antd";
import PropTypes from "prop-types";
import { Consumer } from "../App";

import CustomerActions from "../../actions/customerActions";

import "../styles/CustomerHeader.module.css";

class CustomerHeader extends Component {
  constructor() {
    super();
    this.state = {
      customer_name: "",
      show_small_header: false
    };
    this.showSmallHeader = this.showSmallHeader.bind(this);
    this.hideSmallHeader = this.hideSmallHeader.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object
  };
  logout = () => {
    CustomerActions.logout(this.context.router.history);
  };
  showSmallHeader() {
    this.setState({
      show_small_header: true
    });
  }
  hideSmallHeader() {
    this.setState({
      show_small_header: false
    });
  }
  componentWillMount() {
    let customer_name = this.props.user.get("first_name");
    this.setState({
      customer_name: customer_name
    });
  }
  componentWillReceiveProps(nextProps) {
    let customer_name = nextProps.user.get("first_name");
    this.setState({
      customer_name: customer_name
    });
  }
  render() {
    let customer_name = this.state.customer_name;
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <NavLink to="/account/settings/subscriptions">Account Settings</NavLink>
        </Menu.Item>
        <Menu.Item key="1">
          <NavLink to="/account/deliveryHistory">Delivery History</NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/">How To Recycle</NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/">Help Center</NavLink>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="4">
          <span onClick={this.logout} className="logout">
            Log Out
          </span>
        </Menu.Item>
      </Menu>
    );
    let small_header_style = {
      display: "none"
    };
    if (this.state.show_small_header) {
      small_header_style = {
        display: "block"
      };
    }
    return (
      <React.Fragment>
        <div className="customer_header--wrapper">
          <div className="customer_header">
            <div className="container">
              <Link to="/account/current">
                <div className="logo" />
              </Link>
              <div className="menu-wrapper">
                <div className="menu-items">
                  <div className="menu-item">
                    <NavLink
                      to="/account/current"
                      className="header-item"
                      activeClassName="active_item"
                    >
                      <div>Current</div>
                    </NavLink>
                  </div>
                  <div className="menu-item">
                    <NavLink
                      to="/account/upcoming/"
                      className="header-item"
                      activeClassName="active_item"
                    >
                      <div>Upcoming</div>
                    </NavLink>
                  </div>
                </div>
                <div className="menu-items menu-items--right">
                  <Dropdown overlay={menu} className="header-dropdown">
                    <p>
                      {customer_name} <Icon type="down" />
                    </p>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header--smallnav">
          <div className="redlentils">
            <Link to="/account/current">RedLentils</Link>
          </div>
          <Icon
            onClick={this.showSmallHeader}
            type="menu-fold"
            className="hamburger"
          />
          <div style={small_header_style} className="header--small--wrapper">
            <div className="header--small">
              <div className="menu-item">
                <Icon
                  onClick={this.hideSmallHeader}
                  type="close"
                  className="hamburger"
                />
                <span className="welcome">Welcome, {customer_name} </span>
              </div>
              <Divider />
              <div className="menu-item">
                <NavLink
                  to="/account/upcoming/"
                  className="menu-item_large"
                  activeClassName="active_item"
                >
                  <div onClick={this.hideSmallHeader}>Upcoming</div>
                </NavLink>
              </div>
              <Divider />
              <div className="menu-item">
                <NavLink
                  to="/account/settings"
                  className="menu-item_small"
                  activeClassName="active_item"
                >
                  <div onClick={this.hideSmallHeader}>Account Settings</div>
                </NavLink>
              </div>
              <div className="menu-item">
                <NavLink
                  to="/account/deliveryHistory"
                  className="menu-item_small"
                  activeClassName="active_item"
                >
                  <div onClick={this.hideSmallHeader}>Delivery History</div>
                </NavLink>
              </div>
              <div className="menu-item">
                <NavLink
                  to="/recycle"
                  className="menu-item_small"
                  activeClassName="active_item"
                >
                  <div onClick={this.hideSmallHeader}>How To Recycle</div>
                </NavLink>
              </div>
              <div className="menu-item">
                <NavLink
                  to="/help"
                  className="menu-item_small"
                  activeClassName="active_item"
                >
                  <div onClick={this.hideSmallHeader}>Help Center</div>
                </NavLink>
              </div>
              <div className="menu-item">
                <span onClick={this.logout} className="menu-item_small">
                  Log Out
                </span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class CustomerHeaderWrapper extends Component {
  render() {
    return (
      <Consumer>
        {app_state => <CustomerHeader {...app_state.state} />}
      </Consumer>
    );
  }
}

export default CustomerHeaderWrapper;
