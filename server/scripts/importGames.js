const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Game = require("../models/Game");

const {
    getRawgGames,
    getRawgGameById,
    getRawgScreenshots
} = require("../services/rawgService");

dotenv.config();

const gameCatalog = [
    {
        name: "God of War",
        price: 2999,
        discount: 25,
        featured: true
    },
    {
        name: "God of War Ragnarök",
        price: 3499,
        discount: 15,
        featured: true
    },
    {
        name: "Marvel's Spider-Man: Miles Morales",
        price: 2499,
        discount: 30,
        featured: false
    },
    {
        name: "The Last of Us Part I",
        price: 3499,
        discount: 20,
        featured: true
    },
    {
        name: "Death Stranding",
        price: 1999,
        discount: 40,
        featured: false
    },
    {
        name: "Sekiro: Shadows Die Twice",
        price: 2499,
        discount: 30,
        featured: true
    },
    {
        name: "Dark Souls III",
        price: 1999,
        discount: 40,
        featured: false
    },
    {
        name: "Monster Hunter: World",
        price: 1999,
        discount: 50,
        featured: false
    },
    {
        name: "Lies of P",
        price: 2499,
        discount: 25,
        featured: false
    },
    {
        name: "Hogwarts Legacy",
        price: 2999,
        discount: 35,
        featured: true
    },
    {
        name: "Starfield",
        price: 3499,
        discount: 20,
        featured: false
    },
    {
        name: "No Man's Sky",
        price: 2499,
        discount: 35,
        featured: false
    },
    {
        name: "Subnautica",
        price: 1499,
        discount: 40,
        featured: false
    },
    {
        name: "Valheim",
        price: 999,
        discount: 25,
        featured: false
    },
    {
        name: "Palworld",
        price: 1499,
        discount: 20,
        featured: false
    },
    {
        name: "Hades",
        price: 999,
        discount: 30,
        featured: false
    },
    {
        name: "Hollow Knight",
        price: 749,
        discount: 25,
        featured: false
    },
    {
        name: "Ori and the Will of the Wisps",
        price: 999,
        discount: 35,
        featured: false
    },
    {
        name: "A Plague Tale: Requiem",
        price: 1999,
        discount: 40,
        featured: false
    },
    {
        name: "Control",
        price: 1499,
        discount: 50,
        featured: false
    }
];

const importGames = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected.");
        console.log(
            `Importing ${gameCatalog.length} games...\n`
        );

        for (const catalogGame of gameCatalog) {
            try {
                console.log(
                    `Searching RAWG: ${catalogGame.name}...`
                );

                const searchResults = await getRawgGames({
                    search: catalogGame.name,
                    page_size: 5
                });

                if (
                    !searchResults.results ||
                    searchResults.results.length === 0
                ) {
                    console.log(
                        `✗ Game not found: ${catalogGame.name}\n`
                    );

                    continue;
                }

                const gameData = searchResults.results[0];

                console.log(
                    `Found: ${gameData.name} (RAWG ID: ${gameData.id})`
                );

                const existingGame = await Game.findOne({
                    externalId: gameData.id
                });

                if (existingGame) {
                    console.log(
                        `Already exists. Updating GameShop pricing...`
                    );

                    existingGame.price = catalogGame.price;
                    existingGame.discount = catalogGame.discount;
                    existingGame.isFeatured =
                        catalogGame.featured;

                    await existingGame.save();

                    console.log(
                        `✓ Updated: ${existingGame.title}\n`
                    );

                    continue;
                }

                const fullGameData =
                    await getRawgGameById(gameData.id);

                const screenshotData =
                    await getRawgScreenshots(gameData.id);

                const pcPlatform =
                    fullGameData.platforms?.find(
                        (platform) =>
                            platform.platform?.slug === "pc"
                    );

                const game = await Game.create({
                    externalId: fullGameData.id,

                    slug: fullGameData.slug,

                    title: fullGameData.name,

                    description:
                        fullGameData.description_raw || "",

                    coverImage:
                        fullGameData.background_image || "",

                    backgroundImage:
                        fullGameData.background_image_additional ||
                        fullGameData.background_image ||
                        "",

                    screenshots:
                        screenshotData.results?.map(
                            (screenshot) =>
                                screenshot.image
                        ) || [],

                    releaseDate:
                        fullGameData.released
                            ? new Date(fullGameData.released)
                            : null,

                    genres:
                        fullGameData.genres?.map(
                            (genre) => genre.name
                        ) || [],

                    platforms:
                        fullGameData.platforms?.map(
                            (platform) =>
                                platform.platform.name
                        ) || [],

                    developer:
                        fullGameData.developers?.[0]?.name ||
                        "",

                    publisher:
                        fullGameData.publishers?.[0]?.name ||
                        "",

                    rating:
                        fullGameData.rating || 0,

                    metacritic:
                        fullGameData.metacritic || null,

                    esrbRating:
                        fullGameData.esrb_rating?.name || "",

                    pcRequirements: {
                        minimum:
                            pcPlatform?.requirements?.minimum ||
                            "",

                        recommended:
                            pcPlatform?.requirements?.recommended ||
                            ""
                    },

                    price: catalogGame.price,

                    discount: catalogGame.discount,

                    isFeatured: catalogGame.featured,

                    isAvailable: true
                });

                console.log(
                    `✓ Imported: ${game.title}\n`
                );
            } catch (error) {
                console.error(
                    `✗ Failed: ${catalogGame.name}`
                );

                console.error(error.message);
                console.log("");
            }
        }

        console.log("Import finished.");

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("Import process failed:");
        console.error(error.message);

        await mongoose.disconnect();
        process.exit(1);
    }
};

importGames();