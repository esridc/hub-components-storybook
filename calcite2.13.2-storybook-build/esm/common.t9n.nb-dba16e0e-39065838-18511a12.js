const e={mean:"Gjennomsnitt",median:"Median",sum:"Sum",discretePercentile:"Diskret persentil",minimum:"Minimum",maximum:"Maksimum",variance:"Varians",count:"Antall",aggregation:"${ statistics } av ${ fieldName }",noAggregation:"Ingen sammenslåing"},t="Diagram",a="Tallserie",i="X-akse",s="Ikke tilgjengelig",n={start:"Fest til det første datapunktet",end:"Fest til det siste datapunktet"};var l={statistics:e,defaultTitle:t,countSeries:a,xAxis:i,notAvailable:s,timeAggregationTypes:n};

export default l;
export { a as countSeries, t as defaultTitle, s as notAvailable, e as statistics, n as timeAggregationTypes, i as xAxis };
