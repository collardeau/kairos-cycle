/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';
import renderFilters from './views/filters';

export default function view(state$) {
  return state$.map(({minTemp, maxCloud, maxDays, minDays, filteredCities}) => {
    
    let styles = {
      'app': {
        'margin': '0 auto',
        'width': '80%' 
      }
   }

    return (

      <div style={styles.app}>

        { renderFilters(state$) }       

        { filteredCities.map(city => {

            if (!city) { return <div>Loading</div> }

            let { name, maxCloud, minTemp, forecasts } = city;

            return <city name={name} 
              maxCloud={ maxCloud } minTemp={ minTemp } 
              forecasts = { forecasts } />

          }) 
          
        }

      </div> 
    )
  });
}


