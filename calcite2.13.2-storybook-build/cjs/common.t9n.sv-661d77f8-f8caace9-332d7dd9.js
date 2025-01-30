'use strict';

const a={mean:"Medelvärde",median:"Median",sum:"Summa",discretePercentile:"Diskret percentil",minimum:"Minimum",maximum:"Maximum",variance:"Varians",count:"Antal",aggregation:"${ statistics } av ${ fieldName }",noAggregation:"Ingen aggregering"},e="Diagram",t="Antalsserie",i="X-axel",n="Ej tillgänglig",s={start:"Snappa till den första datapunkten",end:"Snappa till den sista datapunkten"};var l={statistics:a,defaultTitle:e,countSeries:t,xAxis:i,notAvailable:n,timeAggregationTypes:s};

exports.countSeries = t;
exports.default = l;
exports.defaultTitle = e;
exports.notAvailable = n;
exports.statistics = a;
exports.timeAggregationTypes = s;
exports.xAxis = i;
