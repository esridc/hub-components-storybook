export const SCHEMA = {
  required: [],
  type: 'object',
  properties: {
    icon: {
      type: 'object',
      properties: {
        scope: {
          type: 'string',
          default: 'library',
          enum: ['library', 'url']
        },
        name: {
          type: 'string'
        },
        url: {
          type: 'string'
        },
        color: {
          type: 'string',
        },
        altText: {
          type: 'string'
        }
      }
    }
  }
};
export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      scope: '/properties/icon/properties/scope',
      type: 'Control',
      options: {
        control: 'hub-field-input-radio',
        enum: {
          i18nScope: 'scope.enum'
        }
      }
    },
    {
      type: 'Slot',
      options: { name: 'select-icon-button' },
      rule: {
        effect: 'HIDE',
        condition: {
          scope: '/properties/icon/properties/scope',
          schema: { const: 'url' }
        }
      }
    },
    {
      scope: '/properties/icon/properties/url',
      type: 'Control',
      rule: {
        effect: 'SHOW',
        condition: {
          scope: '/properties/icon/properties/scope',
          schema: { const: 'url' }
        }
      }
    },
    {
      scope: '/properties/icon/properties/color',
      type: 'Control',
      options: {
        control: 'hub-field-input-color'
      }
    },
    {
      labelKey: 'altText.label',
      scope: '/properties/icon/properties/altText',
      type: 'Control',
      options: {
        helperText: {
          labelKey: 'altText.helperText'
        }
      }
    }
  ]
};
