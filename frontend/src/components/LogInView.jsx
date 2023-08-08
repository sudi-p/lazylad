import React, { Component } from "react";
import Input from "./common/Input";
import { Form, Checkbox, Divider, Icon } from "antd";
import "./styles/LogIn.Module.css";

class LogInForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      email_error: "",
      password: "",
      password_error: "",
      remember: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  onCheckChange() {
    let state = this.state;
    state["remember"] = !state["remember"];
    this.setState({
      state
    });
  }
  handleChange(name, value) {
    let state = this.state;
    state[name] = value;
    this.setState(state => state);
  }
  validateData() {
    let customer = this.state;
    customer.error = false;
    customer.email_error = "";
    customer.password_error = "";
    if (customer.email === "") {
      customer.email_error = "Email is required.";
      customer.error = true;
    } else {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const valid_email = re.test(String(customer.email).toLowerCase());
      if (!valid_email) {
        customer.email_error = "Valid Email is required.";
        customer.error = true;
      }
    }
    if (customer.password === "") {
      customer.password_error = "Password is required.";
      customer.error = true;
    }
    return customer;
  }
  handleSubmit = e => {
    e.preventDefault();
    const customer = this.validateData();
    if (customer.error) {
      this.setState({
        customer
      });
    } else {
      this.props.handleSubmit(this.state);
    }
  };
  render() {
    let error_display = "";
    if (this.props.login_error) {
      error_display = (
        <div className="form_error">Invalid email or password</div>
      );
    }
    return (
      <div className="login-wrapper">
        <div className="login">
          <div className="login--title">Log In </div>
          {error_display}
          <form onSubmit={this.handleSubmit} className="form">
            <div className="form-item">
              <span className="form-item__label">Email</span>
              <Input
                type="text"
                value={this.state.email}
                handleChange={this.handleChange}
                name="email"
              />
              <div className="form-item__error">{this.state.email_error}</div>
            </div>
            <div className="form-item">
              <span className="form-item__label">Password</span>
              <Input
                type="password"
                value={this.state.password}
                handleChange={this.handleChange}
                name="password"
              />
              <div className="form-item__error">
                {this.state.password_error}
              </div>
            </div>
            <div className="form-item">
              <Checkbox onChange={this.onCheckChange.bind(this)}>
                Remember Me?
              </Checkbox>
              <div className="forgot">
                <a href="/login">Forgot Password?</a>
              </div>
            </div>
            <center>
              <button type="submit" className="button button--blue">
                {" "}
                LogIn
              </button>
            </center>
          </form>
          <Divider> or </Divider>
          <button className="button button--facebook2">
            <Icon type="facebook" /> Log in with facebook
          </button>
        </div>
      </div>
    );
  }
}
const WrappedLogInForm = Form.create()(LogInForm);

export default WrappedLogInForm;
