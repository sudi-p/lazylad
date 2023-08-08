import React from "react";
import { Modal } from "antd";

const DishModal = props => {
  return (
    <Modal
      title={this.dish_name}
      style={{ top: 100 }}
      visible={props.visible}
      footer={null}
      closable={false}
      className="dish-modal"
    >
      <div className="information">
        <div style={props.card_cover} className="modal_image" />
        <div className="modal-info-wrapper">
          <p>
            <p>
              <span className="title">Name: </span>
              {props.dish_name}
            </p>
            <p>
              <span className="title">Type: </span>
              {props.dish_type}
            </p>
            <span className="title">Calorie:</span> {props.calorie} Cal
          </p>
          <p>
            <span className="title">Description:</span> {props.description}
          </p>
          <p>
            <span className="title">Ingredients:</span>
            {props.ingredients_description}
          </p>
        </div>
      </div>
      <button onClick={props.handleOk} className="ok">
        Ok
      </button>
    </Modal>
  );
};

export default DishModal;
