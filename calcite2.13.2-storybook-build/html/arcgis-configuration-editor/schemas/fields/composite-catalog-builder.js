export const SUBTITLE = `The following harness demonstrates how to use the composite catalog builder field.
1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  properties: {
    empty: {
      type: "object"
    },
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      scope: "/properties/empty",
      type: "Control",
      options: {
        control: "arcgis-hub-catalog-builder",
      }
    }
  ]
};

export const VALUES = {
  empty: {}
};
