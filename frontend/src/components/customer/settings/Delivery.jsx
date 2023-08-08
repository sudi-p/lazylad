import React, { Component } from "react";
import Info from "./Info";
import Input from "../../common/Input";
import { Modal, Divider } from "antd";

class DeliveryEditModal extends Component {
	constructor() {
		super();
		this.state = {
			address_1: "",
			address_1_error: "",
			address_2: "",
			city: "",
			city_error: "",
			phone: "",
			phone_error: "",
			error: false
		};
	}
	componentWillMount() {
		let delivery = this.props.delivery;
		this.setState({
			address_1: delivery.get("address_1"),
			address_2: delivery.get("address_2"),
			city: delivery.get("city"),
			phone: delivery.get("phone")
		});
	}
	validateData = () => {
		let delivery_data = this.state;
		delivery_data.error = false;
		delivery_data.address_1_error = "";
		delivery_data.city_error = "";
		delivery_data.phone_error = "";
		if (delivery_data.address_1 === "") {
			delivery_data.address_1_error = "Address 1 is required.";
			delivery_data.error = true;
		}
		if (delivery_data.city === "") {
			delivery_data.city_error = "City is required.";
			delivery_data.error = true;
		}
		if (delivery_data.phone === "") {
			delivery_data.phone_error = "Phone Number is required.";
			delivery_data.error = true;
		}
		return delivery_data;
	};
	submitData = () => {
		const delivery_data = this.validateData();
		if (delivery_data.error) {
			this.setState({
				...delivery_data
			});
		} else {
			this.props.UpdateDelivery(this.state);
			this.props.closeModal();
		}
	};
	handleChange = (name, value) => {
		let state = this.state;
		state[name] = value;
		this.setState({
			...state
		});
	};
	render() {
		return (
			<Modal
				title="Delivery"
				visible={this.props.visible}
				footer={null}
				closable={false}
				onOk={this.props.closeModal}
				className="settings-modal"
			>
				Changes will apply to all deliveries scheduled on or after next Saturday. If you have made any specific recipe selections, they
				could be reset.
				<div className="info">
					<div className="info-label">
						<div className="info-label--white">Address 1</div>
					</div>
					<div className="info-value">
						<Input
							type="text"
							value={this.state.address_1}
							handleChange={this.handleChange}
							name="address_1"
						/>
						{this.state.address_1_error}
					</div>
				</div>
				<div className="info">
					<div className="info-label">
						<div className="info-label--white">Address 2</div>
					</div>
					<div className="info-value">
						<Input
							type="text"
							value={this.state.address_2}
							handleChange={this.handleChange}
							name="address_2"
						/>
						{this.state.address_2_error}
					</div>
				</div>
				<div className="info">
					<div className="info-label">
						<div className="info-label--white">City</div>
					</div>
					<div className="info-value">
						<Input
							type="text"
							value={this.state.city}
							handleChange={this.handleChange}
							name="city"
						/>
						{this.state.city_error}
					</div>
				</div>
				<div className="info">
					<div className="info-label">
						<div className="info-label--white">Phone</div>
					</div>
					<div className="info-value">
						<Input
							type="text"
							value={this.state.phone}
							handleChange={this.handleChange}
							name="phone"
						/>
						{this.state.phone_error}
					</div>
				</div>
				<Divider />
				<div className="modal-footer">
					<span onClick={this.props.closeModal} className="cancel">
						Cancel
					</span>
					<div onClick={this.submitData} className="button button--dark">
						Update My Delivery Settings
					</div>
				</div>
			</Modal>
		);
	}
}

class Delivery extends Component {
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
		let delivery = this.props.delivery;
		let first_name = "";
		let last_name = "";
		let name = "";
		let address = "";
		let address_1 = "";
		let address_2 = "";
		let city = "";
		let phone = "";
		if (delivery) {
			first_name = delivery.get("first_name");
			last_name = delivery.get("last_name");
			name = first_name + " " + last_name;
			address_1 = delivery.get("address_1");
			address_2 = delivery.get("address_2");
			city = delivery.get("city");
			if (address_2) {
				address = address_1 + ", " + address_2 + ", " + city;
			} else {
				address = address_1 + ", " + city;
			}
			phone = delivery.get("phone");
		}
		return (
			<div className="setting">
				<h3 className="content--title">Meal Deliveries</h3>
				<div onClick={this.showModal} className="edit-button">
					<div className="button button--light">Edit</div>
				</div>
				<div className="info-list">
					<Info label="Name" value={name} />
					<Info label="Address" value={address} />
					<Info label="Phone" value={phone} />
				</div>
				<DeliveryEditModal
					delivery={delivery}
					{...this.state}
					showModal={this.showModal}
					closeModal={this.closeModal}
					UpdateDelivery={this.props.UpdateDelivery}
				/>
			</div>
		);
	}
}

export default Delivery;
