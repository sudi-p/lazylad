import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Icon,
  Input,
  Button,
  Divider,
  Alert
} from 'antd';

const FormItem = Form.Item;

class SignUpForm extends Component{
  constructor(){
    super()
    this.state = {
      email: "",
      email_error: "",
      password: "",
      password_error: "",
      zipcode: "",
      zipcode_error: "",
      error: false,
    }
  }
  handleChange(name, e){
    let state = this.state
    state[name] = e.target.value
    this.setState({
      state: state
    })
  }
  validateData(){
    let customer = this.state
    customer.error = false
    customer.email_error = false
    customer.password_error = false
    customer.zipcode_error = false
    if(customer.email === ""){
      customer.email_error = "Email is required."
      customer.error = true
    }
    else{
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const valid_email = re.test(String(customer.email).toLowerCase());
      if (!valid_email){
        customer.email_error = "Valid Email is required."
        customer.error = true
      }
    }
    if (customer.password === ""){
      customer.password_error = "Password is required."
      customer.error = true
    }
    else{
      if (customer.password.length < 6){
        customer.password_error = "Password must be six characters or more."
        customer.error = true
      }
    }
    if (customer.zipcode === ""){
      customer.zipcode_error = "ZipCode is required."
      customer.error = true
    }
    else{
      let valid_zip = /^\d{5}(-\d{4})?$/.test(customer.zipcode);
      if (!valid_zip){
        customer.zipcode_error = "Valid ZipCode is required."
        customer.error = true
      }
    }
    return customer
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const customer = this.validateData()
    if (customer.error){
      this.setState({
        customer
      })
    }
    else{
      this.props.handleSubmit(this.state);
    }
  }
  render(){
    return (
      <Form onSubmit={this.handleSubmit} className="form">
        <div className="form-item">
          <span className="form-item__label">Email</span>
          <Input
            size="large"
            value= {this.state.email}
            onChange={this.handleChange.bind(this, "email")} />
          <div className="form-item__error">{this.state.email_error}</div>
        </div>
        <div className="form-item">
          <span className="form-item__label">Create a Password</span>
          <Input
            size="large"
            value= {this.state.password}
            onChange={this.handleChange.bind(this, "password")} />
          <div className="form-item__error">{this.state.password_error}</div>
        </div>
        <div className="form-item">
          <span className="form-item__label">Zipcode</span>
          <Input
            size="large"
            value= {this.state.zipcode}
            onChange={this.handleChange.bind(this, "zipcode")} />
          <div className="form-item__error">{this.state.zipcode_error}</div>
        </div>
        <p> 
          By clicking above, you agree to our <Link to="#">Terms of Use</Link> and consent to our <Link to="#">Privacy Policy</Link>
        </p>
        <FormItem>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="button"
          >
            <strong>Continue</strong>
          </Button>
        </FormItem>
      </Form>
    );
  }

}
const WrappedSignUpForm = Form.create()(SignUpForm);

class Service extends Component{
  render(){
    return(
      <Row className="services">
        <Col
          lg={{span:6 , offset:3}}
          md={{span:7 , offset:2}}
          xs={{span:24 , offset:0}}
        >
          <div className="box">
            <div className="icon-holder">
              <Icon type="book" /> 
            </div>
            <p className="service-header"> No Commitment </p>
            <p className="service-content">Get your delivery when it''s convenient for you.
            You may skip or cancel at any time.</p>
          </div>
        </Col>
        <Col
          lg={{span:6 , offset:0}}
          md={{span:7 , offset:0}}
          xs={{span:24 , offset:0}}
        >
          <div className="box">
            <div className="icon-holder">
              <Icon type="export" />
            </div>
            <p className="service-header">Personalized Menus</p>
            <p className="service-content">Tell us your dietary preferences and we''ll personalize the menus you receive.</p>
          </div>
        </Col>
        <Col
          lg={{span:6 , offset:0}}
          md={{span:7 , offset:0}}
          xs={{span:24 , offset:0}}
        >
          <div className="box">
            <div className="icon-holder">
              <Icon type="solution" />
            </div>
            <p className="service-header">Convenient Delivery</p>
            <p className="service-content">Ingredients are carefully packaged in a refrigerated box so food stays fresh even if you''re not home when we deliver.</p>
            
          </div>
        </Col>
      </Row>
    )    
  }
}

class SignUp extends Component{
  componentWillMount(){
    this.props.AdjustHeader("welcome")
  }
  render(){
    const signup_error = (this.props.data.signup_error)? <Alert message="Username already used!!" type="error" showIcon /> : ""
    return(
      <div className="signup">
        <div className="signup-body">
          <div className="signup-body_header">
            <h1 className="signup-body_header--primary">Get Started</h1>
            <h3 className="signup-body_header--secondary">Healthy Cooked Food delivered weekly to your home.</h3>
          </div>
          <Row style={{ maxWidth: 1170, margin: 'auto'}}>
            <Col md={{span:10 , offset:2}} xs={{span:16 , offset:4}} className="signup_image">
              <img alt="food" src="http://res.cloudinary.com/dtqxwjmwn/image/upload/v1527664282/dish.png"/>
            </Col>
            <Col lg={{ span:7, offset:0 }} md={{ span:10, offset:0 }} xs={{ span:20, offset:2 }}>
              {signup_error}
              <WrappedSignUpForm handleSubmit={this.props.handleSubmit}/>
              <Divider> or </Divider>

              <button className="button button--facebook"> <Icon type="facebook" />SignUp with Facebook </button>
              Already a member? <Link to ="/login">Log In</Link>
            </Col>
          </Row>
        </div>
        <div className="small-image">
          <img alt="food" src="http://res.cloudinary.com/dtqxwjmwn/image/upload/v1527664282/dish.png"/>
        </div>
        <Service /> 
      </div>
    );
  }
}

export default SignUp