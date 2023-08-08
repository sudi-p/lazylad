import React, { Component } from "react";
import DishModal from "../common/DishModal";
import { Link } from "react-router-dom";
import { Row, Col, Icon } from "antd";

class MenuItem extends Component {
  constructor() {
    super();
    this.state = { visible: false };
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
  render() {
    let dish_image = this.props.dish_image;
    let dish_title = this.props.dish_title;
    let dish_description = this.props.dish_description;
    let calorie = this.props.calorie;
    let is_vegeterian = this.props.is_vegeterian;
    let ingredients_description = this.props.ingredients_description;
    let dish_type = "Non Vegeterian";
    if (is_vegeterian) {
      dish_type = "Vegeterian";
    }
    const card_cover = {
      backgroundImage: "url(" + dish_image + ")"
    };
    return (
      <div className="current-menu-item">
        <div className="row">
          <div className="col-1" >
            <div className="dish_image" style={card_cover}>
              
            </div>
          </div>
          <div className="col-2" >
            <div className="details">
              <div onClick={this.showModal} className="content-title">
                {dish_title}
              </div>
              <div className="content-text description-wrapper">
                {dish_description}
              </div>
              <div className="content-text">
                {calorie}
                Cal
              </div>
            </div>
          </div>
        </div>
        <DishModal
          dish_name={dish_title}
          calorie={calorie}
          dish_type={dish_type}
          description={dish_description}
          card_cover={card_cover}
          visible={this.state.visible}
          handleOk={this.handleOk}
          ingredients_description={ingredients_description}
        />
      </div>
    );
  }
}

class Menu extends Component {
  render() {
    let menu_items = this.props.menu_items;
    let menu_display = [];
    if (menu_items) {
      menu_display = menu_items.map(dish => {
        const dish_name = dish.get("dish_name");
        const description = dish.get("description");
        const image_url = dish.get("image_url");
        const calorie = dish.get("calorie");
        const is_vegeterian = dish.get("is_vegeterian");
        const ingredients_description = dish.get("ingredients_description");
        if (dish.get("selected")) {
          return (
            <MenuItem
              key={dish_name}
              dish_description={description}
              dish_title={dish_name}
              calorie={calorie}
              is_vegeterian={is_vegeterian}
              ingredients_description={ingredients_description}
              dish_image={image_url}
            />
          );
        } else {
          return null;
        }
      });
    }
    return <div className="menu-list">{menu_display}</div>;
  }
}

const New = () => (
  <div className="new">
    <div className="section-title">Whats New</div>
    <div className="image-wrapper">
      <img
        className="rating"
        src="http://res.cloudinary.com/dtqxwjmwn/image/upload/v1531326970/rating.png"
        alt="rating"
      />
    </div>
    <div className="content-title">Tell us what you think</div>
    <div className="content-text">
      Help us better tailor our menus to your tastes by rating your past
      recipes.
    </div>
    <Link to="/account/deliveryHistory">
      <div className="button button--light">
        <strong>RATE MY RECIPES</strong>
      </div>
    </Link>
  </div>
);

const InfoBox = props => {
  let infobox_content = "";
  if (props.status === 3) {
    if (props.skipped) {
      infobox_content = (
        <div className="text">
          <div className="title">You've skipped this delivery</div>
          <div className="content">
            Check out what your fellow chefs are cooking for next weeks in upcoming section.
          </div>
        </div>
      );
    } else {
      infobox_content = (
        <div className="text">
          <div className="title">You will soon receive the food.</div>
          <div className="content">Hope you will enjoy your meal. </div>
        </div>
      );
    }
  } else {
    infobox_content = (
      <div className="text">
        <div className="title">No Current Menu</div>
        <div className="content">You don't have any order for this week. </div>
      </div>
    );
  }
  return (
    <div className="skip-box">
      <div className="background" />
      {infobox_content}
    </div>
  );
};

class SimpleInfo extends Component {
  constructor() {
    super();
    this.state = {
      show_simpleinfo: false
    };
    this.toggleSimpleInfo = this.toggleSimpleInfo.bind(this);
  }
  toggleSimpleInfo() {
    this.setState({
      show_simpleinfo: !this.state.show_simpleinfo
    });
  }
  render() {
    let simpleinfo_content = "";
    if (this.props.status === 3) {
      if (this.props.skipped) {
        simpleinfo_content = (
          <div className="content-text"> You've skipped this delivery</div>
        );
      } else {
        simpleinfo_content = (
          <div className="content-text">
            {" "}
            Some content about delivery information.
          </div>
        );
      }
    } else {
      simpleinfo_content = (
        <div className="content-text">
          {" "}
          You don't have any order for this week.
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="simple-info">
          <div className="section-title">This Weeks Menu</div>
          {simpleinfo_content}
        </div>
        <div className="simple-info--sm">
          <div onClick={this.toggleSimpleInfo} className="section-title">
            This Weeks Menu <Icon type="down" />
          </div>
          {this.state.show_simpleinfo ? simpleinfo_content : ""}
        </div>
      </React.Fragment>
    );
  }
}

class CurrentMenu extends Component {
  render() {
    const skipped = this.props.menu.get("skipped");
    const menu_items = this.props.menu.get("menu_items");
    return (
      <div className="current-menu">
        <SimpleInfo skipped={skipped} status={this.props.status} />
        <div className="main">
          <InfoBox skipped={skipped} status={this.props.status} />
          <Menu menu_items={menu_items} />
        </div>
        <New />
      </div>
    );
  }
}

export default CurrentMenu;
