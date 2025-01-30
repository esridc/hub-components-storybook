import { CollectionAppearanceSchema, CollectionSchema } from "@esri/hub-common";
export const COLLECTION_BUILDER_SCHEMA = CollectionSchema;
export const buildCollectionBuilderUiSchema = (opts) => {
  const { targetEntity, availablePredicateProperties } = opts;
  return {
    type: "Layout",
    elements: [
      {
        type: "Section",
        elements: [
          {
            scope: "/properties/label",
            type: "Control",
            label: "{{name.label:translate}}",
            options: {
              messages: [
                {
                  type: "ERROR",
                  keyword: "required",
                  icon: true,
                  label: `{{name.requiredError:translate}}`,
                }
              ]
            }
          },
        ],
      },
      {
        scope: "/properties/scope",
        type: "Control",
        options: {
          control: "arcgis-hub-query-builder",
          targetEntity,
          availablePredicateProperties,
          queryContext: "collection"
        }
      }
    ]
  };
};
/**
 * Schema for building the appearance of a collection
 */
export const COLLECTION_APPEARANCE_BUILDER_SCHEMA = CollectionAppearanceSchema;
/**
 * UiSchema for building the appearance of a collection
 */
export const COLLECTION_APPEARANCE_BUILDER_UI_SCHEMA = {
  type: "Layout",
  elements: [
    {
      type: "Control",
      scope: "/properties/displayConfig",
      options: {
        control: "arcgis-hub-collections-appearance-builder"
      }
    }
  ]
};
