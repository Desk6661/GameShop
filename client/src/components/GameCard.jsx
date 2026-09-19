import { Link } from "react-router-dom";

function GameCard({ game }) {
    const discountedPrice =
        game.price - (game.price * game.discount) / 100;

    return (
        <article className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:shadow-2xl">

            {/* Image */}
            <Link
                to={`/games/${game._id}`}
                className="relative block overflow-hidden"
            >
                <img
                    src={game.coverImage}
                    alt={game.title}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />

                {/* Discount */}
                {game.discount > 0 && (
                    <span className="absolute left-3 top-3 rounded-md bg-green-500 px-2 py-1 text-xs font-bold text-black shadow-lg">
                        -{game.discount}%
                    </span>
                )}

                {/* Featured */}
                {game.isFeatured && (
                    <span className="absolute right-3 top-3 rounded-md bg-yellow-400 px-2 py-1 text-xs font-bold text-black shadow-lg">
                        FEATURED
                    </span>
                )}
            </Link>

            {/* Information */}
            <div className="p-4">

                <Link
                    to={`/games/${game._id}`}
                    className="block"
                >
                    <h3 className="truncate text-lg font-semibold text-white transition hover:text-zinc-300">
                        {game.title}
                    </h3>
                </Link>

                {/* Genres */}
                <p className="mt-1 truncate text-sm text-zinc-500">
                    {game.genres.join(" • ")}
                </p>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-2 text-sm">
                    <span className="text-yellow-400">
                        ★
                    </span>

                    <span className="text-zinc-300">
                        {game.rating}
                    </span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        {game.discount > 0 && (
                            <span className="text-sm text-zinc-500 line-through">
                                ₹{game.price}
                            </span>
                        )}

                        <span className="text-lg font-bold text-white">
                            ₹{Math.round(discountedPrice)}
                        </span>

                    </div>

                    <Link
                        to={`/games/${game._id}`}
                        className="rounded-lg bg-zinc-800 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-700 hover:text-white"
                    >
                        View
                    </Link>

                </div>

            </div>
        </article>
    );
}

export default GameCard;