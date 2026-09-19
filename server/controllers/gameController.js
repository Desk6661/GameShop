const Game = require("../models/Game");
const {
    getRawgGameById,
    getRawgScreenshots
} = require("../services/rawgService");

const getGames = async (req, res) => {
    try {
        const { search, genre, sort, featured } = req.query;

        const query = {
            isAvailable: true
        };

        // Search by game title
        if (search) {
            query.title = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by genre
        if (genre) {
            query.genres = {
                $regex: genre,
                $options: "i"
            };
        }

        // Filter featured games
        if (featured === "true") {
            query.isFeatured = true;
        }

        let sortOption = {
            createdAt: -1
        };

        if (sort === "price-low") {
            sortOption = {
                price: 1
            };
        }

        if (sort === "price-high") {
            sortOption = {
                price: -1
            };
        }

        const games = await Game.find(query).sort(sortOption);

        res.json({
            success: true,
            count: games.length,
            games
        });
    } catch (error) {
        console.error("Get games error:", error);

        res.status(500).json({
            message: "Failed to fetch games"
        });
    }
};

const getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);

        if (!game) {
            return res.status(404).json({
                message: "Game not found"
            });
        }

        res.json({
            success: true,
            game
        });
    } catch (error) {
        console.error("Get game error:", error);

        res.status(500).json({
            message: "Failed to fetch game"
        });
    }
};

const importGame = async (req, res) => {
    try {
        const rawgGame = await getRawgGameById(req.params.rawgId);

        const existingGame = await Game.findOne({
            externalId: rawgGame.id
        });

        if (existingGame) {
            return res.status(409).json({
                message: "Game already exists in GameShop",
                game: existingGame
            });
        }

        const pcPlatform = (rawgGame.platforms || []).find(
            (item) => item.platform?.slug === "pc"
        );

        const pcRequirements = {
            minimum: pcPlatform?.requirements?.minimum || "",
            recommended: pcPlatform?.requirements?.recommended || ""
        };

        const screenshotData = await getRawgScreenshots(rawgGame.id);

        const screenshots = (screenshotData.results || [])
            .map((screenshot) => screenshot.image)
            .filter(Boolean);

        const developers = (rawgGame.developers || [])
            .map((developer) => developer.name)
            .filter(Boolean);

        const publishers = (rawgGame.publishers || [])
            .map((publisher) => publisher.name)
            .filter(Boolean);

        const game = await Game.create({
            externalId: rawgGame.id,

            slug: rawgGame.slug,

            title: rawgGame.name,

            description: rawgGame.description_raw || "",

            coverImage: rawgGame.background_image || "",

            backgroundImage: rawgGame.background_image || "",

            screenshots,

            releaseDate: rawgGame.released
                ? new Date(rawgGame.released)
                : null,

            genres: (rawgGame.genres || [])
                .map((genre) => genre.name)
                .filter(Boolean),

            platforms: (rawgGame.platforms || [])
                .map((item) => item.platform?.name)
                .filter(Boolean),

            developer: developers.join(", "),

            publisher: publishers.join(", "),

            rating: rawgGame.rating || 0,

            metacritic: rawgGame.metacritic || null,

            esrbRating: rawgGame.esrb_rating?.name || "",

            pcRequirements,

            // GameShop-specific data
            price: 0,
            discount: 0,
            isFeatured: false,
            isAvailable: true
        });

        res.status(201).json({
            message: "Game imported successfully",
            game
        });
    } catch (error) {
        console.error(
            "Import game error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Failed to import game"
        });
    }
};

module.exports = {
    getGames,
    getGameById,
    importGame
};