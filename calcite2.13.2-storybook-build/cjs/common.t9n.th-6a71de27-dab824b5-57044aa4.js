'use strict';

const e={mean:"ค่าเฉลี่ย",median:"ค่ามัธยฐาน",sum:"รวม",discretePercentile:"เปอร์เซนไทล์แบบไม่ต่อเนื่อง",minimum:"น้อยสุด",maximum:"สูงสุด",variance:"ความแปรปรวน",count:"นับ",aggregation:"${ statistics } จาก ${ fieldName }",noAggregation:"ไม่มีการรวม"},t="แผนภูมิ",a="นับซีรีส์",i="(แกน x)",s="ไม่สามารถใช้ได้",n={start:"สแน็ปเข้ากับจุดข้อมูลแรก",end:"สแน็ปเข้ากับจุดข้อมูลสุดท้าย"};var g={statistics:e,defaultTitle:t,countSeries:a,xAxis:i,notAvailable:s,timeAggregationTypes:n};

exports.countSeries = a;
exports.default = g;
exports.defaultTitle = t;
exports.notAvailable = s;
exports.statistics = e;
exports.timeAggregationTypes = n;
exports.xAxis = i;
