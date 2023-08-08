import React, { Component } from "react";
import { Link } from "react-router-dom";
import Service from "./Service";
import SignUpForm from "./WelcomeForm";
import { StoreState } from "../../constants/StoreState.js";
import { Row, Col, Icon, Divider, Alert } from "antd";

class SignUpWelcome extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    if (this.props.app_state.user) {
      this.props.history.push("/signup/pricing/");
    } else {
      this.props.AdjustHeader("welcome");
    }
  }
  render() {
    const loading =
      this.props.data.status === StoreState.LOADING ? (
        <Icon type="loading" />
      ) : (
        ""
      );
    let signup_error = "";
    if (this.props.data.signup_error === "email_already_exists") {
      signup_error = (
        <Alert message="Username already used!!" type="error" showIcon />
      );
    } else if (this.props.data.signup_error === "invalid_data") {
      signup_error = <Alert message="Invalid Data!!" type="error" showIcon />;
    }
    return (
      <div className="signup">
        <div className="signup-body">
          <div className="signup-body_header">
            <h1 className="signup-body_header--primary">Get Started</h1>
            <h3 className="signup-body_header--secondary">
              Healthy Cooked Food delivered weekly to your home.
            </h3>
          </div>
          <Row style={{ maxWidth: 1170, margin: "auto" }}>
            <Col
              md={{ span: 10, offset: 2 }}
              xs={{ span: 16, offset: 4 }}
              className="signup_image"
            >
              <img
                alt="food"
                src="http://res.cloudinary.com/dtqxwjmwn/image/upload/v1527664282/dish.png"
              />
            </Col>
            <Col
              lg={{ span: 7, offset: 0 }}
              md={{ span: 10, offset: 0 }}
              xs={{ span: 20, offset: 2 }}
            >
              {signup_error}
              <SignUpForm
                handleSubmit={this.props.handleSubmit}
                loading={loading}
              />
              <Divider> or </Divider>
              <button className="button button--facebook">
                {" "}
                <Icon type="facebook" />
                SignUp with Facebook{" "}
              </button>
              Already a member? <Link to="/login">Log In</Link>
            </Col>
          </Row>
        </div>
        <div className="small-image">
          <img
            alt="food"
            src="http://res.cloudinary.com/dtqxwjmwn/image/upload/v1527664282/dish.png"
          />
        </div>
        <Service />
      </div>
    );
  }
}

export default SignUpWelcome;
