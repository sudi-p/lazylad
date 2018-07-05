import React, { Component } from 'react';
import Plans from '../common/Plans';

class SignUpBasicInfo extends Component{
  componentWillMount(){
    if (sessionStorage.getItem('user')){
      this.props.AdjustHeader("pricing")
    }
    else{
      window.location.href = "/signup/"
    }
  }
  planSelect(plan){
    this.props.selectPlan(plan)
  }
  render(){
    return(
      <div>
        <Plans planSelect={this.planSelect.bind(this)} />
      </div>
    );
  }
}

export default SignUpBasicInfo;