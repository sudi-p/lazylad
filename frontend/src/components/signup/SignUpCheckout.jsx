import React, { Component } from 'react';
import { weeks, us_states } from '../../constants/constants';
import {
  Row,
  Col,
  Divider,
  Select,
} from 'antd';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  StripeProvider,
  Elements,
  injectStripe,
} from 'react-stripe-elements';
const Option = Select.Option;

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding,
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};


class _CheckoutForm extends Component{
  constructor(){
    super();
    this.state = {
      'email': "",
      'password': "",
      'plan_type':"",
      'number_of_dishes':"",
      'price_shipping':"",
      'price_weekly':"",
      'first_name':'',
      'last_name':'',
      'address_1':'',
      'address_2':'',
      'city':'',
      'phone':'',
      'special_instructions':'',
      'error':false,
      'first_name_error':'',
      'last_name_error':'',
      'address_1_error':'',
      'city_error':'',
      'phone_error':'',
      'zipcode': "",
      'zipcode_error': "",
      'us_state': "New York",
      'delivery_day': 'Friday',
      'delivery_day_style': {},
      'delivery_day_input_style' : { display: "none"},
    }
  }
  validateData(){
    let customer = this.state
    customer.error = false
    customer.first_name_error = false
    customer.last_name_error = false
    customer.address_1_error = false
    customer.city_error = false
    customer.phone_error = false
    customer.zipcode_error = false
    if(customer.first_name === ""){
      customer.first_name_error = "First Name is required."
      customer.error = true
    }
    if (customer.last_name === ""){
      customer.last_name_error = "Last Name is required."
      customer.error = true
    }
    if (customer.address_1 === ""){
      customer.address_1_error = "Address is required."
      customer.error = true
    }
    if (customer.city === ""){
      customer.city_error = "City is required."
      customer.error = true
    }
    if (customer.phone === ""){
      customer.phone_error = "Phone is required."
      customer.error = true
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
  handleSubmit= (e) =>{
    e.preventDefault(); 
    const customer = this.validateData()
    if (customer.error){
      this.setState({
        customer
      })
    }
    else{
      if (this.props.stripe) {
        this.props.stripe
          .createToken()
          .then((payload) =>{
            var state = this.state
            var token = payload
            state.token = token
            delete state['card_number']
            delete state['cvc']
            delete state['expire_date']
            delete state['delivery_day_input_style']
            delete state['delivery_day_style']
            delete state['zipcode_error']
            delete state['state']
            this.props.submitData(state);
          }); 
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
      
    }
  }
  handleDayChange(selected_day){
    this.setState({
      delivery_day: selected_day
    })
  }
  delivery_day_toggle(){
    this.setState({
      delivery_day_style: { display: "none"},
      delivery_day_input_style: {}
    })
  }
  handleUSStateChange(us_state){
    this.setState({
      us_state: us_state
    })
  }
  handleChange(name, e){
    let state = this.state
    state[name] = e.target.value
    this.setState({
      state: state
    })
  }
  componentWillMount(){
    if (sessionStorage.getItem('pricing')){
      let user = JSON.parse(sessionStorage.getItem('user'))
      let pricing = JSON.parse(sessionStorage.getItem('pricing'))
      this.setState({
        email: user.email,
        password: user.password,
        zipcode: user.zipcode,
        plan_type: pricing.price.plan_type,
        number_of_dishes: pricing.price.number_of_dishes,
        price_shipping: pricing.price.price_shipping,
        price_weekly: pricing.price.price_weekly,
      })
      this.props.AdjustHeader("checkout")
    }
    else{
      window.location.href = "/signup/"
    }
  }
  render(){
    let email = this.state.email
    let plan_type = this.state.plan_type
    let number_of_dishes = this.state.number_of_dishes
    let week = this.state.delivery_day
    let date = "August 3"
    let price_weekly = this.state.price_weekly
    let price_shipping = this.state.price_shipping
    let price_total = price_weekly
    if(price_shipping !== "FREE"){
      price_total = parseFloat(price_weekly) + parseFloat(price_shipping)
      price_total = price_total.toFixed(2)
      price_shipping = "$" + price_shipping
    }
    price_weekly = "$" + price_weekly
    price_total = "$" + price_total
    let delivery_day_style = this.state.delivery_day_style
    let delivery_day_input_style = this.state.delivery_day_input_style
    let weeks_options = weeks.map((week)=> {
      return(
        <Option value={week} key={week}>{week}s</Option>
      )
    })
    let us_states_options = us_states.map((state)=> {
      return(
        <Option value={state} key={state}>{state}</Option>
      )
    })
    return (
      <div className="checkout">
        <form onSubmit={this.handleSubmit} className="form">
          <Row gutter={32}>
            <Col
              lg={{span:16 , offset:0}}
              xs={{span:24 , offset:0}}
            >
              <div className="title">Delivery Information</div>
              <Row gutter={8}>
                <Col
                  sm={{span:12 , offset:0}}
                  xs={{span:12 , offset:0}}
                >
                  <div className="form-item">
                    <span className="form-item__label">First Name</span>
                    <input
                      type="text"
                      value= {this.state.first_name}
                      onChange={this.handleChange.bind(this, "first_name")} />
                    <div className="form-item__error">{this.state.first_name_error}</div>
                  </div>
                </Col>
                <Col
                  sm={{span:12 , offset:0}}
                  xs={{span:12 , offset:0}}
                >
                  <div className="form-item">
                   <span className="form-item__label">Last Name</span>
                    <input
                      type="text"
                      value= {this.state.last_name}
                      onChange={this.handleChange.bind(this, "last_name")} />
                    <div className="form-item__error">{this.state.last_name_error}</div>
                  </div>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col
                  sm={{span:12 , offset:0}}
                  xs={{span:24 , offset:0}}
                >
                  <div className="form-item">
                  <span className="form-item__label">Address Line 1</span>
                  <input
                      type="text"
                      value= {this.state.address_1}
                      onChange={this.handleChange.bind(this, "address_1")} />
                    <div className="form-item__error">{this.state.address_1_error}</div>
                  </div>
                </Col>
                <Col
                  sm={{span:12 , offset:0}}
                  xs={{span:24 , offset:0}}
                >
                  <div className="form-item">
                    <span className="form-item__label">Address Line 2 (OPTIONAL) </span>
                    <input
                      type="text"
                      value= {this.state.address_2}
                      onChange={this.handleChange.bind(this, "address_2")} />
                  </div>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col
                  sm={{span:12 , offset:0}}
                  xs={{span:24 , offset:0}}
                >
                  <div className="form-item">
                    <span className="form-item__label">City</span>
                    <input
                      type="text"
                      value= {this.state.city}
                      onChange={this.handleChange.bind(this, "city")} />
                    <div className="form-item__error">{this.state.city_error}</div>
                  </div>
                </Col>
                <Col
                  sm={{span:6 , offset:0}}
                  xs={{span:12 , offset:0}}
                >
                  <div className="form-item">
                    <span className="form-item__label">State</span>
                    <Select
                      size="large"
                      defaultValue="New York"
                      style={{ marginTop: 1 }}
                      onChange={this.handleUSStateChange.bind(this)}
                    >
                      {us_states_options}
                    </Select>
                  </div>
                </Col>
                <Col
                  sm={{span:6 , offset:0}}
                  xs={{span:12 , offset:0}}
                >
                  <div className="form-item">
                    <span className="form-item__label">Zip</span>
                    <input
                      type="text"
                      value= {this.state.zipcode}
                      onChange={this.handleChange.bind(this, "zipcode")} />
                    <div className="form-item__error">{this.state.zipcode_error}</div>

                  </div>
                </Col>
                
              </Row>
              <Row gutter={8}>
                <Col
                  sm={{span:12 , offset:0}}
                  xs={{span:24 , offset:0}}
                >
                  <div className="form-item">
                    <span className="form-item__label">Phone Number</span>
                    <input
                      type="text"
                      value= {this.state.phone}
                      onChange={this.handleChange.bind(this, "phone")} />
                    <div className="form-item__error">{this.state.phone_error}</div>
                  </div>
                </Col>
                <Col
                  sm={{span:12 , offset:0}}
                  xs={{span:24 , offset:0}}
                >
                  <div className="form-item">
                    <span className="form-item__label">Special Instructions (OPTIONAL)</span>
                    <input
                      type="text"
                      value= {this.state.special_instructions}
                      onChange={this.handleChange.bind(this, "special_instructions")} />
                  </div>
                </Col>
              </Row>
              <div className="title">Billing Information</div>
              <Row gutter={8}>
                <Col
                  sm={{span:15 , offset:0}}
                  xs={{span:24 , offset:0}}
                >
                  <div className="form-item">
                    <span className="form-item__label">Card Number</span>
                    <span className="stripe">Powered by <strong>stripe</strong></span>
                    <CardNumberElement
                      {...createOptions(this.props.fontSize)}
                    />
                  </div>
                </Col>
                <Col
                  sm={{span:5 , offset:0}}
                  xs={{span:12 , offset:0}}
                >
                  <div className="form-item">
                    <span className="form-item__label">Expiration</span>
                    <CardExpiryElement
                    {...createOptions(this.props.fontSize)}
                    />
                  </div>
                </Col>
                <Col
                  sm={{span:4 , offset:0}}
                  xs={{span:12 , offset:0}}
                >
                  <div className="form-item">
                    <span className="form-item__label">CVC</span>
                    <CardCVCElement
                      {...createOptions(this.props.fontSize)}
                    />
                  </div>
                </Col>
              </Row> 
            </Col>
            <Col
              lg={{span:8 , offset:0}}
              xs={{span:24 , offset:0}}
              className="order-summary"
            >
              <div className="title">Order Summary</div>
              <div className="info-box">
                <div className="topic">
                  Email
                </div>
                <h4 className="content">{email}</h4>
              </div>
              <div className="info-box">
                <div className="topic">Plan</div>
                <h4 className="content">{plan_type}</h4>
                <h4 className="content">{number_of_dishes} Dishes</h4>
              </div>
              <div className="info-box">
              <div className="topic">Dietary Selections</div>
              You will be able to indicate preferences and choose your meals after checkout.
              </div>
              <div className="info-box">
                <div className="topic">
                  Weekly Delivery Day
                  <span style={delivery_day_style} onClick={this.delivery_day_toggle.bind(this)} className="change">Change</span>
                </div>
                <div style={delivery_day_style} className="delivery_day">
                  <p>{week} deliveries</p>
                  First delivery on {week},{date}
                </div>
                <div style={delivery_day_input_style} className="delivery_day_input">
                  <Select
                    defaultValue="Fridays"
                    style={{ paddingTop: 3 }}
                    onChange={this.handleDayChange.bind(this)}>
                    {weeks_options}
                  </Select>
                </div>
              </div>
              <Divider />
              <div className="price_table">
                <div className="cell">
                  <h4>Weekly Meal Subtotal</h4>
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
                  <button type="submit" className="blue_button"> PLACE ORDER</button>
                </center>
            </Col>
          </Row>
          <div className="terms">
            By clicking "Place Order & Choose Meals", you agree you are purchasing a continuous subscription and will receive weekly deliveries billed to your designated payment method until you cancel. Pricing is based on your plan choices. The plan prices are available in your Plan Settings page and are subject to change. You may cancel your subscription at any time by contacting <a href="/" target="_blank">Customer Support</a>. Any orders that have been processed, as reflected on your Upcoming page, cannot be cancelled. For more information see our <a href="/" target="_blank">Terms of Use</a> and <a href="/" target="_blank">FAQs</a>. You also agree you have read and consent to our updated <a href="/" target="_blank">Terms of Use</a>.
          </div>
        </form>
      </div>
    );
  }
}
const CheckoutForm = injectStripe(_CheckoutForm);

class Checkout extends Component {

  render() {
    
    return (
      <div className="Checkout">
        <Elements>
          <CheckoutForm AdjustHeader={this.props.AdjustHeader} submitData={this.props.submitData}/>
        </Elements>   
      </div>
    );
  }
}

class SignUpCheckoutApp extends Component {

  render() {
    
    return (
      <StripeProvider apiKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh">
      <Checkout AdjustHeader={this.props.AdjustHeader.bind(this)} submitData={this.props.submitData}/>
    </StripeProvider>
    );
  }
}

export default SignUpCheckoutApp;
