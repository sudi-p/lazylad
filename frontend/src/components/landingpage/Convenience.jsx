import React, { Component } from "react";
import { Row, Col, Icon } from "antd";

class Convenience extends Component {
  render() {
    return (
      <section className="convenience">
        <div className="section_header">
          <h1 className="section_header--primary">
            {" "}
            Convenience you can count on.{" "}
          </h1>
          <h4 className="section_header--secondary">
            {" "}
            Accuracy, innovation, excellence—we make your dining absolutely
            delicious.{" "}
          </h4>
        </div>
        <Row type="flex">
          <ConvenienceCard
            title="Slack orders"
            description="Send restaurant options and order updates to your team’s Slack channel."
          />
          <ConvenienceCard
            title="Auto checkout"
            description="Choose to check out your order at a specified time."
          />
          <ConvenienceCard
            title="Dietary options"
            description="Satisfy picky eaters and those with food allergies or restrictions."
          />
          <ConvenienceCard
            title="Account management and support"
            description="Get expert help on orders from a member of the LazyLad team."
          />
          <ConvenienceCard
            title="ASAP or scheduled orders"
            description="Place orders for fast delivery or plan ahead and schedule your order."
          />
          <ConvenienceCard
            title="Advanced search and filters"
            description="Find just what you’re craving. Filter by cuisine, feature, or price."
          />
        </Row>
      </section>
    );
  }
}
class ConvenienceCard extends Component {
  render() {
    return (
      <Col
        lg={{ span: 11, offset: 1 }}
        md={{ span: 11, offset: 1 }}
        sm={{ span: 22, offset: 1 }}
      >
        <div className="item">
          <div className="item-icon">
            <Icon type="check" style={{ color: "#1890ff" }} />
          </div>
          <div className="item_text">
            <span className="item_text--primary">{this.props.title}</span>
            <span className="item_text--secondary">
              {this.props.description}
            </span>
          </div>
        </div>
      </Col>
    );
  }
}

export default Convenience;
