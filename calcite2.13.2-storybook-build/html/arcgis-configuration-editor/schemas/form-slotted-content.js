export const SUBTITLE = `The following harness demonstrates how to slot content into a form experience:`

export const SCHEMA = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
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
      type: 'Section',
      label: 'Slotted Content',
      options: {
        helperText: {
          label: 'Sometimes you may want something to render in your form that isn\'t a field - we\'ve created a "slot" type to support this. Here is an example of a slotted image in a section:',
        }
      },
      elements: [
        {
          type: "Slot",
          options: { name: "sample-slot" }
        }
      ]
    },
    {
      scope: '/properties/email',
      label: 'Email',
      type: 'Control'
    },
  ]
};

export const VALUES = {};
