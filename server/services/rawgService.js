const axios = require("axios");

const RAWG_BASE_URL = "https://api.rawg.io/api";

const rawgApi = axios.create({
    baseURL: RAWG_BASE_URL
});

const getRawgGameById = async (id) => {
    const response = await rawgApi.get(`/games/${id}`, {
        params: {
            key: process.env.RAWG_API_KEY
        }
    });

    return response.data;
};

const getRawgScreenshots = async (id) => {
    const response = await rawgApi.get(`/games/${id}/screenshots`, {
        params: {
            key: process.env.RAWG_API_KEY
        }
    });

    return response.data;
};

const getRawgGames = async (params = {}) => {
    const response = await rawgApi.get("/games", {
        params: {
            ...params,
            key: process.env.RAWG_API_KEY
        }
    });

    return response.data;
};

module.exports = {
    getRawgGames,
    getRawgGameById,
    getRawgScreenshots
};