/** @jsx hJSX */ 
import Cycle from '@cycle/core';
import {hJSX} from '@cycle/dom';
import renderForecast from '../views/forecast';

let Ob$ = Cycle.Rx.Observable;

export default function city(responses) {
  
  function intent(DOM){
    return {
      toggleDetails$ : DOM.select('#toggle').events('click')
    };
  }

  function model(context, actions) {
    // toggle is not used
    return Ob$.combineLatest(
      actions.toggleDetails$.startWith('none').scan((x, y) => {
         return x === 'flex' ? 'none' : 'flex';
      }),
      context.props.getAll(),
      (toggle, props) => ({toggle,props})
    );
  }

 function view(state$){

   return state$.map(state => {

    let { forecasts, name, minSun, minLow, maxHigh, minHigh, timespan } = state.props;

    return (
      <div style={sty.container}>
        <h3 style={sty.name}>{name}</h3>
        <span style={sty.dim}>From { timespan }</span>
        <p>Highs between <b>{ minHigh } </b> and <b>{ maxHigh }&ordm;C</b>.</p>
        <p>Skies at least <b>{minSun}% clear</b> every day.</p>
        <p>Low expected to be <b> { minLow }&ordm;C</b>.</p>
     </div>
    );
  });
}

  let actions = intent(responses.DOM);
  let state$ = model(responses, actions);
  let vtree$ = view(state$)

  return {
    DOM: vtree$
  }
}

let sty = {
  'container': {
    'marginTop': '1.3em',
    'backgroundColor': 'lightblue',
    'padding': '1.3em',
    'borderRadius': '25px',
  },
 'name': {
   'margin': '0',
   'marginBottom': '0.3em'
  },
  'dim': {
    'color': '#777' 
  }
};


