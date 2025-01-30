const e={mean:"ממוצע",median:"חציון",sum:"סכום",discretePercentile:"אחוזונים בנפרד",minimum:"מינימום",maximum:"מקסימום",variance:"שונות",count:"מונה",aggregation:"${ statistics } מתוך ${ fieldName }",noAggregation:"ללא צבירה"},t="תרשים",a="ספירה בסדרה",i="ציר X",s="לא זמין",n={start:"הצמד לנקודת נתונים ראשונה",end:"הצמד לנקודת נתונים אחרונה"};var g={statistics:e,defaultTitle:t,countSeries:a,xAxis:i,notAvailable:s,timeAggregationTypes:n};

export default g;
export { a as countSeries, t as defaultTitle, s as notAvailable, e as statistics, n as timeAggregationTypes, i as xAxis };
