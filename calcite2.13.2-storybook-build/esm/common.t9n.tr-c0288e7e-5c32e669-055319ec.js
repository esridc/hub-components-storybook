const a={mean:"Ortalama",median:"Medyan",sum:"Toplam",discretePercentile:"Ayrık yüzdelik",minimum:"Minimum",maximum:"Maksimum",variance:"Varyans",count:"Sayım",aggregation:"${ statistics } / ${ fieldName }",noAggregation:"Kümeleme yok"},e="Grafik",i="Serileri Say",t="X Ekseni",s="Kullanılabilir Değil",n={start:"İlk veri noktasına yerleştir",end:"Son veri noktasına yerleştir"};var r={statistics:a,defaultTitle:e,countSeries:i,xAxis:t,notAvailable:s,timeAggregationTypes:n};

export default r;
export { i as countSeries, e as defaultTitle, s as notAvailable, a as statistics, n as timeAggregationTypes, t as xAxis };
