import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
    const { user } = useAuth();

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-zinc-950 px-6 py-12 text-white">
            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="mb-10">
                    <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
                        Account
                    </p>

                    <h1 className="mt-2 text-4xl font-bold tracking-tight">
                        Profile
                    </h1>

                    <p className="mt-2 text-zinc-500">
                        Manage your GameShop account and access your games.
                    </p>
                </div>

                {/* Profile Card */}
                <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 shadow-2xl">

                    {/* Profile Header */}
                    <div className="border-b border-zinc-800 p-6 sm:p-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                            {/* Avatar */}
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-3xl font-bold text-white ring-1 ring-zinc-700">
                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold">
                                    {user?.name}
                                </h2>

                                <p className="mt-1 text-sm text-zinc-500">
                                    {user?.email}
                                </p>

                                <span className="mt-3 inline-flex rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium capitalize text-zinc-300">
                                    {user?.role || "user"}
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="p-6 sm:p-8">

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold">
                                Account Information
                            </h3>

                            <p className="mt-1 text-sm text-zinc-500">
                                Your basic GameShop account details.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {/* Name */}
                            <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5">
                                <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                                    Name
                                </p>

                                <p className="mt-2 font-medium text-zinc-200">
                                    {user?.name}
                                </p>
                            </div>

                            {/* Email */}
                            <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5">
                                <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                                    Email
                                </p>

                                <p className="mt-2 break-all font-medium text-zinc-200">
                                    {user?.email}
                                </p>
                            </div>

                            {/* Role */}
                            <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5">
                                <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                                    Account Type
                                </p>

                                <p className="mt-2 font-medium capitalize text-zinc-200">
                                    {user?.role || "user"}
                                </p>
                            </div>

                            {/* Status */}
                            <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5">
                                <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                                    Status
                                </p>

                                <p className="mt-2 flex items-center gap-2 font-medium text-zinc-200">
                                    <span className="h-2 w-2 rounded-full bg-green-500" />
                                    Active
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Quick Access */}
                <section className="mt-8">

                    <div className="mb-5">
                        <h2 className="text-xl font-semibold">
                            Quick Access
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            Jump straight to your GameShop activity.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">

                        {/* Library */}
                        <Link
                            to="/library"
                            className="group rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-900"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-2xl">
                                    🎮
                                </span>

                                <span className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-zinc-300">
                                    →
                                </span>
                            </div>

                            <h3 className="mt-5 font-semibold">
                                My Library
                            </h3>

                            <p className="mt-1 text-sm text-zinc-500">
                                View your purchased games.
                            </p>
                        </Link>

                        {/* Orders */}
                        <Link
                            to="/orders"
                            className="group rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-900"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-2xl">
                                    📦
                                </span>

                                <span className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-zinc-300">
                                    →
                                </span>
                            </div>

                            <h3 className="mt-5 font-semibold">
                                My Orders
                            </h3>

                            <p className="mt-1 text-sm text-zinc-500">
                                View your purchase history.
                            </p>
                        </Link>

                        {/* Store */}
                        <Link
                            to="/"
                            className="group rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-900"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-2xl">
                                    🛍️
                                </span>

                                <span className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-zinc-300">
                                    →
                                </span>
                            </div>

                            <h3 className="mt-5 font-semibold">
                                Browse Store
                            </h3>

                            <p className="mt-1 text-sm text-zinc-500">
                                Discover more games.
                            </p>
                        </Link>

                    </div>
                </section>

            </div>
        </div>
    );
}

export default Profile;