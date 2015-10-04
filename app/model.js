import {Rx} from '@cycle/core';
let Ob$ = Rx.Observable;

let 
  bcnReq = require('json!../sample-data/barcelona.json'),
  berReq = require('json!../sample-data/berlin.json'),
  lonReq = require('json!../sample-data/london.json');

let 
  bcnRe$ = Ob$.just(bcnReq).delay(2400),
  berRe$ = Ob$.just(berReq).delay(1200),
  lonRe$ = Ob$.just(lonReq).delay(800);

export default function model(actions){ 

  let { changeMaxDays$, changeMaxCloud$, changeMinTemp$ } = actions;

  return Ob$.combineLatest(

    // user action streams
    changeMinTemp$.startWith(4),
    changeMaxCloud$.startWith(100),

    // api data prettied up with only forecast days
    
    Ob$.combineLatest(
  
      // sieved responses stream
  
      Ob$.combineLatest(
  
        // each raw response stream
  
        bcnRe$.startWith(null),
        berRe$.startWith(null),
        lonRe$.startWith(null),
  
        // combine to make sieved responses stream 
  
        (bar, ber, lon) => [bar, ber, lon]
  
      ).map(cities => {
  
        // sieve the raw streams
  
        return cities.map(city => {
          if (!city) return null;
          return {
            name: city.city.name ,
            forecasts: city.list.map(forecast => ({
              date: new Date(forecast.dt * 1000),
              minTemp: forecast.temp.min,
              maxCloud: forecast.clouds,
            }))
          }
        });
      }).startWith([]),
  
    // selected days to forecast stream
    changeMaxDays$.startWith(7),
  
    // combine to make stream with only selected days to forecast
    (cities, dateEnd) => {
      return cities.map(city => {
        if (!city) return null;
        return {
          ...city,
         forecasts: city.forecasts.slice(0, dateEnd)
        };    
      });
    }
  
  ).map(cities => {
  
    // add derived data based on selected forecast
  
    if (!cities) return null;
    return cities.map(city => {

      if (!city) return null;
      let {forecasts} = city;

      return {
        ...city,
        minTemp: forecasts.reduce((min, next) => {
          return next.minTemp < min ? next.minTemp : min;      
        }, forecasts[0].minTemp),
        maxCloud: forecasts.reduce((max, next) => {
          return next.maxCloud > max ? next.maxCloud : max;      
        }, forecasts[0].maxCloud)
      }
  
    });
  
  }).startWith([]),

    // combine cities and filters

    (minTemp, maxCloud, cities) => ({
      filteredCities: cities.filter(city => {
        if(!city) return null;
        return city.minTemp > minTemp 
        && city.maxCloud < maxCloud;
      }),
      minTemp,
      maxCloud
    })

  );
}

