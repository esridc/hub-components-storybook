import { EXTENT, LOCATION_PICKER_OPTIONS, CATALOGS, FACETS } from '../fixtures.js';

export const SUBTITLE = `The following harness demonstrates the basic functionality of all our supported fields. These fields can be mixed and matched to create any number of unique editing experiences. For a more in-depth exploration of any given field, go to the "Configuration Editor Fields" harness in the suite.

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of editing experience.`;

export const SCHEMA = {
  type: 'object',
  properties: {
    input: {
      type: 'string',
      default: 'This is a default input'
    },
    numberInput: {
      type: 'number',
    },
    textArea: {
      type: 'string',
      default: 'This is a default text area input'
    },
    richText: {
      type: 'string',
      default: 'This is a default rich text input'
    },
    select: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
      default: 'pie'
    },
    multiselect: {
      type: 'array',
      default: [ 'default option' ]
    },
    combobox: {
      type: "array",
      items: {
        type: "string",
        enum: ["tag1", "tag2", "tag3", "tag4"],
      },
      maxItems: 3,
      default: [ "tag2" ]
    },
    color: {
      type: 'string',
      default: '#f40afc'
    },
    date: {
      type: 'string',
      format: 'date',
      default: "2023-06-21"
    },
    datePicker: {
      type: 'string',
      format: 'date',
      default: "2023-06-21"
    },
    dateTimePicker: {
      type: 'string',
      format: 'date',
      default: "2023-06-21T13:45:00Z"
    },
    timePicker: {
      type: 'string',
      format: "timePickerTime",
      default: "13:45:00"
    },
    timeZonePicker: {
      type: 'string',
      default: "Asia/Tokyo"
    },
    switch: {
      type: 'boolean',
      default: true
    },
    radio: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
      default: 'pie'
    },
    radioGroup: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
      default: 'pie'
    },
    checkboxGroup: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['private', 'org', 'public'],
      },
      default: [],
    },
    tileSelect: {
      type: 'string',
      enum: ['histogram', 'pie', 'scatter'],
      default: 'pie'
    },
    alignment: {
      type: 'string',
      default: 'start',
      enum: [ 'start', 'center', 'end' ]
    },
    location: {
      type: 'object'
    },
    imagePicker: {
      type: 'object'
    },
    galleryPicker: {
      type: "array",
      maxItems: 3,
      items: {
        type: "string",
      },
      default: ["c1a3ea9d4518498795206c1b4ec3ce48"]
    },
    access: {
      type: "string",
      enum: ["public", "org", "private"],
      default: "private"
    },
    timeline: {
      type: 'object'
    },
    serviceQueryMetric: {
      type: 'object'
    },
    expressionSet: {
      type: 'array',
    },
    schedule: {
      type: 'object',
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      type: 'Section',
      label: 'Basic Fields',
      elements: [
        {
          labelKey: 'input',
          scope: '/properties/input',
          type: 'Control',
          options: {
            control: 'hub-field-input-input', // optional - we default to this control for type="string"
          }
        },
        {
          labelKey: 'numberInput',
          scope: '/properties/numberInput',
          type: 'Control',
          options: {
            control: 'hub-field-input-input',
            type: 'number'
          },
        },
        {
          labelKey: 'textArea',
          scope: '/properties/textArea',
          type: 'Control',
          options: {
            control: 'hub-field-input-input', // optional - we default to this control for type="string"
            type: 'textarea',
          }
        },
        {
          labelKey: 'richText',
          scope: '/properties/richText',
          type: 'Control',
          options: {
            control: 'hub-field-input-rich-text',
          }
        },
        {
          labelKey: 'select.label',
          scope: '/properties/select',
          type: 'Control',
          options: {
            control: 'hub-field-input-select',
            enum: {
              i18nScope: 'select.enum'
            },
          }
        },
        {
          labelKey: 'multiselect',
          scope: '/properties/multiselect',
          type: 'Control',
          options: {
            control: 'hub-field-input-multiselect', // optional - we default to this control for type="array"
          }
        },
        {
          labelKey: 'combobox.label',
          scope: '/properties/combobox',
          type: 'Control',
          options: {
            control: 'hub-field-input-combobox',
            items: [
              { value: "tag1", label: "Tag 1", icon: 'analysis' },
              { value: "tag2", label: "Tag 2", icon: 'globe' },
              { value: "tag3", label: "Tag 3" },
              { value: "tag4", label: "Tag 4" },
            ],
            allowCustomValues: true,
            selectionMode: 'multiple'
          }
        },
        {
          labelKey: 'color',
          scope: '/properties/color',
          type: 'Control',
          options: {
            control: 'hub-field-input-color',
            savedColors: ['#f40afc', '#fcaf0a', '#0a8cfc', '#fc0a85']
          }
        },
        {
          labelKey: 'date',
          scope: '/properties/date',
          type: 'Control',
          options: {
            control: 'hub-field-input-input' // optional - we default to this control for type="string"
          }
        },
        {
          labelKey: 'datePicker',
          scope: '/properties/datePicker',
          type: 'Control',
          options: {
            control: 'hub-field-input-date'
          }
        },
        {
          labelKey: 'dateTimePicker',
          scope: '/properties/dateTimePicker',
          type: 'Control',
          options: {
            control: 'hub-field-input-date-time'
          }
        },
        {
          labelKey: 'timePicker',
          scope: '/properties/timePicker',
          type: 'Control',
          options: {
            control: 'hub-field-input-time'
          }
        },
        {
          labelKey: 'timeZonePicker',
          scope: '/properties/timeZonePicker',
          type: 'Control',
          options: {
            control: 'hub-field-input-time-zone'
          }
        },
        {
          labelKey: 'switch',
          scope: '/properties/switch',
          type: 'Control',
          options: {
            control: 'hub-field-input-switch' // optional - we default to this control for type="boolean"
          }
        },
        {
          labelKey: 'radio.label',
          scope: '/properties/radio',
          type: 'Control',
          options: {
            control: 'hub-field-input-radio',
            icons: [ "graph-histogram", 'pie-chart', 'graph-scatter-plot' ],
            enum: { i18nScope: 'radio.enum' }
            /**
             * NOTE: you could also configure translated labels/descriptions in the following way:
             * labels: [ "label 1", "label 2", "lable 3" ],
             * descriptions: [ "description 1", "description 2", "description 3" ],
             **/
          }
        },
        {
          labelKey: 'radioGroup.label',
          scope: '/properties/radioGroup',
          type: 'Control',
          options: {
            control: 'hub-field-input-radio-group',
            enum: {
              i18nScope: 'radioGroup.enum'
            },
            icons: [ "graph-histogram", 'pie-chart', 'graph-scatter-plot' ]
          }
        },
        {
          labelKey: 'checkboxGroup.label',
          scope: '/properties/checkboxGroup',
          type: 'Control',
          options: {
            control: 'hub-field-input-checkbox-group',
            enum: {
              i18nScope: 'checkboxGroup.enum'
            },
          }
        },
        {
          labelKey: 'tileSelect.label',
          scope: '/properties/tileSelect',
          type: 'Control',
          options: {
            control: 'hub-field-input-tile-select',
            enum: {
              i18nScope: 'tileSelect.enum',
            },
            icons: [ "graph-histogram", 'pie-chart', 'graph-scatter-plot' ]
          }
        },
        {
          labelKey: 'alignment',
          scope: '/properties/alignment',
          type: 'Control',
          options: {
            control: 'hub-field-input-alignment'
          }
        },
        {
          labelKey: 'location.label',
          scope: '/properties/location',
          type: 'Control',
          options: {
            control: 'hub-field-input-location-picker',
            extent: EXTENT,
            options: LOCATION_PICKER_OPTIONS
          }
        },
        {
          labelKey: 'imagePicker.label',
          scope: '/properties/imagePicker',
          type: 'Control',
          options: {
            control: 'hub-field-input-image-picker',
            sizeDescription: {
              label: "Recommended size: 1200 x 630 pixels"
            }
          }
        },
        {
          labelKey: 'galleryPicker.label',
          scope: '/properties/galleryPicker',
          type: 'Control',
          options: {
            control: 'hub-field-input-gallery-picker',
            targetEntity: 'item',
            catalogs: CATALOGS,
            facets: FACETS
          }
        },
        {
          label: 'Scheduler Input',
          scope: '/properties/schedule',
          type: 'Control',
          options: {
            control: 'hub-field-input-scheduler',
            format: 'radio',
          }
        }
      ]
    },
    {
      type: 'Section',
      label: 'Composite Fields',
      options: {
        helperText: {
          label: 'Composite fields are fields that render an instance of the configuration editor themselves. They can be leveraged in your editor just like any of the basic fields.'
        }
      },
      elements: [
        {
          scope: "/properties/access",
          label: 'Access Field',
          type: "Control",
          options: {
            control: "arcgis-hub-access-level-controls",
            itemType: "project",
            orgName: "QA Premium Alpha Hub"
          },
        },
        {
          scope: '/properties/timeline',
          label: 'Timeline Editor Field',
          type: 'Control',
          options: {
            control: 'arcgis-hub-timeline-editor'
          }
        },
        {
          scope: '/properties/serviceQueryMetric',
          label: "Service Query Metric",
          type: "Control",
          options: {
            control: 'hub-composite-input-service-query-metric',
          }
        },
        {
          scope: '/properties/expressionSet',
          label: 'Expression Set',
          type: 'Control',
          options: {
            control: 'hub-composite-input-expression-set',
            fields: [
              {
                name: "category",
                type: "esriFieldTypeString"
              },
              {
                name: "amount",
                type: "esriFieldTypeDouble",
              },
              {
                name: "date",
                type: "esriFieldTypeDate",
              },
              {
                name: "guid",
                type: "esriFieldTypeGUID"
              }
            ]
          }
        }
      ]
    }
  ]
};

