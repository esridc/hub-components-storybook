export const SUBTITLE = `The following harness shows variations of the color picker field (arcgis-hub-field-color):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  required: ["requiredColor"],
  properties: {
    basicColor: {
      type: 'string'
    },
    requiredColor: {
      type: 'string',
    },
    colorWithDefault: {
      type: 'string',
      default: '#fcaf0a'
    },
    colorWithTooltip: {
      type: 'string'
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Basic color picker',
      scope: '/properties/basicColor',
      type: 'Control',
      options: {
        control: 'hub-field-input-color'
      }
    },
    {
      label: 'Required color picker',
      scope: '/properties/requiredColor',
      type: 'Control',
      options: {
        control: 'hub-field-input-color',
        helperText: {
          label: "Enter a value and then remove it to see the custom error message"
        },
        messages: [
          {
            type: "ERROR",
            keyword: "required",
            icon: true,
            label: "This field is required"
          }
        ]
      }
    },
    {
      label: 'Color with a default value',
      scope: '/properties/colorWithDefault',
      type: 'Control',
      options: {
        control: 'hub-field-input-color'
      }
    },
    {
      label: 'Color picker with a tooltip',
      scope: '/properties/colorWithTooltip',
      type: 'Control',
      options: {
        control: 'hub-field-input-color',
        tooltip: {
          label: 'This is tooltip text'
        }
      }
    }
  ]
};
