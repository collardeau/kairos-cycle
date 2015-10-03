import Cycle from '@cycle/core';
import R from 'Ramda';

let Ob$ = Cycle.Rx.Observable;

let bcnReq = require('json!./sample-data/barcelona.json');
let berReq = require('json!./sample-data/berlin.json');
let lonReq = require('json!./sample-data/london.json');

let bcnRe$ = Ob$.just(bcnReq).delay(1500);
let berRe$ = Ob$.just(berReq).delay(500);
let lonRe$ = Ob$.just(lonReq).delay(800);

function model(city){

  function filterResponse({city, list}) {
    return {
      name: city.name, 
      forecasts: list.map(forecast => {
        return {
          date: new Date(forecast.dt * 1000),
          minTemp: forecast.temp.min,
          clouds: forecast.clouds
        }
      })
    } 
  }
  
  function deriveData({name, forecasts}){
    const min = prop => R.reduce((min, next) => R.min(next[prop], min));
    const minTemp = min('minTemp')(forecasts[0].minTemp)(forecasts);
    return {
      name,
      forecasts,
      minTemp
    }
  }

  return deriveData(filterResponse(city));
};

let bcn$ = bcnRe$.map(city => model(city))
let ber$ = berRe$.map(city => model(city))
let lon$ = lonRe$.map(city => model(city))

export let cities$ =  Ob$.combineLatest(
  bcn$.startWith(null),
  ber$.startWith(null),
  lon$.startWith(null),
  (bar, ber, lon) => {
    console.log( lon);
    return [bar, ber, lon]
  }
);

