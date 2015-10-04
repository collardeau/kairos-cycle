import {cities$} from '../mockServer';

export default function intent(DOM){
 return {
    requestCities$: cities$,
    changeMinTemp$ : DOM.select('#minTemp').events('newValue')
      .map(e => e.detail)
      .debounce(10),
    changeMaxCloud$ : DOM.select('#maxCloud').events('newValue')
      .map(e => e.detail)
      .debounce(10)
  };
}


