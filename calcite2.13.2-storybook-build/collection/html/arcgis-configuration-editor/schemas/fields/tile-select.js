export const SUBTITLE = `The following harness shows variations of the tile-select field (arcgis-hub-field-tile-select):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Look at the input.js file to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

const ENUM_OPTIONS = {
    labels: [ 'Histogram', 'Pie Chart', 'Scatter Plot'],
    descriptions: [ 'this is a histogram description', 'this is a pie chart description', 'this is a scatter plot description' ],
    icons: [ "graph-histogram", 'pie-chart', 'graph-scatter-plot' ],
  }

  export const SCHEMA = {
    type: 'object',
    required: ["requiredTileSelect"],
    properties: {
      basicTileSelect: {
        type: 'string',
        enum: ['histogram', 'pie', 'scatter'],
      },
      tileSelectWithFormattedOptions: {
        type: 'string',
        enum: ['histogram', 'pie', 'scatter']
      },
      booleanTileSelect: {
        type: 'boolean',
        enum: [ true, false ]
      },
      disabledOptionTileSelect: {
        type: 'string',
        enum: ['histogram', 'pie', 'scatter']
      },
      requiredTileSelect: {
        type: 'string',
        enum: ['histogram', 'pie', 'scatter'],
      },
      tileSelectWithDefault: {
        type: 'string',
        enum: ['histogram', 'pie', 'scatter'],
        default: 'pie',
      },
      tileSelectWithTooltip: {
        type: 'string',
        enum: ['histogram', 'pie', 'scatter'],
      },
      tileSelectHorizontally: {
        type: 'string',
        enum: ['histogram', 'pie', 'scatter'],
      },
      tileSelectCheckboxes: {
        type: 'array',
        items: {
            type: 'string',
            enum: ['histogram', 'pie', 'scatter'],
        }
      },
      tileSelectCheckboxesWithDefault: {
        type: 'array',
        items: {
            type: 'string',
            enum: ['histogram', 'pie', 'scatter'],
        },
        default: ['pie'],
      },
      tileSelectWithRules: {
        type: 'string',
        enum: ['histogram', 'pie', 'scatter'],
      }
    }
  };

  export const UI_SCHEMA = {
    type: 'Layout',
    elements: [
      {
        label: 'Basic Tile Select',
        scope: '/properties/basicTileSelect',
        type: 'Control',
        options: {
          control: 'hub-field-input-tile-select'
        }
      },
      {
        label: 'Tile Select with formatted options',
        scope: '/properties/tileSelectWithFormattedOptions',
        type: 'Control',
        options: {
          control: 'hub-field-input-tile-select',
          helperText: {
            label: "labels, descriptions, and icons can be configured"
          },
          ...ENUM_OPTIONS
        }
      },
      {
        label: 'Tile Select with disabled option',
        scope: '/properties/disabledOptionTileSelect',
        type: 'Control',
        options: {
          control: 'hub-field-input-tile-select',
          ...ENUM_OPTIONS,
          disabled: [ false, true, false ]
        }
      },
      {
        label: 'Boolean tile select',
        scope: '/properties/booleanTileSelect',
        type: 'Control',
        options: {
          control: 'hub-field-input-tile-select',
          labels: [ "Yes, this feature is allowed", "No, this feature is blocked" ],
          descriptions: [ "this will emit a true boolean", "this will emit a false boolean" ],
          icons: [ "thumbs-up" ,"circle-disallowed"],
          layout: 'horizontal'
        }
      },
      {
        label: 'Required tile select',
        scope: '/properties/requiredTileSelect',
        type: 'Control',
        options: {
          control: 'hub-field-input-tile-select',
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
        label: 'Tile Select with a default value',
        scope: '/properties/tileSelectWithDefault',
        type: 'Control',
        options: {
          control: 'hub-field-input-tile-select',
          ...ENUM_OPTIONS
        }
      },
      {
        label: 'Tile Select with a tooltip',
        scope: '/properties/tileSelectWithTooltip',
        type: 'Control',
        options: {
          control: 'hub-field-input-tile-select',
          ...ENUM_OPTIONS,
          tooltip: {
            label: 'This is tooltip text'
          }
        }
      },
      {
        label: "Tile Select horizontally",
        scope: "/properties/tileSelectHorizontally",
        type: "Control",
        options: {
            control: 'hub-field-input-tile-select',
            ...ENUM_OPTIONS,
            layout: 'horizontal',
        }
      },
      {
        label: "Tile Select checkboxes",
        scope: "/properties/tileSelectCheckboxes",
        type: "Control",
        options: {
            control: 'hub-field-input-tile-select',
            ...ENUM_OPTIONS,
            type: 'checkbox',
        }
      },
      {
        label: "Tile Select checkboxes with default",
        scope: "/properties/tileSelectCheckboxesWithDefault",
        type: "Control",
        options: {
            control: 'hub-field-input-tile-select',
            ...ENUM_OPTIONS,
            type: 'checkbox'
        }
      },     {
        label: "Tile select with rules on individual options",
        scope: "/properties/tileSelectWithRules",
        type: "Control",
        options: {
          helperText: {
            label: "When only histogram is selected in the tile select directly above, a histogram tile select option appears below. When only pie is selected, the pie tile select option is enabled. This can also be integrated with permission checks, as shown in the code snippet within the tile-select.js file."
          },
          ...ENUM_OPTIONS,
          control: "hub-field-input-tile-select",
          rules: [
          [{
            effect: "SHOW",
            conditions: [
              {
                scope: '/properties/tileSelectCheckboxesWithDefault',
                schema: { const: ['histogram']}
              },
                // checkPermission(...).access, and it returns true:
                true
            ]
          }],
          [{
            effect: "ENABLE",
            conditions: [
              {
                scope: '/properties/tileSelectCheckboxesWithDefault',
                schema: { const: ['pie']}
              }
            ]
          }],
          undefined
          ]
        }
      }
    ]
  };
