import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await api.post("/auth/register", {
                name,
                email,
                password
            });

            setSuccess("Account created successfully!");

            setTimeout(() => {
                navigate("/login");
            }, 1000);
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
                            Create your account
                        </h1>

                        <p className="mt-2 text-sm text-zinc-500">
                            Join GameShop and start building your library.
                        </p>
                    </div>

                    {/* Register Card */}
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

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-zinc-300"
                                >
                                    Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    placeholder="Your name"
                                    autoComplete="name"
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                                />
                            </div>

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
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-medium text-zinc-300"
                                >
                                    Confirm Password
                                </label>

                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Confirm your password"
                                    autoComplete="new-password"
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-white px-4 py-3 font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.99]"
                            >
                                Create Account
                            </button>

                        </form>

                        {/* Login */}
                        <div className="mt-7 border-t border-zinc-800 pt-6 text-center">
                            <p className="text-sm text-zinc-500">
                                Already have an account?
                            </p>

                            <Link
                                to="/login"
                                className="mt-2 inline-block text-sm font-semibold text-white transition hover:text-zinc-400"
                            >
                                Login →
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

export default Register;