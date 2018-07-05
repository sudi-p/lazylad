import React, { Component } from 'react';
import {
  Row,
  Col,
} from 'antd';
import BlueButton from '../common/BlueButton';


class Processes extends Component{
  render(){
    return(
      <section className="process">
        <div className="section_header">
          <h1 className="section_header--primary"> How It Works? </h1>
        </div>
        <StepCardLeft 
        title="You select a mealplan"
        img="http://res.cloudinary.com/dtqxwjmwn/image/upload/v1529298294/stock-vector-healthy-fast-food-options-vector-hand-drawn-illustration-salad-chicken-sandwich-bur.png"
        description="Browse mealplans offered by our  hand-picked restaurants and commercial kitchens. You can skip a week or change your mealplan provider any time."/>
        
        <StepCard
        title="We prepare and deliver"
        img="http://res.cloudinary.com/dtqxwjmwn/image/upload/v1529298293/stock-vector-delivery-truck-icon-vector-isolated-on-white-background-flat-line-cargo-van-moving-.png"
        description="Select a delivery time that works for you. Meals will be delivered once or twice a week at a time designated for your area."/>

        <StepCardLeft 
        title="You Enjoy!"
        img="http://res.cloudinary.com/dtqxwjmwn/image/upload/v1529298293/stock-vector-loving-couple-eating-meal-in-the-kitchen-table-happy-man-and-women-sitting-eating-h.png"
        description="Enjoy healthy meals without spending time and energy cooking your meals. The meals can be simply reheated or microwaved when you want."/>
        <div className="button_wrapper">
          <BlueButton text="Get Started"/>
        </div>
      </section>
    );
  }
}


class StepCard extends Component{
  render(){
    const process_image = {
      'content': 'url('+this.props.img+')'
    };
    return(
      <Row className="step-card" type="flex" justify="center">
        <Col
          lg={{span: 12, offset:0 }}
          md={{span: 12, offset:0 }}
          sm={{span: 24, offset:0 }}
        >
          <div style={process_image} className="process-image"></div>
        </Col>
        <Col
          lg={{span: 12, offset:0 }}
          md={{span: 11, offset:1 }}
          sm={{span: 24, offset:0 }}
        >
          <div className="text-wrapper">
            <h3 className="step-card__title">{this.props.title}</h3>
            <p className="step-card__description">
              {this.props.description}
            </p>
          </div>
        </Col>
      </Row>
    )
  }
}
class StepCardLeft extends Component{
  render(){
    const process_image = {
      'content': 'url('+this.props.img+')'
    };
    return(
      <Row className="step-card" type="flex" justify="center">
        <Col
          lg={{span: 12, offset:0 }}
          md={{span: 12, offset:0 }}
          sm={{span: 24, offset:0 }}
        >
          <div className="text-wrapper">
            <h3 className="step-card__title">{this.props.title}</h3>
            <p className="step-card__description">
              {this.props.description}
            </p>
          </div>
        </Col>
        <Col
          lg={{span: 12, offset:0 }}
          md={{span: 11, offset:1 }}
          sm={{span: 24, offset:0 }}
        >
          <div style={process_image} className="process-image"></div>
        </Col>
      </Row>
    )
  }
}

export default Processes
