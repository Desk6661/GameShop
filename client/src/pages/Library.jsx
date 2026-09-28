import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyLibrary } from "../services/orderService";

function Library() {
    const [library, setLibrary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLibrary = async () => {
            try {
                const data = await getMyLibrary();

                setLibrary(data.library);
            } catch (error) {
                console.error("Library error:", error);

                setError("Failed to load your library.");
            } finally {
                setLoading(false);
            }
        };

        fetchLibrary();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
                <div className="mx-auto max-w-7xl">
                    <p className="text-zinc-400">
                        Loading your library...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6">
                        <p className="text-red-400">
                            {error}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-10">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
                                Your Collection
                            </p>

                            <h1 className="mt-2 text-4xl font-bold tracking-tight">
                                My Library
                            </h1>

                            <p className="mt-2 text-zinc-500">
                                All the games you own in one place.
                            </p>
                        </div>

                        {library.length > 0 && (
                            <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3">
                                <span className="text-2xl font-bold">
                                    {library.length}
                                </span>

                                <span className="ml-2 text-sm text-zinc-500">
                                    {library.length === 1
                                        ? "Game Owned"
                                        : "Games Owned"}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Empty State */}
                {library.length === 0 ? (
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6 py-20 text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800 text-4xl">
                            🎮
                        </div>

                        <h2 className="mt-6 text-2xl font-semibold">
                            Your library is empty
                        </h2>

                        <p className="mx-auto mt-3 max-w-md text-zinc-500">
                            Games you purchase will appear here so you
                            can easily access your collection.
                        </p>

                        <Link
                            to="/"
                            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
                        >
                            Browse Games
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Recently Purchased */}
                        <section className="mb-12">
                            <div className="mb-5">
                                <h2 className="text-xl font-semibold">
                                    Recently Purchased
                                </h2>

                                <p className="mt-1 text-sm text-zinc-500">
                                    Your latest additions to the library.
                                </p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {library.map((item) => {
                                    const game = item.game;

                                    return (
                                        <article
                                            key={game._id}
                                            className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:shadow-2xl"
                                        >
                                            {/* Cover */}
                                            <Link
                                                to={`/games/${game._id}`}
                                                className="relative block overflow-hidden"
                                            >
                                                <img
                                                    src={game.coverImage}
                                                    alt={game.title}
                                                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                                                />

                                                <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />

                                                <span className="absolute left-3 top-3 rounded-md bg-green-500 px-2 py-1 text-xs font-bold text-black shadow-lg">
                                                    OWNED
                                                </span>
                                            </Link>

                                            {/* Details */}
                                            <div className="p-5">
                                                <Link
                                                    to={`/games/${game._id}`}
                                                    className="block"
                                                >
                                                    <h3 className="truncate text-lg font-semibold text-white transition hover:text-zinc-300">
                                                        {game.title}
                                                    </h3>
                                                </Link>

                                                <p className="mt-1 truncate text-sm text-zinc-500">
                                                    {game.genres?.join(" • ")}
                                                </p>

                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <span className="text-yellow-400">
                                                            ★
                                                        </span>

                                                        <span className="text-zinc-300">
                                                            {game.rating}
                                                        </span>
                                                    </div>

                                                    <span className="text-xs text-zinc-600">
                                                        Owned{" "}
                                                        {new Date(
                                                            item.purchasedAt
                                                        ).toLocaleDateString()}
                                                    </span>
                                                </div>

                                                <div className="mt-5 flex gap-2">
                                                    <Link
                                                        to={`/games/${game._id}`}
                                                        className="flex-1 rounded-lg bg-white px-4 py-2.5 text-center text-sm font-semibold text-black transition hover:bg-zinc-200"
                                                    >
                                                        View Game
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                                                    >
                                                        Play
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
}

export default Library;