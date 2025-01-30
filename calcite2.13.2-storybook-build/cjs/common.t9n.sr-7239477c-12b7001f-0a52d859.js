'use strict';

const a={mean:"Sredina",median:"Medijana",sum:"Zbir",discretePercentile:"Diskretni percentil",minimum:"Minimum",maximum:"Maksimum",variance:"Odstupanje",count:"Broj",aggregation:"${ statistics } od ${ fieldName }",noAggregation:"Nema grupisanja"},i="Grafikon",e="Broj serija",t="X-osa",s="Nije dostupno",n={start:"Zakači za prvu tačku podataka",end:"Zakači za zadnju tačku podataka"};var r={statistics:a,defaultTitle:i,countSeries:e,xAxis:t,notAvailable:s,timeAggregationTypes:n};

exports.countSeries = e;
exports.default = r;
exports.defaultTitle = i;
exports.notAvailable = s;
exports.statistics = a;
exports.timeAggregationTypes = n;
exports.xAxis = t;
