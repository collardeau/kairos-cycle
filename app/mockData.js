import {Rx} from '@cycle/core';

let 
  bcnReq = require('json!../sample-data/barcelona.json'),
  berReq = require('json!../sample-data/berlin.json'),
  copReq = require('json!../sample-data/copenhagen.json'),
  istReq = require('json!../sample-data/istanbul.json'),
  lonReq = require('json!../sample-data/london.json'),
  madReq = require('json!../sample-data/madrid.json'),
  miaReq = require('json!../sample-data/miami.json'),
  nicReq = require('json!../sample-data/nice.json'),
  nycReq = require('json!../sample-data/newyork.json'),
  porReq = require('json!../sample-data/porto.json'),
  romReq = require('json!../sample-data/rome.json'),
  sanReq = require('json!../sample-data/santiago.json'),
  sfcReq = require('json!../sample-data/sanfrancisco.json'),
  tokReq = require('json!../sample-data/tokyo.json'),
  citiesReq = require('json!../sample-data/cities.json');

let Ob$ = Rx.Observable;

export let bcn$ = Ob$.just(bcnReq).delay(2400);
export let ber$ = Ob$.just(berReq).delay(1500);
export let cop$ = Ob$.just(copReq).delay(800);
export let ist$ = Ob$.just(istReq).delay(200);
export let lon$ = Ob$.just(lonReq).delay(1200);
export let mad$ = Ob$.just(madReq).delay(3000);
export let mia$ = Ob$.just(miaReq).delay(300);
export let nic$ = Ob$.just(nicReq).delay(5000);
export let nyc$ = Ob$.just(nycReq).delay(400);
export let por$ = Ob$.just(porReq).delay(500);
export let rom$ = Ob$.just(romReq).delay(600);
export let san$ = Ob$.just(sanReq).delay(1000);
export let sfc$ = Ob$.just(sfcReq).delay(100);
export let tok$ = Ob$.just(tokReq).delay(0);
export let cities$ = Ob$.just(citiesReq).delay(1000 * 2);


