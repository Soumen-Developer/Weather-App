// config.js
const dotenv = require('dotenv');
dotenv.config();

const constants = {
    openWeatherMap: {
        BASE_URL: process.env.BASE_URL,
        SECRET_KEY: process.env.SECRET_KEY
    }
};

module.exports = constants;
