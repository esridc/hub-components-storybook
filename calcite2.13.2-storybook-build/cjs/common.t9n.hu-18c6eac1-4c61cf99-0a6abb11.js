'use strict';

const a={mean:"Átlag",median:"Medián",sum:"Összeg",discretePercentile:"Diszkrét percentilis",minimum:"Minimum",maximum:"Maximum",variance:"Variancia",count:"Darabszám",aggregation:"${ statistics }/${ fieldName }",noAggregation:"Nincs összevonás"},t="Diagram",e="Számsorozat",s="X tengely",i="Nem érhető el",n={start:"Csatolás az első adatponthoz",end:"Csatolás az utolsó adatponthoz"};var o={statistics:a,defaultTitle:t,countSeries:e,xAxis:s,notAvailable:i,timeAggregationTypes:n};

exports.countSeries = e;
exports.default = o;
exports.defaultTitle = t;
exports.notAvailable = i;
exports.statistics = a;
exports.timeAggregationTypes = n;
exports.xAxis = s;
