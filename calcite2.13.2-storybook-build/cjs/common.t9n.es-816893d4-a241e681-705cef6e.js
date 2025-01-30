'use strict';

const e={mean:"Valor medio",median:"Mediana",sum:"Suma",discretePercentile:"Percentil discreto",minimum:"Mínimo",maximum:"Máximo",variance:"Varianza",count:"Recuento",aggregation:"${ statistics } de ${ fieldName }",noAggregation:"Sin agregación"},i="Gráfico",a="Recuento de series",t="Eje X",n="No disponible",s={start:"Alinear con el primer punto de datos",end:"Alinear con el último punto de datos"};var o={statistics:e,defaultTitle:i,countSeries:a,xAxis:t,notAvailable:n,timeAggregationTypes:s};

exports.countSeries = a;
exports.default = o;
exports.defaultTitle = i;
exports.notAvailable = n;
exports.statistics = e;
exports.timeAggregationTypes = s;
exports.xAxis = t;
