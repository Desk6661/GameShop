const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const User = require("./models/User");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("GameShop Backend is running!");
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "Hello from GameShop API!",
        success: true
    });
});

app.post("/api/test-user", async (req, res) => {
    try {
        const user = await User.create({
            name: "Test User",
            email: "test@gameshop.com",
            password: "temporary-password"
        });

        res.json(user);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create test user"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});