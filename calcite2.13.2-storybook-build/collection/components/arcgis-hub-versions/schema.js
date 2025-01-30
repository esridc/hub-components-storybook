export const SCHEMA = {
  type: "object",
  properties: {
    name: {
      type: "string",
      maxLength: 64,
    },
    description: {
      type: "string",
      maxLength: 255,
    }
  }
};
export const UI_SCHEMA = {
  type: "Layout",
  elements: [
    {
      scope: "/properties/name",
      type: "Control",
      labelKey: 'name.label',
      options: {
        helperText: { labelKey: 'name.helpText' },
      }
    },
    {
      scope: "/properties/description",
      type: "Control",
      labelKey: 'description.label',
      options: {
        control: 'hub-field-input-input',
        type: 'textarea',
      }
    }
  ]
};
