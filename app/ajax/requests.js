let Ob$ = Rx.Observable;  // how is Rx available here?

const URL = 'http://api.openweathermap.org/data/2.5/forecast/daily' +
'?units=metric&cnt=7&q='; 

let bcn$ =  Ob$.just(URL + 'barcelona');
let ber$ =  Ob$.just(URL + 'berlin');
let cop$ =  Ob$.just(URL + 'copenhagen');
let ist$ =  Ob$.just(URL + 'istanbul');
let lon$ =  Ob$.just(URL + 'london');
let mad$ =  Ob$.just(URL + 'madrid');
let mia$ =  Ob$.just(URL + 'miami');
let nic$ =  Ob$.just(URL + 'nice');
let nyc$ =  Ob$.just(URL + 'newyork');
let por$ =  Ob$.just(URL + 'porto');
let rom$ =  Ob$.just(URL + 'rome');
let sfc$ =  Ob$.just(URL + 'sanfrancisco');
let tok$ =  Ob$.just(URL + 'tokyo');

export let requests$ =  Ob$.merge(bcn$, ber$, cop$, ist$, lon$, mad$, mia$, 
                                 nic$, nyc$, por$, rom$, sfc$, tok$);




