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
            $(".menu-absoluter").css({ display: "initial", opacity: "1" })
            $(".menu").css("left", "0")
        }
        else {
            $("body").css("overflow", "visible")
            $(".menu-absoluter").css({ display: "none", opacity: "0" })
            $(".menu").css("left", "-300px")
        }
    }, [isMenuOpen])

    return (
        <>
            <div className="menu-absoluter" onClick={() => setIsMenuOpen(false)}>
            </div>
            <div className="menu">
                <div className="pre-xclose">
                    <a href="javascript:void(0)" onClick={toggleMenu} className="xclose h1"><i className="fa fa-times"></i></a>
                </div>
                <div className="items">
                    <Link className={(props.activeLink == "home" ? "active" : "")} to="/">Home</Link>
                    <Link className={(props.activeLink == "downloads" ? "active" : "")} to="/downloads">Downloads</Link>
                    <Link className={(props.activeLink == "products" ? "active" : "")} to="/products">Products</Link>
                    {!props.token && <>
                        <Link className={(props.activeLink == "login" ? "active" : "")} to="/login">Login</Link>
                        <Link className={(props.activeLink == "register" ? "active" : "")} to="/register">Register</Link>
                    </>}
                    {props.token && <a href="javascript:void(0)" className="logout text-danger" onClick={() => props.logout()}>Logout</a>}
                </div>
            </div>
            <nav>
                <a href="javascript:void(0)" onClick={toggleMenu} className="menu-bars"><i className="fa fa-bars"></i></a>
                <div className="menu-inline">
                    <Link className={(props.activeLink == "home" ? "active" : "")} to="/">Home</Link>
                    <Link className={(props.activeLink == "downloads" ? "active" : "")} to="/downloads">Downloads</Link>
                    <Link className={(props.activeLink == "products" ? "active" : "")} to="/products">Products</Link>
                    {!props.token && <div className="authentication">
                        <Link className={(props.activeLink == "login" ? "active" : "")} to="/login">Login</Link>
                        <Link className={(props.activeLink == "register" ? "active" : "")} to="/register">Register</Link>
                    </div>}
                    {props.token && <a href="javascript:void(0)" className="logout text-danger" onClick={() => props.logout()}>Logout</a>}
                </div>
            </nav>
        </>
    )
}

export default Navigation