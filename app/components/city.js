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
          'width': '100px',
          'flex': '0 1 25%',
          'paddingBottom': '1.3em',
          'backgroundColor': 'lightblue',
          'textAlign': 'center'
        },
        'date': {
          'textAlign': 'center' 
        }
     };

      return (
        <span style={sty.forecast }>
          <h5 style={sty.date}>{date}</h5>
            <table>
              <tr>
                <td>High</td>
                <td>{ minTemp }</td>
              </tr>
              <tr>
                <td>cloud</td>
                <td>{ maxCloud }</td>
              </tr>
           </table>
        </span>    
      );
    }) 
  }

  function view(state$){

    return state$.map(state => {
      let { forecasts, name, maxCloud, minTemp } = state;

      let sty = {
        'header': {
          'backgroundColor': 'lightgoldenrodyellow',
          'padding': '0.5em  0 1.3em 1.3em',
        },
        'container': {
          'marginBottom': '1.3em'
        },
        'forecasts': {
          'display': 'flex',
          'flexWrap': 'wrap'
        }
      };

      return (
        <div style={sty.container}>
          <header style={sty.header}>
            <h3>{name}</h3>
            <span> 
              From date A to date B<br />
              max cloud: <b>{ maxCloud }</b>% min day high: <b>{ minTemp }</b>C
            </span>
          </header>
          <div style={sty.forecasts}>
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


