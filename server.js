var express = require('express');
var app = express();
var RSVP = require('rsvp');
var superagent = require('superagent');
var Cycle = require('@cycle/core');
var Ob$ = Cycle.Rx.Observable;

var URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';

var moscow = new RSVP.Promise(function(resolve, rej) {
  superagent
  .get(URL)
  .set('x-api-key','5ba09e308c10daeb4737c29d3fef2907')
  .query({ 
    id: 524901, 
    cnt: 7 
  })
  .end(function(err, res) {
    resolve(res.body);
  });
});

app.get('/cities', function(req, res) {
  moscow.then(d => {
    res.json(d); 
  })
});


//var source$ = Ob$.fromPromise(moscow);
//source$.subscribe(x => console.log(x));

app.listen(3000, function(){
  console.log('listening on port 3000...');
});
//


