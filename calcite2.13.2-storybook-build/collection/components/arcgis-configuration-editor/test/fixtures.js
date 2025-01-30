export const MOCK_RETURN_VALUES = {
  parseJson: {},
  validate: { valid: true, errors: [] },
  invalidate: { valid: false, errors: [] },
  generateUiSchemaFromSchema: { type: 'Layout', elements: [] },
  generateUiSchemaElementsFromSchema: [],
  instantiateValidator: () => { return true; },
  instantiateValidatorFalse: () => { return false; },
  emitChangeEvent: null,
  getDefaultValues: {
    property1: "property 1 default",
    property2: {
      subPropertyA: "property 2 sub-property A default"
    }
  }
};
/** mock catalogs and facets for gallery-picker fields */
export const MOCK_CATALOGS = [
  {
    schemaVersion: 1,
    title: 'Esri',
    scopes: {
      item: {
        targetEntity: "item",
        filters: [{ predicates: [{ owner: "esri" }] }]
      }
    },
    collections: [
      {
        label: "Documents",
        key: "docs",
        targetEntity: "item",
        include: [],
        scope: {
          targetEntity: "item",
          filters: [{ predicates: [{ type: "$document" }] }]
        }
      }
    ]
  }
];
export const MOCK_FACETS = [
  {
    label: "Access",
    key: "access",
    display: "multi-select",
    operation: "OR"
  }
];
export const BASIC_SCHEMA = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string'
    }
  }
};
export const BASIC_UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      scope: '/properties/name',
      type: 'Control'
    }
  ]
};
export const BASIC_UI_SCHEMA_WITH_IDS = {
  type: 'Layout',
  elements: [
    {
      id: "name::123",
      scope: '/properties/name',
      type: 'Control'
    }
  ]
};
export const BASIC_VALUES = {
  name: 'Hello World'
};
export const UI_SCHEMA_WITH_MESSAGES = {
  type: 'Layout',
  elements: [
    {
      scope: '/properties/name',
      type: 'Control',
      options: {
        messages: [
          {
            type: "ERROR",
            keyword: "required",
            label: "Name is required"
          },
          {
            type: "SUCCESS",
            label: "Success!"
          },
          {
            type: "CUSTOM",
            label: "Custom message"
          }
        ]
      }
    }
  ]
};
export const NESTED_OBJECTS_SCHEMA = {
  type: 'object',
  required: ['name'],
  properties: {
    property1: {
      type: 'string',
      default: 'property 1 default'
    },
    property2: {
      type: 'object',
      properties: {
        subPropertyA: {
          type: 'string',
          default: 'property 2 sub-property A default'
        },
        subPropertyB: {
          type: 'string'
        }
      }
    },
    property3: {
      type: 'boolean'
    }
  }
};
export const NESTED_OBJECTS_UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      type: 'Section',
      options: { section: 'block' },
      elements: [
        {
          scope: '/properties/property1',
          type: 'Control'
        },
        {
          scope: '/properties/property2/properties/subPropertyA',
          type: 'Control'
        }
      ]
    },
    {
      type: 'Section',
      scope: '/properties/property3',
      options: {
        section: 'subblock',
        toggleDisplay: 'switch'
      },
      elements: []
    }
  ]
};
export const NESTED_OBJECTS_UI_SCHEMA_WITH_IDS = {
  type: 'Layout',
  elements: [
    {
      type: 'Section',
      options: {
        requiredHelperText: true,
        section: 'block',
        sectionScopes: ['property1', 'property2.subPropertyA']
      },
      elements: [
        {
          scope: '/properties/property1',
          type: 'Control',
          id: "property1::123"
        },
        {
          scope: '/properties/property2/properties/subPropertyA',
          type: 'Control',
          id: "property2.subPropertyA::123",
        },
      ]
    },
    {
      type: 'Section',
      scope: '/properties/property3',
      id: "property3::123",
      options: {
        section: 'subblock',
        toggleDisplay: 'switch',
        requiredHelperText: true,
        sectionScopes: [],
      },
      elements: []
    }
  ]
};
/** Comprehensive schema that includes all supported field types */
export const ALL_FIELDS_SCHEMA = {
  type: 'object',
  properties: {
    input: { type: 'string' },
    textarea: { type: 'string' },
    richText: { type: 'string' },
    select: { type: 'string', enum: ['option1', 'option2', 'option3'] },
    multiselect: { type: 'array' },
    color: { type: 'string' },
    date: { type: 'string', format: 'date' },
    switch: { type: 'boolean' },
    radio: { type: 'string', enum: ['option1', 'option2', 'option3'] },
    radioGroup: { type: 'string', enum: ['option1', 'option2', 'option3'] },
    alignment: { type: 'string' },
    image: { type: 'object' },
    galleryPicker: { type: 'object' },
    tileSelect: { type: 'string', enum: ['option1', 'option2', 'option3'], default: 'option2' },
    schedule: { type: 'object' }
  }
};
export const ALL_FIELDS_UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Input',
      scope: '/properties/input',
      type: 'Control',
      options: {
        control: 'hub-field-input-input'
      }
    },
    {
      label: 'Textarea',
      scope: '/properties/textarea',
      type: 'Control',
      options: {
        control: 'hub-field-input-input',
        type: 'textarea'
      }
    },
    {
      label: 'Rich Text',
      scope: '/properties/richText',
      type: 'Control',
      options: {
        control: 'hub-field-input-rich-text'
      }
    },
    {
      label: 'Select',
      scope: '/properties/select',
      type: 'Control',
      options: {
        control: 'hub-field-input-select'
      }
    },
    {
      label: 'Multiselect',
      scope: '/properties/multiselect',
      type: 'Control',
      options: {
        control: 'hub-field-input-multiselect'
      }
    },
    {
      label: 'Color Picker',
      scope: '/properties/color',
      type: 'Control',
      options: {
        control: 'hub-field-input-color',
        savedColors: ['#f40afc']
      }
    },
    {
      label: 'Date Picker',
      scope: '/properties/date',
      type: 'Control',
      options: {
        control: 'hub-field-input-date'
      }
    },
    {
      label: 'Switch',
      scope: '/properties/switch',
      type: 'Control',
      options: {
        control: 'hub-field-input-switch'
      }
    },
    {
      label: 'Radio',
      scope: '/properties/radio',
      type: 'Control',
      options: {
        control: 'hub-field-input-radio'
      }
    },
    {
      label: 'Radio Group',
      scope: '/properties/radioGroup',
      type: 'Control',
      options: {
        control: 'hub-field-input-radio-group'
      }
    },
    {
      label: 'Alignment',
      scope: '/properties/alignment',
      type: 'Control',
      options: {
        control: 'hub-field-input-alignment'
      }
    },
    {
      label: 'Image Picker',
      scope: '/properties/image',
      type: 'Control',
      options: {
        control: 'hub-field-input-image-picker',
        imgSrc: "https://t4.ftcdn.net/jpg/03/03/62/45/360_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg"
      }
    },
    {
      label: 'Gallery Picker',
      scope: '/properties/galleryPicker',
      type: 'Control',
      options: {
        control: 'hub-field-input-gallery-picker',
        targetEntity: 'item',
        limit: 3,
        catalogs: MOCK_CATALOGS,
        facets: MOCK_FACETS
      }
    },
    {
      label: "Tile Select",
      scope: '/properties/tileSelect',
      type: 'Control',
      options: {
        control: 'hub-field-input-tile-select',
        enum: ['Histogram', 'Pie Chart', 'Scatter Plot'],
        icons: ["graph-histogram", 'pie-chart', 'graph-scatter-plot'],
        descriptions: ['select a histogram', 'select a pie chart', 'select a scatter plot'],
        layout: 'horizontal'
      }
    },
    {
      label: 'Schedule',
      scope: '/properties/schedule',
      type: 'Control',
      options: {
        control: 'hub-field-input-scheduler',
        format: 'select',
        inputs: [
          { label: "Default", type: "automatic", },
          { label: "Daily", type: "daily", expandedHelperText: "Each day at" },
          { label: "Weekly", type: "weekly", expandedHelperText: "Each week on" },
          { label: "Monthly", type: "monthly", expandedHelperText: "Each month on" },
          { label: "Yearly", type: "yearly", expandedHelperText: "Each year on" },
          { label: "Manual", type: "manual", helperActionIcon: "information-f", helperActionText: "Use this option to manually update the search index and cached download files for this item." }
        ],
      }
    }
  ]
};
/** Schema to test editor validation states */
export const VALIDATION_SCHEMA = {
  type: 'object',
  properties: {
    iconAndTextMessages: {
      type: 'string',
      minLength: 2,
    },
    iconOnlyMessages: {
      type: 'string',
      minLength: 2,
    },
    textOnlyMessages: {
      type: 'string',
      minLength: 2,
    },
    multipleMessages: {
      type: 'string',
      minLength: 2,
      format: 'uri'
    },
    messagesDisabled: {
      type: 'string',
      minLength: 2,
    },
    customMessages: {
      type: 'string',
      enum: ["option1", "option2", "option3"]
    }
  }
};
export const VALIDATION_UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Messages with icon + text',
      scope: '/properties/iconAndTextMessages',
      type: 'Control',
      options: {
        helperText: {
          label: "This field requires two or more characters. Enter 2 characters to see a success icon + text",
        },
        messages: [
          {
            type: "ERROR",
            keyword: "minLength",
            icon: true,
            label: 'Your input does not have enough characters.'
          },
          {
            type: "SUCCESS",
            icon: true,
            label: "You did it!"
          }
        ],
      },
    },
    {
      label: 'Messages with icon only',
      scope: '/properties/iconOnlyMessages',
      type: 'Control',
      options: {
        helperText: {
          label: "This field requires two or more characters. Enter 2 characters to see a success icon",
        },
        messages: [
          {
            type: "ERROR",
            keyword: "minLength",
            icon: true
          },
          {
            type: "SUCCESS",
            icon: true
          }
        ]
      }
    },
    {
      label: 'Messages with text only',
      scope: '/properties/textOnlyMessages',
      type: 'Control',
      options: {
        helperText: {
          label: "This field requires two or more characters. Enter 2 characters to see the success text",
        },
        messages: [
          {
            type: "ERROR",
            keyword: "minLength",
            icon: false,
            label: "Your input does not have enough characters."
          },
          {
            type: "SUCCESS",
            icon: false,
            label: "You did it!"
          }
        ],
      },
    },
    {
      label: 'Multiple messages',
      scope: '/properties/multipleMessages',
      type: 'Control',
      options: {
        helperText: {
          label: "This field requires two or more characters and should be a valid URL. Enter https://some-url.com to see a success icon + text",
        },
        messages: [
          {
            type: "ERROR",
            keyword: "minLength",
            icon: true,
            label: "Your input does not have enough characters."
          },
          {
            type: "ERROR",
            keyword: "format",
            icon: true,
            label: "Your input does not look like a url."
          }
        ],
      },
    },
    {
      label: 'Messages disabled',
      scope: '/properties/messagesDisabled',
      type: 'Control',
      options: {
        disableMessages: true,
        helperText: {
          label: "This field will not render any messages; however, it will still render an error state indicated by a red outline. The field requires two or more characters and should be a valid URL. Enter https://some-url.com to get rid of the error state"
        },
        messages: [
          {
            type: "SUCCESS",
            label: "Success message - you won't see this"
          },
          {
            type: "ERROR",
            label: "Error message - you won't see this",
            keyword: "minLength",
          }
        ]
      }
    },
    {
      label: 'Custom Message',
      scope: '/properties/customMessages',
      type: 'Control',
      options: {
        control: "hub-field-input-radio-group",
        helperText: {
          label: 'This field will render a custom message if "Option 2" is selected'
        },
        messages: [
          {
            type: "CUSTOM",
            label: "This is a custom message!",
            icon: "analysis",
            condition: {
              scope: "/properties/customMessages",
              schema: { const: "option2" }
            }
          }
        ]
      }
    },
  ]
};
/** Schema to test required fields - test always, conditionally, and nested required fields */
export const REQUIRED_PROPERTIES_SCHEMA = {
  type: "object",
  required: ["property1"],
  properties: {
    property1: {
      type: "string",
      enum: ['option1', 'option2', 'option3']
    },
    property2: {
      type: "object",
      required: ["nestedProperty1"],
      properties: {
        nestedProperty1: {
          type: "string"
        }
      }
    },
    property3: {
      type: "string"
    },
    property4: {
      type: "object",
      required: ["nestedProperty2"],
      properties: {
        nestedProperty2: {
          type: "string"
        },
        nestedProperty3: {
          type: "object",
          required: ["doublyNestedProperty1"],
          properties: {
            doublyNestedProperty1: {
              type: "string"
            }
          }
        },
        nestedProperty4: {
          type: "string"
        },
      }
    }
  },
  allOf: [
    {
      if: {
        type: 'object',
        required: ["property1"],
        properties: {
          property1: { const: "option2" },
        }
      },
      then: { required: ["property3", "property4.nestedProperty4"] }
    }
  ]
};
export const REQUIRED_PROPERTIES_UI_SCHEMA = {
  type: "Layout",
  elements: [
    {
      label: "Property 1",
      scope: "/properties/property1",
      type: "Control",
      options: {
        control: 'hub-field-input-radio-group'
      }
    },
    {
      label: "Nested Property 1",
      scope: "/properties/property2/properties/nestedProperty1",
      type: "Control"
    },
    {
      label: "Property 3",
      scope: "/properties/property3",
      type: "Control"
    },
    {
      label: "Nested Property 2",
      scope: "/properties/property4/properties/nestedProperty2",
      type: "Control"
    },
    {
      label: "Doubly Nested Property 1",
      scope: "/properties/property4/properties/nestedProperty3/properties/doublyNestedProperty1",
      type: "Control"
    },
    {
      label: "Nested Property 4",
      scope: "/properties/property4/properties/nestedProperty4",
      type: "Control"
    },
  ]
};
export const RULES_SCHEMA = {
  type: 'object',
  properties: {
    showConditional: {
      type: 'string',
      enum: ['option1', 'option2'],
    },
    showForOption2: {
      type: 'string'
    },
    hideConditional: {
      type: 'string',
      enum: ['option3', 'option4'],
    },
    hideForOption4: {
      type: 'string',
    },
    disableConditional: {
      type: 'string',
      enum: ['option5', 'option6'],
    },
    disableForOption6: {
      type: 'string',
    },
    hideWithBooleanAndConditional: {
      type: 'string',
      enum: ['option7', 'option8'],
    },
    hideWithBooleanAndOption8: {
      type: 'string'
    }
  }
};
export const RULES_UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      scope: '/properties/showConditional',
      label: "Show Conditional",
      type: 'Control',
      options: {
        control: 'hub-field-input-radio-group',
        helperText: "Conditionally show another field when 'optioin2' is selected"
      }
    },
    {
      scope: '/properties/showForOption2',
      label: "Show for Option 2",
      type: 'Control',
      options: {
        helperText: "This field is conditionally shown when 'option2' is selected"
      },
      rule: {
        effect: 'SHOW',
        condition: {
          scope: '/properties/showConditional',
          schema: { const: "option2" }
        }
      }
    },
    {
      scope: '/properties/hideConditional',
      label: "Hide Conditional",
      type: 'Control',
      options: {
        control: 'hub-field-input-radio-group',
        helperText: "Conditionally hide another field when 'optioin4' is selected"
      }
    },
    {
      scope: '/properties/hideForOption4',
      label: "Hide for Option 4",
      type: 'Control',
      options: {
        helperText: "This field is conditionally hidden when 'option4' is selected"
      },
      rule: {
        effect: 'HIDE',
        condition: {
          scope: '/properties/hideConditional',
          schema: { const: "option4" }
        }
      }
    },
    {
      scope: '/properties/disableConditional',
      label: "Disable Conditional",
      type: 'Control',
      options: {
        control: 'hub-field-input-radio-group',
        helperText: "Conditionally disable another field when 'optioin6' is selected"
      }
    },
    {
      scope: '/properties/disableForOption6',
      label: "Disable for Option 6",
      type: 'Control',
      options: {
        helperText: "This field is conditionally disabled when 'option6' is selected"
      },
      rule: {
        effect: 'DISABLE',
        condition: {
          scope: '/properties/disableConditional',
          schema: { const: "option6" }
        }
      }
    },
    {
      scope: '/properties/hideWithBooleanAndConditional',
      label: "Hide with Boolean and conditional",
      type: 'Control',
      options: {
        control: 'hub-field-input-radio-group',
        helperText: "Conditionally show another field when 'option8' is selected"
      }
    },
    {
      scope: '/properties/hideWithBooleanAndOption8',
      label: "Hide with boolean and option 8",
      type: 'Control',
      options: {
        helperText: "This field is conditionally hidden when 'option8' is selected and when some outside boolean evaluates to true."
      },
      rule: {
        effect: 'HIDE',
        conditions: [
          {
            scope: '/properties/hideWithBooleanAndConditional',
            schema: { const: "option8" }
          },
          true,
        ]
      }
    }
  ]
};
export const RESET_RULE_SCHEMA = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "default": "This is the default name"
    },
    "booleanField": {
      "type": "boolean",
      "default": false
    }
  }
};
export const RESET_RULE_UI_SCHEMA = {
  "type": "Layout",
  "elements": [
    {
      "label": "Name",
      "scope": "/properties/name",
      "type": "Control"
    },
    {
      "label": "Boolean field",
      "scope": "/properties/booleanField",
      "type": "Control",
      "rules": [
        {
          "effect": "DISABLE",
          "conditions": [
            {
              "scope": "/properties/name",
              "schema": { "const": "no" }
            }
          ]
        },
        {
          "effect": "RESET",
          "conditions": [
            {
              "scope": "/properties/name",
              "schema": { "const": "no" }
            }
          ]
        }
      ]
    }
  ]
};
