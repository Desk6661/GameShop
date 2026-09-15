import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav>
            <Link to="/">GameShop</Link>

            <div>
                {isAuthenticated ? (
                    <>
                        <span>Hello, {user.name}</span>

                        <Link to="/profile">
                            Profile
                        </Link>

                        <button onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;