const axios = require("axios");

const RAWG_BASE_URL = "https://api.rawg.io/api";

const rawgApi = axios.create({
    baseURL: RAWG_BASE_URL,
    params: {
        key: process.env.RAWG_API_KEY
    }
});

const getRawgGames = async (params = {}) => {
    const response = await rawgApi.get("/games", {
        params
    });

    return response.data;
};

const getRawgGameById = async (id) => {
    const response = await rawgApi.get(`/games/${id}`);

    return response.data;
};

const getRawgScreenshots = async (id) => {
    const response = await rawgApi.get(`/games/${id}/screenshots`);

    return response.data;
};

module.exports = {
    getRawgGames,
    getRawgGameById,
    getRawgScreenshots
};