export const SUBTITLE = `The following harness demonstrates how to include stepped sectioning in your editor:

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of editing experience.`;

export const SCHEMA = {
  required: ['name'],
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    mission: {
      type: 'string'
    },
    description: {
      type: 'string',
    },
    access: {
      type: 'string',
      enum: ["public", "org", "private"],
      default: "private"
    },
    featuredImage: {
      type: 'object'
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      type: 'Section',
      options: {
        section: "stepper",
        scale: "m",
      },
      elements: [
        {
          type: 'Section',
          label: 'Details',
          options: {
            section: "step",
            helperText: {
              label: 'The following is helper text for the "Details" section. It is positioned below the section header'
            }
          },
          elements: [
            {
              label: 'Name',
              scope: '/properties/name',
              type: 'Control'
            },
            {
              label: 'Mission',
              scope: '/properties/mission',
              type: 'Control',
              options: {
                control: 'hub-field-input-input',
                type: 'textarea',
                helperText: { label: 'Briefly describe the change your Project will make.' }
              }
            },
            {
              label: 'Description',
              scope: '/properties/description',
              type: 'Control',
              options: {
                control: 'hub-field-input-input',
                type: 'textarea',
                helperText: { label: 'Describe how your Project will make this change. Use this space to provide important background information and a description of your goals.' }
              }
            }
          ]
        },
        {
          type: 'Section',
          label: 'Sharing',
          rule: {
            effect: 'DISABLE',
            condition: {
              scope: '/properties/name',
              schema: { const: '' }
            }
          },
          options: {
            section: "step",
            helperText: {
              label: 'The following is helper text for the "Sharing" section. It is positioned to the right of the section.',
              placement: 'right'
            }
          },
          elements: [
            {
              scope: "/properties/access",
              type: "Control",
              options: {
                control: "arcgis-hub-access-level-controls",
                itemType: "project",
                orgName: "QA Premium Alpha Hub"
              },
            }
          ]
        },
        {
          type: 'Section',
          label: 'Featured Image',
          options: {
            section: "step",
            helperText: {
              label: 'The following is helper text for the "Featured Image" section. It is positioned to the left of the section.',
              placement: 'left'
            }
          },
          elements: [
            {
              scope: '/properties/featuredImage',
              type: 'Control',
              options: {
                control: 'hub-field-input-image-picker',
                sizeDescription: {
                  label: "Recommended size: 1200 x 630 pixels"
                }
              }
            }
          ]
        }
      ]
    }
  ]
};

export const VALUES = {};
