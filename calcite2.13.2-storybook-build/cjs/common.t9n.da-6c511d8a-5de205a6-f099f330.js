'use strict';

const e={mean:"Middel",median:"Median",sum:"Sum",discretePercentile:"Særskilt percentil",minimum:"Minimum",maximum:"Maksimum",variance:"Varians",count:"Tælling",aggregation:"${ statistics } for ${ fieldName }",noAggregation:"Ingen aggregering"},t="Diagram",a="Tællerække",i="X-akse",s="Ikke tilgængelig",n={start:"Fastgør til det første datapunkt",end:"Fastgør til det sidste datapunkt"};var g={statistics:e,defaultTitle:t,countSeries:a,xAxis:i,notAvailable:s,timeAggregationTypes:n};

exports.countSeries = a;
exports.default = g;
exports.defaultTitle = t;
exports.notAvailable = s;
exports.statistics = e;
exports.timeAggregationTypes = n;
exports.xAxis = i;
