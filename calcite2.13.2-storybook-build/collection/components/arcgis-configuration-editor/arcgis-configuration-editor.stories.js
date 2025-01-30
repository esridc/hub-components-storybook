import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Editing/Configuration Editor',
  component: 'arcgis-configuration-editor',
  parameters: {
    actions: {
      handles: ['arcgisConfigurationEditorChange', 'arcgisConfigurationEditorInitialized', 'arcgisConfigurationEditorLoaded'],
    },
  },
  argTypes: {
    schema: {
      control: { type: 'object' }
    },
    values: {
      control: { type: 'object' }
    },
    variant: {
      control: { type: 'select' },
      options: ["variant-workspace", "variant-layout-editor"]
    }
  },
  decorators: [
    withRenderCallback('arcgis-configuration-editor', ($el, { args }) => {
      $el.schema = args.schema;
      $el.uiSchema = args.uiSchema;
      $el.values = args.values;
    }),
    withCenteredLayout(),
    withNotice('The configuration editor allows us to declaratively build editing UIs based on a simple JSON schema and uiSchema. As such, it is incredibly flexible and there are a vast number of configuration combinations that result in different editing experiences. It is difficult to represent every combintation here. For more examples, please visit our harness suite', { text: 'Try the harness examples', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-configuration-editor/index.html' }, undefined, { icon: "information", kind: "brand", style: "margin-block-start: 2rem; margin-block-end: 2rem;" }),
  ]
};
const defaultArgs = {
  disabled: false,
  variant: "",
  schema: {
    type: 'object',
    properties: {
      input: {
        type: 'string'
      },
      textArea: {
        type: 'string'
      },
      richText: {
        type: 'string'
      },
      select: {
        type: 'string',
        enum: ['dog', 'cat', 'cow']
      },
      multiselect: {
        type: 'array'
      },
      color: {
        type: 'string'
      },
      date: {
        type: 'string',
        format: 'date'
      },
      datePicker: {
        type: 'string',
        format: 'date'
      },
      switch: {
        type: 'boolean'
      },
      radio: {
        type: 'string',
        enum: ['dog', 'cat', 'cow']
      },
      radioGroup: {
        type: 'string',
        enum: ['dog', 'cat', 'cow']
      },
      checkboxGroup: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['private', 'org', 'public'],
        }
      },
      alignment: {
        type: 'string'
      },
      location: {
        type: 'object'
      }
    }
  },
  uiSchema: {
    type: 'Layout',
    elements: [
      {
        label: 'Simple Text Field',
        scope: '/properties/input',
        type: 'Control',
        options: {
          control: 'hub-field-input-input' // optional - we default to this control for type="string"
        }
      },
      {
        label: 'Simple Text Area Field',
        scope: '/properties/textArea',
        type: 'Control',
        options: {
          control: 'hub-field-input-input',
          type: 'textarea'
        }
      },
      {
        label: 'Rich Text Field',
        scope: '/properties/richText',
        type: 'Control',
        options: {
          control: 'hub-field-input-rich-text'
        }
      },
      {
        label: 'Dropdown Select Field',
        scope: '/properties/select',
        type: 'Control',
        options: {
          control: 'hub-field-input-select',
          enum: {
            i18nScope: 'select.enum'
          }
        }
      },
      {
        label: 'Multi-Select Field',
        scope: '/properties/multiselect',
        type: 'Control',
        options: {
          control: 'hub-field-input-multiselect' // optional - we default to this control for type="array"
        }
      },
      {
        label: 'Color Picker Field',
        scope: '/properties/color',
        type: 'Control',
        options: {
          control: 'hub-field-input-color'
        }
      },
      {
        label: 'Simple Date Input Field',
        scope: '/properties/date',
        type: 'Control',
        options: {
          control: 'hub-field-input-input' // optional - we default to this control for type="string"
        }
      },
      {
        label: 'Date Picker Field',
        scope: '/properties/datePicker',
        type: 'Control',
        options: {
          control: 'hub-field-input-date'
        }
      },
      {
        label: 'Switch Field',
        scope: '/properties/switch',
        type: 'Control',
        options: {
          control: 'hub-field-input-switch' // optional - we default to this control for type="boolean"
        }
      },
      {
        label: 'Radio Button Field',
        scope: '/properties/radio',
        type: 'Control',
        options: {
          control: 'hub-field-input-radio',
          enum: {
            i18nScope: 'radio.enum',
          }
        }
      },
      {
        label: 'Radio Group Field',
        scope: '/properties/radioGroup',
        type: 'Control',
        options: {
          control: 'hub-field-input-radio-group',
          enum: {
            i18nScope: 'radioGroup.enum'
          }
        }
      },
      {
        label: 'Checkbox Group Field',
        scope: '/properties/checkboxGroup',
        type: 'Control',
        options: {
          control: 'hub-field-input-checkbox-group',
          enum: {
            i18nScope: 'checkboxGroup.enum'
          }
        }
      },
      {
        label: 'Alignment Field',
        scope: '/properties/alignment',
        type: 'Control',
        options: {
          control: 'hub-field-input-alignment'
        }
      },
      {
        label: 'Location Picker Field',
        scope: '/properties/location',
        type: 'Control',
        options: {
          control: 'hub-field-input-location-picker',
          extent: {
            "xmin": -88,
            "ymin": 39.1,
            "xmax": -87.10000000000001,
            "ymax": 40,
            "type": "extent",
            "spatialReference": {
              "wkid": 4326
            }
          },
          options: [
            {
              label: "No Location",
              location: {
                type: "none",
              }
            },
            {
              label: "Organization's Extent",
              description: "City of X",
              selected: true,
              location: {
                type: "org",
                extent: [[-88, 39.1], [-87.10000000000001, 40]],
                spatialReference: {
                  wkid: 4326
                }
              }
            },
            {
              label: "Custom",
              description: "Draw one or more locations",
              location: {
                type: "custom",
                extent: [[-88, 39.1], [-87.10000000000001, 40]],
                spatialReference: {
                  wkid: 4326
                }
              }
            },
          ]
        }
      },
      {
        label: "Notice example",
        type: "Notice",
        options: {
          notice: {
            configuration: {
              id: "storybook-notice-1",
              noticeType: "notice",
              closable: false,
              kind: "info",
              scale: "s"
            },
            title: "This is an example of a notice through the notice system.",
            message: "This notice was configured dynamically by passing in the notice configuration into the uiSchema."
          }
        }
      },
    ]
  },
  values: {
    input: "This is an input field",
    textArea: "This is a text area field",
    richText: "This is a rich text field",
    select: "cat",
    multiselect: ['tree', 'street'],
    color: "#b51cff",
    date: "2019-11-14",
    switch: true,
    radio: "cow",
    radioGroup: "cat",
    checkboxGroup: ['org'],
    alignment: "center",
    characterRestrictions: "This will limit your character count",
    timeline: {
      title: "The Project We Need",
      description: "We Promise to Listen to You!!",
      stages: [{
          "title": "Discuss It Quickly!",
          "timeframe": "March 3rd, 2022",
          "stageDescription": "It is important that we do this now, in terms of one thing and another",
          "link": {
            "href": "https://google.com",
            "title": "Click here for more information"
          },
          "status": "Not started",
          "key": 1638572046394,
        }]
    }
  }
};
export const Default = (args) => `
  <arcgis-configuration-editor
    disabled="${args.disabled}"
    variant="${args.variant}" />
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = "Editor with Basic Fields";
const SECTION_SCHEMA = {
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
      type: 'string'
    },
    access: {
      type: 'string',
      enum: ['public', 'private', 'org']
    }
  }
};
const BLOCK_SECTION_SCHEMA = {
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
      type: 'string'
    },
    tagline: {
      type: 'string',
    },
    allowLink: {
      type: 'boolean',
    },
    linkUrl: {
      type: 'string',
    },
    linkTitle: {
      type: 'string',
    },
    access: {
      type: 'string',
      enum: ['public', 'private', 'org']
    }
  }
};
export const BasicSections = args => `
  <arcgis-configuration-editor
    disabled="${args.disabled}"
    variant="${args.variant}" />
