import { useState } from "react";
import GameCard from "./GameCard";

function GameCarousel({ title, games, subtitle }) {
    const [startIndex, setStartIndex] = useState(0);

    const visibleGames = 4;

    const canGoBack = startIndex > 0;

    const canGoForward =
        startIndex + visibleGames < games.length;

    const handlePrevious = () => {
        if (canGoBack) {
            setStartIndex((current) => current - 1);
        }
    };

    const handleNext = () => {
        if (canGoForward) {
            setStartIndex((current) => current + 1);
        }
    };

    if (!games || games.length === 0) {
        return null;
    }

    const displayedGames = games.slice(
        startIndex,
        startIndex + visibleGames
    );

    return (
        <section className="mb-16">
            {/* Section header */}
            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {title}
                    </h2>

                    {subtitle && (
                        <p className="mt-1 text-sm text-zinc-500">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Navigation */}
                {games.length > visibleGames && (
                    <div className="flex shrink-0 gap-2">
                        <button
                            type="button"
                            onClick={handlePrevious}
                            disabled={!canGoBack}
                            aria-label={`Previous ${title}`}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-lg text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
                        >
                            ←
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={!canGoForward}
                            aria-label={`Next ${title}`}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-lg text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
                        >
                            →
                        </button>
                    </div>
                )}
            </div>

            {/* Cards */}
            <div className="overflow-hidden">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {displayedGames.map((game) => (
                        <div key={game._id}>
                            <GameCard game={game} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default GameCarousel;