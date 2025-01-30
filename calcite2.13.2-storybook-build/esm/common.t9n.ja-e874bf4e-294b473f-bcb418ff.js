const e={mean:"平均",median:"中央値",sum:"合計",discretePercentile:"不連続パーセンタイル",minimum:"最小",maximum:"最大",variance:"分散",count:"個数",aggregation:"${ fieldName } の ${ statistics }",noAggregation:"集約なし"},t="チャート",a="シリーズ数",i="X 軸",s="利用不可",n={start:"最初のデータ ポイントにスナップ",end:"最後のデータ ポイントにスナップ"};var g={statistics:e,defaultTitle:t,countSeries:a,xAxis:"X 軸",notAvailable:s,timeAggregationTypes:n};

export default g;
export { a as countSeries, t as defaultTitle, s as notAvailable, e as statistics, n as timeAggregationTypes, i as xAxis };
