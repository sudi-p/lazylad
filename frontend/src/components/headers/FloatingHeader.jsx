import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from 'antd';

import '../styles/FloatingHeader.module.css'

class FloatingHeader extends React.Component {
  constructor(){
    super()
    this.state={
      show_small_menu: false
    }
  }
  showMenu(){
    this.setState({
      show_small_menu: true
    })
  }
  hideMenu(){
    this.setState({
      show_small_menu: false
    })
  }
  render() {
    let small_menu_style = this.state.show_small_menu ? { display: 'block' } : { display: 'none' }
    return (
      <div className="floating_header">
        <div className="header">
          <div className="container">
            <div className="menu_items">
              <div className="menu_item">
                <NavLink to="/menu" className="header-item boxed-item" activeClassName="active_item">
                  <div><span className="boxedText">Menu</span></div>
                </NavLink>
              </div>
              <div className="menu_item">
                <NavLink to="/mealplans" className="header-item" activeClassName="active_item">
                  <div>Meal Plans</div>
                </NavLink>
              </div>
            </div>
            <center>
              <Link to="/">
                <div className="redlentils">
                  RedLentils
                </div>
              </Link>
            </center>
            <div className="menu_items">
              <div className="menu_item">
                <NavLink to="/login" className="header-item" activeClassName="active_item">
                  Log in
                </NavLink>
              </div>
              <div className="menu_item">
                <NavLink to="/signup" className="header-item" activeClassName="active_item">
                  <div>Sign up</div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="header-small">
          <div className="header-wrapper">
            <Link to="/">
              <div className="redlentils">
                RedLentils
              </div>
            </Link>
            <Icon onClick={this.showMenu.bind(this)} type="bars" className="menu-icon"/>
          </div>
          <div style={small_menu_style} className="container">
            <Icon onClick={this.hideMenu.bind(this)} type="close" className="close-button"/>
            <NavLink to="/menu" className="header-item boxed-item" activeClassName="active_item">
              <div><span className="boxedText">Menu</span></div>
            </NavLink>
            <NavLink to="/mealplans" className="header-item" activeClassName="active_item">
              <div>Meal Plans</div>
            </NavLink>
            <NavLink to="/login" className="header-item" activeClassName="active_item">
              Log in
            </NavLink>
            <NavLink to="/signup" className="header-item" activeClassName="active_item">
              <div>Sign up</div>
            </NavLink>
          </div>
        </div>
        <div className="header_spacer"/>
      </div>
    );
  }
};

export default FloatingHeader;
