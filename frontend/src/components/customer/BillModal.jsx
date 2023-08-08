import React, { Component } from "react";
import { Modal, Divider } from "antd";

class BillModal extends Component {
  render() {
    let next_date = this.props.next_date;
    let title = "Change before 9PM on " + next_date.toString().slice(0, 10);
    let subtotal_val = parseFloat(this.props.subtotal, 10);
    let subtotal = "$" + subtotal_val;
    let shipping = this.props.shipping;
    let total = subtotal_val;
    let shipping_val = 0;
    if (shipping === 0) {
      shipping = "Free";
    } else {
      shipping_val = parseFloat(shipping, 10);
      shipping = "$" + shipping;
      total = subtotal_val + shipping_val;
    }
    return (
      <Modal
        title={title}
        visible={this.props.visible}
        onCancel={this.props.handleOk}
        footer={null}
        className="bill-modal"
      >
        <p>
          <span className="left"> Subtotal</span>
          <span className="right"> {subtotal}</span>
        </p>
        <Divider />
        <p>
          <span className="left"> Shipping</span>
          <span className="right"> {shipping}</span>
        </p>
        <Divider />
        <p>
          <strong>
            <span className="left"> Total</span>
            <span className="right"> {total}</span>
          </strong>
        </p>
        <Divider />
      </Modal>
    );
  }
}

export default BillModal;
