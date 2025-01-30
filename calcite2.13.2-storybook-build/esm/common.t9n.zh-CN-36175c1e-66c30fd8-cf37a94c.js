const e={mean:"平均值",median:"中位数",sum:"总和",discretePercentile:"离散百分比数",minimum:"最小值",maximum:"最大值",variance:"方差",count:"计数",aggregation:"第 ${ statistics } 页，共 ${ fieldName } 页",noAggregation:"无聚合"},t="图表",a="技术序列",i="X 轴",s="不可用",n={start:"捕捉到第一个数据点",end:"捕捉到最后一个数据点"};var g={statistics:e,defaultTitle:"图表",countSeries:a,xAxis:"X 轴",notAvailable:"不可用",timeAggregationTypes:n};

export default g;
export { a as countSeries, t as defaultTitle, s as notAvailable, e as statistics, n as timeAggregationTypes, i as xAxis };
