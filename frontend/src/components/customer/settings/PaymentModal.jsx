import React, { Component } from "react";
import { Modal, Divider } from "antd";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  StripeProvider,
  Elements,
  injectStripe
} from "react-stripe-elements";

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4"
        },
        padding
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

class _PaymentModal extends Component {
  constructor() {
    super();
    this.state = {
      billing_error: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    if (this.props.stripe) {
      this.props.stripe.createToken().then(payload => {
        var state = this.state;
        var token = payload;
        if (token.token) {
          state.stripe_token = token;
          this.props.closeModal();
          this.props.UpdatePayment(state);
        } else {
          state["billing_error"] = token.error.message;
          this.setState({
            ...state
          });
        }
      });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  }
  render() {
    return (
      <Modal
        title="Your Card Information"
        visible={this.props.visible}
        footer={null}
        closable={false}
        className="settings-modal"
      >
        {this.state.billing_error}
        Card Number:
        <CardNumberElement {...createOptions(this.props.fontSize)} />
        Expiry Date:
        <CardExpiryElement {...createOptions(this.props.fontSize)} />
        CVC Number:
        <CardCVCElement {...createOptions(this.props.fontSize)} />
        <Divider />
        <div className="modal-footer">
          <span onClick={this.props.closeModal} className="cancel">
            Cancel
          </span>
          <div onClick={this.handleSubmit} className="button button--dark">
            Update My Card
          </div>
        </div>
      </Modal>
    );
  }
}
const PaymentModal = injectStripe(_PaymentModal);

const EditPaymentModal = props => (
  <Elements>
    <PaymentModal {...props} />
  </Elements>
);

const PaymentModalApp = props => (
  <StripeProvider apiKey="pk_test_Ofv6CZA2cPoCLp4rLSQeFBhC">
    <EditPaymentModal {...props} />
  </StripeProvider>
);

export default PaymentModalApp;
