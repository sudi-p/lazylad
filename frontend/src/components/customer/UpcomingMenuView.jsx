import React, { Component } from "react";
import DishCard from "../common/DishCard";
import "../styles/Menu.module.css";
import { StoreState } from "../../constants/StoreState";
import MenuHeader from "./UpcomingMenuHeader";
import { Row, Col, Icon, Affix } from "antd";

const DishCardWrapper = props => {
  let dish = props.dish;
  return (
    <Col
      key={dish.get("id")}
      lg={{ span: 6, offset: 0 }}
      md={{ span: 8, offset: 0 }}
      sm={{ span: 12, offset: 0 }}
      xs={{ span: 24, offset: 0 }}
    >
      <DishCard
        image_url={dish.get("image_url")}
        id={dish.get("id")}
        is_vegeterian={dish.get("is_vegeterian")}
        dish_name={dish.get("dish_name")}
        description={dish.get("description")}
        selected={dish.get("selected")}
        calorie={dish.get("calorie")}
        menu_skipped={props.menu_skipped}
        dish_selection={props.dish_selection}
        new_dish_list={props.new_dish_list}
        changeDishList={props.changeDishList}
        app_state={props.app_state}
      />
    </Col>
  );
};

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      active_menu_id: 0
    };
    this.handleSkip = this.handleSkip.bind(this);
    this.handleUnskip = this.handleUnskip.bind(this);
    this.changeDishList = this.changeDishList.bind(this);
    this.saveDishChange = this.saveDishChange.bind(this);
    this.onLeftClick = this.onLeftClick.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
  }
  handleSkip(id) {
    this.props.handleSkip(id);
  }
  handleUnskip(id) {
    this.props.handleUnskip(id);
  }
  changeDishList(dish_list) {
    this.props.changeDishList(dish_list);
  }
  saveDishChange(weeklyorder_id, dish_list) {
    this.props.saveDishChange(weeklyorder_id, dish_list);
  }
  onLeftClick() {
    let active_menu_id = this.state.active_menu_id;
    this.setState({
      active_menu_id: active_menu_id - 1
    });
  }
  onRightClick() {
    let active_menu_id = this.state.active_menu_id;
    this.setState({
      active_menu_id: active_menu_id + 1
    });
  }
  render() {
    if (this.props.status === StoreState.READY) {
      const app_state = this.props.app_state;
      const dish_change_week_id = this.props.dish_change_week_id;
      const new_dish_list = this.props.new_dish_list;
      let dish_list_temp = [];
      new_dish_list.map(dish => {
        dish_list_temp.push(dish);
        return null;
      });
      const menus = this.props.menus;
      let plans_display = [];
      let active_menu = "";
      plans_display = menus.map(menu => {
        let dish_selection = false;
        if (menu.get("id") === dish_change_week_id) {
          dish_selection = true;
        }
        if (this.state.active_menu_id === menus.indexOf(menu)) {
          active_menu = menu;
        }
        const dishes_display = menu.get("menu_items").map(dish => {
          return (
            <DishCardWrapper
              key={dish.get("id")}
              dish={dish}
              menu_skipped={menu.get("skipped")}
              dish_selection={dish_selection}
              new_dish_list={dish_list_temp}
              changeDishList={this.changeDishList}
              app_state={app_state}
            />
          );
        });
        let change_dish_compliment_style = {};
        if (this.props.dish_change_week_id) {
          if (menu.get("id") !== this.props.dish_change_week_id) {
            change_dish_compliment_style = {
              opacity: "0.1",
              zIndex: "99",
              pointerEvents: "none"
            };
          }
        }
        return (
          <div
            key={menu.get("id")}
            style={change_dish_compliment_style}
            className="info-wrapper"
          >
            <MenuHeader
              menu={menu}
              {...this.props}
              dish_list={dish_list_temp}
              handleUnskip={this.handleUnskip}
              saveDishChange={this.saveDishChange}
              handleSkip={this.handleSkip}
            />
            <Row type="flex" justify="start" className="dishes">
              {dishes_display}
            </Row>
          </div>
        );
      });
      let active_menu_header = "";
      let active_menu_dishes_display = "";
      if (active_menu) {
        let dish_selection = false;
        if (active_menu.get("id") === dish_change_week_id) {
          dish_selection = true;
        }
        active_menu_header = (
          <MenuHeader
            menu={active_menu}
            {...this.props}
            dish_list={dish_list_temp}
            handleUnskip={this.handleUnskip}
            saveDishChange={this.saveDishChange}
            handleSkip={this.handleSkip}
            active_menu_id={this.state.active_menu_id}
          />
        );
        active_menu_dishes_display = active_menu.get("menu_items").map(dish => {
          return (
            <DishCardWrapper
              key={dish.get("id")}
              dish={dish}
              menu_skipped={active_menu.get("skipped")}
              dish_selection={dish_selection}
              new_dish_list={dish_list_temp}
              changeDishList={this.changeDishList}
              app_state={app_state}
            />
          );
        });
      }

      let left_arrow_wrapper = {};
      let right_arrow_wrapper = {};
      // let active_menu_header_wrapper = { width : '80%'}
      if (this.state.active_menu_id === 0) {
        left_arrow_wrapper = {
          opacity: "0.5",
          pointerEvents: "none"
        };
      }
      if (this.state.active_menu_id === menus.size - 1) {
        right_arrow_wrapper = {
          opacity: "0.5",
          pointerEvents: "none"
        };
      }
      if (this.props.dish_change_week_id) {
        left_arrow_wrapper = {
          display: "none"
        };
        right_arrow_wrapper = {
          display: "none"
        };
      }
      return (
        <React.Fragment>
          <div className="menu">{plans_display}</div>
          <div className="menu-small">
            <Affix offset={0}>
              <div className="header">
                <div
                  style={left_arrow_wrapper}
                  className="arrow_wrapper arrow_wrapper--left"
                >
                  <Icon onClick={this.onLeftClick} type="left" />
                </div>
                <div className="week">{active_menu_header}</div>
                <div
                  style={right_arrow_wrapper}
                  className="arrow_wrapper arrow_wrapper--right"
                >
                  <Icon onClick={this.onRightClick} type="right" />
                </div>
              </div>
            </Affix>
            {active_menu_dishes_display}
          </div>
        </React.Fragment>
      );
    } else if (this.props.status === StoreState.LOADING) {
      return <div className="loading" />;
    }else if (this.props.status === StoreState.EMPTY) {
      return (
        <div>
          upcoming Menu nai chaina.
        </div>
      );
    }
     else if (this.props.status === StoreState.ERROR) {
      return <div> No Upcoming Menu Found.... </div>;
    }
  }
}

export default Menu;
