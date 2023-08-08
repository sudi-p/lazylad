import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Footer.module.css";
import { Row, Col, Icon } from "antd";

import "../styles/FloatingHeader.module.css";

class Help extends Component {
  render() {
    return (
      <ul>
        <li>
          <NavLink to="/">Help Center</NavLink>
        </li>
        <li>
          <NavLink to="/">Service Areas</NavLink>
        </li>
        <li>
          <NavLink to="/">Contect Support</NavLink>
        </li>
        <li>
          <NavLink to="/">Privacy & Terms</NavLink>
        </li>
      </ul>
    );
  }
}

class LazyLad extends Component {
  render() {
    return (
      <ul>
        <li>
          <NavLink to="/">How It Works</NavLink>
        </li>
        <li>
          <NavLink to="/">New York</NavLink>
        </li>
        <li>
          <NavLink to="/">Our Resturants</NavLink>
        </li>
        <li>
          <NavLink to="/">Our Cooks</NavLink>
        </li>
      </ul>
    );
  }
}

class Services extends Component {
  render() {
    return (
      <ul>
        <li>
          <NavLink to="/">Order Foods</NavLink>
        </li>
        <li>
          <NavLink to="/">Hire A Cook</NavLink>
        </li>
      </ul>
    );
  }
}

class JoinUs extends Component {
  render() {
    return (
      <div>
        <div className="social">
          <NavLink to="/">
            <Icon className="social_icon" type="facebook" />
          </NavLink>
          <NavLink to="/">
            <Icon className="social_icon" type="twitter" />
          </NavLink>
          <NavLink to="/">
            <Icon className="social_icon" type="youtube" />
          </NavLink>
          <NavLink to="/">
            <Icon className="social_icon" type="google" />
          </NavLink>
        </div>
      </div>
    );
  }
}

class LandingFooter extends React.Component {
  constructor() {
    super();
    this.state = {
      footer_list: {
        help_style: { display: "none" },
        help: "hidden",
        lazylad_style: { display: "none" },
        lazylad: "hidden",
        service_style: { display: "none" },
        service: "hidden"
      }
    };
  }
  helpStyle() {
    const style = this.state.footer_list;
    if (style.help === "hidden") {
      style.help_style = { display: "block" };
      style.help = "shown";
    } else {
      style.help_style = { display: "none" };
      style.help = "hidden";
    }
    this.setState({
      footer_list: style
    });
  }
  lazyladStyle() {
    const style = this.state.footer_list;
    if (style.lazylad === "hidden") {
      style.lazylad_style = { display: "block" };
      style.lazylad = "shown";
    } else {
      style.lazylad_style = { display: "none" };
      style.lazylad = "hidden";
    }
    this.setState({
      footer_list: style
    });
  }
  serviceStyle() {
    const style = this.state.footer_list;
    if (style.service === "hidden") {
      style.service_style = { display: "block" };
      style.service = "shown";
    } else {
      style.service_style = { display: "none" };
      style.service = "hidden";
    }
    this.setState({
      footer_list: style
    });
  }
  render() {
    let help_style = this.state.footer_list.help_style;
    let lazylad_style = this.state.footer_list.lazylad_style;
    let service_style = this.state.footer_list.service_style;
    return (
      <footer className="footer">
        <div className="wrapper">
          <Row className="footer--large">
            <Col lg={{ span: 4, offset: 4 }} md={{ span: 5, offset: 3 }}>
              <h3 className="footer_title">Help</h3>
              <Help />
            </Col>
            <Col lg={{ span: 4, offset: 0 }} md={{ span: 5, offset: 0 }}>
              <h3 className="footer_title">LazyLad</h3>
              <LazyLad />
            </Col>
            <Col lg={{ span: 4, offset: 0 }} md={{ span: 5, offset: 0 }}>
              <h3 className="footer_title">Services</h3>
              <Services />
            </Col>
            <Col lg={{ span: 4, offset: 0 }} md={{ span: 5, offset: 0 }}>
              <h3 className="footer_title">JoinUs</h3>
              <JoinUs />
            </Col>
          </Row>
          <div className="footer--small">
            <div onClick={this.helpStyle.bind(this)} className="footer__title">
              Help
              <Icon type="down" />
            </div>
            <div style={help_style}>
              <Help />
            </div>
            <div
              onClick={this.lazyladStyle.bind(this)}
              className="footer__title"
            >
              LazyLad
              <Icon type="down" />
            </div>
            <div style={lazylad_style}>
              <LazyLad />
            </div>
            <div
              onClick={this.serviceStyle.bind(this)}
              className="footer__title"
            >
              Services
              <Icon type="down" />
            </div>
            <div style={service_style}>
              <Services />
            </div>
            <div style={{ marginTop: 10 }}>
              <JoinUs />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default LandingFooter;
