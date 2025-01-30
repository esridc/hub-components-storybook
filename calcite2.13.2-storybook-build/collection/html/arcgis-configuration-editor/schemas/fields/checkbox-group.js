export const SUBTITLE = `The following harness shows variations of the checkbox group field (arcgis-hub-field-checkbox-group):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

const ENUM_OPTIONS = {
  labels: ['Public', 'Organization', 'Private'],
};

export const SCHEMA = {
  type: 'object',
  required: ['requiredCheckboxGroup'],
  properties: {
    basicCheckboxGroup: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['public', 'org', 'private'],
      },
    },
    requiredCheckboxGroup: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['public', 'org', 'private'],
      },
    },
    checkboxGroupWithDefault: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['public', 'org', 'private'],
      },
      default: ['org'],
    },
    checkboxGroupWithTooltip: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['public', 'org', 'private'],
      },
    },
  },
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Basic checkbox group',
      scope: '/properties/basicCheckboxGroup',
      type: 'Control',
      options: {
        control: 'hub-field-input-checkbox-group',
      },
    },
    {
      label: 'Required checkbox group',
      scope: '/properties/requiredCheckboxGroup',
      type: 'Control',
      options: {
        control: 'hub-field-input-checkbox-group',
        ...ENUM_OPTIONS,
        messages: [
          {
            type: 'ERROR',
            keyword: 'required',
            icon: true,
            label: 'This field is required',
            allowShowBeforeInteract: true,
          },
        ],
      },
    },
    {
      label: 'Checkbox group with a default value',
      scope: '/properties/checkboxGroupWithDefault',
      type: 'Control',
      options: {
        control: 'hub-field-input-checkbox-group',
        ...ENUM_OPTIONS,
      },
    },
    {
      label: 'Checkbox group with a tooltip',
      scope: '/properties/checkboxGroupWithTooltip',
      type: 'Control',
      options: {
        control: 'hub-field-input-checkbox-group',
        ...ENUM_OPTIONS,
        tooltip: {
          label: 'This is tooltip text',
        },
      },
    },
  ],
};
