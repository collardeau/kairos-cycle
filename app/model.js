import {Rx} from '@cycle/core';

let Ob$ = Rx.Observable;

export default function model(actions, HTTP){ 

  let { changeDuration$, changeStartDay$, 
    changeMinSun$, changeMinHigh$ } = actions;

  let bcn$, ber$, cop$, ist$, lon$, mad$, 
    mia$, nic$, nyc$, por$, rom$, sfc$, tok$;

  let production = false; // fake network requests if true

  if(!production){
    bcn$ = require('./mockData').bcn$;
    ber$ = require('./mockData').ber$;
    cop$ = require('./mockData').cop$;
    ist$ = require('./mockData').ist$;
    lon$ = require('./mockData').lon$;
    mad$ = require('./mockData').mad$;
    mia$ = require('./mockData').mia$;
    nic$ = require('./mockData').nic$;
    nyc$ = require('./mockData').nyc$;
    por$ = require('./mockData').por$;
    rom$ = require('./mockData').rom$;
    sfc$ = require('./mockData').sfc$;
    tok$ = require('./mockData').tok$;

  }else{

    let weatherRe$ = HTTP
    .filter(re$ => re$.request.indexOf('weather') > -1)
    .mergeAll()
    .map(res => res.body);
    //weatherRe$.subscribe(x => console.log(x)) 

    bcn$ = weatherRe$.filter(c => c.city.name === 'Barcelona');
    ber$ = weatherRe$.filter(c => c.city.name === 'Berlin');
    cop$ = weatherRe$.filter(c => c.city.name === 'Copenhagen');
    ist$ = weatherRe$.filter(c => c.city.name === 'Istanbul');
    lon$ = weatherRe$.filter(c => c.city.name === 'London');
    mad$ = weatherRe$.filter(c => c.city.name === 'Madrid');
    mia$ = weatherRe$.filter(c => c.city.name === 'Miami');
    nic$ = weatherRe$.filter(c => c.city.name === 'Nice');
    nyc$ = weatherRe$.filter(c => c.city.name === 'New York');
    por$ = weatherRe$.filter(c => c.city.name === 'Porto');
    rom$ = weatherRe$.filter(c => c.city.name === 'Rome');
    sfc$ = weatherRe$.filter(c => c.city.name === 'San Francisco');
    tok$ = weatherRe$.filter(c => c.city.name === 'Tokyo');

  }

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
  
        bcn$.startWith(null), 
        ber$.startWith(null), 
        cop$.startWith(null), 
        ist$.startWith(null), 
        lon$.startWith(null),
        mad$.startWith(null),
        mia$.startWith(null), 
        nic$.startWith(null), 
        nyc$.startWith(null),
        por$.startWith(null), 
        rom$.startWith(null),
        sfc$.startWith(null), 
        tok$.startWith(null),
  
        // combine to make sieved responses stream 
  
        (bar, ber, cop, ist, lon, mad, mia, nic, nyc, por, rom, sfc, tok) => [bar, ber, cop, ist, lon, mad, mia, nic, nyc, por, rom, sfc, tok]
  
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
       return city.minHigh >= selectedMinHigh
        && city.minSun >= selectedMinSun;
      }),
      selectedMinHigh,
      selectedMinSun,
      startDay,
      selectedDuration
    })

  );
}

// date helper
let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

Date.prototype.getMonthName = function() { return months[this.getMonth() ]; }
Date.prototype.getDayName = function() { return days[this.getDay() ]; }


