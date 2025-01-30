const a={mean:"Medelvärde",median:"Median",sum:"Summa",discretePercentile:"Diskret percentil",minimum:"Minimum",maximum:"Maximum",variance:"Varians",count:"Antal",aggregation:"${ statistics } av ${ fieldName }",noAggregation:"Ingen aggregering"},e="Diagram",t="Antalsserie",i="X-axel",n="Ej tillgänglig",s={start:"Snappa till den första datapunkten",end:"Snappa till den sista datapunkten"};var l={statistics:a,defaultTitle:e,countSeries:t,xAxis:i,notAvailable:n,timeAggregationTypes:s};

export default l;
export { t as countSeries, e as defaultTitle, n as notAvailable, a as statistics, s as timeAggregationTypes, i as xAxis };
