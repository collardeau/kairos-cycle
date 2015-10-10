/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';

export default function renderCities(avail, cities) {

  if(!avail){
    return  <h3 style={styles.heading}>Fetching...</h3>
  }

  if(!cities.length) {
    return  <h3 style={styles.heading}>No matches</h3>
  }

  return (
    <div style={ styles.cities}>
      <div style={styles.results}>
        <h3 style={styles.heading}>
          {cities.length } {cities.length > 1 ? 'Results' : 'Result'}
        </h3>
      </div>

      { 
      
        cities.map(city => {
          let { name, minSun, minLow, maxHigh, minHigh, forecasts, timespan } = city;
          return <city name={name} 
                  minSun={ minSun } minHigh={ minHigh } 
                  maxHigh ={ maxHigh } minLow ={ minLow }
                  forecasts = { forecasts } timespan={ timespan }
          />;
        })
        
      }

    </div>
  )

}

let styles = {
   'cities': {
     'display': 'flex',
     'flexWrap': 'wrap',
     'justifyContent': 'space-around'
   },
   'results': {
      'width': '100%' 
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
     'width': '200px'
   }
}


