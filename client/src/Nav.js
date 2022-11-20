import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "./globalState/GlobalState";

const Nav = () => {
	const { user, dispatch } = useContext(GlobalContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		localStorage.removeItem("user");
		navigate("/");
	};

	return (
		<div>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>

				{user ? (
					<>
						<li>
							<Link to="/profile">Profile</Link>
						</li>
						<li>
							<Link onClick={handleLogout}>Logout</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/register">Register</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
					</>
				)}
			</ul>
		</div>
	);
};

export default Nav;
