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
          'textAlign': 'center',
          'border': '1px solid',
          'display': 'none'
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
          'padding': '0.1em 0 1.3em 1.3em',
          'borderRadius': '25px',
        },
        'container': {
          'marginTop': '0.8em',
        },
        'forecasts': {
          'display': 'flex',
          'flexWrap': 'wrap'
        },
        'half': {
          'width': '50%'
        }
      };

      return (
        <div style={sty.container}>
          <header style={sty.header}>
            <h3 style={{ 'marginBottom': '0.3em'}}>{name}</h3>
            <table style={{'width': '66%', 'marginBottom': '0.5em'}}>
              <tr style={{'height': '2.1em'}}>
                <td>Lowest Day High</td>
                <td>{ minTemp }C</td>
              </tr>
              <tr style={{'width': '2.1em'}}>
                <td>Max Cloud Coverage</td>
                <td>{ maxCloud }%</td>
              </tr>
            </table>
            <small style={{'color': '#777'}}>Oct 6 to Oct 10</small>
            <span style={{'float': 'right', 'marginRight': '0.8em'}}>...</span>
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


