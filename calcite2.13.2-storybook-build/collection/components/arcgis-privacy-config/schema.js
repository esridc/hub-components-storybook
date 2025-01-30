import { PRIVACY_CONFIG_SCHEMA, UiSchemaRuleEffects } from '@esri/hub-common';
export const SCHEMA = PRIVACY_CONFIG_SCHEMA.properties.consentNotice;
export const buildUiSchema = () => {
  return {
    type: 'Layout',
    elements: [
      {
        type: 'Section',
        scope: '/properties/allowPrivacyConfig',
        labelKey: 'allowPrivacyConfig.label',
        options: {
          section: 'subblock',
          toggleDisplay: 'switch',
        },
        elements: [
          {
            type: "Section",
            rule: {
              effect: UiSchemaRuleEffects.SHOW,
              condition: {
                scope: '/properties/allowPrivacyConfig',
                schema: { const: true }
              }
            },
            elements: [
              {
                type: 'Control',
                options: {
                  control: 'hub-field-input-tile-select',
                  labels: ['{{blocking.optional.label:translate}}', '{{blocking.required.label:translate}}'],
                  descriptions: ['{{blocking.optional.description:translate}}', '{{blocking.required.description:translate}}'],
                  type: 'radio',
                },
                labelKey: 'blocking.label',
                scope: '/properties/blocking'
              }
            ]
          }
        ]
      },
      {
        type: 'Section',
        labelKey: 'additionalInfo.label',
        options: {
          section: 'subblock',
          // helperText: {
          //   labelKey: 'additionalInfo.helperText',
          // }
        },
        elements: [
          {
            scope: '/properties/disclaimer/items/0/properties/text',
            labelKey: 'consentText.label',
            type: 'Control',
            options: {
              type: 'textarea',
              helperText: {
                labelKey: 'consentText.helperText',
              },
            },
          },
          {
            scope: '/properties/policyURL',
            labelKey: 'policyURL.label',
            type: 'Control',
            options: {
              helperText: {
                labelKey: 'policyURL.helperText'
              },
              messages: [
                {
                  type: 'ERROR',
                  keyword: 'pattern',
                  icon: true,
                  labelKey: 'policyURL.error'
                }
              ],
            }
          }
        ]
      }
    ]
  };
};
