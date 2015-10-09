var express = require('express');
var app = express();
var superagent = require('superagent');
//var Cycle = require('@cycle/core');
//var Ob$ = Cycle.Rx.Observable;

var URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';

superagent
.get(URL)
.set('x-api-key','5ba09e308c10daeb4737c29d3fef2907')
.query({ id: 524901, cnt: 7 })
.end(function(err, res) {
  console.log(res.body);
});

app.listen(3000, function(){
  console.log('listening on port 3000...');
});


