export const SUBTITLE = `The following harness demonstrates how we can use the configuration form to render a form in a modal. In addition to providing the form with a schema, uiSchema, and initial values, simply set the layout to "modal" when configuring your component instance and use the "isOpen" prop to toggle the modal's visibility. Use the "header" slot to provide a modal header`;

export const SCHEMA = {
  type: 'object',
  required: [ 'name' ],
  properties: {
    name: {
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
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      scope: '/properties/name',
      label: 'Name',
      type: 'Control'
    },
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
    },
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

export const VALUES = {}
