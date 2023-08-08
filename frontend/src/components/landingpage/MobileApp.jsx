import React, { Component } from "react";
import { Row, Col, Button, Icon } from "antd";

class Mobile extends Component {
  render() {
    return (
      <Row className="mobile-app">
        <Col
          lg={{ span: 11, offset: 2 }}
          md={{ span: 11, offset: 2 }}
          sm={{ span: 16, offset: 4 }}
          xs={{ span: 22, offset: 1 }}
          className="app-link"
        >
          <div className="topic">
            Get the food you love, for delivery or pickup, with the LazyLad app.
          </div>
          <Button size="large">
            <Icon type="apple-o" />
            App Store
          </Button>
          <Button size="large" className="google">
            <i className="fab fa-google-play" /> Google Play
          </Button>
        </Col>
        <Col
          lg={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 1 }}
          sm={{ span: 10, offset: 8 }}
          xs={{ span: 12, offset: 5 }}
          className="mobile"
        >
          <img
            alt="mobile-app"
            src="http://res.cloudinary.com/dtqxwjmwn/image/upload/v1527934927/mobile.png"
          />
        </Col>
      </Row>
    );
  }
}

export default Mobile;
