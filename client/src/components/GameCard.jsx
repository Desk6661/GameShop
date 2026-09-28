import { Link } from "react-router-dom";

function GameCard({ game }) {
    const discountedPrice =
        game.price - (game.price * game.discount) / 100;

    return (
        <article className="group overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/80 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-900 hover:shadow-2xl">
            
            {/* Cover */}
            <Link
                to={`/games/${game._id}`}
                className="relative block overflow-hidden"
            >
                <img
                    src={game.coverImage}
                    alt={game.title}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 transition duration-300 group-hover:opacity-80" />

                {/* Discount badge */}
                {game.discount > 0 && (
                    <span className="absolute left-3 top-3 rounded-md bg-green-500 px-2 py-1 text-xs font-bold text-black shadow-lg">
                        -{game.discount}%
                    </span>
                )}

                {/* Featured badge */}
                {game.isFeatured && (
                    <span className="absolute right-3 top-3 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[10px] font-bold tracking-wider text-white backdrop-blur-sm">
                        FEATURED
                    </span>
                )}
            </Link>

            {/* Content */}
            <div className="p-4">
                
                {/* Title */}
                <Link
                    to={`/games/${game._id}`}
                    className="block"
                >
                    <h3 className="truncate text-base font-semibold text-white transition group-hover:text-zinc-300">
                        {game.title}
                    </h3>
                </Link>

                {/* Genres */}
                <p className="mt-1 truncate text-xs text-zinc-500">
                    {game.genres?.slice(0, 3).join(" • ")}
                </p>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-2 text-sm">
                    <span className="text-yellow-400">
                        ★
                    </span>

                    <span className="font-medium text-zinc-300">
                        {game.rating}
                    </span>

                    {game.metacritic && (
                        <>
                            <span className="text-zinc-700">
                                •
                            </span>

                            <span className="text-xs text-zinc-500">
                                Metacritic {game.metacritic}
                            </span>
                        </>
                    )}
                </div>

                {/* Price + View */}
                <div className="mt-4 flex items-center justify-between gap-3">
                    
                    <div className="flex min-w-0 items-center gap-2">
                        {game.discount > 0 && (
                            <span className="text-xs text-zinc-600 line-through">
                                ₹{game.price}
                            </span>
                        )}

                        <span className="text-base font-bold text-white">
                            ₹{Math.round(discountedPrice)}
                        </span>
                    </div>

                    <Link
                        to={`/games/${game._id}`}
                        className="shrink-0 rounded-lg bg-zinc-800 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-700 hover:text-white"
                    >
                        View
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default GameCard;