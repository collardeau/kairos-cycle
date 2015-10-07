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
   changeStartDay$ : DOM.select('#forecastFrom').events('change')
      .map(e => e.target.value)
  };
}


