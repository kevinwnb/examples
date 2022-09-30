import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import $ from "jquery"

function Navigation(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(oldValue => !oldValue)
    }

    useEffect(() => {
        if (isMenuOpen) {

            $("body").css("overflow", "hidden")
            $(".menu").css("width", "100%")
        }
        else {

            $("body").css("overflow", "visible")
            $(".menu").css("width", "0")
        }
    }, [isMenuOpen])

    return (
        <>
            <div className="menu">
                <a href="javascript:void(0)" onClick={toggleMenu} className="xclose"><i className="fa-solid fa-xmark"></i> c</a>
            </div>
            <nav>
                <a href="javascript:void(0)" onClick={toggleMenu} className="menu-bars"><i className="fa fa-bars"></i></a>
                <Link className={(props.activeLink == "home" ? "active" : "")} to="/">Home</Link>
                <Link className={(props.activeLink == "downloads" ? "active" : "")} to="/downloads">Downloads</Link>
                <Link className={(props.activeLink == "products" ? "active" : "")} to="/products">Products</Link>
                {!props.token && <div className="authentication">
                    <Link className={(props.activeLink == "login" ? "active" : "")} to="/login">Login</Link>
                    <Link className={(props.activeLink == "register" ? "active" : "")} to="/register">Register</Link>
                </div>}
                {props.token && <a href="javascript:void(0)" className="logout btn btn-outline-danger" onClick={() => props.logout()}>Logout</a>}
            </nav>
        </>
    )
}

export default Navigation