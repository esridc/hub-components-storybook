export const SUBTITLE = `The following harness demonstrates how to use the composite embed field.
1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  properties: {
    basicEmbeds: {
      type: "array",
      items: {
        type: "object"
      }
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      type: "Section",
      label: "Basic Embeds",
      options: {
        section: "card"
      },
      elements: [
        {
          scope: "/properties/basicEmbeds",
          type: "Control",
          options: {
            control: "hub-composite-input-embeds",
          }
        }
      ]
    },
  ]
};

export const VALUES = {
  basicEmbeds: [
    {
      viewportAll: {
        kind: 'map',
        id: "57b06bab05194c109f630a904dd76e35",
      },
      key: "embed456"
    }
  ]
};
