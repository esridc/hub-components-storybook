import { EXTENT, LOCATION_PICKER_OPTIONS } from "../../fixtures.js";

export const SUBTITLE = `The following harness shows variations of the location picker field (arcgis-hub-field-location-picker):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  properties: {
    basicLocation: {
      type: 'object'
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Basic location picker',
      scope: '/properties/basicLocation',
      type: 'Control',
      options: {
        control: 'hub-field-input-location-picker',
        extent: EXTENT,
        options: LOCATION_PICKER_OPTIONS
      }
    }
  ]
};
