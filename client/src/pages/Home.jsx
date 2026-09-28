import { useEffect, useState } from "react";
import { getGames, getFeaturedGames } from "../services/gameService"; import GameCard from "../components/GameCard";
import { Link } from "react-router-dom";
import GameCarousel from "../components/GameCarousel";

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
                    className="hero-fade relative mb-14 min-h-130 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl"
                >
                    {/* Background image */}
                    <img
                        src={featuredGame.backgroundImage}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Cinematic overlays */}
                    <div className="absolute inset-0 bg-black/30" />

                    <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/85 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-zinc-950/80 to-transparent" />

                    {/* Hero content */}
                    <div className="relative flex min-h-130 items-end">
                        <div className="w-full p-7 sm:p-10 lg:p-14">

                            <div className="max-w-2xl">

                                {/* Label */}
                                <div className="flex items-center gap-3">
                                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-zinc-200 backdrop-blur-sm">
                                        Featured
                                    </span>

                                    {featuredGame.discount > 0 && (
                                        <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-black">
                                            -{featuredGame.discount}%
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h2 className="mt-5 max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                                    {featuredGame.title}
                                </h2>

                                {/* Description */}
                                <p className="mt-5 line-clamp-3 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base">
                                    {featuredGame.description}
                                </p>

                                {/* Metadata */}
                                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">

                                    <span className="flex items-center gap-1.5 text-yellow-400">
                                        <span>★</span>
                                        <span className="font-semibold">
                                            {featuredGame.rating}
                                        </span>
                                    </span>

                                    {featuredGame.genres?.length > 0 && (
                                        <span className="text-zinc-300">
                                            {featuredGame.genres.slice(0, 3).join(" • ")}
                                        </span>
                                    )}

                                    {featuredGame.releaseDate && (
                                        <span className="text-zinc-500">
                                            {new Date(
                                                featuredGame.releaseDate
                                            ).getFullYear()}
                                        </span>
                                    )}
                                </div>

                                {/* Price + button */}
                                <div className="mt-7 flex flex-wrap items-center gap-4">

                                    <Link
                                        to={`/games/${featuredGame._id}`}
                                        className="rounded-lg bg-white px-6 py-3 font-semibold text-black shadow-lg transition hover:bg-zinc-200 hover:shadow-xl"
                                    >
                                        View Game
                                    </Link>

                                    <div className="flex items-center gap-2">

                                        {featuredGame.discount > 0 && (
                                            <span className="text-sm text-zinc-500 line-through">
                                                ₹{featuredGame.price}
                                            </span>
                                        )}

                                        <span className="text-xl font-bold text-white">
                                            ₹
                                            {Math.round(
                                                featuredGame.price -
                                                (featuredGame.price *
                                                    featuredGame.discount) /
                                                100
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {/* Slide indicators */}
                                <div className="mt-9 flex items-center gap-2">
                                    {featuredGames.map((game, index) => (
                                        <button
                                            key={game._id}
                                            type="button"
                                            onClick={() =>
                                                setFeaturedIndex(index)
                                            }
                                            className={`h-1.5 rounded-full transition-all duration-300 ${index === featuredIndex
                                                ? "w-9 bg-white"
                                                : "w-2 bg-zinc-600 hover:bg-zinc-400"
                                                }`}
                                            aria-label={`Show ${game.title}`}
                                        />
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            )}

            <GameCarousel
                title="Featured Games"
                subtitle="Handpicked games worth checking out."
                games={featuredGames}
            />

            <GameCarousel
                title="Popular Games"
                subtitle="What players are checking out right now."
                games={[...games]
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 12)}
            />

            <GameCarousel
                title="On Sale"
                subtitle="Great games. Better prices."
                games={[...games]
                    .filter((game) => game.discount > 0)
                    .sort((a, b) => b.discount - a.discount)
                    .slice(0, 12)}
            />

            <GameCarousel
                title="Action Games"
                subtitle="Fast, intense, and impossible to put down."
                games={games
                    .filter((game) =>
                        game.genres?.some(
                            (genre) =>
                                genre.toLowerCase() === "action"
                        )
                    )
                    .slice(0, 12)}
            />

            <GameCarousel
                title="RPG Games"
                games={games
                    .filter((game) =>
                        game.genres?.some((genre) => {
                            const normalizedGenre =
                                genre.toLowerCase();

                            return (
                                normalizedGenre === "rpg" ||
                                normalizedGenre === "role-playing" ||
                                normalizedGenre.includes("role")
                            );
                        })
                    )
                    .slice(0, 12)}
            />

            <GameCarousel
                title="Racing Games"
                games={games
                    .filter((game) =>
                        game.genres?.some(
                            (genre) =>
                                genre.toLowerCase() === "racing"
                        )
                    )
                    .slice(0, 12)}
            />

            <GameCarousel
                title="Horror Games"
                games={games
                    .filter((game) =>
                        game.genres?.some(
                            (genre) =>
                                genre.toLowerCase() === "horror"
                        )
                    )
                    .slice(0, 12)}
            />

            <section className="mt-4 border-t border-zinc-900 pt-14">
                {/* Section header */}
                <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
                            Explore the catalog
                        </p>

                        <h2 className="mt-1 text-3xl font-bold tracking-tight text-white">
                            Browse All Games
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Discover your next game from the GameShop catalog.
                        </p>
                    </div>

                    <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
                        {games.length}{" "}
                        {games.length === 1 ? "game" : "games"}
                    </div>
                </div>

                {/* Search + filters */}
                <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5">
                    <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">

                        {/* Search */}
                        <div className="relative">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                                ⌕
                            </span>

                            <input
                                type="text"
                                placeholder="Search games..."
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                            />
                        </div>

                        {/* Genre */}
                        <select
                            value={genre}
                            onChange={(event) =>
                                setGenre(event.target.value)
                            }
                            className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 outline-none transition focus:border-zinc-600"
                        >
                            <option value="">All Genres</option>
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Role-playing">RPG</option>
                            <option value="Racing">Racing</option>
                            <option value="Shooter">Shooter</option>
                            <option value="Strategy">Strategy</option>
                            <option value="Indie">Indie</option>
                            <option value="Simulation">Simulation</option>
                        </select>

                        {/* Sort */}
                        <select
                            value={sort}
                            onChange={(event) =>
                                setSort(event.target.value)
                            }
                            className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 outline-none transition focus:border-zinc-600"
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

                    {/* Active filters / clear */}
                    {(search || genre || sort) && (
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-4">
                            <div className="flex flex-wrap gap-2">

                                {search && (
                                    <span className="rounded-md bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300">
                                        Search: {search}
                                    </span>
                                )}

                                {genre && (
                                    <span className="rounded-md bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300">
                                        Genre: {genre}
                                    </span>
                                )}

                                {sort && (
                                    <span className="rounded-md bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300">
                                        {sort === "price-low"
                                            ? "Price: Low → High"
                                            : "Price: High → Low"}
                                    </span>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setGenre("");
                                    setSort("");
                                }}
                                className="text-sm font-medium text-zinc-400 transition hover:text-white"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Results */}
                {games.length === 0 ? (
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6 py-20 text-center">
                        <div className="text-5xl">
                            🔍
                        </div>

                        <h3 className="mt-5 text-xl font-semibold text-white">
                            No games found
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
                            Try a different search term or remove some filters.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setSearch("");
                                setGenre("");
                                setSort("");
                            }}
                            className="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {games.map((game) => (
                            <GameCard
                                key={game._id}
                                game={game}
                            />
                        ))}
                    </div>
                )}
            </section>

        </div>
    );
}

export default Home;