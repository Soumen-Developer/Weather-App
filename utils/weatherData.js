const request = require('request');
const constants = require('../config');

const weatherData = (address, callback) => {
    const url =
        constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY + '&units=metric';
    console.log("Constructed URL:", url);

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (!response.body || response.body.cod !== 200) {
            callback(response.body?.message || 'Unable to find location', undefined);
        } else {
            const body = response.body;

            const result = {
                temperature: body.main.temp,
                feelslike: body.main.feels_like,
                description: body.weather[0].description,
                cityName: body.name,
                countryName: body.sys.country
            };

            callback(undefined, result);
        }
    });
};

module.exports = weatherData;
