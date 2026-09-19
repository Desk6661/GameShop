import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameById } from "../services/gameService";
import { useCart } from "../context/CartContext";

function GameDetails() {
    const { id } = useParams();
    const { cart, addToCart } = useCart();

    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedScreenshot, setSelectedScreenshot] = useState(0);

    useEffect(() => {
        const loadGame = async () => {
            try {
                const data = await getGameById(id);

                setGame(data.game);
            } catch (error) {
                console.error(error);

                setError("Failed to load game");
            } finally {
                setLoading(false);
            }
        };

        loadGame();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 p-8 text-zinc-400">
                Loading game...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-zinc-950 p-8 text-red-400">
                {error}
            </div>
        );
    }

    const discountedPrice = game.price - (game.price * game.discount) / 100;

    const isInCart = cart.some(
        (item) => item._id === game._id
    );

    return (
        <div className="min-h-screen bg-zinc-950 text-white">

            {/* Hero */}
            <section className="relative min-h-[500px] overflow-hidden">

                {/* Background image */}
                <img
                    src={game.backgroundImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-black/20" />

                {/* Hero content */}
                <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-end px-6 pb-12 lg:px-8">

                    <div className="max-w-3xl">

                        <div className="mb-4 flex flex-wrap gap-2">
                            {game.genres.map((genre) => (
                                <span
                                    key={genre}
                                    className="rounded-full bg-white/10 px-3 py-1 text-sm text-zinc-200 backdrop-blur"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                            {game.title}
                        </h1>

                        <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-zinc-300">

                            <span>
                                ⭐ {game.rating}
                            </span>

                            {game.releaseDate && (
                                <span>
                                    Released{" "}
                                    {new Date(
                                        game.releaseDate
                                    ).toLocaleDateString()}
                                </span>
                            )}

                            <span>
                                {game.developer}
                            </span>

                        </div>

                    </div>
                </div>
            </section>

            {/* Main content */}
            <main className="mx-auto max-w-6xl px-6 py-10 lg:px-8">

                {/* Left side */}
                <div>

                    <h2 className="text-2xl font-bold">
                        Screenshots
                    </h2>

                    {game.screenshots?.length > 0 && (
                        <div className="mt-5">

                            {/* Main screenshot */}
                            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                                <img
                                    src={game.screenshots[selectedScreenshot]}
                                    alt={`${game.title} screenshot`}
                                    className="aspect-video w-full object-cover"
                                />
                            </div>

                            {/* Thumbnails */}
                            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                                {game.screenshots.map((screenshot, index) => (
                                    <button
                                        key={screenshot}
                                        onClick={() => setSelectedScreenshot(index)}
                                        className={`shrink-0 overflow-hidden rounded-lg border-2 transition ${index === selectedScreenshot
                                            ? "border-white"
                                            : "border-zinc-800 opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <img
                                            src={screenshot}
                                            alt={`${game.title} thumbnail ${index + 1}`}
                                            className="h-20 w-32 object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                        </div>
                    )}

                    {/* Purchase panel */}
                    <aside className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            {/* Price */}
                            <div>

                                {game.discount > 0 && (
                                    <div className="mb-2">
                                        <span className="rounded-md bg-green-500 px-2 py-1 text-sm font-bold text-black">
                                            -{game.discount}%
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">

                                    {game.discount > 0 && (
                                        <span className="text-zinc-500 line-through">
                                            ₹{game.price}
                                        </span>
                                    )}

                                    <span className="text-3xl font-bold text-white">
                                        ₹{Math.round(discountedPrice)}
                                    </span>

                                </div>

                                <p className="mt-1 text-sm text-zinc-500">
                                    Digital purchase
                                </p>

                            </div>

                            {/* Button */}
                            <button
                                onClick={() => addToCart(game)}
                                disabled={isInCart}
                                className={`w-full rounded-lg px-8 py-3 font-semibold transition sm:w-auto ${isInCart
                                        ? "cursor-default bg-green-500 text-black"
                                        : "bg-white text-black hover:bg-zinc-200"
                                    }`}
                            >
                                {isInCart ? "✓ Added to Cart" : "Add to Cart"}
                            </button>

                        </div>

                    </aside>

                    <h2 className="mt-12 text-2xl font-bold">
                        About the Game
                    </h2>

                    <p className="mt-4 leading-7 text-zinc-400">
                        {game.description}
                    </p>

                    {/* Game Information */}
                    <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

                        <h2 className="text-2xl font-bold">
                            Game Information
                        </h2>

                        <div className="mt-6 grid gap-6 sm:grid-cols-2">

                            <div>
                                <p className="text-sm text-zinc-500">
                                    Developer
                                </p>

                                <p className="mt-1 text-zinc-200">
                                    {game.developer || "Unknown"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-zinc-500">
                                    Publisher
                                </p>

                                <p className="mt-1 text-zinc-200">
                                    {game.publisher || "Unknown"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-zinc-500">
                                    Release Date
                                </p>

                                <p className="mt-1 text-zinc-200">
                                    {game.releaseDate
                                        ? new Date(game.releaseDate).toLocaleDateString()
                                        : "Unknown"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-zinc-500">
                                    Platforms
                                </p>

                                <p className="mt-1 text-zinc-200">
                                    {game.platforms?.join(", ") || "Unknown"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-zinc-500">
                                    ESRB Rating
                                </p>

                                <p className="mt-1 text-zinc-200">
                                    {game.esrbRating || "Not Rated"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-zinc-500">
                                    Metacritic
                                </p>

                                <p className="mt-1 text-zinc-200">
                                    {game.metacritic || "N/A"}
                                </p>
                            </div>

                        </div>
                    </div>

                    <h2 className="mt-12 text-2xl font-bold">
                        PC Requirements
                    </h2>

                    <div className="mt-5 grid gap-6 md:grid-cols-2">

                        {/* Minimum */}
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                            <h3 className="text-lg font-semibold">
                                Minimum
                            </h3>

                            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-zinc-400">
                                {game.pcRequirements?.minimum ||
                                    "No minimum requirements available."}
                            </p>
                        </div>

                        {/* Recommended */}
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                            <h3 className="text-lg font-semibold">
                                Recommended
                            </h3>

                            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-zinc-400">
                                {game.pcRequirements?.recommended ||
                                    "No recommended requirements available."}
                            </p>
                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
}

export default GameDetails;