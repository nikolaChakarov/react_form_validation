import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalContext } from "./globalState/GlobalState";
import Nav from "./Nav";
import Home from "./Home";
import Form from "./Form";
import Protected from "./Protected";

const App = () => {
    const { user } = useContext(GlobalContext);

    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/form"
                    element={
                        <Protected user={user}>
                            <Form />
                        </Protected>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
