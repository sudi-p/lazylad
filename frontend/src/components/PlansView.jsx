import React, { Component } from "react";
import history from "../history.js";
import Plans from "./common/Plans";
import { Row, Col, Carousel } from "antd";
import "./styles/PlansView.module.css";

class PlansView extends Component {
  planSelect(plan) {
    sessionStorage.setItem("pricing", JSON.stringify(plan));
    history.push("/signup/user/");
  }
  render() {
    return (
      <div className="plans-view">
        <div className="plans-wrapper">
          <Plans planSelect={this.planSelect} />
        </div>
        <Review />
        <CommonQuestions />
      </div>
    );
  }
}

const Review = () => (
  <div className="review">
    <div className="review-wrapper">
      <Carousel autoplay dots="false">
        <div>
          “Thank you @redlentils, this was better than any restaurant I could've
          gone to!” — @Suraj Patel
        </div>
        <div>
          “Feel like a kid on Christmas morning when we get a delivery.” —
          @Sudip Paudel
        </div>
        <div>
          “This might actually be the best thing that’s ever happened to me.” —
          @Minakshi Singh
        </div>
        <div>
          “I'd marry @redlentils if I could. We just have a good thing goin’
          on.” — @Ryan Smith
        </div>
      </Carousel>
    </div>
  </div>
);

const CommonQuestions = () => (
  <div className="common-questions">
    <div className="title">Common Questions</div>
    <Row>
      <Col md={{ span: 12, offset: 0 }} sm={{ span: 24, offset: 0 }}>
        <QuestionAnswer
          question=" Do you accommodate specific diets or allergies?"
          answer="We accommodate a variety of dietary preferences - e.g. vegetarians, pescetarians, or if you don’t eat red meat, fish, shellfish, pork, or lamb - and personalize your menu each week based on your preferences. All of our boxes are assembled in the same processing facility, so we don't recommend ordering Blue Apron if you have a serious food allergy."
        />
        <QuestionAnswer
          question=" When do you deliver?"
          answer="We deliver all 7 days of the week in most locations."
        />
        <QuestionAnswer
          question=" Where do you deliver?"
          answer="We deliver to all locations in the continental United States."
        />
      </Col>
      <Col md={{ span: 12, offset: 0 }} sm={{ span: 24, offset: 0 }}>
        <QuestionAnswer
          question="Where do you source your ingredients?"
          answer="The quality and freshness of our ingredients are incredibly important to us, so we work directly with artisanal purveyors and hundreds of family-run farms that support sustainable practices."
        />
        <QuestionAnswer
          question="Can I skip my delivery for a particular week?"
          answer="Yes, you can skip any delivery until the order is processed. You can manage your deliveries directly in your account."
        />
        <QuestionAnswer
          question="Do I need to be home to accept my delivery?"
          answer="Our refrigerated boxes are packed with ice packs and insulated liners to ensure your ingredients will stay fresh for the full delivery day, even if you’re not at home to accept the delivery."
        />
      </Col>
    </Row>
  </div>
);

const QuestionAnswer = props => (
  <div className="question-answer">
    <div className="question">{props.question}</div>
    <div className="answer">{props.answer}</div>
  </div>
);

export default PlansView;
