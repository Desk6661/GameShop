const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        game: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game",
            required: true
        },

        title: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        discount: {
            type: Number,
            default: 0
        },

        finalPrice: {
            type: Number,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        _id: false
    }
);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: {
            type: [orderItemSchema],
            required: true
        },

        subtotal: {
            type: Number,
            required: true
        },

        total: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: [
                "pending",
                "completed",
                "cancelled"
            ],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;