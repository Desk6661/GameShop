import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            const { token, user } = response.data;

            login(user, token);

            setSuccess("Login successful!");

            console.log("Logged in user:", user);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-zinc-950 px-6 py-16 text-white">
            <div className="mx-auto flex max-w-md justify-center">

                <div className="w-full">

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <Link
                            to="/"
                            className="text-3xl font-bold tracking-tight text-white"
                        >
                            Game<span className="text-zinc-400">Shop</span>
                        </Link>

                        <h1 className="mt-8 text-3xl font-bold tracking-tight">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-sm text-zinc-500">
                            Sign in to continue to GameShop.
                        </p>
                    </div>

                    {/* Login Card */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl sm:p-8">

                        {/* Error */}
                        {error && (
                            <div className="mb-5 rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3">
                                <p className="text-sm text-red-400">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Success */}
                        {success && (
                            <div className="mb-5 rounded-lg border border-green-900/50 bg-green-950/30 px-4 py-3">
                                <p className="text-sm text-green-400">
                                    {success}
                                </p>
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-zinc-300"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-zinc-300"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-white px-4 py-3 font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.99]"
                            >
                                Login
                            </button>

                        </form>

                        {/* Register */}
                        <div className="mt-7 border-t border-zinc-800 pt-6 text-center">
                            <p className="text-sm text-zinc-500">
                                Don't have an account?
                            </p>

                            <Link
                                to="/register"
                                className="mt-2 inline-block text-sm font-semibold text-white transition hover:text-zinc-400"
                            >
                                Create an account →
                            </Link>
                        </div>

                    </div>

                    {/* Back to Store */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/"
                            className="text-sm text-zinc-600 transition hover:text-zinc-300"
                        >
                            ← Back to Store
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;