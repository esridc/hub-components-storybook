export const SUBTITLE = `The following harness shows variations of the radio field (arcgis-hub-field-radio):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

const ENUM_OPTIONS = {
  labels: [ 'Histogram', 'Pie Chart', 'Scatter Plot'],
  descriptions: [ 'this is a histogram description', 'this is a pie chart description', 'this is a scatter plot description' ],
  icons: [ "graph-histogram", 'pie-chart', 'graph-scatter-plot' ],
}

export const SCHEMA = {
  type: 'object',
  required: ["requiredRadio"],
  properties: {
    basicRadio: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
    },
    radioWithFormattedOptions: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter']
    },
    booleanRadio: {
      type: 'boolean',
      enum: [ true, false ]
    },
    disabledOptionRadio: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter']
    },
    requiredRadio: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
    },
    radioWithDefault: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
      default: 'pie'
    },
    radioWithTooltip: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
    },
    radioWithButtonTooltips: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
    },
    radioWithRules: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Basic radio',
      scope: '/properties/basicRadio',
      type: 'Control',
      options: {
        control: 'hub-field-input-radio'
      }
    },
    {
      label: 'Radio with formatted options',
      scope: '/properties/radioWithFormattedOptions',
      type: 'Control',
      options: {
        control: 'hub-field-input-radio',
        helperText: {
          label: "labels, descriptions, and icons can be configured"
        },
        ...ENUM_OPTIONS
      }
    },
    {
      label: 'Radio with disabled option',
      scope: '/properties/disabledOptionRadio',
      type: 'Control',
      options: {
        control: 'hub-field-input-radio',
        ...ENUM_OPTIONS,
        disabled: [ false, true, false ]
      }
    },
    {
      label: 'Boolean radio',
      scope: '/properties/booleanRadio',
      type: 'Control',
      options: {
        control: 'hub-field-input-radio',
        labels: [ "Yes, this feature is allowed", "No, this feature is blocked" ],
        descriptions: [ "this will emit a true boolean", "this will emit a false boolean" ],
        icons: [ "thumbs-up" ,"circle-disallowed"]
      }
    },
    {
      label: 'Required radio',
      scope: '/properties/requiredRadio',
      type: 'Control',
      options: {
        control: 'hub-field-input-radio',
        ...ENUM_OPTIONS,
        messages: [
          {
            type: "ERROR",
            keyword: "required",
            icon: true,
            label: "This field is required",
            allowShowBeforeInteract: true
          }
        ]
      }
    },
    {
      label: 'Radio with a default value',
      scope: '/properties/radioWithDefault',
      type: 'Control',
      options: {
        control: 'hub-field-input-radio',
        ...ENUM_OPTIONS
      }
    },
    {
      label: 'Radio with a label tooltip',
      scope: '/properties/radioWithTooltip',
      type: 'Control',
      options: {
        control: 'hub-field-input-radio',
        ...ENUM_OPTIONS,
        tooltip: {
          label: 'This is tooltip text'
        }
      }
    },
    {
      label: 'Radio with a individual radio button tooltips',
      scope: '/properties/radioWithButtonTooltips',
      type: 'Control',
      options: {
        control: 'hub-field-input-radio',
        ...ENUM_OPTIONS,
        tooltips: [
          { text: 'Histogram tooltip', placement: 'top' },
          { text: 'Pie Chart tooltip', placement: 'right-end' },
          { text: 'Scatter Plot tooltip', placement: 'bottom' },
        ],
      }
    },
    {
      label: "Radio with rules on individual options",
      scope: "/properties/radioWithRules",
      type: "Control",
      options: {
        helperText: {
          label: "When histogram is selected in the radio buttons directly above, a histogram radio option appears below. When pie is selected, the pie radio option is enabled. This can also be integrated with permission checks, as shown in the code snippet within the radio.js file."
        },
        ...ENUM_OPTIONS,
        control: "hub-field-input-radio",
        rules: [
        [{
          effect: "SHOW",
          conditions: [
            {
              scope: '/properties/radioWithButtonTooltips',
              schema: { enum: ['histogram']}
            },
              // checkPermission(...).access, and it returns true:
              true
          ]
        }],
        [{
          effect: "ENABLE",
          conditions: [
            {
              scope: '/properties/radioWithButtonTooltips',
              schema: { enum: ['pie']}
            }
          ]
        }],
        undefined
        ]
      }
    }
  ]
};
