import React from "react";
import { Row, Col } from "antd";
import BlueButton from "../common/BlueButton";
import { Link } from "react-router-dom";

const Processes = () => (
  <section className="process">
    <div className="section_header">
      <h1 className="section_header--primary"> How It Works? </h1>
    </div>
    <StepCardLeft
      title="You select a mealplan"
      img="http://res.cloudinary.com/dtqxwjmwn/image/upload/v1529298294/stock-vector-healthy-fast-food-options-vector-hand-drawn-illustration-salad-chicken-sandwich-bur.png"
      description="Browse mealplans offered by our  hand-picked restaurants and commercial kitchens. You can skip a week or change your mealplan provider any time."
    />

    <StepCard
      title="We prepare and deliver"
      img="http://res.cloudinary.com/dtqxwjmwn/image/upload/v1529298293/stock-vector-delivery-truck-icon-vector-isolated-on-white-background-flat-line-cargo-van-moving-.png"
      description="Select a delivery time that works for you. Meals will be delivered once or twice a week at a time designated for your area."
    />

    <StepCardLeft
      title="You Enjoy!"
      img="http://res.cloudinary.com/dtqxwjmwn/image/upload/v1529298293/stock-vector-loving-couple-eating-meal-in-the-kitchen-table-happy-man-and-women-sitting-eating-h.png"
      description="Enjoy healthy meals without spending time and energy cooking your meals. The meals can be simply reheated or microwaved when you want."
    />
    <div className="button_wrapper">
      <Link to ="/signup/user/">
        <BlueButton text="Get Started" />
      </Link>
    </div>
  </section>
);

const StepCard = props => {
  const process_image = {
    content: "url(" + props.img + ")"
  };
  return (
    <Row className="step-card" type="flex" justify="center">
      <Image process_image={process_image} />
      <Text title={props.title} description={props.description} />
    </Row>
  );
};
const StepCardLeft = props => {
  const process_image = {
    content: "url(" + props.img + ")"
  };
  return (
    <Row className="step-card" type="flex" justify="center">
      <Text title={props.title} description={props.description} />
      <Image process_image={process_image} />
    </Row>
  );
};

const Text = props => (
  <Col
    lg={{ span: 12, offset: 0 }}
    md={{ span: 12, offset: 0 }}
    sm={{ span: 24, offset: 0 }}
  >
    <div className="text-wrapper">
      <h3 className="step-card__title">{props.title}</h3>
      <p className="step-card__description">{props.description}</p>
    </div>
  </Col>
);

const Image = props => (
  <Col
    lg={{ span: 12, offset: 0 }}
    md={{ span: 12, offset: 0 }}
    sm={{ span: 24, offset: 0 }}
  >
    <div style={props.process_image} className="process-image" />
  </Col>
);

export default Processes;
