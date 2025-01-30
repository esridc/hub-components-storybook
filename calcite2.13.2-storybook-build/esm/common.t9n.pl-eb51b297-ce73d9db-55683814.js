const e={mean:"Średnia",median:"Mediana",sum:"Suma",discretePercentile:"Percentyl dyskretny",minimum:"Minimum",maximum:"Maksimum",variance:"Odchylenie",count:"Liczba",aggregation:"${ statistics } z ${ fieldName }",noAggregation:"Bez agregacji"},i="Wykres",a="Zlicz serie",t="Oś X",s="Niedostępne",n={start:"Dociągnij do pierwszego punktu danych",end:"Dociągnij do ostatniego punktu danych"};var o={statistics:e,defaultTitle:i,countSeries:a,xAxis:t,notAvailable:s,timeAggregationTypes:n};

export default o;
export { a as countSeries, i as defaultTitle, s as notAvailable, e as statistics, n as timeAggregationTypes, t as xAxis };
