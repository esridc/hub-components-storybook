export const SCHEMA = {
  required: ['title'],
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 1
    },
    snippet: {
      type: 'string',
      maxLength: 2048
    },
    tags: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
};
export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      labelKey: 'title',
      scope: '/properties/title',
      type: 'Control'
    },
    {
      labelKey: 'snippet',
      scope: '/properties/snippet',
      type: 'Control',
      options: {
        control: 'hub-field-input-input',
        type: 'textarea'
      }
    },
    {
      labelKey: 'tags',
      scope: '/properties/tags',
      type: 'Control',
      options: {
        control: 'hub-field-input-multiselect'
      }
    }
  ]
};
