export const SUBTITLE = `The following harness demonstrates how to use the composite embed field.
1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  properties: {
    emptyEmbed: {
      type: "object"
    },
    embedWithDefaultValues: {
      type: "object"
    },
    embedWithViewportValues: {
      type: "object"
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      type: "Section",
      label: "Empty embed configuration",
      options: {
        section: "card"
      },
      elements: [
        {
          scope: "/properties/emptyEmbed",
          type: "Control",
          options: {
            control: "hub-composite-input-embed",
          }
        }
      ]
    },
    {
      type: "Section",
      label: "Embed with default values",
      options: {
        section: "card"
      },
      elements: [
        {
          scope: "/properties/embedWithDefaultValues",
          type: "Control",
          options: {
            control: "hub-composite-input-embed",
          }
        }
      ]
    },
    {
      type: "Section",
      label: "Embed with viewport breakpoint values",
      options: {
        section: "card"
      },
      elements: [
        {
          scope: "/properties/embedWithViewportValues",
          type: "Control",
          options: {
            control: "hub-composite-input-embed",
          }
        }
      ]
    },
  ]
};

export const VALUES = {
  embedWithDefaultValues: {
    key: "embed123",
    viewportAll: {
      kind: 'map',
      id: "e98b1b232d1c469184233d28c9524558",
    },
  },
  embedWithViewportValues: {
    key: "embed123",
    viewportMobile: {
      kind: 'map',
      id: "e98b1b232d1c469184233d28c9524558",
    }
  }
};
