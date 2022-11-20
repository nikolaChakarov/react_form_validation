import React from "react";

const Success = ({ message, display = "block" }) => {
	return (
		<div style={{ color: "green", border: "2px dashed green", display }}>
			{message}
		</div>
	);
};

export default Success;
