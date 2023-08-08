import React, { Component } from "react";
import Info from "./Info";
import PaymentModal from "./PaymentModal";

class Payment extends Component {
	constructor() {
		super();
		this.state = {
			visible: false
		};
	}
	showModal = () => {
		this.setState({
			visible: true
		});
	};
	closeModal = () => {
		this.setState({
			visible: false
		});
	};
	render() {
		let payment = this.props.payment;
		let last_4 = "";
		let card_type = "";
		let card_name = "";
		let card_expiration_month = "";
		let card_expiration_year = "";
		if (payment) {
			last_4 = payment.get("last_4");
			card_type = payment.get("card_type");
			card_name = payment.get("card_name");
			card_expiration_month = payment.get("card_expiration_month");
			card_expiration_year = payment.get("card_expiration_year");
		}
		return (
			<div className="setting">
				<h3 className="content--title">Your Payment Info</h3>
				<div onClick={this.showModal} className="edit-button">
					<div className="button button--light">Edit</div>
				</div>
				<div className="info-list">
					<Info label="Name On Card" value={card_name} />
					<Info label="Card Type" value={card_type} />
					<Info label="Card Number" value={"Ending in " + last_4} />
					<Info
						label="Expiration"
						value={card_expiration_month + "/" + card_expiration_year}
					/>
				</div>
				<PaymentModal
					{...this.state}
					closeModal={this.closeModal}
					showModal={this.showModal}
					UpdatePayment={this.props.UpdatePayment}
				/>
			</div>
		);
	}
}

export default Payment;
