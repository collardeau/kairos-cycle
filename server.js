var express = require('express');
var Firebase = require('firebase');
var cities$ = require('./cities');

var app = express();

var cities= [];
cities$.subscribe(latestCities => {
  cities = latestCities;
});

app.get('/cities', function(req, res) {
  res.json(cities);
  save(req.ip);
});

var ref = new Firebase('http://kairos.firebaseio.com');
function save(ip){
  ref.child('connects').push({
    ip: ip,
    stamp: Firebase.ServerValue.TIMESTAMP
  })
}

app.use(express.static('public'));

var isProd = process.env.NODE_ENV === 'production';
var port = isProd ? process.env.PORT : 3000;

app.listen(port, function(){
  console.log('listening on port ' + port);
});

