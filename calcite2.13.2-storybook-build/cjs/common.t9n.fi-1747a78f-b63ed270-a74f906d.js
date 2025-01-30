'use strict';

const i={mean:"Keskiarvo",median:"Mediaani",sum:"Summa",discretePercentile:"Irrallinen prosenttipiste",minimum:"Vähimmäisarvo",maximum:"Enimmäisarvo",variance:"Varianssi",count:"Määrä",aggregation:"${ statistics }/${ fieldName }",noAggregation:"Ei koostetta"},e="Kaavio",a="Laske sarjat",s="X-akseli",t="Ei käytettävissä",n={start:"Kiinnitä ensimmäiseen aineistopisteeseen",end:"Kiinnitä viimeiseen aineistopisteeseen"};var m={statistics:i,defaultTitle:e,countSeries:a,xAxis:s,notAvailable:t,timeAggregationTypes:n};

exports.countSeries = a;
exports.default = m;
exports.defaultTitle = e;
exports.notAvailable = t;
exports.statistics = i;
exports.timeAggregationTypes = n;
exports.xAxis = s;
