export const SUBTITLE = `The following harness shows variations of the date picker field (arcgis-hub-field-date):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  required: ["requiredDate"],
  properties: {
    basicDate: {
      type: 'string',
      format: 'date'
    },
    requiredDate: {
      type: 'string',
      format: 'date'
    },
    dateWithDefault: {
      type: 'string',
      format: 'date',
      default: "2023-06-21"
    },
    dateWithTooltip: {
      type: 'string',
      format: 'date'
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Basic date picker',
      scope: '/properties/basicDate',
      type: 'Control',
      options: {
        control: 'hub-field-input-date'
      }
    },
    {
      label: 'Required date picker',
      scope: '/properties/requiredDate',
      type: 'Control',
      options: {
        control: 'hub-field-input-date',
        helperText: {
          label: "Select a date and then remove it to see the custom error message"
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
      label: 'Date with a default value',
      scope: '/properties/dateWithDefault',
      type: 'Control',
      options: {
        control: 'hub-field-input-date'
      }
    },
    {
      label: 'Date picker with a tooltip',
      scope: '/properties/dateWithTooltip',
      type: 'Control',
      options: {
        control: 'hub-field-input-date',
        tooltip: {
          label: 'This is tooltip text'
        }
      }
    }
  ]
};
