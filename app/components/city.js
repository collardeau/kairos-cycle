/** @jsx hJSX */ 
import Cycle from '@cycle/core';
import {hJSX} from '@cycle/dom';

let Ob$ = Cycle.Rx.Observable;

export default function city(responses) {

  function renderDetails(state$) {
    return state$.map(state => {
      let { date, minTemp, maxCloud } = state;

      let sty = {
        'forecast': {
          'flex': '1 0 30%',
          'flexWrap': 'wrap',
        }
     };

      return (
        <span style={sty.forecast }>
          <p>{date}
            <br />High: { minTemp }, Cloud Coverage: { maxCloud }
          </p>
        </span>    
      );
    }) 
  }

  function view(state$){

    return state$.map(state => {
      let { forecasts, name, maxCloud, minTemp } = state;

      let sty = {
        'border': {
          'border': '1px solid' 
        },
        'container': {
          'display': 'flex',
          'flexWrap': 'wrap'
        }
      };

      return (
        <div>
          <header style={sty.border}>
            <h3>{name}</h3>
            <p> max cloud: <b>{ maxCloud }</b>%<br />min day high: <b>{ minTemp }</b>C</p>
          </header>
          <div style={sty.container}>
            { forecasts.map(forecast => renderDetails(Ob$.just(forecast))) }
          </div>
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


