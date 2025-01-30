export const SUBTITLE = `The following harness shows variations of the date time picker field (arcgis-hub-field-date-time):
1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  properties: {
    emptyDateTime: {
      type: 'string',
      format: 'date-time'
    },
    isoDateTime: {
      type: 'string',
      format: 'date-time',
      default: '2023-06-21T00:00:00Z'
    },
    timestampDateTime: {
      type: 'number',
      default: 1709543683381
    },
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Select Date & Time',
      scope: '/properties/emptyDateTime',
      type: 'Control',
      options: {
        helperText: {
          label: "Defaults to now. Date and Time will be returned in ISO 8601 format, UTC time zone."
        },
        control: 'hub-field-input-date-time',

      }
    },
    {
      label: 'ISO Date & Time',
      scope: '/properties/isoDateTime',
      type: 'Control',
      options: {
        control: 'hub-field-input-date-time',
        helperText: {
          label: "ISO8601 '2023-06-21T00:00:00Z' passed in, and will be returned."
        },

      }
    },
    {
      label: 'Timestamp',
      scope: '/properties/timestampDateTime',
      type: 'Control',
      options: {
        control: 'hub-field-input-date-time',
        helperText: {
          label: "Timestamp 1709543683381 passed in, and will be returned."
        },

      }
    },

  ]
};

export const VALUES = {
  basicDateTime: '2023-06-21T12:00:00Z'
};
