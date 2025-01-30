'use strict';

const e={mean:"Médio",median:"Mediana",sum:"Soma",discretePercentile:"Percentil discreto",minimum:"Mínimo",maximum:"Máximo",variance:"Variância",count:"Contagem",aggregation:"${ statistics } de ${ fieldName }",noAggregation:"Sem agregação"},a="Gráfico",i="Séries de contagem",t="Eixo X",o="Não Disponível",s={start:"Ajustar ao primeiro ponto de dados",end:"Ajustar ao útimo ponto de dados"};var n={statistics:e,defaultTitle:a,countSeries:i,xAxis:t,notAvailable:o,timeAggregationTypes:s};

exports.countSeries = i;
exports.default = n;
exports.defaultTitle = a;
exports.notAvailable = o;
exports.statistics = e;
exports.timeAggregationTypes = s;
exports.xAxis = t;
