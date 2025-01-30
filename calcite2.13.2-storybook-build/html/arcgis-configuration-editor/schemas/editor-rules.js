export const SUBTITLE = `The following harness demonstrates how to conditionally show/hide/disable fields based on the value(s) of other fields and simple booleans using RULES:

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of editing experience.`;

export const SCHEMA = {
  type: 'object',
  properties: {
    interest: {
      type: 'string',
      enum: [ 'pets', 'colors' ],
      default: 'pets'
    },
    favoriteAnimal: {
      type: 'string'
    },
    favoriteColor: {
      type: 'string',
      default: '#fcaf0a'
    },

    dietaryRestrictions: {
      type: 'string',
      enum: [ 'none', 'vegetarian', 'vegan', 'glutenFree' ],
      default: 'none'
    },
    grain: {
      type: 'string',
      enum: [ 'rice', 'pasta', 'barley' ]
    },
    meat: {
      type: 'string',
      enum: [ 'chicken', 'pork', 'beef' ]
    },
    updatePassword: {
      type: 'boolean',
      default: true
    },
    password: {
      type: 'string'
    },
    updatePassword2: {
      type: 'boolean',
      default: true
    },
    confirm: {
      type: 'boolean',
      default: true
    },
    password2: {
      type: 'string'
    },
    updatePassword3: {
      type: 'boolean',
      default: false
    },
    confirm2: {
      type: 'boolean',
      default: false
    },
    password3: {
      type: 'string'
    },
    likesGluten: {
      type: 'boolean'
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      type: 'Section',
      label: 'Show',
      options: {
        section: 'block',
        open: true,
        helperText: {
          label: "conditionally show a field based on the value of another. In this example, the second input will change based on the option selected in the first dropdown.",
          placement: "left"
        }
      },
      elements: [
        {
          scope: '/properties/interest',
          label: 'I Like...',
          type: 'Control',
          options: {
            control: 'hub-field-input-select',
            labels: [ "Animals", "Colors" ],
          }
        },
        {
          scope: '/properties/favoriteAnimal',
          label: 'What is your favorite animal?',
          type: 'Control',
          rules: [
            {
              effect: 'SHOW',
              conditions: [
                {
                  scope: '/properties/interest',
                  schema: { enum: [ 'pets' ] }
                },
              ]
            }
          ]
        },
        {
          scope: '/properties/favoriteColor',
          label: 'What is your favorite color?',
          type: 'Control',
          options: {
            control: "hub-field-input-color"
          },
          rules: [
            {
              effect: 'SHOW',
              conditions: [
                {
                  scope: '/properties/interest',
                  schema: { enum: [ 'colors' ] }
                },
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'Section',
      label: 'Hide',
      options: {
        section: 'block',
        open: true,
        helperText: {
          label: "conditionally hide a field based on the value of another. In this example, the third dropdown will hide based on certain option selections in the first dropdown. Note that clearOnHidden is also true for the dropdown, so the value will be cleared when it is hidden.",
          placement: "left"
        }
      },
      elements: [
        {
          scope: '/properties/dietaryRestrictions',
          label: 'Dietary restrictions?',
          type: 'Control',
          options: {
            control: 'hub-field-input-select',
            labels: [ "None", "Vegetarian", "Vegan", "Gluten Free" ],
          }
        },
        {
          scope: '/properties/grain',
          label: 'Please select a grain for your meal',
          type: 'Control',
          options: {
            control: 'hub-field-input-select',
            labels: [ "Rice", "Pasta", "Barley" ],
          }
        },
        {
          scope: '/properties/meat',
          label: 'Please select a meat for your meal',
          type: 'Control',
          options: {
            control: 'hub-field-input-select',
            clearOnHidden: true,
            labels: [ "Chicken", "Pork", "Beef" ],
          },
          rules: [
            {
              effect: 'HIDE',
              conditions: [
                {
                  scope: '/properties/dietaryRestrictions',
                  schema: { enum: [ 'vegetarian', 'vegan' ] }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'Section',
      options: {
        section: 'block',
        open: true,
        helperText: {
          label: "conditionally disable a field based on the value of another. In this example, the second input will be enabled/disabled based on the the toggle state.",
          placement: "left"
        }
      },
      label: 'Disable',
      elements: [
        {
          scope: '/properties/updatePassword',
          label: 'Update Password?',
          type: 'Control'
        },
        {
          scope: '/properties/password',
          label: 'Password',
          type: 'Control',
          rules: [
            {
              effect: 'DISABLE',
              conditions: [
                {
                  scope: '/properties/updatePassword',
                  schema: { const: false }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'Section',
      options: {
        section: 'block',
        open: true,
        helperText: {
          label: "conditionally show a field based on editor values AND/OR an outside factor, given as a boolean result. In this example, the second input will be shown based on BOTH toggle states AND an outside boolean check that is mimicing a checkPermission call, currently happening to result in true.",
          placement: "left"
        }
      },
      label: 'Rules with multiple conditions',
      elements: [
        {
          scope: '/properties/updatePassword2',
          label: 'Update Password?',
          type: 'Control'
        },
        {
          scope: '/properties/confirm',
          label: 'Are you sure you want to update?',
          type: 'Control',
        },
        {
          scope: '/properties/password2',
          label: 'Password',
          type: 'Control',
          rules: [
            {
              effect: 'SHOW',
              conditions: [
                {
                  scope: '/properties/updatePassword2',
                  schema: { const: true }
                },
                {
                  scope: '/properties/confirm',
                  schema: { const: true }
                },
                // checkPermission(...).access, and it returns true:
                true,
              ]
            }
          ]
        },
      ]
    },
    {
      type: 'Section',
      options: {
        section: 'block',
        open: true,
        helperText: {
          label: "conditionally show AND enable a field based on editor values. In this example, we've applied multiple rules to the input field such that toggling the first switch will SHOW the field and toggling the second switch will ENABLE the field.",
          placement: "left"
        }
      },
      label: 'Multiple Rules Applied to a Field',
      elements: [
        {
          scope: '/properties/updatePassword3',
          label: 'Update Password?',
          type: 'Control'
        },
        {
          scope: '/properties/confirm2',
          label: 'Are you sure you want to update?',
          type: 'Control',
        },
        {
          scope: '/properties/password3',
          label: 'Password',
          type: 'Control',
          rules: [
            {
              effect: 'SHOW',
              conditions: [
                {
                  scope: '/properties/updatePassword3',
                  schema: { const: true }
                }
              ]
            },
            {
              effect: 'ENABLE',
              conditions: [
                {
                  scope: '/properties/updatePassword3',
                  schema: { const: true }
                },
                {
                  scope: '/properties/confirm2',
                  schema: { const: true }
                }
              ]
            }
          ]
        },
      ]
    },
    {
      type: 'Section',
      options: {
        section: 'block',
        open: true,
        helperText: {
          label: "conditionally disable options AND reset a field based on the value of another field. In this example, we've applied multiple rules to the tile select such that toggling the first switch will DISABLE the Gluten Free option and, if that option was selected, RESET the field.",
          placement: "left"
        }
      },
      label: 'Reset and disable a field',
      elements: [
        {
          scope: '/properties/likesGluten',
          label: 'Do you like foods containing gluten?',
          type: 'Control'
        },
        {
          scope: '/properties/dietaryRestrictions',
          label: 'Dietary restrictions?',
          type: 'Control',
          options: {
            control: 'hub-field-input-tile-select',
            labels: [ "None", "Vegetarian", "Vegan", "Gluten Free" ],
            rules: [
              [ { effect: 'NONE' } ],
              [ { effect: 'NONE' } ],
              [ { effect: 'NONE' } ],
              [
                // this rule disables the option
                {
                  effect: 'DISABLE',
                  conditions: [
                    {
                      scope: '/properties/likesGluten',
                      schema: { const: true }
                    }
                  ]
                }
              ]
            ]
          },
          rules: [
            // this rule resets the field
            {
              effect: 'RESET',
              conditions: [
                {
                  scope: '/properties/dietaryRestrictions',
                  schema: { const: 'glutenFree' }
                },
                {
                  scope: '/properties/likesGluten',
                  schema: { const: true }
                }
              ]
            },
          ]
        },
      ]
    }
  ]
};

export const VALUES = {};
