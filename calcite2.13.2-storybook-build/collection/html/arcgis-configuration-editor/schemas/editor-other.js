export const SUBTITLE = `The following harness is used to demonstrate any additional functionality that isn't explicitly called out in the other harnesses:

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of editing experience.`;

export const SCHEMA = {
  type: 'object',
  properties: {
    characterRestrictions: {
      type: 'string',
      minLength: 1,
      maxLength: 250
    },
    helperText: {
      type: 'string',
    },
    helperTextPosition: {
      type: 'string',
    },
    tooltip: {
      type: 'string'
    },
    customStyles: {
      type: 'string',
      enum: ["try scrolling down", "two", "three", "four", "five", "did you scroll?", "it's because there is custom max height"]
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Field w/Character Restrictions',
      scope: '/properties/characterRestrictions',
      type: 'Control',
      options: {
        helperText: {
          label: 'Configure the minLength and maxLength in the editor\'s JSON schema to define character restrictions on input fields'
        }
      }
    },
    {
      label: 'Field w/Helper Text',
      scope: '/properties/helperText',
      type: 'Control',
      options: {
        helperText: {
          label: 'This is some helper text for your field. It should tell the user what to input. Note that helper text should never be placed below the field, as that is reserved for form validation messages.'
        }
      }
    },
    {
      label: 'Field w/Tooltip',
      scope: '/properties/tooltip',
      type: 'Control',
      options: {
        helperText: {
          label: 'Provide a tooltip to give the user additional information'
        },
        tooltip: {
          label: 'This is tooltip text'
        }
      }
    },
    {
      scope: '/properties/customStyles',
      type: 'Control',
      label: 'Field w/Custom Styles',
      options: {
        control: 'hub-field-input-radio',
        styles: {
          '--maxHeight': '10vh',
        }
      }
    }
  ]
};

export const VALUES = {};
