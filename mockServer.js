import Cycle from '@cycle/core';
let Ob$ = Cycle.Rx.Observable;

let barcelona = require('json!./sample-data/barcelona.json');
let berlin = require('json!./sample-data/berlin.json');
let london = require('json!./sample-data/london.json');

let barcelona$ = Ob$.just(barcelona)
.delay(800).map(city => ({name: city.city.name, forecasts: city.list}));

let berlin$ = Ob$.just(berlin).delay(1200)
.delay(600).map(city => ({name: city.city.name, forecasts: city.list}));

let london$ = Ob$.just(london).delay(400)
.delay(1200).map(city => ({name: city.city.name, forecasts: city.list}));

export let cities$ =  Ob$.combineLatest(
    barcelona$.startWith(null),
    berlin$.startWith(null),
    london$.startWith(null),
    (bar, ber, lon) => [bar, ber, lon]
);
 

