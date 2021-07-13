const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const URL = 'http://api.weatherstack.com/current?access_key=29f3c7b82a720c3a442a597d12c0a9b0&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '';

    request({ url: URL, json: true }, (err, res) => {
        if(err) {
            callback('unable to connect to the weather service', undefined);
        } else if(res.body.error) {
            callback('invalid location', undefined);
        } else {
            const { temperature, precip, weather_descriptions } = res.body.current;

            callback(undefined, {
                    weather: weather_descriptions[0],
                    temp: temperature + '°C',
                    precip: precip + '% chance of rain'
                }
            );
        }
    });
}

module.exports = forecast;