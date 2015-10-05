/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';
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
      <button id='load'>Refresh</button>
      <h3>{name}</h3>
      <p> max cloud: <b>{ maxCloud }</b></p>
      <p> min temp: <b>{ minTemp }</b>C</p>
      { forecasts.map(forecast => renderForecast(forecast))}
    </div>
  )
};

function view(state$) {
  return state$.map(({minTemp, maxCloud, maxDays, minDays, filteredCities}) => {
    return (
      <div>

        <label>Forecast from:</label>
        <select id="forecastFrom">
          <option value="1">today</option>
          <option value="2">tomorrow</option>
          <option value="3">+2 days</option>
          <option value="4">+3</option>
          <option value="5">+4</option>
          <option value="6">+5</option>
          <option value="7">+6</option>
        </select>


        <label>until:</label>
        <select id="forecastUntil">
          <option value="1">today</option>
          <option value="2">tomorrow</option>
          <option selected value="3">+2 days</option>
          <option value="4">+3</option>
          <option value="5">+4</option>
          <option value="6">+5</option>
          <option value="7">+6</option>
        </select>

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

export default function app ({DOM, HTTP}) {

  const URL = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=berlin&units=metric&cnt=7';
  let weather$ = DOM.select('#load').events('click')
  .map(() => {
    return {
      url: URL,
      method: 'GET'
    };
  });

  weather$.subscribe(x => console.log(x));
  let res$ = HTTP.filter(re$ => {
    return re$
  }).mergeAll();
  
  res$.subscribe(x => console.log(x));

  let actions = intent(DOM);
  let state$ = model(actions);
  let vtree$ = view(state$);

  state$.subscribe(x => console.log(x));
  return {
    DOM: vtree$,
    HTTP: weather$
  };
}


