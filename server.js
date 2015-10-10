var express = require('express');
var app = express();
var RSVP = require('rsvp');
var superagent = require('superagent');
var Cycle = require('@cycle/core');
var Ob$ = Cycle.Rx.Observable;
// avoid es6 function on heroku?
var URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';

function fetchCity(cityName) {
  return new RSVP.Promise(function(resolve, rej) {
    superagent
    .get(URL)
    .set('x-api-key','5ba09e308c10daeb4737c29d3fef2907')
    .query({ 
      q: cityName,
      cnt: 7,
      units: 'metric'
    })
    .end(function(err, res) {
      resolve(res.body);
    });
  })
}

var bcn = fetchCity('barcelona');
var cop = fetchCity('copenhagen');
var mia = fetchCity('miami');
var bcn$ = Ob$.fromPromise(bcn);
var cop$ = Ob$.fromPromise(cop);
var mia$ = Ob$.fromPromise(mia);

function fetchCities() {
  return Ob$.combineLatest(
    bcn$, mia$,
    ((a, b) => [a, b])
  )
}

var cities$;
var cities;

function load(){
  cities$ = fetchCities();
  cities = [];
  return cities$.subscribe(c => {
    cities = c; 
  });
}

var refetch = load();

var interval = setInterval(function(){
  console.log('hello');
}, 10000)


var old = false;

app.get('/cities', function(req, res) {
  res.json(cities);
  if(old) {  
    refetch.dispose();
    refetch = load();
  }else{
    //old = true; 
  }
});

app.use(express.static('public'));

app.listen(3000, function(){
  console.log('listening on port 3000...');
});


