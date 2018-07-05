import React, { Component } from 'react';
import TiffinPlanHeader from './tiffin-plan/TiffinPlanHeader';
import Menu from './tiffin-plan/Menu';
import './styles/TiffinPlan.module.css';
import {
  Button,
  Icon
} from 'antd';

class TiffinPlan extends Component{
  render(){
    let location = ""
    let restaurant = this.props.plan.get('restaurant')
    let dishes = this.props.plan.get('dishes')
    let start_date = this.props.plan.get('start_date')
    let end_date = this.props.plan.get('end_date')
    if (restaurant){
      location=restaurant.get('street_address')
    }
    return(
      <div className="tiffin-plans">
        <TiffinPlanHeader restaurant={restaurant}/>
        <Menu start_date={start_date} end_date={end_date} dishes={dishes}/>
        <Order />
        <ResLocation location={location}/>
      </div>
    );
  }
}
class Order extends Component{
  render(){
    return(
      <section className="order">
        <Button type="primary" size="large">Order Now</Button>
      </section>
    )
  }
}
class ResLocation extends Component{
  render(){
    return(
      <section className="order location">
        <Icon type="shop" className="icon" />
        <p>
        Delivered from <span className="address">{this.props.location}</span>
        </p>
      </section>
    )
  }
}


export default TiffinPlan