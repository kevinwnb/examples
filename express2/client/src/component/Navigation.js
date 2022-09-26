const { Link } = require("react-router-dom");




function Navigation(){
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/downloads">Downloads</Link>
            <Link to="/products">Products</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
    )
}

export default Navigation