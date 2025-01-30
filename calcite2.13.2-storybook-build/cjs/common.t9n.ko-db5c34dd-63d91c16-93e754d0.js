'use strict';

const e={mean:"평균",median:"중앙값",sum:"합계",discretePercentile:"불연속 백분위수",minimum:"최소",maximum:"최대",variance:"변수",count:"개수",aggregation:"${ statistics }개 중 ${ fieldName }개",noAggregation:"집계 없음"},t="차트",a="시리즈 개수",i="X축",s="사용할 수 없음",n={start:"첫 번째 데이터 포인트로 스냅",end:"마지막 데이터 포인트로 스냅"};var g={statistics:e,defaultTitle:"차트",countSeries:a,xAxis:"X축",notAvailable:s,timeAggregationTypes:n};

exports.countSeries = a;
exports.default = g;
exports.defaultTitle = t;
exports.notAvailable = s;
exports.statistics = e;
exports.timeAggregationTypes = n;
exports.xAxis = i;
