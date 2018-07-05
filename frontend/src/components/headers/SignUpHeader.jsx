import React, { Component } from 'react';
import { Icon } from 'antd';

class SignUpHeader extends Component{
  
  render(){
    let active_text_style = {color: '#0f346c', fontWeight: 'bold'}
    let active_circle_style = {backgroundColor: '#0f346c', color: 'white', fontWeight: 'bold'}

    let complete_circle_style = {backgroundColor: 'green', color: 'white', fontWeight: 'bold'}
    let complete_text_style = {color: 'green'}
    let complete_divider_style= {borderTop: "1px solid green"}

    let incomplete_text_style = {}
    let incomplete_circle_style = {display: 'inline'} 
    let incomplete_divider_style = {borderTop: "1px solid #bbb"}

    let welcome_text_style= active_text_style
    let welcome_circle_style= active_circle_style
    let divider1_style= incomplete_divider_style
    let divider2_style= incomplete_divider_style
    let welcome_icon_before = {display: 'inline'}
    let welcome_icon_after = {display: 'none'}
    let pricing_icon_before = {display: 'inline'}
    let pricing_icon_after = {display: 'none'}
    let pricing_text_style = incomplete_text_style
    let pricing_circle_style = incomplete_circle_style
    let checkout_circle_style = incomplete_circle_style
    let checkout_text_style = incomplete_text_style
    if(this.props.signup_status === "pricing"){
      welcome_icon_before ={display: 'none'}
      welcome_icon_after = {display: 'inline'}
      pricing_text_style = welcome_text_style
      pricing_circle_style = welcome_circle_style
      welcome_circle_style= complete_circle_style
      welcome_text_style= complete_text_style
      divider1_style= complete_divider_style
      divider2_style= incomplete_divider_style
    }
    else if(this.props.signup_status === "checkout"){
      welcome_icon_before ={display: 'none'}
      welcome_icon_after = {display: 'inline'}
      pricing_icon_before ={display: 'none'}
      pricing_icon_after = {display: 'inline'}
      pricing_text_style = complete_text_style
      pricing_circle_style = complete_circle_style
      welcome_circle_style= complete_circle_style
      welcome_text_style= complete_text_style
      divider1_style= complete_divider_style
      divider2_style= complete_divider_style
      checkout_circle_style = active_circle_style
      checkout_text_style = active_text_style
    }
    return(
      <div className="signup-header--wrapper">
        <div className="signup-header">
          <div style={welcome_circle_style} className="circle">
            <span style={welcome_icon_before}>1</span>
            <span style={welcome_icon_after}><Icon type="check"/></span>
          </div>
          <span style={welcome_text_style} className="header_text"> Welcome</span>
          <div style= {divider1_style} className="divider"></div>
          <div style={pricing_circle_style} className="circle">
            <span style={pricing_icon_before}>2</span>
            <span style={pricing_icon_after}><Icon type="check"/></span>
          </div>
          <span style={pricing_text_style} className="header_text">Plans & Pricing</span>
          <div style= {divider2_style} className="divider"></div>
          <div style={checkout_circle_style} className="circle">3</div>
          <span style={checkout_text_style} className="header_text">Checkout</span>
        </div>
      </div>
    );
  }
}

export default SignUpHeader