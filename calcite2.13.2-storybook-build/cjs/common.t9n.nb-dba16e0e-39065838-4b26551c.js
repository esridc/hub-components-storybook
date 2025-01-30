'use strict';

const e={mean:"Gjennomsnitt",median:"Median",sum:"Sum",discretePercentile:"Diskret persentil",minimum:"Minimum",maximum:"Maksimum",variance:"Varians",count:"Antall",aggregation:"${ statistics } av ${ fieldName }",noAggregation:"Ingen sammenslåing"},t="Diagram",a="Tallserie",i="X-akse",s="Ikke tilgjengelig",n={start:"Fest til det første datapunktet",end:"Fest til det siste datapunktet"};var l={statistics:e,defaultTitle:t,countSeries:a,xAxis:i,notAvailable:s,timeAggregationTypes:n};

exports.countSeries = a;
exports.default = l;
exports.defaultTitle = t;
exports.notAvailable = s;
exports.statistics = e;
exports.timeAggregationTypes = n;
exports.xAxis = i;
