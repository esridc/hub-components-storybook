export const SUBTITLE = `The following harness demonstrates how to use the composite catalog appearance builder field.
1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  properties: {
    catalog: {
      type: "object"
    },
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      scope: "/properties/catalog",
      type: "Control",
      options: {
        control: "arcgis-hub-catalog-appearance-builder",
      }
    }
  ]
};

export const VALUES = {
    catalog: {
      collections: [
        {
          label: "Collection 1",
          key: "collection-1",
          targetEntity: "item",
          displayConfig: {
            hidden: false,
          }
        },
        {
          label: "Collection 2",
          key: "collection-2",
          targetEntity: "event",
          displayConfig: {
            hidden: true,
          }
        },
        {
          label: "Collection 3",
          key: "collection-3",
          targetEntity: "item",
          displayConfig: {
            hidden: false,
          }
        }
      ]
    }
};
