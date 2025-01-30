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
