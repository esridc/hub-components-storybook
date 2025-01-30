const e={mean:"Medie",median:"Mediană",sum:"Sumă",discretePercentile:"Percentilă discretă",minimum:"Minim",maximum:"Maxim",variance:"Variaţie",count:"Număr",aggregation:"${ statistics } din ${ fieldName }",noAggregation:"Fără însumare"},i="Diagramă",a="Serie sumă",t="Axa X",s="Indisponibil",n={start:"Fixare la primul punct de date",end:"Fixare la ultimul punct de date"};var r={statistics:e,defaultTitle:i,countSeries:a,xAxis:t,notAvailable:s,timeAggregationTypes:n};

export default r;
export { a as countSeries, i as defaultTitle, s as notAvailable, e as statistics, n as timeAggregationTypes, t as xAxis };
