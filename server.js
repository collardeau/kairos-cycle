var express = require('express');
var app = express();
var RSVP = require('rsvp');
var superagent = require('superagent');
var Cycle = require('@cycle/core');
var Ob$ = Cycle.Rx.Observable;

var URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';

var bcn = fetchCity('barcelona');
var cop = fetchCity('copenhagen');
var bcn$ = Ob$.fromPromise(bcn);
var cop$ = Ob$.fromPromise(cop);

var cities$ = Ob$.combineLatest(
  bcn$,
  cop$,
  ((a, b) => [a, b])
)

function fetchCity(cityName) {
  return new RSVP.Promise(function(resolve, rej) {
    superagent
    .get(URL)
    .set('x-api-key','5ba09e308c10daeb4737c29d3fef2907')
    .query({ 
      q: cityName,
      cnt: 7 
    })
    .end(function(err, res) {
      resolve(res.body);
    });
  })
}

var lastUpdated = 1;
app.get('/cities', function(req, res) {
  if(lastUpdated) {  
    cities$.subscribe(cities => {
      res.json(cities);
    })
  }
});

app.use(express.static('public'));

app.listen(3000, function(){
  console.log('listening on port 3000...');
});


