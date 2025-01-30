'use strict';

const e={mean:"Mittelwert",median:"Medianwert",sum:"Summe",discretePercentile:"Diskontinuierliches Perzentil",minimum:"Minimum",maximum:"Maximum",variance:"Varianz",count:"Anzahl",aggregation:"${ statistics } von ${ fieldName }",noAggregation:"Keine Aggregation"},t="Diagramm",i="Mengenserie",a="X-Achse",n="Nicht verfügbar",s={start:"Am ersten Datenpunkt fangen",end:"Am letzten Datenpunkt fangen"};var r={statistics:e,defaultTitle:t,countSeries:i,xAxis:a,notAvailable:n,timeAggregationTypes:s};

exports.countSeries = i;
exports.default = r;
exports.defaultTitle = t;
exports.notAvailable = n;
exports.statistics = e;
exports.timeAggregationTypes = s;
exports.xAxis = a;