`;
BasicSections.storyName = "Basic Sections";
BasicSections.args = Object.assign(Object.assign({}, defaultArgs), { schema: SECTION_SCHEMA, uiSchema: {
    type: 'Layout',
    elements: [
      {
        type: 'Section',
        label: 'Details',
        options: { headerTag: 'h4' },
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
              helperText: { label: 'here is some helper text' }
            }
          },
          {
            label: 'Description',
            scope: '/properties/description',
            type: 'Control',
            options: {
              control: 'hub-field-input-input',
              type: 'textarea',
              helperText: { label: 'here is some helper text' }
            }
          }
        ]
      },
      {
        type: 'Section',
        label: 'Permissions',
        elements: [
          {
            label: 'Access',
            scope: '/properties/access',
            type: 'Control',
            options: {
              control: 'hub-field-input-select'
            }
          }
        ]
      }
    ]
  }, values: {} });
export const BlockSections = args => `
  <arcgis-configuration-editor
    disabled="${args.disabled}"
    variant="${args.variant}" />
`;
BlockSections.storyName = "Block Sections";
BlockSections.args = Object.assign(Object.assign({}, defaultArgs), { schema: BLOCK_SECTION_SCHEMA, uiSchema: {
    type: 'Layout',
    elements: [
      {
        type: 'Section',
        label: 'Details',
        options: { section: 'block', open: true },
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
              helperText: { label: 'here is some helper text' }
            }
          },
          {
            label: 'Description',
            scope: '/properties/description',
            type: 'Control',
            options: {
              control: 'hub-field-input-input',
              type: 'textarea',
              helperText: { label: 'here is some helper text' }
            }
          },
          {
            type: 'Section',
            label: "Additional Customizations",
            options: {
              section: "subblock"
            },
            elements: [
              {
                label: "Tagline",
                scope: '/properties/tagline',
                type: 'Control',
                options: {
                  control: 'hub-field-input-input',
                }
              },
              {
                label: "External Link",
                scope: '/properties/allowLink',
                type: 'Section',
                options: {
                  section: 'subblock',
                  toggleDisplay: 'switch',
                },
                elements: [
                  {
                    label: 'Link url',
                    scope: '/properties/linkUrl',
                    type: 'Control',
                  },
                  {
                    label: "Link title",
                    scope: "/properties/linkTitle",
                    type: "Control"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: 'Section',
        label: 'Permissions',
        options: { section: 'block' },
        elements: [
          {
            label: 'Access',
            scope: '/properties/access',
            type: 'Control',
            options: {
              control: 'hub-field-input-select'
            }
          }
        ]
      }
    ]
  }, values: {} });
export const SteppedSections = args => `
  <arcgis-configuration-editor
    disabled="${args.disabled}"
    variant="${args.variant}" />
