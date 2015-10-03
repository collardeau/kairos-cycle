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
      .debounce(10),
    changeMaxCloud$ : DOM.select('#maxCloud').events('newValue')
      .map(e => e.detail)
      .debounce(10)
  };
}

function model(actions){ 

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

function renderCity(city) {
  if (!city) { return null }
  return (
    <div>
      <h3>{city.name}</h3>
      <p>Over the next 7 days:</p>
      <p> max cloud: <b>{ city.maxCloud }</b></p>
      <p> min temp: <b>{ city.minTemp }</b>C</p>
    </div>
  )
};

function view(state$) {
  return state$.map(({minTemp, maxCloud, filteredCities}) => {
    return (
      <div>
        <labeled-slider 
          id="minTemp" label="Min Temperature" mea="C"
          initial = {minTemp} min="0" max="30"
        />
        <labeled-slider 
          id="maxCloud" label="Max Cloud Coverage"  mea="%"
          initial = {maxCloud} min="0" max="100"
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
