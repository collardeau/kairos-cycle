/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';
import renderFilters from './views/filters';

export default function view(state$) {

  return state$.map(({selectedMinHigh, selectedMinSun, selectedDuration, startDay, filteredCities}) => {
    
    let styles = {
      'app': {
        'margin': '0 auto',
        'width': '90%' 
      },
      'cities': {
        'display': 'flex',
        'flexWrap': 'wrap',
        'justifyContent': 'space-around'
      }
   }

    return (

      <div style={styles.app}>

        { renderFilters({selectedMinSun, selectedMinHigh, startDay, selectedDuration }) }       

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


