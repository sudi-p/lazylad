import React, { Component } from "react";
import Info from "./Info";
import { Modal, Divider, Select, Radio } from "antd";
const Option = Select.Option;

class SubscriptionsEditModal extends Component {
	constructor() {
		super();
		this.state = {
			plan_type: "1",
			dishes_per_week: "5",
			delivery_day: "Friday",
			weekly_recurring_deliveries: false
		};
	}
	componentWillMount() {
		let subscription = this.props.subscription;
		this.setState({
			plan_type: subscription.get("plan_type"),
			dishes_per_week: subscription.get("number_of_dishes"),
			delivery_day: subscription.get("delivery_day"),
			weekly_recurring_deliveries: false
		});
	}
	handlePlanTypeChange = e => {
		this.setState({
			plan_type: e
		});
	};
	submitData = () => {
		this.props.UpdateSubscription(this.state);
		this.props.closeModal();
	};
	handleDishNumberChange = e => {
		this.setState({
			dishes_per_week: e.target.value
		});
	};
	toggleRecurrence = () => {
		this.setState({
			weekly_recurring_deliveries: !this.state.weekly_recurring_deliveries
		});
	};
	render() {
		return (
			<Modal
				title="Meals"
				visible={this.props.visible}
				footer={null}
				closable={false}
				onOk={this.props.closeModal}
				className="settings-modal"
				bodyStyle={{'padding': '10'}}
			>
				Changes will apply to all deliveries scheduled on or after next Saturday. If you have made any specific recipe selections, they
				could be reset.
				<div className="info">
					<div className="info-label">
						<div className="info-label--white">Plan Type</div>
					</div>
					<div className="info-value">
						<Select
							size="large"
							defaultValue={this.state.plan_type + "- Person"}
							style={{ marginTop: 1 }}
							onChange={this.handlePlanTypeChange.bind("plan_type")}
						>
							<Option value="1">1 - Person</Option>
							<Option value="2">2 - Person</Option>
						</Select>
					</div>
				</div>
				<div className="info">
					<div className="info-label">
						<div className="info-label--white">Dishes Per Week</div>
					</div>
					<div className="info-value">
						<Radio.Group
							onChange={this.handleDishNumberChange}
							defaultValue={this.state.dishes_per_week}
							buttonStyle="solid"
						>
							<Radio.Button value="3"> 3 </Radio.Button>
							<Radio.Button value="5"> 5 </Radio.Button>
						</Radio.Group>
					</div>
				</div>
				<div className="info">
					<div className="info-label">
						<div className="info-label--white">Weekly Recurring Deliveries</div>
					</div>
					<div className="info-value">
						{this.state.weekly_recurring_deliveries ? "Active " : "Not Active "}{" "}
						|{" "}
						<span className="toggle-recurrence" onClick={this.toggleRecurrence}>
							{this.state.weekly_recurring_deliveries ? "Turn Off " : "Turn On"}
						</span>
					</div>
				</div>
				<Divider />
				<div className="modal-footer">
					<span onClick={this.props.closeModal} className="cancel">
						Cancel
					</span>
					<div onClick={this.submitData} className="button button--dark">
						Update My Plan Settings
					</div>
				</div>
			</Modal>
		);
	}
}

class Subscriptions extends Component {
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
		let subscription = this.props.subscription;
		let plan_type = "";
		let number_of_dishes = "";
		let delivery_day = "";
		if (subscription) {
			plan_type = subscription.get("plan_type") + "-Person";
			number_of_dishes = subscription.get("number_of_dishes");
			delivery_day = subscription.get("delivery_day") + "s";
		}
		return (
			<div className="setting">
				<h3 className="content--title">Meals</h3>
				<div onClick={this.showModal} className="edit-button">
					<div className="button button--light">Edit</div>
				</div>
				<div className="info-list">
					<Info label="Plan Type" value={plan_type} />
					<Info label="Dishes per week" value={number_of_dishes} />
					<Info label="Delivery Day" value={delivery_day} />
					<Info label="Changeable before" value="3rd September" />
					<Info label="Weekly Recurring Deliveries" value="Active" />
				</div>
				<SubscriptionsEditModal
					subscription={subscription}
					{...this.state}
					showModal={this.showModal}
					closeModal={this.closeModal}
					UpdateSubscription={this.props.UpdateSubscription}
				/>
			</div>
		);
	}
}

export default Subscriptions;
