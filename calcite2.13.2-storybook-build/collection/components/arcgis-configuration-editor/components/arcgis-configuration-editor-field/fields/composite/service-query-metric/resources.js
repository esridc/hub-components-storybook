export const FEATURE_SERVICE_COLLECTION = {
  targetEntity: "item",
  key: "featureServices",
  label: "Feature Services",
  include: [],
  scope: {
    targetEntity: "item",
    filters: [
      {
        predicates: [
          {
            type: "Feature Service",
          },
          {
            typekeywords: {
              not: ['FieldworkerView']
            }
          },
          {
            typekeywords: {
              not: ['SurveyService'],
            }
          }
        ],
      },
    ],
  },
};
export const NUMERICAL_AGGREGATIONS = [
  "count", "min", "max", "sum", "avg", "stddev", "var"
];
export const BASIC_AGGREGATIONS = [
  "count", "min", "max",
];
export const getNumericalAggregationLabels = (intl) => {
  return NUMERICAL_AGGREGATIONS.map((key) => intl.t(`statistic.aggregations.${key}`));
};
export const getBasicAggregationLabels = (intl) => {
  return BASIC_AGGREGATIONS.map((key) => intl.t(`statistic.aggregations.${key}`));
};
