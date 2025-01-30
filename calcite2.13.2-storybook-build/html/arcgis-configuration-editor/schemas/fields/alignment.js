export const SUBTITLE = `The following harness shows variations of the alignment field (arcgis-hub-field-alignment):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  required: ["requiredAlignment"],
  properties: {
    basicAlignment: {
      type: 'string',
      enum: [ 'start', 'center', 'end' ]
    },
    requiredAlignment: {
      type: 'string',
      enum: [ 'start', 'center', 'end' ]
    },
    alignmentWithDefault: {
      type: 'string',
      enum: [ 'start', 'center', 'end' ],
      default: 'end'
    },
    alignmentWithTooltip: {
      enum: [ 'start', 'center', 'end' ],
      type: 'string'
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Basic Alignment',
      scope: '/properties/basicAlignment',
      type: 'Control',
      options: {
        control: 'hub-field-input-alignment'
      }
    },
    {
      label: 'Required alignment',
      scope: '/properties/requiredAlignment',
      type: 'Control',
      options: {
        control: 'hub-field-input-alignment',
        helperText: {
          label: "with a custom error message"
        },
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
      label: 'Alignment with a default value',
      scope: '/properties/alignmentWithDefault',
      type: 'Control',
      options: {
        control: 'hub-field-input-alignment'
      }
    },
    {
      label: 'Alignment with a tooltip',
      scope: '/properties/alignmentWithTooltip',
      type: 'Control',
      options: {
        control: 'hub-field-input-alignment',
        tooltip: {
          label: 'This is tooltip text'
        }
      }
    }
  ]
};
