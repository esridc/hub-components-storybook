const e={mean:"Осреднена стойност",median:"Медиана",sum:"Сума",discretePercentile:"Дискретен перцентил",minimum:"Минимални",maximum:"Максимални",variance:"Отклонение",count:"Брой",aggregation:"${ statistics } от ${ fieldName }",noAggregation:"Няма агрегиране"},t="Диаграма",a="Серия за броене",i="Ос Х",s="Няма налични",n={start:"Притеглете до първата точка от данни",end:"Притеглете до последната точка от данни"};var g={statistics:e,defaultTitle:t,countSeries:a,xAxis:i,notAvailable:s,timeAggregationTypes:n};

export default g;
export { a as countSeries, t as defaultTitle, s as notAvailable, e as statistics, n as timeAggregationTypes, i as xAxis };
