'use strict';

const a={mean:"Media",median:"Mediana",sum:"Somma",discretePercentile:"Percentile discreto",minimum:"Minimo",maximum:"Massimo",variance:"Varianza",count:"Conteggio",aggregation:"${ statistics } di ${ fieldName }",noAggregation:"Nessuna aggregazione"},i="Grafico",e="Serie Conteggio",t="Asse X",s="Non disponibile",n={start:"Snap al primo punto dati",end:"Snap al punto dati finale"};var o={statistics:a,defaultTitle:i,countSeries:e,xAxis:t,notAvailable:s,timeAggregationTypes:n};

exports.countSeries = e;
exports.default = o;
exports.defaultTitle = i;
exports.notAvailable = s;
exports.statistics = a;
exports.timeAggregationTypes = n;
exports.xAxis = t;