`;
SteppedSections.storyName = "Stepped Sections";
SteppedSections.args = Object.assign(Object.assign({}, defaultArgs), { schema: SECTION_SCHEMA, uiSchema: {
    type: 'Layout',
    elements: [
      {
        type: 'Section',
        options: { section: "stepper", scale: "s" },
        elements: [
          {
            type: 'Step',
            label: 'Details',
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
                  helperText: {
                    label: 'here is some helper text'
                  }
                }
              },
              {
                label: 'Description',
                scope: '/properties/description',
                type: 'Control',
                options: {
                  control: 'hub-field-input-input',
                  type: 'textarea',
                  helperText: {
                    label: 'here is some helper text'
                  }
                }
              }
            ]
          },
          {
            type: 'Step',
            label: 'Permissions',
            rule: {
              effect: 'DISABLE',
              condition: {
                scope: '/properties/name',
                schema: { const: '' }
              }
            },
            elements: [
              {
                label: 'Access',
                scope: '/properties/access',
                type: 'Control',
                options: {
                  control: 'hub-field-input-select'
                }
              }
            ]
          }
        ]
      }
    ]
  }, values: {} });
export const AccordionSections = args => `
  <arcgis-configuration-editor
    disabled="${args.disabled}"
    variant="${args.variant}" />
`;
AccordionSections.storyName = "Accordion Sections";
AccordionSections.args = Object.assign(Object.assign({}, defaultArgs), { schema: SECTION_SCHEMA, uiSchema: {
    type: 'Layout',
    elements: [
      {
        type: 'Section',
        options: { section: "accordion", scale: "s" },
        elements: [
          {
            type: 'AccordionItem',
            label: 'Details',
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
                  helperText: {
                    label: 'here is some helper text'
                  }
                }
              },
              {
                label: 'Description',
                scope: '/properties/description',
                type: 'Control',
                options: {
                  control: 'hub-field-input-input',
                  type: 'textarea',
                  helperText: {
                    label: 'here is some helper text'
                  }
                }
              }
            ]
          },
          {
            type: 'AccordionItem',
            label: 'Permissions',
            rule: {
              effect: 'DISABLE',
              condition: {
                scope: '/properties/name',
                schema: { const: '' }
              }
            },
            elements: [
              {
                label: 'Access',
                scope: '/properties/access',
                type: 'Control',
                options: {
                  control: 'hub-field-input-select'
                }
              }
            ]
          }
        ]
      }
    ]
  }, values: {} });
export const CardSections = args => `
  <arcgis-configuration-editor
    disabled="${args.disabled}"
    variant="${args.variant}" />
`;
CardSections.storyName = "Card Sections";
CardSections.args = Object.assign(Object.assign({}, defaultArgs), { schema: SECTION_SCHEMA, uiSchema: {
    type: 'Layout',
    elements: [
      {
        type: 'Section',
        label: 'Details',
        options: { section: "card" },
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
              helperText: { label: 'here is some helper text' }
            }
          },
          {
            label: 'Description',
            scope: '/properties/description',
            type: 'Control',
            options: {
              control: 'hub-field-input-input',
              type: 'textarea',
              helperText: { label: 'here is some helper text' }
            }
          }
        ]
      },
      {
        type: 'Section',
        label: 'Permissions',
        options: {
          section: "card"
        },
        elements: [
          {
            label: 'Access',
            scope: '/properties/access',
            type: 'Control',
            options: {
              control: 'hub-field-input-select'
            }
          }
        ]
      }
    ]
  }, values: {} });
