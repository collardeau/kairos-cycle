/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';
import renderFilters from './views/filters';

export default function view(state$) {

  return state$.map(({selectedMinHigh, selectedMinSun, selectedDuration, startDay, filteredCities}) => {
    
    let styles = {
      'app': {
        'margin': '0 auto',
        'width': '90%' 
      }
   }

    return (

      <div style={styles.app}>

        { renderFilters({selectedMinSun, selectedMinHigh, startDay, selectedDuration }) }       

        { filteredCities.map(city => {

            if (!city) { return <div>Loading</div> }

            let { name, minSun, minHigh, forecasts, timespan } = city;

            return <city name={name} 
              minSun={ minSun } minHigh={ minHigh } 
              forecasts = { forecasts } timespan={ timespan }/>

          }) 
          
        }

      </div> 
    )
  });
}


