require("dotenv").config();

export default {
    api_url: {
        API_URL: process.env.API_URL
    },
    api_users: {
        API_USERS: process.env.API_USERS
    },
    api_cards: {
        API_CARDS: process.env.API_CARDS
    },
    api_game: {
        API_GAME: process.env.API_GAME
    }
}