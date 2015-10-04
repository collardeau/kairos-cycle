import {Rx} from '@cycle/core';
let Ob$ = Rx.Observable;

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


