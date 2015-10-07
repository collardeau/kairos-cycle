import {Rx} from '@cycle/core';
let Ob$ = Rx.Observable;

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
  tokReq = require('json!../sample-data/tokyo.json');

let 
  bcnRe$ = Ob$.just(bcnReq).delay(2400), 
  berRe$ = Ob$.just(berReq).delay(1200),
  copRe$ = Ob$.just(copReq).delay(500),
  istRe$ = Ob$.just(istReq).delay(600),
  lonRe$ = Ob$.just(lonReq).delay(800), 
  miaRe$ = Ob$.just(miaReq).delay(1700),
  nicRe$ = Ob$.just(nicReq).delay(250), 
  nycRe$ = Ob$.just(nycReq).delay(250),
  madRe$ = Ob$.just(madReq).delay(100),
  porRe$ = Ob$.just(porReq).delay(700), 
  romRe$ = Ob$.just(romReq).delay(100),
  sanRe$ = Ob$.just(sanReq).delay(1100),
  sfcRe$ = Ob$.just(sfcReq).delay(2700),
  tokRe$ = Ob$.just(tokReq).delay(1000);

export default function model(actions){ 

  let { changeDuration$, changeStartDay$, changeMinSun$, changeMinHigh$ } = actions;

  // date helper
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  Date.prototype.getMonthName = function() { return months[this.getMonth() ]; }
  Date.prototype.getDayName = function() { return days[this.getDay() ]; }
 
  return Ob$.combineLatest(

    // user action streams
    changeMinHigh$.startWith(10),
    changeMinSun$.startWith(50),
    changeStartDay$.startWith("0"),
    changeDuration$.startWith("3"),

    // api data prettied up with only forecast days
    
    Ob$.combineLatest(
  
      // sieved responses stream
  
      Ob$.combineLatest(
  
        // each raw response stream
  
        bcnRe$.startWith(null), 
        berRe$.startWith(null), 
        copRe$.startWith(null), 
        istRe$.startWith(null), 
        lonRe$.startWith(null),
        madRe$.startWith(null),
        miaRe$.startWith(null), 
        nicRe$.startWith(null), 
        nycRe$.startWith(null),
        porRe$.startWith(null), 
        romRe$.startWith(null),
        sanRe$.startWith(null),
        sfcRe$.startWith(null), 
        tokRe$.startWith(null),
  
        // combine to make sieved responses stream 
  
        (bar, ber, cop, ist, lon, mad, mia, nic, nyc, por, rom, san, sfc, tok) => [bar, ber, cop, ist, lon, mad, mia, nic, nyc, por, rom, san, sfc, tok]
  
      ).map(cities => {
  
        // sieve the raw streams
  
        return cities.map(cityRaw => {
          if (!cityRaw) return null;
          let { city, list } = cityRaw;
          return {
            name: city.name ,
            forecasts: list.map(forecast => {
              let date = new Date(forecast.dt * 1000);
              return {
                date: date.getDayName() + ' ' + date.getDate(),
                desc: forecast.weather[0].description,
                high: Math.round(forecast.temp.max),
                low: Math.round(forecast.temp.min),
                sun: 100 - forecast.clouds,
                humidity: forecast.humidity,
                wind: Math.round(forecast.speed)
              }
            }).slice(1) // dismiss today 
          }
        });
      }).startWith([]),
  
    // selected days to forecast stream
    changeStartDay$.startWith("0"),
    changeDuration$.startWith("3"),
  
    // combine to make stream with only selected days to forecast
    (cities, startDay, selectedDuration) => {
      return cities.map(city => {
        if (!city) return null;
       return {
          ...city,
          forecasts: city.forecasts.slice(+startDay, +startDay + +selectedDuration),
        };    
      });
    }
  
  ).map(cities => {
  
    // add derived data based on selected forecast
  
    if (!cities) return null;
    return cities.map(city => {

      if (!city) return null;
      let {forecasts} = city;
      let startDate = city.forecasts[0].date;
      let endDate = city.forecasts[city.forecasts.length-1].date
 
      return {
        ...city,
        minHigh: forecasts.reduce((min, next) => {
          return next.high < min ? next.high : min;      
        }, forecasts[0].high),
        maxHigh: forecasts.reduce((max, next) => {
          return next.high > max ? next.high : max;      
        }, forecasts[0].high),
        minLow: forecasts.reduce((min, next) => {
          return next.low < min ? next.low : min;      
        }, forecasts[0].low),
        minSun: forecasts.reduce((min, next) => {
          return next.sun < min ? next.sun : min;      
        }, forecasts[0].sun),
        timespan: startDate + ' to ' + endDate
      }
  
    });
  
  }).startWith([]),

    // combine ready cities and filters

    (selectedMinHigh, selectedMinSun, startDay, selectedDuration, cities) => ({
      filteredCities: cities.filter(city => {
        if(!city) return null;
        return city.minHigh > selectedMinHigh
        && city.minSun > selectedMinSun;
      }),
      selectedMinHigh,
      selectedMinSun,
      startDay,
      selectedDuration
    })

  );
}

