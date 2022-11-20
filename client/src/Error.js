import React, { useState, useContext } from "react";
import { GlobalContext } from "./globalState/GlobalState";

const Error = function ({ message }) {
	const { dispatch } = useContext(GlobalContext);
	const [hide, setHide] = useState(false);

	const handleClick = () => {
		setHide(true);
		dispatch({
			type: "CLEAR",
		});
	};
	return (
		<div
			style={{
				color: "red",
				border: "2px dashed red",
				display: hide ? "none" : "block",
			}}
		>
			<p>{message}</p>
			<button onClick={handleClick}>close</button>
		</div>
	);
};

export default Error;
