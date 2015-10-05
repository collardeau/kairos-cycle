/** @jsx hJSX */ 
import Cycle from '@cycle/core';
import {hJSX} from '@cycle/dom';

let Ob$ = Cycle.Rx.Observable;

export default function city(responses) {

  function renderDetails(state$) {
    return state$.map(state => {
      let { date, minTemp, maxCloud } = state;
      return (
        <div>
          <p>On: {date}
            <br />High: { minTemp }, Cloud Coverage: { maxCloud }
          </p>
        </div>    
      );
    }) 
  }

  function view(state$){
    return state$.map(state => {
      let { forecasts, name, maxCloud, minTemp } = state;
      return (
       <div>
          <h3>{name}</h3>
          <p> maximum cloud coverage: <b>{ maxCloud }</b>%</p>
          <p> minimum day high: <b>{ minTemp }</b>C</p>
          { forecasts.map(forecast => renderDetails(Ob$.just(forecast))) }
      </div>
      );
    });
  }

  let state$ = responses.props.getAll(); 
  let vtree$ = view(state$);

  return {
    DOM: vtree$
  }
}


