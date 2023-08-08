import React, { PureComponent, Component } from "react";
//import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { StyleVariable } from "../constants/styleVariables";
import "./styles/DishesView.Module.css";
import { Link } from "react-router-dom";
import { Icon, Card, Col, Row, Button } from "antd";
const { Meta } = Card;

class DishCard extends PureComponent {
  render() {
    const { id, dish_name, dish_status, short_description } = this.props;
    const img_url =
      "https://upload.wikimedia.org/wikipedia/commons/4/47/Dal_Bhat_Tarkari%2CNepal.JPG";
    const cardStyle = {
      fontFamily: StyleVariable.font_primary,
      marginBottom: 20
    };

    let dish_url = "";
    if (dish_status === 2) {
      dish_url = "/dish/" + id;
    } else if (dish_status === 1) {
      dish_url = "/dish/" + id + "/dish-info/";
    }

    return (
      <Link to={dish_url}>
        <Card
          className="dish-card"
          style={cardStyle}
          cover={<img alt={dish_name} src={img_url} />}
          actions={[<Icon type="setting" />, <Icon type="edit" />]}
          hoverable
        >
          <Meta title={dish_name} description={short_description} />
        </Card>
      </Link>
    );
  }
}

class DishesHeader extends Component {
  render() {
    return (
      <Row>
        <Col span={6}>
          <h1>My Dishes</h1>
        </Col>
        <Col span={14} />
        <Col span={4}>
          <Link to="/dishes/add-dish/">
            <Button type="primary">Add New Dish</Button>
          </Link>
        </Col>
      </Row>
    );
  }
}

class DishesView extends PureComponent {
  render() {
    const { dishes } = this.props;
    return (
      <div className="dish-view">
        <DishesHeader />
        <hr />
        <Row gutter={16}>
          {dishes.map(dish => (
            <Col key={dish.get("id")} sm={24} md={12} lg={8}>
              <DishCard {...dish.toJS()} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

DishesView.defaultProps = {
  itemTitle: "Page"
};

DishesView.propTypes = {
  itemTitle: PropTypes.string
};

export default DishesView;
