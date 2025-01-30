'use strict';

const a={mean:"Rata-rata",median:"Median",sum:"Sum",discretePercentile:"Persentil diskrit",minimum:"Minimal",maximum:"Maksimal",variance:"Varian",count:"Count",aggregation:"${ statistics } dari ${ fieldName }",noAggregation:"Tidak ada agregasi"},i="Diagram",t="Jumlah Rangkaian",e="Sumbu X",s="Tidak Tersedia",n={start:"Posisikan ke titik data pertama",end:"Posisikan ke titik data terakhir"};var r={statistics:a,defaultTitle:i,countSeries:t,xAxis:e,notAvailable:s,timeAggregationTypes:n};

exports.countSeries = t;
exports.default = r;
exports.defaultTitle = i;
exports.notAvailable = s;
exports.statistics = a;
exports.timeAggregationTypes = n;
exports.xAxis = e;
