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

let citiesRe$ =  Ob$.combineLatest(
  bcnRe$.startWith(null),
  berRe$.startWith(null),
  lonRe$.startWith(null),
  (bar, ber, lon) => [bar, ber, lon]
);

let citiesClean$ = citiesRe$.map(citiesRes => {
  if (!citiesRes) return null;
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
});

//citiesClean$.subscribe(res => console.log(res))

let dateEnd$ = Ob$.just(4);

let citiesTrim$ = Ob$.combineLatest(
  citiesClean$.startWith([]),
  dateEnd$.startWith(7),
  (cities, dateEnd) => {
    return cities.map(city => {
      if (!city) return null;
      return {
        ...city,
       forecasts: city.forecasts.slice(0,4)
      };    
    });
  }
);

citiesTrim$.subscribe(res => console.log(res))

//let citiesWithDays$ =  Ob$.combineLatest(
//  citiesRe$.startWith([]),
//  dateEnd$.startWith(7),
//  (cities, dateEnd) => {
//    return cities.map(city => {
//      
//    });
//    let forecasts = 
//    return city;  
//  }
//);
//
//citiesWithDays$.subscribe(res => console.log(res))

let 
  bcnPure$ = bcnRe$.map(city => sieve(city)),
  berPure$ = berRe$.map(city => sieve(city)),
  lonPure$ = lonRe$.map(city => sieve(city));

const extract = ({name, forecasts}) => {
  const min = prop => R.reduce((min, next) => R.min(next[prop], min));
sponses$.subscribe(res => console.log(res))
  const minTemp = min('minTemp')(forecasts[0].minTemp)(forecasts);
  const maxCloud = max('maxCloud')(forecasts[0].maxCloud)(forecasts);
  return {
    name,
    forecasts,
    minTemp,
    maxCloud
  }
}

let
  bcn$ = bcnPure$.map(city => extract(city)),
  ber$ = berPure$.map(city => extract(city)),
  lon$ = lonPure$.map(city => extract(city));

let cities$ =  Ob$.combineLatest(
  bcn$.startWith(null),
  ber$.startWith(null),
  lon$.startWith(null),
  (bar, ber, lon) => {
    //console.log( lon);
    return [bar, ber, lon]
  }
);

export default function model(actions){ 

  function passes(city, minTemp, maxCloud) {
    if(!city) return null
      return city.minTemp > minTemp 
        && city.maxCloud < maxCloud;
  }

  return Ob$.combineLatest(

    actions.changeMinTemp$.startWith(4),
    actions.changeMaxCloud$.startWith(100),
    actions.requestCities$.startWith([]),

    (minTemp, maxCloud, cities) => ({
      filteredCities: cities.filter(city => passes(city, minTemp, maxCloud)),
      minTemp,
      maxCloud
    })

  );
}


