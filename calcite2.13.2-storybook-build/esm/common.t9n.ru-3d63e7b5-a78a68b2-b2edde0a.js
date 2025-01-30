const e={mean:"Среднее",median:"Медиана",sum:"Сумма",discretePercentile:"Дискретный процентиль",minimum:"Минимум",maximum:"Максимум",variance:"Дисперсия",count:"Количество",aggregation:"${ statistics } из ${ fieldName }",noAggregation:"Без агрегирования"},t="Диаграмма",a="Серии чисел",i="Ось X",s="Недоступно",n={start:"Замкнуть на первую точку данных",end:"Замкнуть на последнюю точку данных"};var g={statistics:e,defaultTitle:t,countSeries:a,xAxis:i,notAvailable:s,timeAggregationTypes:n};

export default g;
export { a as countSeries, t as defaultTitle, s as notAvailable, e as statistics, n as timeAggregationTypes, i as xAxis };
