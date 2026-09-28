const express = require("express");

const {
    createOrder,
    getMyOrders,
    getMyLibrary
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getMyOrders);
router.get("/library", protect, getMyLibrary);

module.exports = router;