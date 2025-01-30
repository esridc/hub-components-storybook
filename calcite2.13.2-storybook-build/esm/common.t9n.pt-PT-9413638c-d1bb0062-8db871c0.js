const a={mean:"Média",median:"Mediana",sum:"Soma",discretePercentile:"Percentil discreto",minimum:"Mínimo",maximum:"Máximo",variance:"Variação",count:"Contagem",aggregation:"${ statistics } de ${ fieldName }",noAggregation:"Sem agregação"},e="Gráfico",i="Séries de Contagem",t="Eixo X",o="Não disponível",s={start:"Ajustar ao primeiro ponto de dados",end:"Ajustar ao último ponto de dados"};var n={statistics:a,defaultTitle:e,countSeries:i,xAxis:t,notAvailable:o,timeAggregationTypes:s};

export default n;
export { i as countSeries, e as defaultTitle, o as notAvailable, a as statistics, s as timeAggregationTypes, t as xAxis };
