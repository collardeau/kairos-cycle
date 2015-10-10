var express = require('express');
var RSVP = require('rsvp');
var superagent = require('superagent');
var Cycle = require('@cycle/core');
var Firebase = require('firebase');

var Ob$ = Cycle.Rx.Observable;
var app = express();

function fetchCity(cityName) {
  return new RSVP.Promise(function(resolve, rej) {
    superagent
    .get('http://api.openweathermap.org/data/2.5/forecast/daily')
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
var cap$ = Ob$.timer(90, oneHour).flatMap(x => fetchCity('capri'));
var cop$ = Ob$.timer(80, oneHour).flatMap(x => fetchCity('copenhagen'));
var fra$ = Ob$.timer(70, oneHour).flatMap(x => fetchCity('frankurt'));
var ist$ = Ob$.timer(100, oneHour).flatMap(x => fetchCity('istanbul'));
var lis$ = Ob$.timer(20, oneHour).flatMap(x => fetchCity('lisbon'));
var lon$ = Ob$.timer(120, oneHour).flatMap(x => fetchCity('london'));
var mad$ = Ob$.timer(80, oneHour).flatMap(x => fetchCity('madrid'));
var mia$ = Ob$.timer(150, oneHour).flatMap(x => fetchCity('miami'));
var myk$ = Ob$.timer(50, oneHour).flatMap(x => fetchCity('mykonos'));
var nic$ = Ob$.timer(60, oneHour).flatMap(x => fetchCity('nice'));
var nyc$ = Ob$.timer(130, oneHour).flatMap(x => fetchCity('newyork'));
var par$ = Ob$.timer(110, oneHour).flatMap(x => fetchCity('paris'));
var sev$ = Ob$.timer(140, oneHour).flatMap(x => fetchCity('sevilla,es'));
var sfc$ = Ob$.timer(30, oneHour).flatMap(x => fetchCity('sanfrancisco, us'));

var cities$ = Ob$.combineLatest(
  bar$, ber$, cap$, cop$, fra$, ist$, lis$, lon$, mad$, mia$, myk$, nic$, nyc$, par$, sev$, sfc$,
  (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) => (
    [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p]
  ))

var cities= [];
cities$.subscribe(latestCities => {
  cities = latestCities;
});

var ref = new Firebase('http://kairos.firebaseio.com');
function save(ip){
  ref.child('connects').push({
    ip: ip,
    stamp: Firebase.ServerValue.TIMESTAMP
  })
}

app.get('/cities', function(req, res) {
  res.json(cities);
  save(req.ip);
});

app.use(express.static('public'));

var isProd = process.env.NODE_ENV === 'production';
var port = isProd ? process.env.PORT : 3000;

app.listen(port, function(){
  console.log('listening on port ' + port);
});


