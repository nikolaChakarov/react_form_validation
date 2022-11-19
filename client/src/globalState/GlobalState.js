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
                    body: JSON.stringify(user),
                })
            ).json();

            console.log(dbResponse);
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
            value={{ user: state.user, dispatch, registerUser }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
