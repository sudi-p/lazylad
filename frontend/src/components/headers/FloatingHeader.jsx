import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon, Divider } from "antd";
import { Consumer } from "../App";

import "../styles/HeaderSmall.module.css";

class FloatingHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      show_small_menu: false,
      user: false
    };
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
  }
  showMenu() {
    this.setState({
      show_small_menu: true
    });
  }
  hideMenu() {
    this.setState({
      show_small_menu: false
    });
  }
  render() {
    let small_header_style = this.state.show_small_menu
      ? { display: "block" }
      : { display: "none" };
    let conditional_text = "";
    let conditional_login = (
      <React.Fragment>
        <div className="menu-item">
          <NavLink
            to="/login/"
            className="menu-item_large"
            activeClassName="active_item"
          >
            <div onClick={this.hideMenu}>Log In</div>
          </NavLink>
        </div>
        <Divider />
      </React.Fragment>
    );
    if (this.props.user) {
      conditional_login = "";
      conditional_text = "Welcome Back!!";
    }
    let conditional_login_small = (
      <React.Fragment>
        <div className="menu-item">
          <NavLink
            to="/login/"
            className="menu-item_large"
            activeClassName="active_item"
          >
            <div onClick={this.hideMenu}>
              <button className="button button--facebook2">Log In</button>
            </div>
          </NavLink>
        </div>
        <Divider />
      </React.Fragment>
    );
    return (
      <React.Fragment>
        <div className="floating_header" id="floating_header">
          <div className="header">
            <div className="container">
              <div className="menu_items">
                <div className="menu_item">
                  <NavLink
                    to="/menu/"
                    className="header-item boxed-item"
                    activeClassName="active_item"
                  >
                    <div>
                      <span className="boxedText">Menu</span>
                    </div>
                  </NavLink>
                </div>
                <div className="menu_item">
                  <NavLink
                    to="/mealplans/"
                    className="header-item"
                    activeClassName="active_item"
                  >
                    <div>Meal Plans</div>
                  </NavLink>
                </div>
              </div>
              <center>
                <Link to="/">
                  <div className="redlentils">RedLentils</div>
                </Link>
              </center>
              <div className="menu_items">
                <div className="menu_item">
                  {conditional_login}
                  {conditional_text}
                </div>
                <div className="menu_item">
                  <NavLink
                    to="/signup/user/"
                    className="header-item"
                    activeClassName="active_item"
                  >
                    <div>Sign up</div>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header--smallnav">
          <div className="redlentils">
            <Link to="/">RedLentils</Link>
          </div>
          <Icon
            onClick={this.showMenu}
            type="menu-fold"
            className="hamburger"
          />
          <div style={small_header_style} className="header--small--wrapper">
            <div className="header--small">
              <div className="menu-item">
                <Icon
                  onClick={this.hideMenu}
                  type="close"
                  className="hamburger"
                />
                <span className="welcome">{conditional_text} </span>
              </div>
              <div className="menu-item">
                <NavLink
                  to="/menu/"
                  className="menu-item_large"
                  activeClassName="active_item"
                >
                  <div onClick={this.hideMenu}>Menu</div>
                </NavLink>
              </div>
              <Divider />
              <div className="menu-item">
                <NavLink
                  to="/mealplans/"
                  className="menu-item_large"
                  activeClassName="active_item"
                >
                  <div onClick={this.hideMenu}>Meal Plans</div>
                </NavLink>
              </div>
              <Divider />
              <div className="menu-item">
                <NavLink
                  to="/signup/user/"
                  className="menu-item_large"
                  activeClassName="active_item"
                >
                  <div onClick={this.hideMenu}>
                    <button className="button button--dark">SignUp</button>
                  </div>
                </NavLink>
              </div>
              <Divider />
              {conditional_login_small}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const FloatingHeaderWrapper = () => {
  return (
    <Consumer>{app_state => <FloatingHeader {...app_state.state} />}</Consumer>
  );
};

export default FloatingHeaderWrapper;
