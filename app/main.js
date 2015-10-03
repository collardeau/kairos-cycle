/** @jsx hJSX */ 
import Cycle from '@cycle/core';
import {hJSX, makeDOMDriver } from '@cycle/dom';
import {cities$} from '../mockServer';

let Ob$ = Cycle.Rx.Observable;

function renderMinTempSlider(minTemp){
  return (
    <div>
      <input id='minTemp' type='range' min='-20' max='40' value= {minTemp} />
      min temp: { minTemp }
    </div> 
  )
}

function renderCity(city) {
  if (!city) { return null }
  return (
    <div>
      <h3>{city.name}</h3>
      <p> min temp over the last 7 days: <b>{ city.minTemp }</b>C</p>
    </div>
  )
};

function intent(DOM){

 return {
    requestCities$: cities$,
    changeMinTemp$ : DOM.select('#minTemp').events('input')
      .map(e => e.target.value)
      .debounce(10),
    changeMaxCloud$ : DOM.select('#maxCloud').events('input')
      .map(e => e.target.value)
      .debounce(10),
  };
}

function model(actions){ 
  return Cycle.Rx.Observable.combineLatest(
    actions.changeMinTemp$.startWith(10),
    actions.changeMaxCloud$.startWith(20),
    actions.requestCities$.startWith([]),
    (minTemp, maxCloud, cities) => ({
      cities: cities.filter(city => city ? city.minTemp > minTemp: null),
      minTemp, 
      maxCloud
    })
  );
}

function view(state$) {
  return state$.map(({minTemp, maxCloud, cities}) => {
    console.log(cities);
   return (
      <div>
        { renderMinTempSlider(minTemp) }

        <input id='maxCloud' type='range' min='-20' max='40' value= {maxCloud} />
        { maxCloud }

        { cities.map(city => renderCity(city) ) }

      </div> 
    )
  });
}

function main ({DOM}) {
  return {
    DOM: view(model(intent(DOM)))
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app')
});
