/** @jsx hJSX */ 
import Cycle from '@cycle/core';
import {hJSX, makeDOMDriver } from '@cycle/dom';
import {cities$} from '../mockServer';

let Ob$ = Cycle.Rx.Observable;

function intent(DOM){

 return {
    requestCities$: cities$,
    changeMinTemp$ : DOM.select('#minTemp').events('input')
      .map(e => e.target.value)
      .debounce(100),
    changeMaxCloud$ : DOM.select('#maxCloud').events('input')
      .map(e => e.target.value)
      .debounce(100),
  };
}

function model(actions){ 

  return Cycle.Rx.Observable.combineLatest(
    actions.changeMinTemp$.startWith(10),
    actions.changeMaxCloud$.startWith(20),
    actions.requestCities$.startWith([]),
    (minTemp, maxCloud, cities) => ({minTemp, maxCloud, cities})
  );
}

function renderMinTempSlider(minTemp){
  return (
    <div>
      <input id='minTemp' type='range' min='-20' max='40' value= {minTemp} />
      { minTemp }
    </div> 
  )
}

function renderCity(city) {
  return <div>{city ? city.name : 'city'}</div>
};

function view(state$) {
  return state$.map(({minTemp, maxCloud, cities}) => {
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
