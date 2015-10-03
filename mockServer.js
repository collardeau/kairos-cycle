import Cycle from '@cycle/core';
let Ob$ = Cycle.Rx.Observable;

let barcelona = require('json!./sample-data/barcelona.json');
let berlin = require('json!./sample-data/berlin.json');
let london = require('json!./sample-data/london.json');

let calcMinTemp = (arrOfForecasts) => {
  return arrOfForecasts.reduce((acc, curr) => {
    return curr.temp.min < acc ? curr.temp.min : acc;  
  }, 100)
}

let barcelona$ = Ob$.just(barcelona)
.delay(800)
.map(city => ({
  name: city.city.name, 
  forecasts: city.list,
  minTemp: calcMinTemp(city.list)
}));

let berlin$ = Ob$.just(berlin)
.delay(1600)
.map(city => ({
  name: city.city.name, 
  forecasts: city.list,
  minTemp: calcMinTemp(city.list)
}));

let london$ = Ob$.just(london)
.delay(2200)
.map(city => ({
  name: city.city.name, 
  forecasts: city.list,
  minTemp: calcMinTemp(city.list)
}));

export let cities$ =  Ob$.combineLatest(
  barcelona$.startWith(null),
  berlin$.startWith(null),
  london$.startWith(null),
  (bar, ber, lon) => [bar, ber, lon]
);
 

