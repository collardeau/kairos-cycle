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
        <p>Highs between <b>{ minHigh }&ordm;C</b> and <b>{ maxHigh }&ordm;C</b>.</p>
        <p>Skies at least <b>{minSun}% clear</b> each day.</p>
        <p>The lowest temp expected is <b> { minLow } &ordm;C</b>.</p>
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
    'marginTop': '0.8em',
    'backgroundColor': 'lightblue',
    'padding': '0.1em 0 1.3em 1.3em',
    'borderRadius': '25px',
  },
  'header': {
    'backgroundColor': 'lightgoldenrodyellow',
    'padding': '0.1em 0 1.3em 1.3em',
    'borderRadius': '25px',
  },
  'name': {
    'marginBotton': '0.3em'      
  },
  'dim': {
    'color': '#777' 
  }
};


