import React, { Component } from "react";
import { Card, Divider, Icon } from "antd";
import DishModal from "./DishModal";
import "../styles/DishCard.module.css";

class DishCard extends Component {
  constructor() {
    super();
    this.state = { visible: false };
    this.addDishToList = this.addDishToList.bind(this);
    this.removeDishFromList = this.removeDishFromList.bind(this);
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    this.setState({
      visible: false
    });
  };
  addDishToList() {
    let dish_id = this.props.id;
    let dish_list = this.props.new_dish_list.slice();
    dish_list.push(dish_id);
    this.props.changeDishList(dish_list);
  }
  removeDishFromList() {
    let dish_id = this.props.id;
    let dish_list = this.props.new_dish_list;
    let index = dish_list.indexOf(dish_id);
    dish_list.splice(index, 1);
    this.props.changeDishList(dish_list);
  }

  render() {
    const image_url = this.props.image_url;
    const dish_selection = this.props.dish_selection;
    const id = this.props.id;
    const is_vegeterian = this.props.is_vegeterian;
    const dish_name = this.props.dish_name;
    const description = this.props.description;
    const calorie = this.props.calorie;
    const selected = this.props.selected;
    const menu_skipped = this.props.menu_skipped;
    const new_dish_list = this.props.new_dish_list;
    const app_state = this.props.app_state;
    let selected_in_new_list = false;
    if (new_dish_list) {
      let index = new_dish_list.indexOf(id);
      if (index !== -1) {
        selected_in_new_list = true;
      }
    }
    let border_style = {};
    let dish_icon = "";
    let dish_card_wrapper = {};
    if (dish_selection) {
      if (
        new_dish_list.length ===
        parseInt(app_state.plan.get("number_of_dishes"), 10)
      ) {
        if (!selected_in_new_list) {
          dish_card_wrapper = {
            opacity: "0.1",
            zIndex: "99",
            pointerEvents: "none"
          };
        }
      }
      if (selected_in_new_list) {
        dish_icon = (
          <div
            onClick={this.removeDishFromList}
            className="dish-icon dish-icon--select"
          >
            <Icon type="check" />
          </div>
        );
        border_style = { border: "2px solid #204c77" };
      } else {
        dish_icon = (
          <div
            onClick={this.addDishToList}
            className="dish-icon dish-icon--add"
          >
            <Icon type="plus" />
          </div>
        );
      }
    } else {
      if (!menu_skipped) {
        if (selected) {
          dish_icon = (
            <div className="dish-icon dish-icon--select">
              <Icon type="check" />
            </div>
          );
          border_style = { border: "2px solid #204c77" };
        }
      }
    }

    const card_cover = {
      backgroundImage: "url(" + image_url + ")"
    };
    let vegeterian = "";
    let dish_type = "Non Vegeterian";
    let footer_color = {
      color: "red"
    };
    if (is_vegeterian) {
      vegeterian = "Vegeterian";
      dish_type = "Vegeterian";
      footer_color = {
        color: "green"
      };
    }
    return (
      <div key={id}>
        <div style={dish_card_wrapper}>
          <Card hoverable className="dish_card" style={border_style}>
            {dish_icon}
            <div style={card_cover} className="card-cover" />
            <div className="text-wrapper">
              <div onClick={this.showModal} className="dish">
                {dish_name}
              </div>
              <div className="description-wrapper">{description}</div>
            </div>
            <Divider />
            <div className="card-footer">
              <p style={footer_color}>
                {vegeterian} {calorie} Cal
              </p>
              <p className="view-more">VIEW DETAILS</p>
            </div>
          </Card>
        </div>
        <DishModal
          dish_name={dish_name}
          visible={this.state.visible}
          dish_type={dish_type}
          calorie={calorie}
          description={description}
          card_cover={card_cover}
          handleOk={this.handleOk}
        />
      </div>
    );
  }
}

export default DishCard;
