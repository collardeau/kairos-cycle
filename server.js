var express = require('express');
var app = express();
var RSVP = require('rsvp');
var superagent = require('superagent');
var Cycle = require('@cycle/core');
var Ob$ = Cycle.Rx.Observable;
// avoid es6 function on heroku?
var URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';

var isProd = process.env.NODE_ENV === 'production';
var port = isProd ? process.env.PORT : 3000;

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

var oneHour = 1000 * 60 * 60;
var bar$ = Ob$.timer(0, oneHour).flatMap(x => fetchCity('barcelona'));
var ber$ = Ob$.timer(10, oneHour).flatMap(x => fetchCity('berlin'));
var cap$ = Ob$.timer(70, oneHour).flatMap(x => fetchCity('capri'));
var cop$ = Ob$.timer(70, oneHour).flatMap(x => fetchCity('copenhagen'));
var fra$ = Ob$.timer(70, oneHour).flatMap(x => fetchCity('frankurt'));
var ist$ = Ob$.timer(20, oneHour).flatMap(x => fetchCity('istanbul'));
var lis$ = Ob$.timer(20, oneHour).flatMap(x => fetchCity('lisbon'));
var lon$ = Ob$.timer(20, oneHour).flatMap(x => fetchCity('london'));
var mad$ = Ob$.timer(80, oneHour).flatMap(x => fetchCity('madrid'));
var mia$ = Ob$.timer(50, oneHour).flatMap(x => fetchCity('miami'));
var nic$ = Ob$.timer(60, oneHour).flatMap(x => fetchCity('nice'));
var nyc$ = Ob$.timer(30, oneHour).flatMap(x => fetchCity('newyork'));
var sfc$ = Ob$.timer(30, oneHour).flatMap(x => fetchCity('sanfrancisco'));

var cities$ = Ob$.combineLatest(
  bar$, ber$, cap$, cop$, fra$, ist$, lis$, lon$, mad$, mia$, nic$, nyc$, sfc$, 
  (a, b, c, d, e, f, g, h, i, j, k, l, m) => [a, b, c, d, e, f, g, h, i, j, k, l, m])

var cities= [];
cities$.subscribe(latestCities => {
  cities = latestCities;
});

app.get('/cities', function(req, res) {
  res.json(cities);
});

app.use(express.static('public'));

app.listen(port, function(){
  console.log('listening on port ' + port);
});


