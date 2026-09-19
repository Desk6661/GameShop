import { useEffect, useState } from "react";
import { getGames, getFeaturedGames } from "../services/gameService"; import GameCard from "../components/GameCard";
import { Link } from "react-router-dom";

function Home() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("");
    const [sort, setSort] = useState("");

    const [featuredGames, setFeaturedGames] = useState([]);
    const [featuredIndex, setFeaturedIndex] = useState(0);

    useEffect(() => {
        const loadGames = async () => {
            try {
                setLoading(true);

                const data = await getGames({
                    search,
                    genre,
                    sort
                });

                setGames(data.games);
            } catch (error) {
                console.error(error);

                setError("Failed to load games");
            } finally {
                setLoading(false);
            }
        };

        loadGames();
    }, [search, genre, sort]);

    useEffect(() => {
        const loadFeaturedGames = async () => {
            try {
                const data = await getFeaturedGames();

                setFeaturedGames(data.games);
            } catch (error) {
                console.error(
                    "Failed to load featured games:",
                    error
                );
            }
        };

        loadFeaturedGames();
    }, []);

    useEffect(() => {
        if (featuredGames.length <= 1) {
            return;
        }

        const interval = setInterval(() => {
            setFeaturedIndex((currentIndex) => {
                return (currentIndex + 1) % featuredGames.length;
            });
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [featuredGames.length]);

    if (error) {
        return <p>{error}</p>;
    }

    const featuredGame = featuredGames[featuredIndex];

    return (
        <div className="min-h-screen bg-zinc-950 p-8">

            {/* <h1 className="text-4xl font-bold text-white">
                GameShop
            </h1> */}

            {featuredGame && (
                <section
                    key={featuredGame._id}
                    className="hero-fade relative mb-12 overflow-hidden rounded-2xl border border-zinc-800"
                >

                    <img
                        src={featuredGame.backgroundImage}
                        alt={featuredGame.title}
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

                    <div className="relative flex min-h-[420px] items-end p-8 sm:p-12">

                        <div className="max-w-xl">

                            <span className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
                                Featured Game
                            </span>

                            <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
                                {featuredGame.title}
                            </h2>

                            <p className="mt-4 line-clamp-3 text-zinc-300">
                                {featuredGame.description}
                            </p>

                            <div className="mt-5 flex flex-wrap items-center gap-4">

                                <span className="text-yellow-400">
                                    ⭐ {featuredGame.rating}
                                </span>

                                <span className="text-zinc-400">
                                    {featuredGame.genres.join(" • ")}
                                </span>

                            </div>

                            <Link
                                to={`/games/${featuredGame._id}`}
                                className="mt-7 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
                            >
                                View Game
                            </Link>

                            {/* Slide indicators */}
                            <div className="mt-8 flex gap-2">
                                {featuredGames.map((game, index) => (
                                    <button
                                        key={game._id}
                                        onClick={() => setFeaturedIndex(index)}
                                        className={`h-2 rounded-full transition-all ${index === featuredIndex
                                            ? "w-8 bg-white"
                                            : "w-2 bg-zinc-600"
                                            }`}
                                        aria-label={`Show ${game.title}`}
                                    />
                                ))}
                            </div>

                        </div>

                    </div>
                </section>
            )}

            {/* Featured Games */}
            <section className="mb-12">

                <div className="mb-5 flex items-end justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
                            Handpicked for you
                        </p>

                        <h2 className="mt-1 text-3xl font-bold text-white">
                            Featured Games
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredGames.map((game) => (
                        <GameCard
                            key={game._id}
                            game={game}
                        />
                    ))}
                </div>

            </section>

            <div className="mb-5">
                <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
                    Explore the catalog
                </p>

                <h2 className="mt-1 text-3xl font-bold text-white">
                    Browse All Games
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                    {games.length} {games.length === 1 ? "game" : "games"} found
                </p>
            </div>

            <div className="mb-8 mt-8 flex flex-col gap-4 md:flex-row">

                <input
                    type="text"
                    placeholder="Search games..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500"
                />

                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none"
                >
                    <option value="">All Genres</option>
                    <option value="Action">Action</option>
                    <option value="RPG">RPG</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Strategy">Strategy</option>
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none"
                >
                    <option value="">Sort By</option>
                    <option value="price-low">
                        Price: Low to High
                    </option>
                    <option value="price-high">
                        Price: High to Low
                    </option>
                </select>

            </div>

            {loading ? (
                <div className="py-16 text-center">
                    <p className="text-zinc-400">
                        Loading games...
                    </p>
                </div>
            ) : games.length === 0 ? (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6 py-16 text-center">

                    <div className="text-5xl">
                        🎮
                    </div>

                    <h3 className="mt-5 text-xl font-semibold text-white">
                        No games found
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-zinc-400">
                        We couldn't find any games matching your search or filters.
                        Try changing your search or selecting a different genre.
                    </p>

                    <button
                        onClick={() => {
                            setSearch("");
                            setGenre("");
                            setSort("");
                        }}
                        className="mt-6 rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200"
                    >
                        Clear Filters
                    </button>

                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {games.map((game) => (
                        <GameCard
                            key={game._id}
                            game={game}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}

export default Home;