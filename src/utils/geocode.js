const request = require('request');

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFocm91czA1IiwiYSI6ImNrcXljMjdseTE2bGYyd282b2tmdzljenIifQ.ezCJKpZVfHEtqS_bg_XU9w&limit=1';

    request({ url: geocodeURL, json: true}, (err, res) => {
        const { features } = res.body;

        if(err) {
            callback('unable to connect to location service', undefined);
        } else if(features.length === 0) {
            callback('invalid location', undefined);
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            });
        }
    });
}

module.exports = geocode;