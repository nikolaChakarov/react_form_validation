import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./globalState/GlobalState";

const Nav = () => {
    const { user } = useContext(GlobalContext);

    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/form">Form</Link>
                </li>
                {user && (
                    <li>
                        <Link to="/logout">Logout</Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Nav;
