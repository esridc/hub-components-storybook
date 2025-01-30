'use strict';

const i={mean:"Trung bình",median:"Bình quân",sum:"Tổng",discretePercentile:"Phân vị rời rạc",minimum:"Tối thiểu",maximum:"Tối đa",variance:"Phương sai",count:"Số lượng",aggregation:"${ statistics } / ${ fieldName }",noAggregation:"Không tổng hợp"},n="Biểu đồ",a="Đếm Số chuỗi",t="Trục X",e="Không Khả dụng",s={start:"Chuyển sang điểm dữ liệu đầu tiên",end:"Chuyển sang điểm dữ liệu cuối cùng"};var g={statistics:i,defaultTitle:n,countSeries:a,xAxis:t,notAvailable:e,timeAggregationTypes:s};

exports.countSeries = a;
exports.default = g;
exports.defaultTitle = n;
exports.notAvailable = e;
exports.statistics = i;
exports.timeAggregationTypes = s;
exports.xAxis = t;
