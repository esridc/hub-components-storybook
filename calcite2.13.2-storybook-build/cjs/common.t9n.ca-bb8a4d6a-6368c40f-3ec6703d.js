'use strict';

const e={mean:"Mitjana",median:"Mediana",sum:"Suma",discretePercentile:"Percentil discret",minimum:"Mínim",maximum:"Màxim",variance:"Variància",count:"Recompte",aggregation:"${ statistics } de ${ fieldName }",noAggregation:"Sense agregació"},a="Gràfic",i="Recompte de sèries",t="Eix X",s="No disponible",n={start:"Ajusta al primer punt de dades",end:"Ajusta a l'últim punt de dades"};var r={statistics:e,defaultTitle:a,countSeries:i,xAxis:t,notAvailable:s,timeAggregationTypes:n};

exports.countSeries = i;
exports.default = r;
exports.defaultTitle = a;
exports.notAvailable = s;
exports.statistics = e;
exports.timeAggregationTypes = n;
exports.xAxis = t;
