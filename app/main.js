/** @jsx hJSX */ 
import Cycle from '@cycle/core';
import {hJSX, makeDOMDriver } from '@cycle/dom';
console.log('hello world !');

function intent(DOM){
  return {
    changeMinTemp$ : DOM.select('#minTemp').events('input')
      .map(e => e.target.value)
      .debounce(100),
    changeMaxCloud$ : DOM.select('#maxCloud').events('input')
      .map(e => e.target.value)
      .debounce(100),
  };
}

function model(actions){ // combineLatest() for more streams
  return Cycle.Rx.Observable.combineLatest(
    actions.changeMinTemp$.startWith(10),
    actions.changeMaxCloud$.startWith(20),
    (minTemp, maxCloud) => ({minTemp, maxCloud})
  );
}

function view(state$) {
  return state$.map(({minTemp, maxCloud}) => {
    console.log('min temp is: ' + minTemp + ' and max cloud is ' + maxCloud);
   return (
      <div>
        <input id='minTemp' type='range' min='-20' max='40' value= {minTemp} />
        { minTemp }
        <input id='maxCloud' type='range' min='-20' max='40' value= {maxCloud} />
        { maxCloud }
      </div> 
    )
  });
}

function main ({DOM}) {

  let actions = intent(DOM);
  let state$ = model(actions);

  return {
    DOM: view(state$)
  };

}

Cycle.run(main, {
  DOM: makeDOMDriver('#app')
});
