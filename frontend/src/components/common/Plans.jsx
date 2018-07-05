import React, { Component } from 'react';
import {
	Row,
	Col,
	Card,
	Radio,
} from 'antd';
import '../styles/Plans.module.css';
import BlueButton from '../common/BlueButton';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class PlanCard extends Component{
	constructor(){
		super();
		this.state ={
			price: {
        'plan_type': "",
        'number_of_dishes':"",
				'price_per_serving':"$0",
				'price_shipping': "FREE",
				'price_weekly': "$0"
			}
		}
	}
	changePrice(e){
		const pricings = this.props.pricings
		pricings.map((pricing) =>{
    	if (pricing.number_of_dishes === e.target.value){
    		let price = this.state.price
    		price.price_per_serving = pricing.price_per_serving
        price.number_of_dishes = pricing.number_of_dishes
    		price.price_shipping = pricing.price_shipping
    		price.price_weekly = pricing.price_weekly
    		this.setState({
    			price: price
    		})
    	}
      return null
    })
	}
	componentWillMount(){
		const pricing = this.props.pricings[0]
		let price = this.state.price
		price.price_per_serving = pricing.price_per_serving
    price.number_of_dishes = pricing.number_of_dishes
		price.price_shipping = pricing.price_shipping
		price.price_weekly = pricing.price_weekly
		this.setState({
			price: price
		})
	}
	planSelect(){
    let price = this.state.price
    price.plan_type = this.props.name
    price.plan_type = this.props.name
    this.setState({
      price: price
    })
		this.props.planSelect(this.state)
	}
  render(){
  	const card_cover = {
      'backgroundImage': 'url('+this.props.image_url+')'
    };
    const pricings = this.props.pricings
    const radio_button_display = pricings.slice(0).reverse().map((pricing) =>{
    	return(
    		<RadioButton value={pricing.number_of_dishes}>{pricing.number_of_dishes}</RadioButton>
    	);
    })
    let price_per_serving = "$"+ this.state.price.price_per_serving
    let price_shipping = this.state.price.price_shipping
    let price_weekly = "$"+ this.state.price.price_weekly
    if (price_shipping !== "FREE"){
      price_shipping = "$"+ price_shipping
    }
    return(
      <Card
      	className="plan_card"
      	hoverable
      >
      	<span className="plan_title--primary">{this.props.name}</span>
      	<p className="plan_title--secondary">Serves {this.props.serving_number}</p>
      	<div style={card_cover} className="plan_cardcover"></div>
      	<RadioGroup onChange={this.changePrice.bind(this)} defaultValue={this.props.pricings[0].number_of_dishes} size="large" >
	        {radio_button_display}
	      </RadioGroup>
      	<div className="dpw">DISHES PER WEEK</div>
      	<Row className="price-wrapper">
      		<Col span={8}>
      			<h4 className="price">{price_per_serving}</h4>
      			<span className="for">per serving</span>
      		</Col>
      		
      		<Col span={7}>
      			<h4 className="price">{price_shipping}</h4>
      			<span className="for">shipping</span>
      		</Col>
      		
      		<Col span={9}>
      			<h4 className="price">{price_weekly}</h4>
      			<span className="for">weekly total</span>
      		</Col>
      	</Row>
        <Row className="price-wrapper">
          <div onClick={this.planSelect.bind(this)} className="button_wrapper">
        	  <BlueButton  text="SELECT THIS PLAN" />
          </div>
        </Row>
      </Card>
    );
  }
}

class Plans extends Component{
  render(){
  	let plans=[
  		{
	  		name: "Single-Person Plan",
	  		serving_number: "1",
	  		image_url: "https://media.istockphoto.com/videos/young-woman-eating-in-a-restaurant-video-id469927355?s=640x640",
	  		pricings:[
	  			{
	  				number_of_dishes: "5",
	  				price_per_serving: "10.99",
	  				price_shipping: "FREE",
	  				price_weekly: "54.95"
	  			},
	  			{
	  				number_of_dishes: "3",
	  				price_per_serving: "10.99",
	  				price_shipping: "7.99",
	  				price_weekly: "40.96"
	  			},
	  			
	  		]
	  	},
	  	{
	  		name: "Two-Person Plan",
	  		serving_number: "2",
	  		image_url: "http://www.healthmagazine.ae/wp-content/uploads/2014/01/WHY-BREAKFAST.jpg",
	  		pricings:[
	  			{
	  				number_of_dishes: "5",
	  				price_per_serving: "9.99",
	  				price_shipping: "FREE",
	  				price_weekly: "59.94"
	  			},
	  			{
	  				number_of_dishes: "3",
	  				price_per_serving: "9.99",
	  				price_shipping: "7.99",
	  				price_weekly: "47.95"
	  			},
	  			
	  		]
	  	}
  	]
  	const plans_display = plans.map((plan) =>{
  		return(
  			<Col
          lg={{span:12 , offset:0}}
          md={{span:12 , offset:0}}
          xs={{span:24 , offset:0}}
        >
    			<PlanCard
    				name={ plan.name}
    				image_url={plan.image_url}
    				serving_number={plan.serving_number}
    				pricings={plan.pricings}
            planSelect = {this.props.planSelect}
    			/>
    		</Col>
  		)
  	})
    return(
      <div className="plans">
      	<Row gutter={16} type="flex" justify="center">
      		{plans_display}
      	</Row>
      </div>
    );
  }
}

export default Plans