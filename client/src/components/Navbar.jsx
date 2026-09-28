import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const { cartCount } = useCart();

    return (
        <nav className="border-b border-zinc-800 bg-zinc-950">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold tracking-tight text-white"
                >
                    Game<span className="text-zinc-400">Shop</span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-6">

                    <Link
                        to="/"
                        className="text-sm text-zinc-400 transition hover:text-white"
                    >
                        Store
                    </Link>

                    <Link
                        to="/cart"
                        className="text-sm text-zinc-400 transition hover:text-white"
                    >
                        🛒 Cart
                        {cartCount > 0 && (
                            <span className="ml-1 text-white">
                                ({cartCount})
                            </span>
                        )}
                    </Link>

                    <Link
                        to="/orders"
                        className="text-sm text-zinc-400 transition hover:text-white"
                    >
                        Orders
                    </Link>

                    <Link
                        to="/library"
                        className="text-sm text-zinc-400 transition hover:text-white"
                    >
                        Library
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/profile"
                                className="text-sm text-zinc-400 transition hover:text-white"
                            >
                                Profile
                            </Link>

                            <span className="hidden text-sm text-zinc-500 md:block">
                                Hi, {user.name}
                            </span>

                            <button
                                onClick={logout}
                                className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-sm text-zinc-400 transition hover:text-white"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;