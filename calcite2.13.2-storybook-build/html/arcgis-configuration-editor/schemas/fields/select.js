export const SUBTITLE = `The following harness shows variations of the select field (arcgis-hub-field-select):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  properties: {
    basicSelect: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
    },
    selectWithFormattedOptions: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter']
    },
    selectWithDefault: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
      default: 'pie'
    },
    selectWithTooltip: {
      type: 'string',
      default: "histogram",
      enum: ['histogram', 'pie', 'scatter'],
    },
    selectWithRules: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Basic select',
      scope: '/properties/basicSelect',
      type: 'Control',
      options: {
        control: 'hub-field-input-select'
      }
    },
    {
      label: 'Select with formatted options',
      scope: '/properties/selectWithFormattedOptions',
      type: 'Control',
      options: {
        control: 'hub-field-input-select',
        helperText: {
          label: "option labels can be configured"
        },
        labels: [ 'Histogram', 'Pie Chart', 'Scatter Plot']
      }
    },
    {
      label: 'Select with a default value',
      scope: '/properties/selectWithDefault',
      type: 'Control',
      options: {
        control: 'hub-field-input-select',
        labels: [ 'Histogram', 'Pie Chart', 'Scatter Plot']
      }
    },
    {
      label: 'Select with a tooltip',
      scope: '/properties/selectWithTooltip',
      type: 'Control',
      options: {
        control: 'hub-field-input-select',
        labels: [ 'Histogram', 'Pie Chart', 'Scatter Plot'],
        tooltip: {
          label: 'This is tooltip text'
        }
      }
    },
    {
      label: "Select with rules on individual options",
      scope: "/properties/selectWithRules",
      type: "Control",
      options: {
        labels: [ 'Histogram', 'Pie Chart', 'Scatter Plot'],
        helperText: {
          label: "When histogram is selected in the select directly above, a histogram select option appears below. When pie is selected, the pie select option is enabled. This can also be integrated with permission checks, as shown in the code snippet within the select.js file."
        },
        control: "hub-field-input-select",
        rules: [
        [{
          effect: "SHOW",
          conditions: [
            {
              scope: '/properties/selectWithTooltip',
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
              scope: '/properties/selectWithTooltip',
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
