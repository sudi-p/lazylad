import React from "react";

const Info = props => {
	return (
		<div className="info">
			<div className="info-label">
				<div className="info-label--white">{props.label}</div>
			</div>
			<div className="info-value">{props.value}</div>
		</div>
	);
};

export default Info;
