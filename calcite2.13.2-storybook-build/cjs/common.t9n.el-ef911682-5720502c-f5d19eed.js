'use strict';

const e={mean:"Μέσος όρος",median:"Διάμεσο",sum:"Άθροισμα",discretePercentile:"Διακριτό ποσοστημόριο",minimum:"Ελάχιστο",maximum:"Μέγιστο",variance:"Διακύμανση",count:"Πλήθος",aggregation:"${ statistics } από ${ fieldName }",noAggregation:"Δεν υπάρχει συνάθροιση"},t="Γράφημα",a="Σειρά μέτρησης",i="Άξονας Χ",s="Μη διαθέσιμο",n={start:"Συνδεθείτε με το πρώτο σημείο δεδομένων",end:"Συνδεθείτε με το τελευταίο σημείο δεδομένων"};var g={statistics:e,defaultTitle:t,countSeries:a,xAxis:i,notAvailable:s,timeAggregationTypes:n};

exports.countSeries = a;
exports.default = g;
exports.defaultTitle = t;
exports.notAvailable = s;
exports.statistics = e;
exports.timeAggregationTypes = n;
exports.xAxis = i;
