import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'flux/utils';
import SignUpHeader from './headers/SignUpHeader';
import SignUpWelcome from './signup/SignUpWelcome';
import SignUpPricing from './signup/SignUpPricing';
import SignUpCheckout from './signup/SignUpCheckout';

import SignUpActions from '../actions/signUpActions';
import SignUpStore from '../stores/signUpStore';

import "./styles/SignUp.Module.css";

class SignUpContainer extends Component{
  static getStores(){
    return [SignUpStore];
  }
  static calculateState(prevState, props){
    const state = SignUpStore.getState();
    return {
      signup_error: state.get("signup_error"),
      signup_status: state.get("signup_status")
    }
  }
  SignUpWelcomeRoute = () =>{
    return(
      <SignUpWelcome
        handleSubmit={this.checkUser.bind(this)}
        data={this.state}
        AdjustHeader={this.AdjustHeader.bind(this)} />
    )
  }
  SignUpPricingRoute = () =>{
    return(
      <SignUpPricing
        AdjustHeader={this.AdjustHeader.bind(this)}
        selectPlan={this.selectPlan.bind(this)}/>
    )
  }
  SignUpCheckoutRoute = () =>{
    return (
        <SignUpCheckout
          AdjustHeader={this.AdjustHeader.bind(this)}
          submitData={this.submitData.bind(this)}/>
    )
  }
  selectPlan(plan){
    sessionStorage.setItem('pricing',JSON.stringify(plan))
    window.location.href = "/signup/checkout"
  }
  submitData(new_customer){
    SignUpActions.addCustomer(new_customer)
  }
  checkUser(new_user){
    sessionStorage.setItem('user',JSON.stringify(new_user))
    SignUpActions.checkCustomer(new_user)
  }
  AdjustHeader(value){
    this.setState({
      signup_status: value
    })
  }
  render(){
    
    return(
      <div className="signup">
        <SignUpHeader {...this.state} />
        <Switch>
          <Route exact path='/signup/' render={this.SignUpWelcomeRoute}/>
          <Route exact path='/signup/pricing/' render={this.SignUpPricingRoute}/>
          <Route exact path='/signup/checkout/' render={this.SignUpCheckoutRoute}/>
        </Switch>
      </div>
    );
  }
}

export default Container.create(SignUpContainer);