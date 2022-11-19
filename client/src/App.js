import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalContext } from "./globalState/GlobalState";
import Nav from "./Nav";
import Home from "./Home";
import Register from "./form/Register";
import Protected from "./Protected";

const App = () => {
    const { user } = useContext(GlobalContext);

    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/register"
                    element={
                        <Protected user={user}>
                            <Register />
                        </Protected>
                    }
                />
                {/* <Route
                    path="/login"
                    element={
                        <Protected user={user}>
                            <Form type={"login"} />
                        </Protected>
                    }
                /> */}
                {/* <Route
                    path="/profile"
                    element={
                        <Protected user={user}>
                            <Form type={"profile"} />
                        </Protected>
                    }
                /> */}
            </Routes>
        </div>
    );
};

export default App;
