const AppReducer = function (state, action) {
	switch (action.type) {
		case "REGISTER/LOGIN":
			return {
				...state,
				user: action.payload,
				isLoading: false,
				error: false,
			};

		case "LOGOUT":
			return {
				...state,
				user: null,
				isLoading: false,
				error: false,
			};
		case "LOADING":
			return {
				...state,
				isLoading: true,
			};
		case "ERROR":
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case "CLEAR":
			return {
				...state,
				error: false,
			};

		default:
			return state;
	}
};

export default AppReducer;
