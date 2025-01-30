const e={mean:"Gemiddelde",median:"Mediaan",sum:"Som",discretePercentile:"Discreet percentiel",minimum:"Minimum",maximum:"Maximum",variance:"Variantie",count:"Aantal",aggregation:"${ statistics } van ${ fieldName }",noAggregation:"Geen aggregatie"},a="Diagram",t="Tellingserie",i="X-as",s="Niet beschikbaar",n={start:"Koppelen met het eerste gegevenspunt",end:"Koppelen met het laatste gegevenspunt"};var g={statistics:e,defaultTitle:a,countSeries:t,xAxis:i,notAvailable:s,timeAggregationTypes:n};

export default g;
export { t as countSeries, a as defaultTitle, s as notAvailable, e as statistics, n as timeAggregationTypes, i as xAxis };
