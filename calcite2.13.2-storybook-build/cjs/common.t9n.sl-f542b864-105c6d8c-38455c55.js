'use strict';

const a={mean:"Srednja vrednost",median:"Mediana",sum:"Vsota",discretePercentile:"Diskretni percentil",minimum:"Minimum",maximum:"Maksimum",variance:"Varianca",count:"Število",aggregation:"${ statistics } od ${ fieldName }",noAggregation:"Brez agregacije"},i="Grafikon",e="Števec nizov",t="Os X",n="Ni na voljo",o={start:"Privlači na prvo podatkovno točko",end:"Privlači na zadnjo podatkovno točko"};var s={statistics:a,defaultTitle:i,countSeries:e,xAxis:t,notAvailable:n,timeAggregationTypes:o};

exports.countSeries = e;
exports.default = s;
exports.defaultTitle = i;
exports.notAvailable = n;
exports.statistics = a;
exports.timeAggregationTypes = o;
exports.xAxis = t;
