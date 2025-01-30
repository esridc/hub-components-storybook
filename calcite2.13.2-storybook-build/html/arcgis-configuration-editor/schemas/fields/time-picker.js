export const SUBTITLE = `The following harness shows variations of the time picker field (hub-field-input-time):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  required: ["requiredTime"],
  properties: {
    basicTime: {
      type: 'string',
    },
    requiredTime: {
      type: 'string',
    },
    timeWithDefault: {
      type: 'string',
      default: `${new Date().getHours()}:${new Date().getMinutes()}`
    },
    timeWithTooltip: {
      type: 'string',
      default: `${new Date().getHours()}:${new Date().getMinutes()}`
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Basic time picker',
      scope: '/properties/basicTime',
      type: 'Control',
      options: {
        control: 'hub-field-input-time'
      }
    },
    {
      label: 'Required time picker',
      scope: '/properties/requiredTime',
      type: 'Control',
      options: {
        control: 'hub-field-input-time',
        helperText: {
          label: "Select a time and then remove it to see the custom error message"
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
      label: 'Placement',
      scope: '/properties/timeWithDefault',
      type: 'Control',
      options: {
        placement: "bottom-start",
         helperText: {
          label: "See calcite-time-picker for placement options"
        },
        control: 'hub-field-input-time'
      }
    },
    {
      label: 'Time picker with a tooltip',
      scope: '/properties/timeWithTooltip',
      type: 'Control',
      options: {
        control: 'hub-field-input-time',
        tooltip: {
          label: 'This is tooltip text'
        }
      }
    }
  ]
};
