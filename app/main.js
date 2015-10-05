import { run } from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http'
import labeledSlider from './components/labeledSlider';
import city from './components/city';
import app from './app'

const main = app;

run(main, {
  DOM: makeDOMDriver('#app', {
    'labeled-slider': labeledSlider,
    'city': city
  }),
  HTTP: makeHTTPDriver()
});
