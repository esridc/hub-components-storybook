const i={mean:"Vidurkis",median:"Mediana",sum:"Suma",discretePercentile:"Diskretinis procentilis",minimum:"Minimumas",maximum:"Maksimumas",variance:"Nuokrypis",count:"Bendras skaičius",aggregation:"${ statistics } iš ${ fieldName }",noAggregation:"Be agregavimo"},a="Diagrama",e="Skaičių serija",s="X ašis",t="Negalima",n={start:"Pritraukti pirmą duomenų tašką",end:"Pritraukti paskutinį duomenų tašką"};var r={statistics:i,defaultTitle:a,countSeries:e,xAxis:s,notAvailable:t,timeAggregationTypes:n};

export default r;
export { e as countSeries, a as defaultTitle, t as notAvailable, i as statistics, n as timeAggregationTypes, s as xAxis };
