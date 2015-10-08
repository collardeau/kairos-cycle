/** @jsx hJSX */ 
import {hJSX} from '@cycle/dom';
import intent from './intent'
import model from './model'
import view from './view';
import {requests$} from './ajax/requests';

export default function app ({DOM, HTTP}) {

  let actions = intent(DOM);
  let state$ = model(actions, HTTP);
  let vtree$ = view(state$);

  //state$.subscribe(x => console.log(x));
  return {
    DOM: vtree$,
    HTTP: requests$ 
  };
}


