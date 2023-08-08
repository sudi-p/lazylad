import React, { Component } from "react";
import Info from "./Info";
import Input from "../../common/Input";
import { Modal, Divider } from "antd";

class AccountEditModal extends Component {
	constructor() {
		super();
		this.state = {
			first_name: "",
			first_name_error: "",
			last_name: "",
			last_name_error: "",
			email: "",
			email_error: "",
			password: "",
			password_error: "",
			password_2: "",
			password_2_error: ""
		};
	}
	componentWillMount() {
		let account = this.props.account;
		this.setState({
			first_name: account.get("first_name"),
			last_name: account.get("last_name"),
			email: account.get("email"),
			password: "",
			password_2: ""
		});
	}
	validateData = () => {
		let account_data = this.state;
		account_data.error = false;
		account_data.first_name_error = "";
		account_data.last_name_error = "";
		account_data.email_error = "";
		account_data.password_error = "";
		if (account_data.first_name === "") {
			account_data.first_name_error = "First Name is required.";
			account_data.error = true;
		}
		if (account_data.last_name === "") {
			account_data.last_name_error = "Last Name is required.";
			account_data.error = true;
		}
		if (account_data.email === "") {
			account_data.email_error = "Email is required.";
			account_data.error = true;
		} else {
			const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			const valid_email = re.test(String(account_data.email).toLowerCase());
			if (!valid_email) {
				account_data.email_error = "Valid Email is required.";
				account_data.error = true;
			}
		}
		if (account_data.password) {
			if (account_data.password.length < 6) {
				account_data.password_error =
					"Password must be six characters or more.";
				account_data.error = true;
			} else if (account_data.password !== account_data.password_2) {
				account_data.password_error = "Passwords doesnot match.";
				account_data.error = true;
			}
		}
		return account_data;
	};
	submitData = () => {
		const account_data = this.validateData();
		if (account_data.error) {
			this.setState({
				...account_data
			});
		} else {
			this.props.UpdateAccount(this.state);
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
				title="Account"
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
						<div className="info-label--white">First Name</div>
					</div>
					<div className="info-value">
						<Input
							type="text"
							value={this.state.first_name}
							handleChange={this.handleChange}
							name="first_name"
						/>
						{this.state.first_name_error}
					</div>
				</div>
				<div className="info">
					<div className="info-label">
						<div className="info-label--white">Last Name</div>
					</div>
					<div className="info-value">
						<Input
							type="text"
							value={this.state.last_name}
							handleChange={this.handleChange}
							name="last_name"
						/>
						{this.state.last_name_error}
					</div>
				</div>
				<div className="info">
					<div className="info-label">
						<div className="info-label--white">Email</div>
					</div>
					<div className="info-value">
						<Input
							type="text"
							value={this.state.email}
							handleChange={this.handleChange}
							name="email"
						/>
						{this.state.email_error}
					</div>
				</div>
				<div className="info">
					<div className="info-label">
						<div className="info-label--white">Password</div>
					</div>
					<div className="info-value">
						<Input
							type="text"
							handleChange={this.handleChange}
							name="password"
						/>
						(leave blank to keep existing password)
					</div>
				</div>
				<div className="info">
					<div className="info-label">
						<div className="info-label--white">Password Confirmation</div>
					</div>
					<div className="info-value">
						<Input
							type="text"
							handleChange={this.handleChange}
							name="password_2"
						/>
						{this.state.password_error}
					</div>
				</div>
				<Divider />
				<div className="modal-footer">
					<span onClick={this.props.closeModal} className="cancel">
						Cancel
					</span>
					<div onClick={this.submitData} className="button button--dark">
						Update My Account Settings
					</div>
				</div>
			</Modal>
		);
	}
}

class Account extends Component {
	constructor() {
		super();
		this.state = {
			visible: false,
			account: {}
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
	componentWillMount(){
		this.setState({
			account: this.props.account
		})
	}
	render() {
		let account = this.props.account;
		let name = "";
		let email = "";
		if (account) {
			name = account.get("first_name") + " " + account.get("last_name");
			email = account.get("email");
		}
		return (
			<div className="setting">
				<h3 className="content--title">Your Account</h3>
				<div onClick={this.showModal} className="edit-button">
					<div className="button button--light">Edit</div>
				</div>
				<div className="info-list">
					<Info label="Name" value={name} />
					<Info label="Email" value={email} />
					<Info label="Password" value="********" />
					<Info label="Receive Announcements" value="Yes" />
				</div>
				<AccountEditModal
					account={account}
					{...this.state}
					showModal={this.showModal}
					closeModal={this.closeModal}
					UpdateAccount={this.props.UpdateAccount}
				/>
			</div>
		);
	}
}

export default Account;
