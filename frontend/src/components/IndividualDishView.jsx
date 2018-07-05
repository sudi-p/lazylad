import React, { Component } from "react";
import {
  Row,
  Col,
} from "antd";
import './styles/IndividualDishView.module.css';

class IndividualDishViewHeader extends Component{
  render(){
    return (
      <div>
        <h3>{this.props.dish_name}</h3>
        <h5>{this.props.short_description}</h5>
      </div>
    )
  }
}

class IndividualDishView extends Component{
  render(){
    let dish_name = this.props.dish.get("dish_name")
    let short_description = this.props.dish.get("short_description")
    let description = this.props.dish.get("description")
    let price = this.props.dish.get("price")
    let image_url = this.props.dish.get("image_url")
    let ingredients = this.props.dish.get("ingredients")
    let ingredients_title = "";
    let ingredient_list = "";
    const dish_image = {
      'backgroundImage': 'url('+image_url+')'
    };
    if (ingredients){
      if (ingredients.size !== 0){
        ingredients_title = "Ingredients:"
        ingredient_list = ingredients.map((ingredient) => {
        return <h4>{ingredient.get('ingredient')}</h4>
      })
      }
    }
    return (
      <div>
        <IndividualDishViewHeader
          dish_name= {dish_name}
          short_description= {short_description}
        />
        <hr />
        <Row gutter= {8}>
          <Col md={12}>
            Description:
            <p>
              {description}
            </p>

            Price:
            <p>
              {price} $
            </p>
            {ingredients_title}
            {ingredient_list}
          </Col>
          <Col md={12}>
            <div style={dish_image} className="dish_image"></div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default IndividualDishView