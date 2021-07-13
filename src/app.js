const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yousef Mahrous'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yousef Mahrous'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'if you wanna know your weather forecast today, visit the homepage',
        title: 'Help',
        name: 'Yousef Mahrous'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({
            error: 'invalid address term'
        })
    } else {
        geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
            if(err) {
                res.send({
                    error: err
                });
            } else {
                forecast(latitude, longitude, (err, { weather, temp, precip }) => {
                    if(err) {
                        res.send({
                            error: err
                        });
                    } else {
                        res.send({
                            location: location,
                            weather: weather,
                            temperature: temp,
                            precip: precip
                        });
                    }
                });
            }
        });
    }
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yousef Mahrous',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yousef Mahrous',
        errorMessage: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('runnin')
});
