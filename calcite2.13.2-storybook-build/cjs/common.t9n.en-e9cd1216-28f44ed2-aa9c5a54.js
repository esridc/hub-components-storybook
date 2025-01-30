'use strict';

const t={mean:"Mean",median:"Median",sum:"Sum",discretePercentile:"Discrete percentile",minimum:"Minimum",maximum:"Maximum",variance:"Variance",count:"Count",aggregation:"${ statistics } of ${ fieldName }",noAggregation:"No aggregation"},a="Chart",e="Count Series",i="X Axis",s="Not Available",n={start:"Snap to the first data point",end:"Snap to the last data point"};var o={statistics:t,defaultTitle:a,countSeries:e,xAxis:i,notAvailable:s,timeAggregationTypes:n};

exports.countSeries = e;
exports.default = o;
exports.defaultTitle = a;
exports.notAvailable = s;
exports.statistics = t;
exports.timeAggregationTypes = n;
exports.xAxis = i;
