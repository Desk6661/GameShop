const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
    {
        // RAWG data
        externalId: {
            type: Number,
            required: true,
            unique: true
        },

        slug: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        coverImage: {
            type: String,
            default: ""
        },

        backgroundImage: {
            type: String,
            default: ""
        },

        screenshots: [
            {
                type: String
            }
        ],

        releaseDate: {
            type: Date
        },

        genres: [
            {
                type: String
            }
        ],

        platforms: [
            {
                type: String
            }
        ],

        developer: {
            type: String,
            default: ""
        },

        publisher: {
            type: String,
            default: ""
        },

        rating: {
            type: Number,
            default: 0
        },

        metacritic: {
            type: Number,
            default: null
        },

        esrbRating: {
            type: String,
            default: ""
        },

        pcRequirements: {
            minimum: {
                type: String,
                default: ""
            },

            recommended: {
                type: String,
                default: ""
            }
        },

        // GameShop data
        price: {
            type: Number,
            required: true,
            default: 0
        },

        discount: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        isFeatured: {
            type: Boolean,
            default: false
        },

        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Game", gameSchema);