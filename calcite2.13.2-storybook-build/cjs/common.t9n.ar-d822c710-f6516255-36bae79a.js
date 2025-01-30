'use strict';

const e={mean:"المتوسط",median:"متوسط",sum:"مجموع",discretePercentile:"النسبة المئوية المنفصلة",minimum:"الحد الأدنى",maximum:"الحد الأقصى",variance:"تنوع",count:"عدد",aggregation:"${ statistics } من ${ fieldName }",noAggregation:"لا يوجد تجميع"},t="الرسم البياني",a="سلسلة العدد",i="محور س",s="غير مرئي",n={start:"انطباق على نقطة البيانات الأولى",end:"انطباق على نقطة البيانات الأخيرة"};var g={statistics:e,defaultTitle:t,countSeries:a,xAxis:i,notAvailable:s,timeAggregationTypes:n};

exports.countSeries = a;
exports.default = g;
exports.defaultTitle = t;
exports.notAvailable = s;
exports.statistics = e;
exports.timeAggregationTypes = n;
exports.xAxis = i;
