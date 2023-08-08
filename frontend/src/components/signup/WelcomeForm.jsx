import React, { Component } from "react";
import Input from "../common/Input";
import { Link } from "react-router-dom";
import { Button } from "antd";

class WelcomeForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      email_error: "",
      password: "",
      password_error: "",
      zipcode: "",
      zipcode_error: "",
      error: false,
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(name, value) {
    let state = this.state;
    state[name] = value;
    this.setState({
      ...state
    });
  }
  validateData() {
    let customer = this.state;
    customer.error = false;
    customer.email_error = "";
    customer.password_error = "";
    customer.zipcode_error = "";
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
    } else {
      if (customer.password.length < 6) {
        customer.password_error = "Password must be six characters or more.";
        customer.error = true;
      }
    }
    if (customer.zipcode === "") {
      customer.zipcode_error = "ZipCode is required.";
      customer.error = true;
    } else {
      let valid_zip = /^\d{5}(-\d{4})?$/.test(customer.zipcode);
      if (!valid_zip) {
        customer.zipcode_error = "Valid ZipCode is required.";
        customer.error = true;
      }
    }
    return customer;
  }
  handleSubmit = e => {
    e.preventDefault();
    const customer = this.validateData();
    if (customer.error) {
      this.setState({
        ...customer
      });
    } else {
      this.props.handleSubmit(this.state);
    }
  };
  componentWillMount() {
    //if (sessionStorage.getItem('pricing') && localStorage.getItem('user')){
    //  history.push("/signup/checkout/");
    //}
    //else if (!sessionStorage.getItem('pricing') && localStorage.getItem('user')){
    //  history.push("/signup/pricing/");
    //}
  }
  render() {
    return (
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
          <span className="form-item__label">Create a Password</span>
          <Input
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            name="password"
          />
          <div className="form-item__error">{this.state.password_error}</div>
        </div>
        <div className="form-item">
          <span className="form-item__label">Zipcode</span>
          <Input
            type="text"
            value={this.state.zipcode}
            handleChange={this.handleChange}
            name="zipcode"
          />
          <div className="form-item__error">{this.state.zipcode_error}</div>
        </div>
        <p>
          By clicking above, you agree to our <Link to="#">Terms of Use</Link>{" "}
          and consent to our <Link to="#">Privacy Policy</Link>
        </p>
        <div className="form-item">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="button"
          >
            <strong>Continue {this.props.loading}</strong>
          </Button>
        </div>
      </form>
    );
  }
}

export default WelcomeForm;
