import { run } from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http'
import labeledSlider from './components/labeledSlider';
import app from './app'

const main = app;

run(main, {
  DOM: makeDOMDriver('#app', {
    'labeled-slider': labeledSlider 
  }),
  HTTP: makeHTTPDriver()
});
