import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Row, Col, Button } from "antd";

class PersonalizedPlans extends Component {
  render() {
    return (
      <section className="personalizedplans">
        <Row type="flex" justify="end" style={{ height: "max-content" }}>
          <Col
            lg={{ span: 5, offset: 0 }}
            md={{ span: 5, offset: 0 }}
            sm={{ span: 16, offset: 4 }}
            xs={{ span: 0, offset: 2 }}
            style={{ backgroundColor: "white" }}
          >
            <div className="image" />
          </Col>
          <Col
            lg={{ span: 15, offset: 0 }}
            md={{ span: 14, offset: 0 }}
            sm={{ span: 16, offset: 4 }}
            xs={{ span: 22, pull: 1 }}
            style={{
              backgroundColor: "white",
              paddingTop: 20,
              paddingBottom: 20
            }}
          >
            <div className="plans_wrapper">
              <h2 className="section_header--primary">Personalized Plans</h2>
              <Row>
                <PlanCard
                  title="3 day plan"
                  description=" 3 3 din ma khana magauna saknuhuncha tapain le"
                />
                <PlanCard
                  title="5 day plan"
                  description=" 3 3 din ma khana magauna saknuhuncha tapain le"
                />
                <PlanCard
                  title="7 day plan"
                  description=" 3 3 din ma khana magauna saknuhuncha tapain le"
                />
                <PlanCard
                  title="hire a cook"
                  description=" 3 3 din ma khana magauna saknuhuncha tapain le"
                />
              </Row>
              <Link to="/mealplans/">
                <Button type="primary" size="large">
                  View dishes in my area
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </section>
    );
  }
}

class PlanCard extends Component {
  render() {
    return (
      <Col
        lg={{ span: 12, offset: 0 }}
        md={{ span: 12, offset: 0 }}
        sm={{ span: 16, offset: 4 }}
        xs={{ span: 22, offset: 1 }}
        className="plan"
      >
        <h2 className="plan_title">{this.props.title}</h2>
        <h4 className="plan_description">{this.props.description}</h4>
      </Col>
    );
  }
}

export default PersonalizedPlans;
