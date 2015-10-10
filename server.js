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

var oneMinute = 1000 * 60;
var nyc$ = Ob$.timer(0, oneMinute).flatMap(x => fetchCity('newyork'));
var sin$ = Ob$.timer(0, oneMinute).flatMap(x => fetchCity('singapore'));

var cities$ = Ob$.combineLatest(nyc$, sin$, (a, b) => [a, b])

var cities= [];
cities$.subscribe(latestCities => {
  cities = latestCities;
});

app.get('/cities', function(req, res) {
  res.json(cities);
});

app.use(express.static('public'));

app.listen(3000, function(){
  console.log('listening on port 3000...');
});


