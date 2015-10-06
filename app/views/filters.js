/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';

export default function renderFilters({minTemp, maxCloud, maxDays, minDays}) {

  let styles = {
   'container': {
     'border': '5px dotted mistyrose',
     'padding': '0 0.5em',
     'borderRadius': '25px',
     'marginTop': '0.5em'
   },
   'header': {
     'textAlign': 'center'
   },
   'filters': {
     'display': 'flex',
     'flexWrap': 'wrap'
   },
   'half': {
     'flex': '1 0 40%',
     'marginBottom': '1.3em'
   },
   'padRight': {
      'paddingRight': '1.3em' 
   }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Show Me Weather Forecasts</h2>
      <div style={styles.filters}>
        <span style={styles.half}>
         <label style={styles.padRight}>From</label>
        <select id="forecastFrom">
          <option value="1">today</option>
          <option value="2">tomorrow</option>
          <option value="3">+2 days</option>
          <option value="4">+3</option>
        </select>
        </span>
        <span style={styles.half}>
         <label style={styles.padRight}>To</label>
        <select id="forecastUntil">
          <option value="5">Sat 10 Oct</option>
          <option value="6">+5</option>
          <option value="7">+6</option>
        </select>
        </span>
        <span style = {styles.half}>Lowest Day High:</span>
        <div style={styles.half}>
        <labeled-slider 
          key = {1} id="minTemp" label="" mea="C"
          initial = {minTemp} min="0" max="30"
        />
        </div>
        <span style={styles.half}>Maximum cloud coverage:</span>
        <div style={styles.half}>
        <labeled-slider 
          key = {2} id="maxCloud" label=""  mea="%"
          initial = {maxCloud} min="0" max="100"
        />
        </div>
      </div>
    </div>
  )
}

