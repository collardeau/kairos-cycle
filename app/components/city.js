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

    let { forecasts, name, minSun, minHigh, timespan } = state.props;

    let sty = {
      'container': {
        'marginTop': '0.8em',
      },
      'header': {
        'backgroundColor': 'lightgoldenrodyellow',
        'padding': '0.1em 0 1.3em 1.3em',
        'borderRadius': '25px',
      },
      'name': {
        'marginBotton': '0.3em'      
      },
      'table': {
        'width': '66%',
        'marginBottom': '0.5em'      
      },
     'forecasts': {
        'display': state.toggle,
        'flexWrap': 'wrap',
        'justifyContent': 'space-around'
      },
      'half': {
        'width': '50%'
      },
      'dim': {
        'color': '#777' 
      },
      'moreBtn': {
        'float': 'right',
        'marginRight': '0.8em'
      }
    };

    return (
      <div style={sty.container}>
        <header style={sty.header}>
          <h3 style={sty.name}>{name}</h3>
          <small style={sty.dim}>{ timespan }</small>
          <table style={sty.table}>
            <tr style={{'height': '2.1em'}}>
              <td>Min High</td>
              <td>{ minHigh }C</td>
            </tr>
            <tr style={{'width': '2.1em'}}>
              <td>Min Sun</td>
              <td>{ minSun }%</td>
            </tr>
          </table>
          <span id='toggle'style={sty.moreBtn}>...</span>
       </header>
        <div style={sty.forecasts}>
          { forecasts.map(forecast => renderForecast(Ob$.just(forecast))) }
        </div>
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


