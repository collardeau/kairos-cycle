import {Rx} from '@cycle/core';
let Ob$ = Rx.Observable;

let 
  bcnReq = require('json!../sample-data/barcelona.json'),
  berReq = require('json!../sample-data/berlin.json'),
  lonReq = require('json!../sample-data/london.json'),
  miaReq = require('json!../sample-data/miami.json'),
  nicReq = require('json!../sample-data/nice.json'),
  nycReq = require('json!../sample-data/newyork.json'),
  porReq = require('json!../sample-data/porto.json'),
  sanReq = require('json!../sample-data/sanfrancisco.json');

let 
  bcnRe$ = Ob$.just(bcnReq).delay(2400), berRe$ = Ob$.just(berReq).delay(1200),
  lonRe$ = Ob$.just(lonReq).delay(800), miaRe$ = Ob$.just(miaReq).delay(1700),
  nicRe$ = Ob$.just(nicReq).delay(250), nycRe$ = Ob$.just(nycReq).delay(250),
  porRe$ = Ob$.just(porReq).delay(700), sanRe$ = Ob$.just(sanReq).delay(1500);

export default function model(actions){ 

  let { changeMaxDays$, changeMinDays$, changeMaxCloud$, changeMinHigh$ } = actions;

  // date helper
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  Date.prototype.getMonthName = function() { return months[this.getMonth() ]; }
  Date.prototype.getDayName = function() { return days[this.getDay() ]; }
 
  return Ob$.combineLatest(

    // user action streams
    changeMinHigh$.startWith(0),
    changeMaxCloud$.startWith(0),
    changeMaxDays$.startWith("3"),
    changeMinDays$.startWith("0"),

    // api data prettied up with only forecast days
    
    Ob$.combineLatest(
  
      // sieved responses stream
  
      Ob$.combineLatest(
  
        // each raw response stream
  
        bcnRe$.startWith(null), berRe$.startWith(null), lonRe$.startWith(null),
        miaRe$.startWith(null), nicRe$.startWith(null), nycRe$.startWith(null),
        porRe$.startWith(null), sanRe$.startWith(null),
  
        // combine to make sieved responses stream 
  
        (bar, ber, lon, mia, nic, nyc, por, san) => [bar, ber, lon, mia, nic, nyc, por, san]
  
      ).map(cities => {
  
        // sieve the raw streams
  
        return cities.map(cityRaw => {
          if (!cityRaw) return null;
          let { city, list } = cityRaw;
          return {
            name: city.name ,
            forecasts: list.map(forecast => {
              let date = new Date(forecast.dt * 1000);
              console.log(forecast);
              return {
                date: date.getDayName() + ' ' + date.getDate(),
                desc: forecast.weather[0].description,
                high: Math.round(forecast.temp.max),
                low: Math.round(forecast.temp.min),
                maxCloud: 100 - forecast.clouds,
                humidity: forecast.humidity,
                wind: Math.round(forecast.speed)
              }
            }).slice(1) // dismiss today 
          }
        });
      }).startWith([]),
  
    // selected days to forecast stream
    changeMaxDays$.startWith("3"),
    changeMinDays$.startWith("0"),
  
    // combine to make stream with only selected days to forecast
    (cities, maxDays, minDays) => {
      return cities.map(city => {
        if (!city) return null;
       return {
          ...city,
          forecasts: city.forecasts.slice(+minDays, +minDays + +maxDays),
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
        maxCloud: forecasts.reduce((max, next) => {
          return next.maxCloud < max ? next.maxCloud : max;      
        }, 100 - forecasts[0].maxCloud),
        timespan: startDate + ' to ' + endDate
      }
  
    });
  
  }).startWith([]),

    // combine ready cities and filters

    (minHigh, maxCloud, maxDays, minDays, cities) => ({
      filteredCities: cities.filter(city => {
        if(!city) return null;
        return city.minHigh > minHigh
        && city.maxCloud > maxCloud;
      }),
      minHigh,
      maxCloud,
      minDays,
      maxDays
    })

  );
}

