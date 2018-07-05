import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DishCard from './common/DishCard';
import './styles/Menu.module.css';
import {
  Row,
  Col,
  Affix,
} from 'antd';

class Menu extends Component{
  changePlan(key){
    if (key==="1"){
      this.props.getThreeDaysPlans()
    }
    else {
      this.props.getFiveDaysPlans()
    }
  }
  
  render(){
  	const plans_list = this.props.plans
  	const plans_list_display = plans_list.map((plan) => {
  	  const dishes_display = plan.get('dishes').map((dish) => {
    		return(
          <Col
            lg={{span:6 , offset:0}}
            md={{span:8 , offset:0}}
            sm={{span:12 , offset:0}}
            xs={{span:24 , offset:0}}
          >
            <DishCard
              image_url = {dish.get('image_url')}
              id = {dish.get('id')}
              is_vegeterian = {dish.get('is_vegeterian')}
              dish_name = {dish.get('dish_name')}
              description = {dish.get('description')}
              calorie = {dish.get('calorie')}/>
          </Col>
  	  	)
  	  }) 
      let plan_week_month = plan.get('week').slice(5,7)
      let plan_week_date = plan.get('week').slice(8,10)
      let month = "December"
      if (plan_week_month === "01"){
        month= "January"
      }
      else if (plan_week_month === "02"){
        month= "February"
      }
      else if (plan_week_month === "03"){
        month= "March"
      }
      else if (plan_week_month === "04"){
        month= "April"
      }
      else if (plan_week_month === "05"){
        month= "May"
      }
      else if (plan_week_month === "06"){
        month= "June"
      }
      else if (plan_week_month === "07"){
        month= "July"
      }
      else if (plan_week_month === "08"){
        month= "August"
      }
      else if (plan_week_month === "09"){
        month= "September"
      }
      else if (plan_week_month === "10"){
        month= "October"
      }
      else if (plan_week_month === "11"){
        month= "November"
      }
  		return(
        <div key={plan.get('id')}className="info-wrapper">
          <Affix offsetTop={68}>
            <div className="restaurant-wrapper">
              <div className="restaurant">
                Week Of {month} {plan_week_date}
                <div className="button-wrapper">
                <Link to ="/signup/">
                  <button  className="order_button">
                    <strong>Start Ordering</strong>
                  </button>
                </Link>
                </div>
              </div>
            </div>
          </Affix>       
          <Row type="flex" justify="start" className="dishes">
            {dishes_display}
          </Row>
        </div>
  		)
  	})
    
    return(
      <div className="menu">
        {plans_list_display}
      </div>
    );
  }
}

export default Menu
