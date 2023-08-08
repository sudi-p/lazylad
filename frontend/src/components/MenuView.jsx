import React, { Component } from "react";
import { Link } from "react-router-dom";
import DishCard from "./common/DishCard";
import "./styles/Menu.module.css";
import { Row, Col, Affix, Icon } from "antd";

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
    this.onLeftClick = this.onLeftClick.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
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
    const menus = this.props.menus;
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let active_menu = "";
    let active_menu_month = "";
    let active_menu_date = "";
    const menus_display = menus.map(menu => {
      let plan_week_month = menu.get("week").slice(5, 7);
      let plan_week_date = menu.get("week").slice(8, 10);
      plan_week_month = months[parseInt(plan_week_month, 10) - 1];
      if (this.state.active_menu_id === menus.indexOf(menu)) {
        active_menu = menu;
        active_menu_month = plan_week_month;
        active_menu_date = plan_week_date;
      }
      const dishes_display = menu.get("menu_items").map(dish => {
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
              calorie={dish.get("calorie")}
            />
          </Col>
        );
      });
      return (
        <div key={menu.get("id")} className="info-wrapper">
          <div className="menu-header--large">
            <Affix offsetTop={68}>
              <div className="menu-header-wrapper">
                <div className="menu-header">
                  <div className="arrival-information">
                    <div className="arrival_week">
                      Week Of {plan_week_month} {plan_week_date}
                    </div>
                  </div>
                  <div className="menu-header--options">
                    <Link to="/signup/user/">
                      <button className="button button--dark">
                        <strong>Start Ordering</strong>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </Affix>
          </div>
          <Row type="flex" justify="start" className="dishes">
            {dishes_display}
          </Row>
        </div>
      );
    });
    let left_arrow_wrapper = {};
    let right_arrow_wrapper = {};
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
    let active_menu_dishes_display = "";
    if (active_menu) {
      active_menu_dishes_display = active_menu.get("menu_items").map(dish => {
        return <DishCardWrapper key={dish.get("id")} dish={dish} />;
      });
    }
    const week_style = {
      paddingLeft: 30,
      paddingTop: 10
    };
    return (
      <React.Fragment>
        <div className="menu">{menus_display}</div>
        <div className="menu-small">
          <Affix offset={0}>
            <div className="header">
              <div
                style={left_arrow_wrapper}
                className="arrow_wrapper arrow_wrapper--left"
              >
                <Icon onClick={this.onLeftClick} type="left" />
              </div>
              <div style={week_style} className="week">
                <div className="menu-header--small">
                  <div className="arrival-information">
                    <div className="arrival_week">
                      Week Of {active_menu_month} {active_menu_date}
                    </div>
                  </div>
                  <div className="menu-header--options">
                    <div className="menu-header--optionswrapper">
                      <Link to="/signup/user/">
                        <button className="button button--dark">
                          <strong>Start Ordering</strong>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
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
  }
}

export default Menu;
