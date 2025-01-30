'use strict';

const e={mean:"Keskmine",median:"Keskmine",sum:"Summa",discretePercentile:"Diskreetne protsentiil",minimum:"Miinimum",maximum:"Maksimum",variance:"Dispersioon",count:"Kogus",aggregation:"${ statistics } /${ fieldName }",noAggregation:"Agregeerimist pole"},i="Diagramm",a="Sarjade arv",s="X-telg",t="Pole kättesaadav",m={start:"Haagi esimesse andmepunkti",end:"Haagi viimasesse andmepunkti"};var n={statistics:e,defaultTitle:i,countSeries:a,xAxis:s,notAvailable:t,timeAggregationTypes:m};

exports.countSeries = a;
exports.default = n;
exports.defaultTitle = i;
exports.notAvailable = t;
exports.statistics = e;
exports.timeAggregationTypes = m;
exports.xAxis = s;
