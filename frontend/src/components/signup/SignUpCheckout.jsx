import React, { Component } from "react";
import { weeks, us_states } from "../../constants/constants";
import { Row, Col, Divider, Select, Switch } from "antd";
import Input from "../common/Input";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  StripeProvider,
  Elements,
  injectStripe
} from "react-stripe-elements";
import { Consumer } from "../App";
const Option = Select.Option;

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4"
        },
        padding
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

class _CheckoutForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      plan_type: "",
      number_of_dishes: "",
      price_shipping: "",
      price_weekly: "",
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      phone: "",
      special_instruction: "",
      error: false,
      first_name_error: "",
      last_name_error: "",
      address_1_error: "",
      city_error: "",
      phone_error: "",
      zipcode: "",
      zipcode_error: "",
      us_state: "New York",
      delivery_day: "Friday",
      billing_error: "",
      first_week_skip: false
    };
  }
  validateData() {
    let customer = this.state;
    customer.error = false;
    customer.first_name_error = false;
    customer.last_name_error = false;
    customer.address_1_error = false;
    customer.city_error = false;
    customer.phone_error = false;
    customer.zipcode_error = false;
    if (customer.first_name === "") {
      customer.first_name_error = "First Name is required.";
      customer.error = true;
    }
    if (customer.last_name === "") {
      customer.last_name_error = "Last Name is required.";
      customer.error = true;
    }
    if (customer.address_1 === "") {
      customer.address_1_error = "Address is required.";
      customer.error = true;
    }
    if (customer.city === "") {
      customer.city_error = "City is required.";
      customer.error = true;
    }
    if (customer.phone === "") {
      customer.phone_error = "Phone is required.";
      customer.error = true;
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
    customer.billing_error = "";
    if (customer.error) {
      this.setState({
        ...customer
      });
    } else {
      if (this.props.stripe) {
        this.props.stripe.createToken().then(payload => {
          var state = this.state;
          var token = payload;
          if (token.token) {
            state.stripe_token = token;
            delete state["card_number"];
            delete state["cvc"];
            delete state["expire_date"];
            delete state["delivery_day_input_style"];
            delete state["delivery_day_style"];
            delete state["zipcode_error"];
            delete state["error"];
            delete state["first_name_error"];
            delete state["last_name_error"];
            delete state["address_1_error"];
            delete state["city_error"];
            delete state["phone_error"];
            delete state["zipcode_error"];
            delete state["billing_error"];
            this.props.submitData(state);
          } else {
            state["billing_error"] = token.error.message;
            this.setState({
              ...state
            });
          }
        });
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
    }
  };
  handleChange(name, value) {
    let state = this.state;
    state[name] = value;
    this.setState({
      ...state
    });
  }
  componentWillMount() {
    const app_state = this.props.app_state;
    const email = app_state.user.get("email");
    const zipcode = app_state.user.get("zipcode");
    const plan_type = app_state.plan.get("plan_type");
    const number_of_dishes = app_state.plan.get("number_of_dishes");
    const price_shipping = app_state.plan.get("price_shipping");
    const price_weekly = app_state.plan.get("price_weekly");
    this.setState({
      email: email,
      zipcode: zipcode,
      plan_type: plan_type,
      number_of_dishes: number_of_dishes,
      price_shipping: price_shipping,
      price_weekly: price_weekly
    });
    this.props.AdjustHeader("checkout");
  }
  handleFirstSkip = () => {
    this.setState({
      first_week_skip: !this.state.first_week_skip
    })
  }
  render() {
    let email = this.state.email;
    let plan_type = "2 Persons"
    let first_week_skip_text = "Not Skipped"
    if (this.state.first_week_skip){
      first_week_skip_text = "Skipped"
    }
    if (this.state.plan_type === '1'){
      plan_type= "1 Person"
    }
    let number_of_dishes = this.state.number_of_dishes;
    let week = this.state.delivery_day;
    let date = "August 3";
    let price_weekly = this.state.price_weekly;
    let price_shipping = this.state.price_shipping;
    let price_total = price_weekly;
    if (price_shipping !== "FREE") {
      price_total = parseFloat(price_weekly) + parseFloat(price_shipping);
      price_total = price_total.toFixed(2)
      price_shipping = "$" + price_shipping;
    }
    price_weekly = "$" + this.state.price_weekly;
    price_total = "$" + price_total;
    let weeks_options = weeks.map(week => {
      return (
        <Option value={week} key={week}>
          {week}s
        </Option>
      );
    });
    let us_states_options = us_states.map(state => {
      return (
        <Option value={state} key={state}>
          {state}
        </Option>
      );
    });
    let error_display = "";
    if (this.state.billing_error) {
      error_display = (
        <div className="form_error">{this.state.billing_error}</div>
      );
    } else if (this.state.error) {
      error_display = (
        <div className="form_error">
          Please fill out the missing required fields highlighted below
        </div>
      );
    }
    return (
      <div className="checkout-wrapper">
        {error_display}
        <div className="checkout">
          <form onSubmit={this.handleSubmit} className="form">
            <Row gutter={32}>
              <Col lg={{ span: 16, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                <div className="title">Delivery Information</div>
                <Row gutter={8}>
                  <Col
                    sm={{ span: 12, offset: 0 }}
                    xs={{ span: 12, offset: 0 }}
                  >
                    <div className="form-item">
                      <span className="form-item__label">First Name</span>
                      <Input
                        type="text"
                        value={this.state.first_name}
                        handleChange={this.handleChange.bind(this)}
                        name="first_name"
                      />
                      <div className="form-item__error">
                        {this.state.first_name_error}
                      </div>
                    </div>
                  </Col>
                  <Col
                    sm={{ span: 12, offset: 0 }}
                    xs={{ span: 12, offset: 0 }}
                  >
                    <div className="form-item">
                      <span className="form-item__label">Last Name</span>
                      <Input
                        type="text"
                        value={this.state.last_name}
                        handleChange={this.handleChange.bind(this)}
                        name="last_name"
                      />
                      <div className="form-item__error">
                        {this.state.last_name_error}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col
                    sm={{ span: 12, offset: 0 }}
                    xs={{ span: 24, offset: 0 }}
                  >
                    <div className="form-item">
                      <span className="form-item__label">Address Line 1</span>
                      <Input
                        type="text"
                        value={this.state.address_1}
                        handleChange={this.handleChange.bind(this)}
                        name="address_1"
                      />
                      <div className="form-item__error">
                        {this.state.address_1_error}
                      </div>
                    </div>
                  </Col>
                  <Col
                    sm={{ span: 12, offset: 0 }}
                    xs={{ span: 24, offset: 0 }}
                  >
                    <div className="form-item">
                      <span className="form-item__label">
                        Address Line 2 (OPTIONAL){" "}
                      </span>
                      <Input
                        type="text"
                        value={this.state.address_2}
                        handleChange={this.handleChange.bind(this)}
                        name="address_2"
                      />
                    </div>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col
                    sm={{ span: 12, offset: 0 }}
                    xs={{ span: 24, offset: 0 }}
                  >
                    <div className="form-item">
                      <span className="form-item__label">City</span>
                      <Input
                        type="text"
                        value={this.state.city}
                        handleChange={this.handleChange.bind(this)}
                        name="city"
                      />
                      <div className="form-item__error">
                        {this.state.city_error}
                      </div>
                    </div>
                  </Col>
                  <Col sm={{ span: 6, offset: 0 }} xs={{ span: 12, offset: 0 }}>
                    <div className="form-item">
                      <span className="form-item__label">State</span>
                      <Select
                        size="large"
                        defaultValue="New York"
                        style={{ marginTop: 1 }}
                        onChange={this.handleChange.bind(this, "us_state")}
                      >
                        {us_states_options}
                      </Select>
                    </div>
                  </Col>
                  <Col sm={{ span: 6, offset: 0 }} xs={{ span: 12, offset: 0 }}>
                    <div className="form-item">
                      <span className="form-item__label">Zip</span>
                      <Input
                        type="text"
                        value={this.state.zipcode}
                        handleChange={this.handleChange.bind(this)}
                        name="zipcode"
                      />
                      <div className="form-item__error">
                        {this.state.zipcode_error}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col
                    sm={{ span: 12, offset: 0 }}
                    xs={{ span: 24, offset: 0 }}
                  >
                    <div className="form-item">
                      <span className="form-item__label">Phone Number</span>
                      <Input
                        type="text"
                        value={this.state.phone}
                        handleChange={this.handleChange.bind(this)}
                        name="phone"
                      />
                      <div className="form-item__error">
                        {this.state.phone_error}
                      </div>
                    </div>
                  </Col>
                  <Col
                    sm={{ span: 12, offset: 0 }}
                    xs={{ span: 24, offset: 0 }}
                  >
                    <div className="form-item">
                      <span className="form-item__label">
                        Special Instructions (OPTIONAL)
                      </span>
                      <Input
                        type="text"
                        value={this.state.special_instruction}
                        handleChange={this.handleChange.bind(this)}
                        name="special_instruction"
                      />
                    </div>
                  </Col>
                </Row>
                <div className="title">Billing Information</div>
                <Row gutter={8}>
                  <Col
                    sm={{ span: 15, offset: 0 }}
                    xs={{ span: 24, offset: 0 }}
                  >
                    <div className="form-item">
                      <span className="form-item__label">Card Number</span>
                      <span className="stripe">
                        Powered by <strong>stripe</strong>
                      </span>
                      <CardNumberElement
                        {...createOptions(this.props.fontSize)}
                      />
                    </div>
                  </Col>
                  <Col sm={{ span: 5, offset: 0 }} xs={{ span: 12, offset: 0 }}>
                    <div className="form-item">
                      <span className="form-item__label">Expiration</span>
                      <CardExpiryElement
                        {...createOptions(this.props.fontSize)}
                      />
                    </div>
                  </Col>
                  <Col sm={{ span: 4, offset: 0 }} xs={{ span: 12, offset: 0 }}>
                    <div className="form-item">
                      <span className="form-item__label">CVC</span>
                      <CardCVCElement {...createOptions(this.props.fontSize)} />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col
                lg={{ span: 8, offset: 0 }}
                xs={{ span: 24, offset: 0 }}
                className="order-summary"
              >
                <div className="title">Order Summary</div>
                <div className="info-box">
                  <div className="topic">Email</div>
                  <h4 className="content">{email}</h4>
                </div>
                <div className="info-box">
                  <div className="topic">Plan</div>
                  <h4 className="content">{plan_type}</h4>
                  <h4 className="content">{number_of_dishes} Dishes</h4>
                </div>
                <div className="info-box">
                  <div className="topic">Dietary Selections</div>
                  You will be able to indicate preferences and choose your meals
                  after checkout.
                </div>
                <div className="info-box">
                <div className="topic">Skip First Week Delivery.</div>
                <Switch onChange={this.handleFirstSkip}/> {first_week_skip_text}
                </div>
                <Divider />
                <div className="price_table">
                  <div className="cell">
                    <h4>Weekly Subtotal</h4>
                    <h4>Shipping</h4>
                    <h4>First Week Total</h4>
                  </div>
                  <div className="cell">
                    <h4>{price_weekly}</h4>
                    <h4>{price_shipping}</h4>
                    <h4>{price_total}</h4>
                  </div>
                </div>
                <center>Skip or cancel any time</center>
                <center>
                  <button type="submit" className="button button--blue">
                    {" "}
                    PLACE ORDER
                  </button>
                </center>
              </Col>
            </Row>
            <div className="terms">
              By clicking "Place Order & Choose Meals", you agree you are
              purchasing a continuous subscription and will receive weekly
              deliveries billed to your designated payment method until you
              cancel. Pricing is based on your plan choices. The plan prices are
              available in your Plan Settings page and are subject to change.
              You may cancel your subscription at any time by contacting{" "}
              <a href="/" target="_blank">
                Customer Support
              </a>
              . Any orders that have been processed, as reflected on your
              Upcoming page, cannot be cancelled. For more information see our{" "}
              <a href="/" target="_blank">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="/" target="_blank">
                FAQs
              </a>
              . You also agree you have read and consent to our updated{" "}
              <a href="/" target="_blank">
                Terms of Use
              </a>
              .
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const CheckoutForm = injectStripe(_CheckoutForm);

class CheckoutFormWrapper extends Component {
  render() {
    return (
      <Consumer>
        {app_state => (
          <CheckoutForm
            AdjustHeader={this.props.AdjustHeader}
            submitData={this.props.submitData}
            app_state={app_state.state}
          />
        )}
      </Consumer>
    );
  }
}

const Checkout = props => (
  <div className="Checkout">
    <Elements>
      <CheckoutFormWrapper
        AdjustHeader={props.AdjustHeader}
        submitData={props.submitData}
      />
    </Elements>
  </div>
);

const SignUpCheckoutApp = props => (
  <StripeProvider apiKey="pk_test_Ofv6CZA2cPoCLp4rLSQeFBhC">
    <Checkout AdjustHeader={props.AdjustHeader} submitData={props.submitData} />
  </StripeProvider>
);

export default SignUpCheckoutApp;
