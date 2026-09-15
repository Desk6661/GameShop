import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/">GameShop</Link>

            <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    );
}

export default Navbar;