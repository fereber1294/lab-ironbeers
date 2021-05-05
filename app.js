const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials")

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  
  const beerApi = punkAPI.getBeers()
  beerApi.then((resApi) => {
    let data = {
      beer: resApi
    }
    console.log(data);
    res.render('beers', data)
  })
})
app.get('/random-beer', (req, res) => {
  
  const beerApi = punkAPI.getRandom()
  beerApi.then((resApi) => {
    let data = {
      beer: resApi
    }
    console.log(data);
    res.render('random-beer', data)
  })
})




app.listen(3000, () => console.log('🏃‍ on port 3000'));
