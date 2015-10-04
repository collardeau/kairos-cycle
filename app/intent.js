export default function intent(DOM){
 return {
    changeMinTemp$ : DOM.select('#minTemp').events('newValue')
      .map(e => e.detail)
      .debounce(10),
    changeMaxCloud$ : DOM.select('#maxCloud').events('newValue')
      .map(e => e.detail)
      .debounce(10),
    changeMaxDays$ : DOM.select('#maxDays').events('newValue')
      .map(e => e.detail)
      .debounce(10)
  };
}


