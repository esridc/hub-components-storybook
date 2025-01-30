export const SUBTITLE = `The following harness demonstrates how to use the composite access level controls field. A composite field is one that renders an instance of the configuration editor itself:

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  properties: {
    access: {
      type: "string",
      enum: ["public", "org", "private"],
      default: "private"
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      scope: "/properties/access",
      type: "Control",
      options: {
        control: "arcgis-hub-access-level-controls",
        itemType: "project",
        orgName: "QA Premium Alpha Hub"
      },
    },
  ]
};

export const VALUES = {
  access: "org"
};
