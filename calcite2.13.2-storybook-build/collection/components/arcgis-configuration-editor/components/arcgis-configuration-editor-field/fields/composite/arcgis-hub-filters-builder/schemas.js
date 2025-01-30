import { FilterSchema } from "@esri/hub-common";
export const FILTER_BUILDER_SCHEMA = FilterSchema;
export const buildFilterBuilderUiSchema = (opts) => {
  return {
    type: "Layout",
    elements: [
      {
        scope: "/properties/predicates",
        type: "Control",
        options: {
          control: "arcgis-hub-predicates-builder",
          availablePredicateProperties: opts.availablePredicateProperties,
          targetEntity: opts.targetEntity,
          messages: [
            {
              type: "ERROR",
              keyword: "minItems",
              hidden: true
            }
          ],
        }
      }
    ]
  };
};
