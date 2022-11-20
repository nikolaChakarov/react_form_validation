import { useReducer, createContext } from "react";
import AppReducer from "./AppReducer";

const API = "http://localhost:5005/api";
const init = {
	user: localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user"))
		: null,
	isLoading: false,
	error: false,
	registerUser(user) {},
};

export const GlobalContext = createContext(init);

export const GlobalProvider = function ({ children }) {
	const [state, dispatch] = useReducer(AppReducer, init);
	console.log(state);

	const registerUser = async (user) => {
		dispatch({
			type: "LOADING",
		});

		try {
			const dbResponse = await (
				await fetch(`${API}/users/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify(user),
				})
			).json();

			if (!dbResponse.success) {
				throw dbResponse.message;
			}

			dispatch({
				type: "REGISTER/LOGIN",
				payload: dbResponse.username,
			});

			localStorage.setItem("user", JSON.stringify(dbResponse.username));
		} catch (err) {
			console.log(err);
			dispatch({
				type: "ERROR",
				payload: err,
			});
		}
	};

	return (
		<GlobalContext.Provider
			value={{
				user: state.user,
				isLoading: state.isLoading,
				error: state.error,
				dispatch,
				registerUser,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
