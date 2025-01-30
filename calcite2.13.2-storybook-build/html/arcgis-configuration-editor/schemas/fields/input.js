export const SUBTITLE = `The following harness shows variations of the input field (arcgis-hub-field-input):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  required: ["requiredInput"],
  properties: {
    basicInput: {
      type: 'string',
    },
    basicTextArea: {
      type: 'string'
    },
    dateInput: {
      type: 'string',
      format: 'date'
    },
    numberInput: {
      type: 'number',
      maximum: 25,
      minimum: -1,
    },
    requiredInput: {
      type: 'string'
    },
    inputWithDefault: {
      type: 'string',
      default: 'This is a default input'
    },
    inputWithMinMax: {
      type: 'string',
      minLength: 2,
      maxLength: 200
    },
    inputWithTooltip: {
      type: 'string'
    },
    inputWithPlaceholder: {
      type: 'string',
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Basic input',
      scope: '/properties/basicInput',
      type: 'Control',
      options: {
        control: 'hub-field-input-input'
      }
    },
    {
      label: 'Basic text area',
      scope: '/properties/basicTextArea',
      type: 'Control',
      options: {
        control: 'hub-field-input-input',
        type: 'textarea'
      }
    },
    {
      label: 'Date input',
      scope: '/properties/dateInput',
      type: 'Control',
      options: {
        control: 'hub-field-input-input',
        helperText: {
          label: 'We have a date picker field, but you can also use the input field with date formatting for a more "simple" date picker experience'
        }
      }
    },
    {
      label: "Number input",
      scope: "/properties/numberInput",
      type: 'Control',
      options: {
        control: 'hub-field-input-input',
        type: 'number',
        helperText: {
          label: "Can enter a number manually or through up/down arrows (on keyboard or in the interface). This example has a custom maximum value set to 25 and minumum value set to -1. "
        }
      }
    },
    {
      label: 'Required input',
      scope: '/properties/requiredInput',
      type: 'Control',
      options: {
        control: 'hub-field-input-input',
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
      label: 'Input with a default value',
      scope: '/properties/inputWithDefault',
      type: 'Control',
      options: {
        control: 'hub-field-input-input'
      }
    },
    {
      label: 'Input with a min/max character count (custom error messaging)',
      scope: '/properties/inputWithMinMax',
      type: 'Control',
      options: {
        control: 'hub-field-input-input',
        helperText: {
          label: "Enter less than the min character count (2) to see a custom error message. The field itself prevents the user from entering more than the max character count"
        },
        messages: [
          {
            type: "ERROR",
            keyword: "minLength",
            icon: true,
            label: "Your input should not be less than 2 characters"
          }
        ]
      }
    },
    {
      label: 'Input with a tooltip',
      scope: '/properties/inputWithTooltip',
      type: 'Control',
      options: {
        control: 'hub-field-input-input',
        tooltip: {
          label: 'This is tooltip text'
        }
      }
    },
    {
      label: "Input with a placeholder",
      scope: '/properties/inputWithPlaceholder',
      type: 'Control',
      options: {
        control: 'hub-field-input-input',
        placeholder: "https://esri.com"
      }
    }
  ]
};
