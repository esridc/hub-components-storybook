'use strict';

const e={mean:"Medie",median:"Mediană",sum:"Sumă",discretePercentile:"Percentilă discretă",minimum:"Minim",maximum:"Maxim",variance:"Variaţie",count:"Număr",aggregation:"${ statistics } din ${ fieldName }",noAggregation:"Fără însumare"},i="Diagramă",a="Serie sumă",t="Axa X",s="Indisponibil",n={start:"Fixare la primul punct de date",end:"Fixare la ultimul punct de date"};var r={statistics:e,defaultTitle:i,countSeries:a,xAxis:t,notAvailable:s,timeAggregationTypes:n};

exports.countSeries = a;
exports.default = r;
exports.defaultTitle = i;
exports.notAvailable = s;
exports.statistics = e;
exports.timeAggregationTypes = n;
exports.xAxis = t;
