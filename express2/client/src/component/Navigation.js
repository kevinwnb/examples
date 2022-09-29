import { useState } from "react";
import { NavLink } from "react-router-dom"

function Navigation(props) {

    return (
        <nav>
            <NavLink className={(()=>props.activeLink == "home" ? "active" : "")} to="/">Home</NavLink>
            <NavLink className={(()=>props.activeLink == "downloads" ? "active" : "")} to="/downloads">Downloads</NavLink>
            <NavLink className={(()=>props.activeLink == "products" ? "active" : "")} to="/products">Products</NavLink>
            {!props.token && <NavLink to="/login">Login</NavLink>}
            {!props.token && <NavLink to="/register">Register</NavLink>}
            {props.token && <a href="javascript:void(0)" className="btn btn-outline-danger" onClick={() => props.logout()}>Logout</a>}
        </nav>
    )
}

export default Navigation