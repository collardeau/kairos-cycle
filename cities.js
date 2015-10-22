var RSVP = require('rsvp');
var superagent = require('superagent');
var Cycle = require('@cycle/core');
var Ob$ = Cycle.Rx.Observable;

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
var bue$ = Ob$.timer(200, oneHour).flatMap(x => fetchCity('buenosaires, arg'));
var cap$ = Ob$.timer(90, oneHour).flatMap(x => fetchCity('rome,it'));
var cop$ = Ob$.timer(80, oneHour).flatMap(x => fetchCity('copenhagen'));
var ist$ = Ob$.timer(100, oneHour).flatMap(x => fetchCity('istanbul'));
var lis$ = Ob$.timer(20, oneHour).flatMap(x => fetchCity('lisbon'));
var lon$ = Ob$.timer(120, oneHour).flatMap(x => fetchCity('london'));
var mad$ = Ob$.timer(80, oneHour).flatMap(x => fetchCity('madrid'));
var mal$ = Ob$.timer(80, oneHour).flatMap(x => fetchCity('valetta, malta'));
var mia$ = Ob$.timer(150, oneHour).flatMap(x => fetchCity('miami'));
var myk$ = Ob$.timer(50, oneHour).flatMap(x => fetchCity('mykonos'));
var nic$ = Ob$.timer(60, oneHour).flatMap(x => fetchCity('nice,fr'));
var nyc$ = Ob$.timer(130, oneHour).flatMap(x => fetchCity('newyork'));
var par$ = Ob$.timer(110, oneHour).flatMap(x => fetchCity('paris'));
var sev$ = Ob$.timer(140, oneHour).flatMap(x => fetchCity('sevilla,es'));
var sfc$ = Ob$.timer(30, oneHour).flatMap(x => fetchCity('sanfrancisco, us'));
var sin$ = Ob$.timer(170, oneHour).flatMap(x => fetchCity('singapore'));
var spl$ = Ob$.timer(180, oneHour).flatMap(x => fetchCity('split,croatia'));
var syd$ = Ob$.timer(25, oneHour).flatMap(x => fetchCity('sydney,aus'));
var tok$ = Ob$.timer(160, oneHour).flatMap(x => fetchCity('tokyo,jp'));

var cities$ = Ob$.combineLatest(
  bar$, ber$, bue$, cap$, cop$, ist$, lis$, lon$, mad$, mal$, mia$, myk$, 
  nic$, nyc$, par$, sev$, sfc$, sin$, spl$, syd$, tok$,
  (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v) => (
    [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v]
  ))

var cities= [];
cities$.subscribe(latestCities => {
  cities = latestCities;
});

module.exports = cities$;

