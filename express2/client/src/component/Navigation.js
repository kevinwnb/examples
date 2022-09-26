import { useState } from "react";
import { Link } from "react-router-dom"

function Navigation(props) {

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/downloads">Downloads</Link>
            <Link to="/products">Products</Link>
            {!props.token && <Link to="/login">Login</Link>}
            {!props.token && <Link to="/register">Register</Link>}
            {props.token && <a href="javascript:void(0)" className="btn btn-outline-danger" onClick={() => props.logout()}>Logout</a>}
        </nav>
    )
}

export default Navigation