export const VALUES = {
  input: 'this is an input',
  textArea: 'this is a text area input',
  select: 'scatter',
  richText: 'this is a rich text input',
  multiselect: ['tree', 'street'],
  combobox: ['tag1'],
  color: '#fcaf0a',
  date: "2023-01-01",
  datePicker: "2023-01-01",
  switch: true,
  radio: 'scatter',
  radioGroup: 'scatter',
  tileSelect: 'scatter',
  alignment: 'end',
  galleryPicker: ["8ad3bc3ac7af446bb69bb0b38ba93f41", "a3ace68c29d847f2bda6f85c60744a9d"],
  access: 'org',
  timeline: {
    title:"This is a timeline title",
    description:"This is a timeline description",
    stages: [
      {
        title: "Stage 1 of the project",
        timeframe: "Next month",
        stageDescription: "It is important that we do this now, in terms of one thing and another",
        key: "stage123",
        status: "notStarted"
      }
    ]
  },
  schedule: {
    mode: "automatic"
  }
};

export const TRANSLATIONS = {
  input: "Simple Text Field",
  numberInput: "Simple Number Field",
  textArea: "Simple Text Area Field",
  richText: "Rich Text Field",
  multiselect: "Multi-Select Field",
  color: "Color Picker Field",
  date: "Simple Date Input Field",
  datePicker: "Date Picker Field",
  switch: "Switch Field",
  alignment: "Alignment Field",
  select: {
    label: "Dropdown Select Field",
    enum: {
      histogram: {
        label: "Histogram",
      },
      pie: {
        label: "Pie Chart"
      },
      scatter: {
        label: "Scatter Plot"
      }
    }
  },
  radio: {
    label: "Radio Button Field",
    enum: {
      histogram: {
        label: "Histogram",
        description: "select a histogram"
      },
      pie: {
        label: "Pie Chart",
        description: "select a pie chart"
      },
      scatter: {
        label: "Scatter Plot",
        description: "select a scatter plot"
      }
    }
  },
  radioGroup: {
    label: "Radio Group Field",
    enum: {
      histogram: {
        label: "Histogram",
      },
      pie: {
        label: "Pie Chart"
      },
      scatter: {
        label: "Scatter Plot"
      }
    }
  },
  checkboxGroup: {
    label: "Checkbox Group Field",
    enum: {
      private: {
        label: "Private",
      },
      org: {
        label: "Organization",
      },
      public: {
        label: "Public",
      },
    }
  },
  tileSelect: {
    label: "Tile Select Field",
    enum: {
      histogram: {
        label: "Histogram",
      },
      pie: {
        label: "Pie Chart"
      },
      scatter: {
        label: "Scatter Plot"
      }
    }
  },
  combobox: {
    label: "Combobox Field"
  },
  location: {
    label: "Location Field",
  },
  imagePicker: {
    label: "Image Picker Field",
  },
  galleryPicker: {
    label: "Gallery Picker Field"
  }
}
