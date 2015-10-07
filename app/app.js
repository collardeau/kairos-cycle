/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';
import intent from './intent'
import model from './model'
import view from './view';

export default function app ({DOM, HTTP}) {

  const URL = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=berlin&units=metric&cnt=7';
  let weather$ = DOM.select('#load').events('click')
  .map(() => {
    return {
      url: URL,
      method: 'GET'
    };
  });

  //weather$.subscribe(x => console.log(x));
  //let res$ = HTTP.filter(re$ => {
  //  return re$
  //}).mergeAll();
  //
  //res$.subscribe(x => console.log(x));

  let actions = intent(DOM);
  let state$ = model(actions);
  let vtree$ = view(state$);

  //state$.subscribe(x => console.log(x));
  return {
    DOM: vtree$,
    HTTP: weather$
  };
}


