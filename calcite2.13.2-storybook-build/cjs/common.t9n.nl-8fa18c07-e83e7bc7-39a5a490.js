'use strict';

const e={mean:"Gemiddelde",median:"Mediaan",sum:"Som",discretePercentile:"Discreet percentiel",minimum:"Minimum",maximum:"Maximum",variance:"Variantie",count:"Aantal",aggregation:"${ statistics } van ${ fieldName }",noAggregation:"Geen aggregatie"},a="Diagram",t="Tellingserie",i="X-as",s="Niet beschikbaar",n={start:"Koppelen met het eerste gegevenspunt",end:"Koppelen met het laatste gegevenspunt"};var g={statistics:e,defaultTitle:a,countSeries:t,xAxis:i,notAvailable:s,timeAggregationTypes:n};

exports.countSeries = t;
exports.default = g;
exports.defaultTitle = a;
exports.notAvailable = s;
exports.statistics = e;
exports.timeAggregationTypes = n;
exports.xAxis = i;
