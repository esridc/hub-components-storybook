'use strict';

const e={mean:"平均值",median:"中位數",sum:"總和",discretePercentile:"離散百分位數",minimum:"最小值",maximum:"最大值",variance:"變異",count:"計數",aggregation:"${ statistics }/${ fieldName }",noAggregation:"無匯聚"},t="圖表",a="計數序列",i="X 軸",s="無法取得",n={start:"貼齊至第一個資料點",end:"對齊至最後的資料點"};var g={statistics:e,defaultTitle:"圖表",countSeries:a,xAxis:"X 軸",notAvailable:s,timeAggregationTypes:n};

exports.countSeries = a;
exports.default = g;
exports.defaultTitle = t;
exports.notAvailable = s;
exports.statistics = e;
exports.timeAggregationTypes = n;
exports.xAxis = i;
