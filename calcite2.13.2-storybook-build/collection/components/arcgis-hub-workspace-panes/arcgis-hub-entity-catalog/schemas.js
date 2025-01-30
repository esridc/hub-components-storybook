import { CatalogSchema } from "@esri/hub-common";
/**
 * The Schema for the catalog definition builder field
 */
export const catalogBuilderSchema = {
  type: "object",
  properties: {
    catalog: CatalogSchema
  }
};
/**
 * Builds and returns the uischema for the catalog definition builder field
 * @param options
 * @returns
 */
export const getCatalogBuilderUiSchema = (options) => {
  const { callbacks, targetEntity } = options;
  return {
    type: "Layout",
    elements: [
      {
        scope: "/properties/catalog",
        type: "Control",
        options: {
          control: "arcgis-hub-catalog-builder",
          helperText: {
            labelKey: "detailsPanel.catalogBuilder.helperText"
          },
          callbacks,
          targetEntity,
        }
      }
    ]
  };
};
