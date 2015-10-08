/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';

export default function renderFilters({selectedMinHigh, selectedMinSun, maxDays, minDays}) {

 return (
    <div style={styles.container}>
      <h2 style={styles.header}>FIND WEATHER</h2> <div style={styles.filters}>

        <label>Starting</label>
        <div style={styles.selectBox}> 
          <select style={styles.select} id="forecastFrom">
            <option value="0">Tomorrow</option>
            <option value="1">day after tomorrow</option>
          </select>
        </div>
        <label>for:</label>
        <div style={styles.selectBox}> 
          <select style={styles.select} id="forecastUntil">
            <option value="1">same day</option>
            <option value="2">2 days</option>
            <option selected value="3">3 days</option>
            <option value="4">4 days</option>
            <option value="5">5 days</option>
          </select>
        </div>
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
   'padding': '0.8em',
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
  'margin': '0 auto',
  'marginTop': '1.3em',
  'marginBottom': '0.5em',
  'backgroundColor': '#6CD1EA',
  'width': '140px',
  'padding': '5px 8px',
  'color': '#fff'
 },
  'selectBox': {
    'padding': '0',
    'margin': '0 auto',
    'border': '1px solid #6CD1EA',
    'width': '150px',
    'borderRadius': '3px',
    'overflow': 'hidden',
    'backgroundColor': '#fff',
    'background': '#fff url("arrowdown.gif") no-repeat 90% 50%'  
  },

  'select': {
    'padding': '5px 8px',
    'width': '130%',
    'border': 'none',
    'boxShadow': 'none',
    'backgroundColor': 'transparent',
    'backgroundImage': 'none',
    'appearance': 'none'
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

 
