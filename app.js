const express = require('express');
const morgan = require('morgan');
const appStore = require('./store-data.js');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
    //parameters available:

    //sort
    //valid values: 'rating' or 'app'. 
    //Sort the list by either rating or app, any other value results in an error, 
    //if no value provided do not perform a sort.

    //genres
    //valid Values: ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
    //If present the value must be one of the list otherwise an error is returned. 
    //Filter the list by the given value.

    const { genreSearch = "", sort } = req.query;

    //Verifies correct sort term
    if (sort) {
        if (!['rating', 'app']) {
            return res.
                status(400)
                .send('Sort must be by rating or app');
        }
    }

    //Filters genre search
    let results = appStore
        .filter(app =>
            app
                .Genres
                .toLowerCase()
                .includes(genreSearch.toLowerCase())
        );

    //Sorts results
    if (sort) {
        results
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            });
    };

    res.json(results);
});

module.exports = app;