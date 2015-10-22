/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';
import renderFilters from './views/filters';
import renderCities from './views/cities';

var whiteLogo = require('../public/img/white_logo.png');
var blackLogo = require('../public/img/black_logo.png');

export default function view(state$) {

  return state$.map(({citiesAvail, selectedMinHigh, selectedMinSun, 
                     selectedDuration, startDay, filteredCities}) => {
    return (

      <div style={styles.app}>

        <div style={styles.header}><img src={whiteLogo} /></div>

        { renderFilters({selectedMinSun, selectedMinHigh, startDay, selectedDuration }) }       

        { renderCities(citiesAvail, filteredCities) }

        <div style={styles.footer}>
          <img src={blackLogo} />  
          <p>Made by <a href='http://thomas.collardeau.com'>thomas.collardeau.com</a>
            <br />Data from openweathermap.org
          </p>
          
        </div>

      </div> 
    )
  });
}

let styles = {
  'app': {
    'margin': '0 auto',
    'marginTop': '0.3em',
    'width': '85%' 
   },
   'header': {
     'padding': '0.5em 0',
     'textAlign': 'center'
   },
   'footer': {
     'paddingTop': '1.3em',
     'textAlign': 'center'
   }
}


