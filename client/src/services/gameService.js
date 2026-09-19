import api from "./api";

export const getGames = async (params = {}) => {
    const response = await api.get("/games", {
        params
    });

    return response.data;
};

export const getGameById = async (id) => {
    const response = await api.get(`/games/${id}`);

    return response.data;
};

export const getFeaturedGames = async () => {
    const response = await api.get("/games", {
        params: {
            featured: true
        }
    });

    return response.data;
};