const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {

      res.render('beers', { beersFromApi })
    })
// Register the location for handlebars partials here:
.catch(error => console.log(error));
});
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI =>res.render('random-beers',{responseFromAPI })) 
    .catch(error => console.log(error));
});

// ...
app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

    

app.listen(3000, () => console.log('🏃‍ on port 3000'));
