const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
hbs.registerPartials(__dirname + '/views/partials')


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {

  punkAPI.getBeers().then(beers => {
    console.log(beers)
    res.render("beers", { listOfBeers: beers });

  }).catch(error => {
    console.log(error)
  })
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then(beers => {
      res.render("random-beer", { listOfBeers: beers });
    })
    .catch(error => {
      console.log(error)
    })

});





app.listen(3000);