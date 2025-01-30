export const SUBTITLE = `The following harness shows variations of the switch field (arcgis-hub-field-switch):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  properties: {
    basicSwitch: {
      type: 'string'
    },
    switchWithDefault: {
      type: 'string',
      default: false
    },
    switchWithTooltip: {
      type: 'string'
    },
    switchWithInlineSpaceBetween: {
      type: 'string',
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Basic switch',
      scope: '/properties/basicSwitch',
      type: 'Control',
      options: {
        control: 'hub-field-input-switch'
      }
    },
    {
      label: 'Switch with a default value',
      scope: '/properties/switchWithDefault',
      type: 'Control',
      options: {
        control: 'hub-field-input-switch'
      }
    },
    {
      label: 'Switch with a tooltip',
      scope: '/properties/switchWithTooltip',
      type: 'Control',
      options: {
        control: 'hub-field-input-switch',
        tooltip: {
          label: 'This is tooltip text'
        }
      }
    },
    {
      label: 'Switch that is inline-space-between layout with a tooltip',
      scope: '/properties/switchWithInlineSpaceBetween',
      type: 'Control',
      options: {
        control: 'hub-field-input-switch',
        tooltip: {
          label: 'This is tooltip text'
        },
        layout: 'inline-space-between',
        helperText: { label: "This is some helper text" }
      }
    }
  ]
};
