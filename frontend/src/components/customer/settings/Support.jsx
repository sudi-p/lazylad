import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Support extends Component {
	render() {
		return (
			<div className="support">
				<div className="title">Contact Support</div>
				Missing or damaged ingredients? Questions or comments? Reach us by
				e-mail or by phone:
				<div className="contact-info">
					<div className="contact-box">
						<div className="contact-box_title">Support Email</div>
						<div className="contact-box_value">contact@redlentils.com</div>
						<div className="contact-box_description">
							Please include a detailed description of your issue and we'll
							respond as soon as possible.
						</div>
					</div>
					<div className="contact-box">
						<div className="contact-box_title">Call Us</div>
						<div className="contact-box_value">
							(646) 891-4349 or (888) 278-4349
						</div>
						<div className="contact-box_description">
							Monday-Friday, 10am-6pm EST (Phone lines closed on Labor Day.
							Closed on Thanksgiving and Christmas.)
						</div>
					</div>
				</div>
				To stop your weekly recurring deliveries , see{" "}
				<NavLink to="/account/settings/subscriptions">Plan Settings </NavLink>
			</div>
		);
	}
}

export default Support;
