export const SUBTITLE = "The map component contains options to select existing maps or scenes and configure how the map is displayed.";

export const SCHEMA = {
  type: 'object',
  required: [],
  properties: {
    mapSettingsWithoutPreview: {
      type: 'object'
    },
    mapSettingsWithPreview: {
      type: 'object'
    },
    mapSettingsPreviewOnly: {
      type: 'object'
    }
  }
};

export const UI_SCHEMA = {
  type: "Layout",
  elements: [
    {
      type: "Section",
      label: "Map Settings without Preview",
      options: {
        "section": "card"
      },
      elements: [
        {
          scope: "/properties/mapSettingsWithoutPreview",
          type: "Control",
          options: {
            type: "Control",
            control: "hub-composite-input-map-settings",
            visibleSettings: ["gallery"],
            showPreview: false,
          },
        },
      ]
    },
    {
      type: "Section",
      label: "Map Settings with Preview",
      options: {
        "section": "card"
      },
      elements: [
        {
          scope: "/properties/mapSettingsWithPreview",
          type: "Control",
          options: {
            type: "Control",
            control: "hub-composite-input-map-settings",
            visibleSettings: ["gallery"],
            showPreview: true,
          },
        },
      ]
    },
    {
      type: "Section",
      label: "Map Settings with Preview Only",
      options: {
        "section": "card"
      },
      elements: [
        {
          scope: "/properties/mapSettingsPreviewOnly",
          type: "Control",
          options: {
            type: "Control",
            control: "hub-composite-input-map-settings",
            visibleSettings: [],
            showPreview: true,
          },
        },
      ]
    }
  ]
};
