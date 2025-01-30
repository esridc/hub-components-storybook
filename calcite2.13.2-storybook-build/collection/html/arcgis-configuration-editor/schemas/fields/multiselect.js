export const SUBTITLE = `The following harness shows variations of the multiselect field (arcgis-hub-field-multiselect):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  required: ["requiredMultiselect"],
  properties: {
    basicMultiselect: {
      type: 'array',
    },
    requiredMultiselect: {
      type: 'array'
    },
    multiselectWithDefault: {
      type: 'array',
      default: ["default value 1", "default value 2"]
    },
    multiselectWithTooltip: {
      type: 'array'
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Basic multiselect',
      scope: '/properties/basicMultiselect',
      type: 'Control',
      options: {
        control: 'hub-field-input-multiselect'
      }
    },
    {
      label: 'Required multiselect',
      scope: '/properties/requiredMultiselect',
      type: 'Control',
      options: {
        control: 'hub-field-input-multiselect',
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
      label: 'Multiselect with a default value',
      scope: '/properties/multiselectWithDefault',
      type: 'Control',
      options: {
        control: 'hub-field-input-multiselect'
      }
    },
    {
      label: 'Multiselect with a tooltip',
      scope: '/properties/multiselectWithTooltip',
      type: 'Control',
      options: {
        control: 'hub-field-input-multiselect',
        tooltip: {
          label: 'This is tooltip text'
        }
      }
    }
  ]
};
