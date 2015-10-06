/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';

export default function renderFilters({minTemp, maxCloud, maxDays, minDays}) {

  let styles = {
   'container': {
      'marginBottom': '1.3em',
      'fontSize': '1.3em' 
    }
  }

  return (
    <div style={styles.container}>
      <label>Forecast from:</label>
      <select id="forecastFrom">
        <option value="1">today</option>
        <option value="2">tomorrow</option>
        <option value="3">+2 days</option>
        <option value="4">+3</option>
        <option value="5">+4</option>
        <option value="6">+5</option>
        <option value="7">+6</option>
      </select>

      <label>until:</label>
      <select id="forecastUntil">
        <option value="1">today</option>
        <option value="2">tomorrow</option>
        <option selected value="3">+2 days</option>
        <option value="4">+3</option>
        <option value="5">+4</option>
        <option value="6">+5</option>
        <option value="7">+6</option>
      </select>

      <labeled-slider 
        key = {1} id="minTemp" label="Min High" mea="C"
        initial = {minTemp} min="0" max="30"
      />
      <labeled-slider 
        key = {2} id="maxCloud" label="Max Clouds"  mea="%"
        initial = {maxCloud} min="0" max="100"
      />

    </div>
  )
}

