/** @jsx hJSX */ 
import Cycle from '@cycle/core';
import {hJSX} from '@cycle/dom';

export default function renderForecast(state$) {
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
 

