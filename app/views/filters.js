/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';

export default function renderFilters({minHigh, minSun, maxDays, minDays}) {

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
      <h2 style={styles.header}>Find your Ideal Weather</h2>
      <div style={styles.filters}>
        <span style={styles.half}>
         <label style={styles.padRight}>Starting</label>
        <select id="forecastFrom">
          <option value="0">tomorrow</option>
          <option value="1">day after tomorrow</option>
        </select>
        </span>
        <span style={styles.half}>
         <label style={styles.padRight}>For</label>
        <select id="forecastUntil">
          <option value="1">same day</option>
          <option value="2">2 days</option>
          <option selected value="3">3 days</option>
          <option value="4">4 days</option>
          <option value="5">5 days</option>
        </select>
        </span>
        <span style = {styles.half}>At least this <b>temperature</b> each day:</span>
        <div style={styles.half}>
        <labeled-slider 
          key = {1} id="minHigh" label="" mea="C"
          initial = {minHigh} min="0" max="30"
        />
        </div>
        <span style={styles.half}>At least this amount of <b>sun</b> each day:</span>
        <div style={styles.half}>
        <labeled-slider 
          key = {2} id="minSun" label=""  mea="%"
          initial = {minSun} min="0" max="75"
        />
        </div>
      </div>
    </div>
  )
}

