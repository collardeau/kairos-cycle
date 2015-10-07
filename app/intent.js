export default function intent(DOM){
 return {
    changeMinHigh$ : DOM.select('#minHigh').events('newValue')
      .map(e => e.detail)
      .debounce(10),
    changeMinSun$ : DOM.select('#minSun').events('newValue')
      .map(e => e.detail)
      .debounce(10),
   changeMaxDays$ : DOM.select('#forecastUntil').events('change')
      .map(e => e.target.value),
   changeMinDays$ : DOM.select('#forecastFrom').events('change')
      .map(e => e.target.value)
  };
}


