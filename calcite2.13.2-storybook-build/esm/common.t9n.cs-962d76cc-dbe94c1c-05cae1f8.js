const i={mean:"Průměr",median:"Medián",sum:"Suma",discretePercentile:"Diskrétní percentil",minimum:"Minimum",maximum:"Maximum",variance:"Rozptyl",count:"Počet",aggregation:"${ statistics } z ${ fieldName }",noAggregation:"Žádná agregace"},t="Graf",e="Počet sérií",a="Osa X",s="Není k dispozici",n={start:"Přichytit k prvnímu datovému bodu",end:"Přichytit k poslednímu datovému bodu"};var m={statistics:i,defaultTitle:t,countSeries:e,xAxis:a,notAvailable:s,timeAggregationTypes:n};

export default m;
export { e as countSeries, t as defaultTitle, s as notAvailable, i as statistics, n as timeAggregationTypes, a as xAxis };
