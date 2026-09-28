const Order = require("../models/Order");
const Game = require("../models/Game");

const createOrder = async (req, res) => {
    try {
        const { items } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "Order must contain at least one game"
            });
        }

        const orderItems = [];

        for (const item of items) {
            const game = await Game.findById(item.gameId);

            if (!game) {
                return res.status(404).json({
                    message: `Game not found: ${item.gameId}`
                });
            }

            if (!game.isAvailable) {
                return res.status(400).json({
                    message: `${game.title} is currently unavailable`
                });
            }

            const quantity = Number(item.quantity);

            if (!Number.isInteger(quantity) || quantity < 1) {
                return res.status(400).json({
                    message: `Invalid quantity for ${game.title}`
                });
            }

            const finalPrice =
                game.price -
                (game.price * game.discount) / 100;

            orderItems.push({
                game: game._id,
                title: game.title,
                price: game.price,
                discount: game.discount,
                finalPrice,
                quantity
            });
        }

        const subtotal = orderItems.reduce(
            (total, item) =>
                total + item.finalPrice * item.quantity,
            0
        );

        const order = await Order.create({
            user: req.user.userId,
            items: orderItems,
            subtotal,
            total: subtotal,
            status: "completed"
        });

        res.status(201).json({
            message: "Order created successfully",
            order
        });
    } catch (error) {
        console.error("Create order error:", error);

        res.status(500).json({
            message: "Failed to create order"
        });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.userId
        }).sort({
            createdAt: -1
        });

        res.json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        console.error("Get orders error:", error);

        res.status(500).json({
            message: "Failed to fetch orders"
        });
    }
};

const getMyLibrary = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.userId,
            status: "completed"
        }).populate("items.game");

        const libraryMap = new Map();

        for (const order of orders) {
            for (const item of order.items) {
                if (!item.game) {
                    continue;
                }

                const gameId = item.game._id.toString();

                if (!libraryMap.has(gameId)) {
                    libraryMap.set(gameId, {
                        game: item.game,
                        purchasedAt: order.createdAt
                    });
                }
            }
        }

        const library = Array.from(libraryMap.values());

        res.json({
            success: true,
            count: library.length,
            library
        });
    } catch (error) {
        console.error("Get library error:", error);

        res.status(500).json({
            message: "Failed to fetch library"
        });
    }
};

module.exports = {
    createOrder,
    getMyOrders,
    getMyLibrary
};