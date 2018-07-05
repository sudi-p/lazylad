import React, { Component } from 'react';
import Plans from '../common/Plans';

class Pricing extends Component{
  planSelect(plan){
    sessionStorage.setItem('pricing',JSON.stringify(plan))
    window.location.href = "/signup/"  
  }
  render(){
    return(
      <section className="pricing">
        <div className="section_header">
      	  <span className="section_header--primary">Pricing</span>
        </div>
        <Plans planSelect={this.planSelect}/>
      </section>
    );
  }
}

export default Pricing