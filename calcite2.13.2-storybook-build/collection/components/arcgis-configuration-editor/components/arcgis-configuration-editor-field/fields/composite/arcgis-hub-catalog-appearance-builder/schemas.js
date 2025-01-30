/**
 * Schema for the results appearance editing experience
 */
export const DisplayConfigSchema = {
  type: "object",
  properties: {
    displayConfig: {
      type: "object",
    }
  }
};
/**
 * UiSchema for the results appearance editing experience -- delegates to the results-appearance-builder
 */
export const getDisplayConfigUiSchema = () => {
  return {
    type: "Layout",
    elements: [
      {
        type: "Section",
        elements: [
          {
            type: "Control",
            scope: "/properties/displayConfig",
            options: {
              control: "arcgis-hub-results-appearance-builder",
            }
          }
        ]
      }
    ]
  };
};
