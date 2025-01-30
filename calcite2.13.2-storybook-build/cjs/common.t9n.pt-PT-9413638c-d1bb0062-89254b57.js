'use strict';

const a={mean:"Média",median:"Mediana",sum:"Soma",discretePercentile:"Percentil discreto",minimum:"Mínimo",maximum:"Máximo",variance:"Variação",count:"Contagem",aggregation:"${ statistics } de ${ fieldName }",noAggregation:"Sem agregação"},e="Gráfico",i="Séries de Contagem",t="Eixo X",o="Não disponível",s={start:"Ajustar ao primeiro ponto de dados",end:"Ajustar ao último ponto de dados"};var n={statistics:a,defaultTitle:e,countSeries:i,xAxis:t,notAvailable:o,timeAggregationTypes:s};

exports.countSeries = i;
exports.default = n;
exports.defaultTitle = e;
exports.notAvailable = o;
exports.statistics = a;
exports.timeAggregationTypes = s;
exports.xAxis = t;
