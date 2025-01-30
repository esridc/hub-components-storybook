'use strict';

const i={mean:"Vidējais",median:"Mediāna",sum:"Summa",discretePercentile:"Diskrētā procentīle",minimum:"Minimums",maximum:"Maksimums",variance:"Novirze",count:"Skaits",aggregation:"${ statistics } no ${ fieldName }",noAggregation:"Bez apkopošanas"},a="Diagramma",e="Sēriju uzskaite",t="X ass",s="Nav pieejams",n={start:"Pielipināt pie pirmā datu punkta",end:"Pielipināt pie pēdējā datu punkta"};var m={statistics:i,defaultTitle:a,countSeries:e,xAxis:t,notAvailable:s,timeAggregationTypes:n};

exports.countSeries = e;
exports.default = m;
exports.defaultTitle = a;
exports.notAvailable = s;
exports.statistics = i;
exports.timeAggregationTypes = n;
exports.xAxis = t;
