/** @jsx hJSX */ 
import Cycle from '@cycle/core';
import {hJSX} from '@cycle/dom';

let Ob$ = Cycle.Rx.Observable;

export default function labeledSlider(responses) {

  function intent(DOM) {
    return {
      changeValue$ : DOM.select('.slider').events('input')
      .debounce(10)
      .map(e => e.target.value)
    }
  }

  function model(context, actions) {
    let initialValue$ = context.props.get('initial').first();
    let value$ = initialValue$.concat(actions.changeValue$);
    let props$ = context.props.getAll();
    return Ob$.combineLatest(props$, value$, 
      (props, value) => ({props, value})                            
    );
  }

  function view(state$) {
    return state$.map(state => {
      let { label, min, max, mea } = state.props;
      let value = state.value;
      return (
        <div>
          at least <b>{ value }{ mea }</b> each day
          <input style={{'width': '88%', 'marginTop': '0.5em'}}
            className='slider' 
            type='range' 
            max={max} 
            min={min} 
            value={value} 
          />
        </div>      
      );
    });
  }
  let actions = intent(responses.DOM);
  let vtree$ = view(model(responses, actions))

  return {
    DOM: vtree$,
    events: {
      newValue: actions.changeValue$ 
    } 
  }
};


