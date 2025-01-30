export const SUBTITLE = `The following harness demonstrates how we can use the configuration form to render a form with a sticky footer (this is the default layout). Alternatively, the footer can be "fixed", meaning it will remain fixed to the bottom of the form's parent container.

Note: the configuration form adopts the height/width of its parent container. The parent container is responsible for providing appropriate padding/margins. We've artificially added a parent container (with styling) to this harness for demonstration purposes. The configuration form also exposes two css custom variables for setting the sticky footer's background color (to match that of the form) and the footer's negative margin (to account for any parent container padding which would otherwise prevent the sticky footer from extending the full width)`;

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
