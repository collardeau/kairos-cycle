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
        <p>Day Highs from <b>{ minHigh } </b> to <b>{ maxHigh }&ordm;C</b></p>
        <p>Clear sky at least <b>{minSun}%</b>of each day</p>
        <p>Low: <b> { minLow }&ordm;C</b></p>
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
    'marginTop': '1em',
    'backgroundColor': '#C2EAE9',
    'padding': '1.3em',
    'borderRadius': '25px'
    //'border': '3px dotted #F8EFB6'
  },
 'name': {
   'margin': '0',
   'marginBottom': '0.3em'
  },
  'dim': {
    'color': '#777' 
  }
};


