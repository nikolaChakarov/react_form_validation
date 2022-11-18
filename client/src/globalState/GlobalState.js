import { useReducer, createContext } from "react";
import AppReducer from "./AppReducer";

const init = {
    user: null,
};

export const GlobalContext = createContext(init);

export const GlobalProvider = function ({ children }) {
    const [state, dispatch] = useReducer(AppReducer, init);

    return (
        <GlobalContext.Provider value={{ user: state.user }}>
            {children}
        </GlobalContext.Provider>
    );
};
