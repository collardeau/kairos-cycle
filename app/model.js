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

  return Ob$.combineLatest(

    // user action streams
    actions.changeMinTemp$.startWith(4),
    actions.changeMaxCloud$.startWith(100),

    // api data prettied up with only relevant forecast days
    
    Ob$.combineLatest(
  
      // sieved responses stream
  
      Ob$.combineLatest(
  
        // each raw response stream
  
        bcnRe$.startWith(null),
        berRe$.startWith(null),
        lonRe$.startWith(null),
  
        // combine to make sieved responses stream 
  
        (bar, ber, lon) => [bar, ber, lon]
  
      ).map(citiesRes => {
  
        // and sieve the raw streams
  
        return citiesRes.map(cityRes => {
          if (!cityRes) return null;
          return {
            name: cityRes.city.name ,
            forecasts: cityRes.list.map(forecast => ({
              date: new Date(forecast.dt * 1000),
              minTemp: forecast.temp.min,
              maxCloud: forecast.clouds,
            }))
          }
        });
      }).startWith([]),
  
    // selected days to forecast stream
    Ob$.just(5).startWith(7),
  
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
  
  ).map(c => {
  
    // add derived data based on selected forecast
  
    if (!c) return null;

    return c.map(d => {

      if (!d) return null;

      let {forecasts} = d;

     return {
        ...d,
  
        minTemp: forecasts.reduce((min, next) => {
          return next.minTemp < min ? next.minTemp : min;      
        }, 50),
  
        maxCloud: forecasts.reduce((max, next) => {
          return next.maxCloud > max ? next.maxCloud : max;      
        }, 0)
   
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


