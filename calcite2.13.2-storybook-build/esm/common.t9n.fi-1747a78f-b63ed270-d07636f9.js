const i={mean:"Keskiarvo",median:"Mediaani",sum:"Summa",discretePercentile:"Irrallinen prosenttipiste",minimum:"Vähimmäisarvo",maximum:"Enimmäisarvo",variance:"Varianssi",count:"Määrä",aggregation:"${ statistics }/${ fieldName }",noAggregation:"Ei koostetta"},e="Kaavio",a="Laske sarjat",s="X-akseli",t="Ei käytettävissä",n={start:"Kiinnitä ensimmäiseen aineistopisteeseen",end:"Kiinnitä viimeiseen aineistopisteeseen"};var m={statistics:i,defaultTitle:e,countSeries:a,xAxis:s,notAvailable:t,timeAggregationTypes:n};

export default m;
export { a as countSeries, e as defaultTitle, t as notAvailable, i as statistics, n as timeAggregationTypes, s as xAxis };
