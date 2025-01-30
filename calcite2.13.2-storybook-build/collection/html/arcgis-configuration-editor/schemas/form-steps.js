export const SUBTITLE = `The following harness demonstrates how we can use the configuration form to render a stepped form. The "Next" button will respect the "Disabled" rules configured on any given step of the form, e.g. notice that steps 2 and 3 will remain disabled until the "Name" field is entered. See the uiSchema to get a better sense of how this was achieved. This will also work in a "modal" layout.`;

export const SCHEMA = {
  type: 'object',
  required: [ 'name' ],
  properties: {
    name: {
      type: 'string'
    },
    summary: {
      type: 'string'
    },
    purpose: {
      type: 'string'
    },
    favoriteAnimal: {
      type: 'string',
      enum: [ 'dog', 'cat', 'cow' ]
    },
    additionalInfo: {
      type: 'string'
    }
  }
}

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      type: 'Section',
      options: {
        section: "stepper"
      },
      elements: [
        {
          type: 'Section',
          label: 'Step 1',
          options: {
            section: "step"
          },
          elements: [
            {
              scope: '/properties/name',
              label: 'Name',
              type: 'Control'
            },
            {
              scope: '/properties/summary',
              label: 'Summary',
              type: 'Control'
            },
            {
              scope: '/properties/purpose',
              label: 'Purpose',
              type: 'Control'
            }
          ]
        },
        {
          type: 'Section',
          label: 'Step 2',
          options: {
            section: "step"
          },
          rule: {
            effect: 'DISABLE',
            condition: {
              scope: "/properties/name",
              schema: { const: "" },
            },
          },
          elements: [
            {
              scope: '/properties/favoriteAnimal',
              label: 'Favorite Animal',
              type: 'Control',
              options: {
                control: 'hub-field-input-select',
                helperText: {
                  label: "Please select one"
                }
              }
            }
          ]
        },
        {
          type: 'Section',
          label: 'Step 3',
          options: {
            section: "step"
          },
          rule: {
            effect: 'DISABLE',
            condition: {
              scope: "/properties/name",
              schema: { const: "" },
            },
          },
          elements: [
            {
              scope: '/properties/additionalInfo',
              label: 'Additional Information',
              type: 'Control',
              options: {
                control: 'hub-field-input-input',
                type: 'textarea',
                helperText: {
                  label: "Please tell us more about yourself"
                }
              }
            }
          ]
        }
      ]
    }
  ]
}
