/** @jsx hJSX */ 
import Cycle from '@cycle/core';
import {hJSX, makeDOMDriver } from '@cycle/dom';
import {cities$} from '../mockServer';
import labeledSlider from './components/labeledSlider';

let Ob$ = Cycle.Rx.Observable;

function intent(DOM){

 return {
    requestCities$: cities$,
    changeMinTemp$ : DOM.select('#minTemp').events('newValue')
      .map(e => e.detail)
      .debounce(10)
  };
}

function model(actions){ 

  return Ob$.combineLatest(
    actions.changeMinTemp$.startWith(4),
    actions.requestCities$.startWith([]),
    (minTemp, cities) => ({
      filteredCities: cities.filter(city => city ? city.minTemp > minTemp: null),
      minTemp
    })
  );
}

function renderCity(city) {
  if (!city) { return null }
  return (
    <div>
      <h3>{city.name}</h3>
      <p> min temp over the next 7 days: <b>{ city.minTemp }</b>C</p>
    </div>
  )
};

function view(state$) {
  return state$.map(({minTemp, maxCloud, filteredCities}) => {
    return (
      <div>
        <labeled-slider 
          id="minTemp" label="Min Temperature" 
          initial = {minTemp} min="0" max="40"
        />

        { filteredCities.map(city => renderCity(city) ) }

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
  DOM: makeDOMDriver('#app', {
    'labeled-slider': labeledSlider 
  })
});
