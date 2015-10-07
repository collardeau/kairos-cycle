/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';
import renderFilters from './views/filters';

export default function view(state$) {

  return state$.map(({minHigh, maxCloud, maxDays, minDays, filteredCities}) => {
    
    let styles = {
      'app': {
        'margin': '0 auto',
        'width': '85%' 
      }
   }

    return (

      <div style={styles.app}>

        { renderFilters({maxDays, minDays, maxCloud, minHigh }) }       

        { filteredCities.map(city => {

            if (!city) { return <div>Loading</div> }

            let { name, maxCloud, minHigh, forecasts, timespan } = city;

            return <city name={name} 
              maxCloud={ maxCloud } minHigh={ minHigh } 
              forecasts = { forecasts } timespan={ timespan }/>

          }) 
          
        }

      </div> 
    )
  });
}


