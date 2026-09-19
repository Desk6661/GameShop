const express = require("express");

const {
    getGames,
    getGameById,
    importGame
} = require("../controllers/gameController");

const router = express.Router();

router.get("/", getGames);

router.get("/:id", getGameById);

router.post("/import/:rawgId", importGame);

module.exports = router;