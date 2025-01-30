export const SUBTITLE = `The following harness shows variations of the rich text field (arcgis-hub-field-rich-text):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  required: ["requiredRichText"],
  properties: {
    basicRichText: {
      type: 'string'
    },
    requiredRichText: {
      type: 'string',
    },
    richTextWithDefault: {
      type: 'string',
      default: '<p><i>This is a default input</i></p>'
    },
    richTextWithTooltip: {
      type: 'string'
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Basic rich text',
      scope: '/properties/basicRichText',
      type: 'Control',
      options: {
        control: 'hub-field-input-rich-text'
      }
    },
    {
      label: 'Required rich text',
      scope: '/properties/requiredRichText',
      type: 'Control',
      options: {
        control: 'hub-field-input-rich-text',
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
      label: 'Rich text with a default value',
      scope: '/properties/richTextWithDefault',
      type: 'Control',
      options: {
        control: 'hub-field-input-rich-text'
      }
    },
    {
      label: 'Rich text picker with a tooltip',
      scope: '/properties/richTextWithTooltip',
      type: 'Control',
      options: {
        control: 'hub-field-input-rich-text',
        tooltip: {
          label: 'This is tooltip text'
        }
      }
    }
  ]
};
