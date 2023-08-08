import React from "react";
import { Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";
import { Layout } from "antd";
import { StyleVariable } from "../../constants/styleVariables";
import "../styles/AppHeader.module.css";

const { Sider } = Layout;

// The Header creates links that can be used to navigate
// between routes.
class Header extends React.Component {
  render() {
    const menuStyle = {
      backgroundColor: "#3B4047",
      fontFamily: StyleVariable.font_primary
    };
    const sideBarStyle = {
      overflow: "auto",
      height: "100vh",
      position: "fixed",
      left: 0,
      backgroundColor: "#3B4047"
    };
    const menuItemStyle = {
      fontSize: "14px",
      "letter-spacing": "1px",
      "text-transform": "uppercase"
    };

    return (
      <Sider style={sideBarStyle} className="header">
        <div className="title">LazyLad</div>
        <nav>
          <Menu
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            style={menuStyle}
          >
            <Menu.Item key="overview" style={menuItemStyle}>
              <NavLink to="/" className="nav-text">
                <Icon type="area-chart" />
                <span>Overview</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="dishes" style={menuItemStyle}>
              <NavLink to="/dishes" className="nav-text">
                <Icon type="pie-chart" />
                <span>Dishes</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="payments" style={menuItemStyle}>
              <NavLink to="/payments" className="nav-text">
                <Icon type="wallet" />
                <span>Orders</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="customers" style={menuItemStyle}>
              <NavLink to="/customers" className="nav-text">
                <Icon type="user" />
                <span>Customers</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="complaints" style={menuItemStyle}>
              <NavLink to="/complaints" className="nav-text">
                <Icon type="message" />
                <span>Complaints</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="settings" style={menuItemStyle}>
              <NavLink to="/settings" className="nav-text">
                <Icon type="setting" />
                <span>Setting</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </nav>
      </Sider>
    );
  }
}

export default Header;
