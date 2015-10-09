/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';
import renderFilters from './views/filters';

var whiteLogo = require('../public/img/white_logo.png');
var blackLogo = require('../public/img/black_logo.png');

export default function view(state$) {

  return state$.map(({selectedMinHigh, selectedMinSun, selectedDuration, startDay, filteredCities}) => {
    
    return (

      <div style={styles.app}>

        <div style={styles.header}>
          <img src={whiteLogo} />
        </div>

        { renderFilters({selectedMinSun, selectedMinHigh, startDay, selectedDuration }) }       

        <h3 style={styles.heading}>
          { filteredCities.length } 
          { filteredCities.length > 1 ? ' Results' : ' Result' }
        </h3>

        <div style={styles.cities}>
          
        { filteredCities.map(city => {

            if (!city) { return <div>Loading</div> }

            let { name, minSun, minLow, maxHigh, minHigh, forecasts, timespan } = city;

            return <city name={name} 
              minSun={ minSun } minHigh={ minHigh } maxHigh ={ maxHigh } minLow ={ minLow }
              forecasts = { forecasts } timespan={ timespan }/>

          }) 
          
        }
        </div>
        <div style={styles.footer}>
          <img src={blackLogo} />  
          <p><a href='http://thomas.collardeau.com'>thomas.collardeau.com</a></p>
        </div>

      </div> 
    )
  });
}

let styles = {
  'app': {
    'margin': '0 auto',
    'width': '85%' 
   },
   'cities': {
     'display': 'flex',
     'flexWrap': 'wrap',
     'justifyContent': 'space-around'
   },
   'header': {
     'padding': '0.5em 0',
     'textAlign': 'center'
   },
   'heading': {
     'margin': '0 auto',
     'marginTop': '0.5em',
     'backgroundColor': 'white',
     'padding': '0.5em',
     'borderRadius': '25px',
     'height': '30px',
     'lineHeight': '30px',
     'textAlign': 'center',
     'maxWidth': '150px'
   },
   'footer': {
     'paddingTop': '1.3em',
     'textAlign': 'center'
   }
}


