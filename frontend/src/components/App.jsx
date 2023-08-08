import React, { Component } from "react";
import View from "./View";
import LoggedInCustomerView from "./LoggedInCustomerView";
import "antd/dist/antd.css";
import "./styles/App.module.css";
import "./styles/Loading.module.css";
const { Provider, Consumer } = React.createContext("test");

class AppProvider extends Component {
	render() {
		return (
			<Provider
				value={{
					state: this.props
				}}
			>
				<App {...this.props} />
			</Provider>
		);
	}
}

class App extends Component {
	render() {
		return this.props.signup_complete ? <LoggedInCustomerView /> : <View />;
	}
}

export default AppProvider;
export { Consumer };
