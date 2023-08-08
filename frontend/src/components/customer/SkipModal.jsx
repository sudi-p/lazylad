import React, { Component } from "react";
import { Modal } from "antd";

class SkipModal extends Component {
  handleOk(weeklyorder_id) {
    this.props.handleOk(weeklyorder_id);
  }
  handleCancel() {
    this.props.handleCancel();
  }
  render() {
    let title =
      "Are you sure you want to skip your order on " +
      this.props.plan_week_month +
      " " +
      this.props.plan_week_day +
      "?";
    return (
      <Modal
        style={{ top: 100 }}
        title={title}
        visible={this.props.visible}
        footer={null}
        closable={false}
        className="skip-modal"
      >
        If you don’t like the meals selected, you can always try changing your
        menu to explore different dishes!
        <div className="skip_footer">
          <button
            onClick={this.props.handleCancel.bind(this)}
            className="button button--light"
          >
            GO BACK
          </button>
          <button
            onClick={this.handleOk.bind(this, this.props.weeklyorder_id)}
            className="button button--dark"
          >
            SKIP
          </button>
        </div>
      </Modal>
    );
  }
}

export default SkipModal;
