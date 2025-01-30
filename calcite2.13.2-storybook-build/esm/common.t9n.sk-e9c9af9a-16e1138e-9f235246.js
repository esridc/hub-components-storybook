const e={mean:"Priemer",median:"Medián",sum:"Súčet",discretePercentile:"Diskrétny percentil",minimum:"Minimum",maximum:"Maximum",variance:"Rozptyl",count:"Počet",aggregation:"${ statistics } z ${ fieldName }",noAggregation:"Bez agregácie"},i="Graf",t="Počet sérií",a="Os X",s="Nie je k dispozícii",n={start:"Prichytiť k prvému dátovému bodu",end:"Prichytiť k poslednému dátovému bodu"};var r={statistics:e,defaultTitle:i,countSeries:t,xAxis:a,notAvailable:s,timeAggregationTypes:n};

export default r;
export { t as countSeries, i as defaultTitle, s as notAvailable, e as statistics, n as timeAggregationTypes, a as xAxis };
