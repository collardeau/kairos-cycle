/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';

export default function renderFilters({selectedMinHigh, selectedMinSun, maxDays, minDays}) {

 return (
    <div style={styles.container}>
      <h2 style={styles.header}>Find Better Weather</h2>
      <div style={styles.filters}>
        <span style={styles.half}>
        <select id="forecastFrom">
          <option value="0">Tomorrow</option>
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
        <span style = {styles.half}>
          <b>Temperature</b>:
          <br /><small>at least this <b>warm</b> each day</small>
        </span>
        <div style={styles.half}>
        <labeled-slider 
          key = {1} id="minHigh" label="" mea="&ordm;C"
          initial = {selectedMinHigh} min="0" max="30"
        />
        </div>
        <span style = {styles.half}>
          <b>Sunny</b>:
          <br /><small>at least this <b>clear</b> each day</small>
        </span>
 
        <div style={styles.half}>
        <labeled-slider 
          key = {2} id="minSun" label=""  mea="%"
          initial = {selectedMinSun} min="0" max="75"
        />
        </div>
      </div>
    </div>
  )
}

let styles = {
 'container': {
   'padding': '0.5em',
   'borderRadius': '25px',
   'marginTop': '0.5em',
   'backgroundColor': 'lightgoldenrodyellow'
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
   'marginBottom': '1.3em',
   'padding': '0 0.3em'
 },
 'padRight': {
    'paddingRight': '1.3em' 
 }
}

 
