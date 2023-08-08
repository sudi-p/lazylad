import React from "react";
import { Row, Col, Icon } from "antd";

const Service = () => (
  <Row className="services">
    <Col
      lg={{ span: 6, offset: 3 }}
      md={{ span: 7, offset: 2 }}
      xs={{ span: 24, offset: 0 }}
    >
      <div className="box">
        <div className="icon-holder">
          <Icon type="book" />
        </div>
        <p className="service-header"> No Commitment </p>
        <p className="service-content">
          Get your delivery when it''s convenient for you. You may skip or
          cancel at any time.
        </p>
      </div>
    </Col>
    <Col
      lg={{ span: 6, offset: 0 }}
      md={{ span: 7, offset: 0 }}
      xs={{ span: 24, offset: 0 }}
    >
      <div className="box">
        <div className="icon-holder">
          <Icon type="export" />
        </div>
        <p className="service-header">Personalized Menus</p>
        <p className="service-content">
          Tell us your dietary preferences and we''ll personalize the menus you
          receive.
        </p>
      </div>
    </Col>
    <Col
      lg={{ span: 6, offset: 0 }}
      md={{ span: 7, offset: 0 }}
      xs={{ span: 24, offset: 0 }}
    >
      <div className="box">
        <div className="icon-holder">
          <Icon type="solution" />
        </div>
        <p className="service-header">Convenient Delivery</p>
        <p className="service-content">
          Ingredients are carefully packaged in a refrigerated box so food stays
          fresh even if you''re not home when we deliver.
        </p>
      </div>
    </Col>
  </Row>
);

export default Service;
