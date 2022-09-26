import { useState } from "react";

const { Link } = require("react-router-dom");




function Navigation(props) {

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/downloads">Downloads</Link>
            <Link to="/products">Products</Link>
            {!props.token[0] && <Link to="/login">Login</Link>}
            {!props.token[0] && <Link to="/register">Register</Link>}
            {props.token[0] && <a href="javascript:void(0)" className="btn btn-outline-danger" onClick={() => props.logout()}>Logout</a>}
        </nav>
    )
}

export default Navigation