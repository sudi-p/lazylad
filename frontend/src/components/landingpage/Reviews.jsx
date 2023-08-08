import React, { Component } from "react";
import { Row, Col, Carousel } from "antd";

class Reviews extends Component {
  render() {
    return (
      <section className="reviews">
        <div className="section_header">
          <h1 className="section_header--primary">
            {" "}
            Our Community of Satisfied Customer.{" "}
          </h1>
        </div>
        <div className="carousel-wrapper">
          <Carousel autoplay effect="fade">
            <div>
              <ReviewItem
                username="Sudip Paudel"
                text="Yesto mitho khana ta aaile samma khako ni thina khana ni naparos"
                cook="Sanjaya"
                user_photo="http://res.cloudinary.com/dtqxwjmwn/image/upload/v1527857287/33870859_1914324535265186_8744471904766656512_n.jpg"
                img="https://image-service.blueapron.com/render/q/quality/75/src/https%3A%2F%2Fmedia.blueapron.com%2Fhome_page%2FSocialCarousel%2FBASocialImage5.jpg"
              />
            </div>
            <div>
              <ReviewItem
                username="Bishmita Dhakal"
                text="Good Food."
                cook="Urmila"
                user_photo="http://res.cloudinary.com/dtqxwjmwn/image/upload/v1527857287/33850854_2067960526578621_921699754088333312_o.jpg"
                img="https://media-cdn.tripadvisor.com/media/photo-s/0b/e7/58/c0/enjoying-indian-food.jpg"
              />
            </div>
            <div>
              <ReviewItem
                username="Binay Paudel"
                text="I have been ordering food from here for over a month. Ordering food from LazyLad has helped me to save a lot of time."
                cook="Urmila"
                user_photo="http://res.cloudinary.com/dtqxwjmwn/image/upload/v1527860183/30515834_10155820966293813_3060461639866986531_n.jpg"
                img="https://i.ytimg.com/vi/0gCZ0ilKsA8/maxresdefault.jpg"
              />
            </div>
          </Carousel>
        </div>
      </section>
    );
  }
}

class ReviewItem extends Component {
  render() {
    const reviewImageStyle = {
      backgroundImage: "url(" + this.props.img + ")"
    };
    return (
      <Row className="item">
        <Col
          lg={{ span: 16, offset: 0 }}
          md={{ span: 16, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          xs={{ span: 24, offset: 0 }}
        >
          <div className="review-image" style={reviewImageStyle} />
        </Col>
        <Col
          lg={{ span: 8, offset: 0 }}
          md={{ span: 8, offset: 0 }}
          sm={{ span: 22, offset: 1 }}
          className="info-wrapper"
        >
          <img
            alt="user_photo"
            className="user_photo"
            src={this.props.user_photo}
          />
          <span className="username">{this.props.username}</span>
          <p className="comment">{this.props.text}</p>
        </Col>
      </Row>
    );
  }
}

export default Reviews;
