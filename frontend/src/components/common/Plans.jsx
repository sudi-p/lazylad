import React, { Component } from "react";
import { Row, Col, Card, Radio } from "antd";
import "../styles/Plans.module.css";
import BlueButton from "../common/BlueButton";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class PlanCard extends Component {
  constructor() {
    super();
    this.state = {
      plan_type: "",
      number_of_dishes: 0,
      price_per_serving: 0,
      price_shipping: 0
    };
  }
  changePrice(e) {
    const pricings = this.props.pricings;
    pricings.map(pricing => {
      if (pricing.number_of_dishes === e.target.value) {
        let price = this.state;
        price.price_per_serving = pricing.price_per_serving;
        price.number_of_dishes = pricing.number_of_dishes;
        price.price_shipping = pricing.price_shipping;
        price.price_weekly =
          pricing.price_per_serving * pricing.number_of_dishes +
          pricing.price_shipping;
        this.setState({
          ...price
        });
      }
      return null;
    });
  }
  componentWillMount() {
    const pricing = this.props.pricings[0];
    let price = this.state;
    price.price_per_serving = pricing.price_per_serving;
    price.number_of_dishes = pricing.number_of_dishes;
    price.price_shipping = pricing.price_shipping;
    price.price_weekly =
      pricing.price_per_serving * pricing.number_of_dishes +
      pricing.price_shipping;
    this.setState({
      ...price
    });
  }

  planSelect() {
    let price = this.state;
    let plan_type;
    if (this.props.name === "For one person") {
      plan_type = "1";
    } else {
      plan_type = "2";
    }
    price.plan_type = plan_type;
    this.setState({
      ...price
    });
    this.props.planSelect(this.state);
  }

  render() {
    const card_cover = {
      backgroundImage: "url(" + this.props.image_url + ")"
    };
    const pricings = this.props.pricings;
    const radio_button_display = pricings
      .slice(0)
      .reverse()
      .map(pricing => {
        return (
          <RadioButton key={pricing.id} value={pricing.number_of_dishes}>
            {pricing.number_of_dishes}
          </RadioButton>
        );
      });

    let price_per_serving = "$" + this.state.price_per_serving.toFixed(2);
    let price_shipping = "$" + this.state.price_shipping.toFixed(2);
    let price_weekly = "$" + this.state.price_weekly.toFixed(2);

    return (
      <Card className="plan_card" hoverable>
        <div style={card_cover} className="plan_cardcover" />
        <span className="plan_title--primary">{this.props.name}</span>
        <div className="number-of-meals">
          <RadioGroup
            onChange={this.changePrice.bind(this)}
            defaultValue={this.props.pricings[0].number_of_dishes}
            size="large"
          >
            {radio_button_display}
          </RadioGroup>
        </div>
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
            <span className="for">total</span>
          </Col>
        </Row>
        <Row className="price-wrapper">
          <div onClick={this.planSelect.bind(this)} className="button_wrapper">
            <BlueButton text="SELECT THIS PLAN" />
          </div>
        </Row>
      </Card>
    );
  }
}

class Plans extends Component {
  render() {
    let plans = [
      {
        name: "For one person",
        image_url:
          "https://media.istockphoto.com/videos/young-woman-eating-in-a-restaurant-video-id469927355?s=640x640",
        pricings: [
          {
            id: 1,
            number_of_dishes: 5,
            price_per_serving: 10.99,
            price_shipping: 6.99
          },
          {
            id: 2,
            number_of_dishes: 3,
            price_per_serving: 11.99,
            price_shipping: 5.99
          }
        ]
      },
      {
        name: "For two people",
        serving_number: "2",
        image_url:
          "http://www.healthmagazine.ae/wp-content/uploads/2014/01/WHY-BREAKFAST.jpg",
        pricings: [
          {
            id: 3,
            number_of_dishes: 5,
            price_per_serving: 9.99,
            price_shipping: 6.99
          },
          {
            id: 4,
            number_of_dishes: 3,
            price_per_serving: 9.99,
            price_shipping: 5.99
          }
        ]
      }
    ];
    const plans_display = plans.map(plan => {
      return (
        <Col
          lg={{ span: 12, offset: 0 }}
          md={{ span: 12, offset: 0 }}
          xs={{ span: 24, offset: 0 }}
          key={plan.name}
        >
          <PlanCard
            name={plan.name}
            image_url={plan.image_url}
            serving_number={plan.serving_number}
            pricings={plan.pricings}
            planSelect={this.props.planSelect}
          />
        </Col>
      );
    });
    return (
      <div className="plans">
        <Row gutter={16} type="flex" justify="center">
          {plans_display}
        </Row>
      </div>
    );
  }
}

export default Plans;
