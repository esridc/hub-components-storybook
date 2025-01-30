export const SUBTITLE = `The following harness shows variations of the time-zone picker field (hub-field-input-time-zone):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  required: ["requiredTimeZone"],
  properties: {
    basicTimeZone: {
      type: 'string',
    },
    timeZoneWithDefault: {
      type: 'string',
      default: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`
    },
    timeZoneWithTooltip: {
      type: 'string',
      default: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Basic time zone picker',
      scope: '/properties/basicTimeZone',
      type: 'Control',
      options: {
        control: 'hub-field-input-time-zone'
      }
    },

    {
      label: 'Time with a default value',
      scope: '/properties/timeZoneWithDefault',
      type: 'Control',
      options: {
        control: 'hub-field-input-time-zone'
      }
    },
    {
      label: 'Time picker with a tooltip',
      scope: '/properties/timeZoneWithTooltip',
      type: 'Control',
      options: {
        control: 'hub-field-input-time-zone',
        tooltip: {
          label: 'This is tooltip text'
        }
      }
    }
  ]
};
