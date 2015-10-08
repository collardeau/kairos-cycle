/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';

export default function renderFilters({selectedMinHigh, selectedMinSun, maxDays, minDays}) {

 return (
    <div style={styles.container}>
      <h2 style={styles.header}>WEATHER LOCATOR</h2>
      <div style={styles.filters}>
        <label>Starting </label><br />
        <select style={styles.select} id="forecastFrom">
          <option value="0">Tomorrow</option>
          <option value="1">day after tomorrow</option>
        </select>
          <br />
         <label>For </label><br />
        <select style={styles.select} id="forecastUntil">
          <option value="1">same day</option>
          <option value="2">2 days</option>
          <option selected value="3">3 days</option>
          <option value="4">4 days</option>
          <option value="5">5 days</option>
        </select>
        <span>
          <h4 style={styles.heading}>Temperature</h4>
        </span>
        <div>
        <labeled-slider 
          key = {1} id="minHigh" label="" mea="&ordm;C"
          initial = {selectedMinHigh} min="0" max="30"
        />
        </div>
        <span>
          <h4 style={styles.heading}>Sunny</h4>
        </span>
 
        <div>
        <labeled-slider 
          key = {2} id="minSun" label=""  mea="% clear sky"
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
   'backgroundColor': '#F8EFB6',
   'textAlign': 'center'
   //'border': '5px dotted #FEBAC5'
 },
 'header': {
   'textAlign': 'center',
   'margin': '0',
   'marginBottom': '0.5em'
 },
 'filters': {
   'display': 'block',
   'flexWrap': 'wrap'
 },
 'heading': {
  'margin': '1.3em 0 0.5em 0',
  'backgroundColor': 'white',
  'borderRadius': '0.5em'
 },
 'select': {
   'width': '70%',
   'padding': '0.5em'
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

 
