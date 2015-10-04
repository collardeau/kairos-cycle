/** @jsx hJSX */ 
import Cycle from '@cycle/core';
import {hJSX, makeDOMDriver } from '@cycle/dom';
import labeledSlider from './components/labeledSlider';
import intent from './intent'
import model from './model'

function renderForecast(forecast){
  return (
    <span>___ </span>
  )
}

function renderCity(city) {
  if (!city) { return <div>Loading</div> }
  let { name, maxCloud, minTemp, forecasts } = city;
  return (
    <div>
      <h3>{name}</h3>
      <p>Over the next 7 days:</p>
      <p> max cloud: <b>{ maxCloud }</b></p>
      <p> min temp: <b>{ minTemp }</b>C</p>
      { forecasts.map(forecast => renderForecast(forecast))}
    </div>
  )
};

function view(state$) {
  return state$.map(({minTemp, maxCloud, filteredCities}) => {
    return (
      <div>
        <labeled-slider 
          key = {1} id="minTemp" label="Min Temperature" mea="C"
          initial = {minTemp} min="0" max="30"
        />
        <labeled-slider 
          key = {2} id="maxCloud" label="Max Cloud Coverage"  mea="%"
          initial = {maxCloud} min="0" max="100"
        />

        { filteredCities.map(city => renderCity(city) ) }

      </div> 
    )
  });
}

function main ({DOM}) {
  let actions = intent(DOM);
  let state$ = model(actions);
  let vtree$ = view(state$);

  return {
    DOM: vtree$
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app', {
    'labeled-slider': labeledSlider 
  })
});
