export const SUBTITLE = `The following harness shows variations of the radio group field (arcgis-hub-field-radio-group):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

const ENUM_OPTIONS = {
  labels: [ 'Histogram', 'Pie Chart', 'Scatter Plot'],
  icons: [ "graph-histogram", 'pie-chart', 'graph-scatter-plot' ],
}

export const SCHEMA = {
  type: 'object',
  required: ["requiredRadioGroup"],
  properties: {
    basicRadioGroup: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
    },
    radioGroupWithFormattedOptions: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter']
    },
    requiredRadioGroup: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
    },
    radioGroupWithDefault: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
      default: 'pie'
    },
    radioGroupWithTooltip: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
    },
    radioGroupWithRules: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Basic radio group',
      scope: '/properties/basicRadioGroup',
      type: 'Control',
      options: {
        control: 'hub-field-input-radio-group'
      }
    },
    {
      label: 'Radio group with formatted options',
      scope: '/properties/radioGroupWithFormattedOptions',
      type: 'Control',
      options: {
        control: 'hub-field-input-radio-group',
        helperText: {
          label: "labels and icons can be configured"
        },
        ...ENUM_OPTIONS
      }
    },
    {
      label: 'Required radio group',
      scope: '/properties/requiredRadioGroup',
      type: 'Control',
      options: {
        control: 'hub-field-input-radio-group',
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
      label: 'Radio group with a default value',
      scope: '/properties/radioGroupWithDefault',
      type: 'Control',
      options: {
        control: 'hub-field-input-radio-group',
        ...ENUM_OPTIONS
      }
    },
    {
      label: 'Radio group with a tooltip',
      scope: '/properties/radioGroupWithTooltip',
      type: 'Control',
      options: {
        control: 'hub-field-input-radio-group',
        ...ENUM_OPTIONS,
        tooltip: {
          label: 'This is tooltip text'
        }
      }
    },
    {
      label: "Radio Group with rules on individual options",
      scope: "/properties/radioGroupWithRules",
      type: "Control",
      options: {
        helperText: {
          label: "When histogram is selected in the radio group buttons directly above, a histogram radio group option appears below. Unfortunately, calcite does not allow for disabling individual options in a segemented control, so only SHOW/HIDE rules can be used. This can also be integrated with permission checks, as shown in the code snippet within the radio-group.js file."
        },
        ...ENUM_OPTIONS,
        control: "hub-field-input-radio-group",
        rules: [
        [{
          effect: "SHOW",
          conditions: [
            {
              scope: '/properties/radioGroupWithTooltip',
              schema: { enum: ['histogram']}
            },
              // checkPermission(...).access, and it returns true:
              true
          ]
        }]
        ]
      }
    }
  ]
};
