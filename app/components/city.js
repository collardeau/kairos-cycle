/** @jsx hJSX */ 
import Cycle from '@cycle/core';
import {hJSX} from '@cycle/dom';

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

  function renderDetails(state$) {
    return state$.map(state => {
      let { date, desc, high, low, humidity, sun, wind } = state;

      let sty = {
        'forecast': {
          'flex': '0 0 20%'
        },
        'date': {
          //'textAlign': 'center'
          'margin': '0.2em'
        }
      };

      return (
        <span style={sty.forecast }>
        <h5 style={sty.date}>{date}</h5>
        <p>{ desc }</p>
          <table>
            <tr>
              <td>High</td>
              <td>{ high }</td>
            </tr>
            <tr>
              <td>Low</td>
              <td>{ low }</td>
            </tr>
            <tr>
              <td>Sun</td>
              <td>{ sun }%</td>
            </tr>
            <tr>
              <td>H</td>
              <td>{ humidity }%</td>
            </tr>
             <tr>
              <td>Wind</td>
              <td>{ wind } m/s</td>
            </tr>
 
          </table>
        </span>    
        );
    }) 
  }
 
  return state$.map(state => {

    let { forecasts, name, maxCloud, minHigh, timespan } = state.props;

    let sty = {
      'container': {
        'marginTop': '0.8em',
      },
      'header': {
        'backgroundColor': 'lightgoldenrodyellow',
        'padding': '0.1em 0 1.3em 1.3em',
        'borderRadius': '25px',
      },
     'forecasts': {
        'display': state.toggle,
        'flexWrap': 'wrap',
        'justifyContent': 'space-around'
      },
      'half': {
        'width': '50%'
      }
    };

    return (
      <div style={sty.container}>
        <header style={sty.header}>
          <h3 style={{ 'marginBottom': '0.3em'}}>{name}</h3>
          <small style={{'color': '#777'}}>{ timespan }</small>
          <table style={{'width': '66%', 'marginBottom': '0.5em'}}>
            <tr style={{'height': '2.1em'}}>
              <td>Min High</td>
              <td>{ minHigh }C</td>
            </tr>
            <tr style={{'width': '2.1em'}}>
              <td>Min Sun</td>
              <td>{ maxCloud }%</td>
            </tr>
          </table>
          <span id='toggle'style={{'float': 'right', 'marginRight': '0.8em'}}>...</span>
       </header>
        <div style={sty.forecasts}>
          { forecasts.map(forecast => renderDetails(Ob$.just(forecast))) }
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


