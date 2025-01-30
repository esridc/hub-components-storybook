import { QuerySchema } from "@esri/hub-common";
export const QUERY_BUILDER_SCHEMA = QuerySchema;
export const buildQueryBuilderUiSchema = (opts) => {
  const { showTargetEntitySelection, targetEntity, availablePredicateProperties } = opts;
  return {
    type: "Layout",
    elements: [
      showTargetEntitySelection && {
        scope: "/properties/targetEntity",
        type: "Control",
        label: "{{targetEntity.label:translate}}",
        options: {
          control: "hub-field-input-radio-group",
          labels: [
            "{{targetEntity.enum.item:translate}}",
            "{{targetEntity.enum.event:translate}}",
            "{{targetEntity.enum.group:translate}}",
          ],
          icons: ["files", "event", "group"],
          width: "full",
        }
      },
      targetEntity && {
        scope: "/properties/filters",
        type: "Control",
        options: {
          control: "arcgis-hub-filters-builder",
          targetEntity,
          availablePredicateProperties
        }
      }
    ].filter(Boolean)
  };
};
