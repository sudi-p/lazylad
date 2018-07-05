import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'flux/utils';
import LoginView from './LoginView';

import SignUpActions from '../actions/signUpActions';
import SignUpStore from '../stores/signUpStore';

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
  LogInViewRoute = () =>{
    return(
      <LoginView 
        handleSubmit={this.handleSubmit.bind(this)}/>
    )
  }

  handleSubmit(new_user){
    SignUpActions.add_customer(new_user)
  }
  render(){
    
    return(
      <Switch>
        <Route exact path='/login/' render={this.LogInViewRoute}/>
      </Switch>
    );
  }
}

export default Container.create(SignUpContainer);