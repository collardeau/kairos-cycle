/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';
import renderFilters from './views/filters';

export default function view(state$) {

  return state$.map(({selectedMinHigh, selectedMinSun, selectedDuration, startDay, filteredCities}) => {
    
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
      }
   }

    return (

      <div style={styles.app}>

        <h1 style={styles.header}>KAIROS</h1>
        { renderFilters({selectedMinSun, selectedMinHigh, startDay, selectedDuration }) }       

        <h3 style={styles.heading}>x Results</h3>

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

      </div> 
    )
  });
}

