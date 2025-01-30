export const SUBTITLE = `The following harness shows variations of the combobox field (arcgis-hub-field-combobox):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

const FORMATTED_ITEMS = [
  {
    value: 'tag1',
    label: 'Tag 1',
    icon: 'analysis'
  },
  {
    value: 'tag2',
    label: 'Tag 2',
    icon: 'arcgis-online'
  },
  {
    value: 'tag3',
    label: 'Tag 3',
    icon: 'portal'
  }
]

const FORMATTED_ITEMS_WITH_CHILDREN = [
  {
    value: 'tag1',
    label: 'Tag 1',
    icon: 'analysis',
    children: [
      {
        value: 'tag1-1',
        label: 'Tag 1-1',
        icon: 'analysis'
      },
      {
        value: 'tag1-2',
        label: 'Tag 1-2',
        icon: 'arcgis-online'
      }
    ]
  },
  {
    value: 'tag2',
    label: 'Tag 2',
    icon: 'arcgis-online',
    children: [
      {
        value: 'tag2-1',
        label: 'Tag 2-1',
        icon: 'analysis'
      },
      {
        value: 'tag2-2',
        label: 'Tag 2-2',
        icon: 'arcgis-online'
      }
    ]
  },
  {
    value: 'tag3',
    label: 'Tag 3',
    icon: 'portal',
    children: [
      {
        value: 'tag3-1',
        label: 'Tag 3-1',
        icon: 'analysis',
        children: [
          {
            value: 'tag3-1-1',
            label: 'Tag 3-1-1',
            icon: 'analysis'
          },
          {
            value: 'tag3-1-2',
            label: 'Tag 3-1-2',
            icon: 'arcgis-online'
          }
        ]
      },
      {
        value: 'tag3-2',
        label: 'Tag 3-2',
        icon: 'arcgis-online'
      }
    ]
  }
]

export const SCHEMA = {
  type: 'object',
  required: ["requiredCombobox"],
  properties: {
    basicCombobox: {
      type: "array",
      items: {
        type: "string",
        enum: [ "option1", "option2", "option3" ],
      }
    },
    formattedComboboxItems: {
      type: "array",
      items: {
        type: "string",
      }
    },
    comboboxWithPlaceholders: {
      type: "array",
      items: {
        type: "string",
      }
    },
    allowCustomInputsCombobox: {
      type: "array",
      items: {
        type: "string",
      }
    },
    comboboxWithDefault: {
      type: "array",
      items: {
        type: "string",
      },
      default: [ 'tag1', 'tag2' ]
    },
    comboboxWithMax: {
      type: "array",
      items: {
        type: "string",
      },
      maxItems: 2
    },
    singleSelectCombobox: {
      type: 'string',
    },
    requiredCombobox: {
      type: 'string',
    },
    comboboxWithTooltip: {
      type: 'string'
    },
    comboboxWithChildren: {
      type: "array",
      items: {
        type: "string"
      }
    },
    comboboxWithChildrenInAncestorsMode: {
      type: "array",
      items: {
        type: "string"
      }
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Basic combobox',
      scope: '/properties/basicCombobox',
      type: 'Control',
      options: {
        control: 'hub-field-input-combobox'
      }
    },
    {
      label: 'Combobox with formatted items',
      scope: '/properties/formattedComboboxItems',
      type: 'Control',
      options: {
        control: 'hub-field-input-combobox',
        items: FORMATTED_ITEMS
      }
    },
    {
      label: 'Combobox with placeholder text + icon',
      scope: '/properties/comboboxWithPlaceholders',
      type: 'Control',
      options: {
        control: 'hub-field-input-combobox',
        items: FORMATTED_ITEMS,
        placeholder: 'This is some placeholder text',
        placeholderIcon: 'label'
      }
    },
    {
      label: 'Combobox where custom inputs are allowed',
      scope: '/properties/allowCustomInputsCombobox',
      type: 'Control',
      options: {
        control: 'hub-field-input-combobox',
        items: FORMATTED_ITEMS,
        allowCustomValues: true,
        helperText: {
          label: 'type an input that isn\'t an option in the combobox dropdown and click enter'
        }
      }
    },
    {
      label: 'Combobox with a default selection',
      scope: '/properties/comboboxWithDefault',
      type: 'Control',
      options: {
        control: 'hub-field-input-combobox',
        items: FORMATTED_ITEMS
      }
    },
    {
      label: 'Combobox with max items',
      scope: '/properties/comboboxWithMax',
      type: 'Control',
      options: {
        control: 'hub-field-input-combobox',
        items: FORMATTED_ITEMS,
        helperText: {
          label: 'select more than the designated max (2) to see an error'
        }
      }
    },
    {
      label: 'Single-select combobox',
      scope: '/properties/singleSelectCombobox',
      type: 'Control',
      options: {
        control: 'hub-field-input-combobox',
        items: FORMATTED_ITEMS,
        selectionMode: 'single'
      }
    },
    {
      label: 'Required combobox',
      scope: '/properties/requiredCombobox',
      type: 'Control',
      options: {
        control: 'hub-field-input-combobox',
        items: FORMATTED_ITEMS,
        helperText: {
          label: "Enter a value and then remove it to see the custom error message"
        },
        messages: [
          {
            type: "ERROR",
            keyword: "required",
            icon: true,
            label: "This field is required"
          }
        ]
      }
    },
    {
      label: 'Combobox picker with a tooltip',
      scope: '/properties/comboboxWithTooltip',
      type: 'Control',
      options: {
        control: 'hub-field-input-combobox',
        items: FORMATTED_ITEMS,
        tooltip: {
          label: 'This is tooltip text'
        }
      }
    },
    {
      label: 'Combobox with children in multiple mode',
      helperText: { label: 'Note that when a child is selected, the parent is not selected automatically, due to it being "multiple" selection mode' },
      scope: '/properties/comboboxWithChildren',
      type: 'Control',
      options: {
        control: 'hub-field-input-combobox',
        items: FORMATTED_ITEMS_WITH_CHILDREN,
        selectionMode: "multiple"
      }
    },
    {
      label: 'Combobox with children in ancestors mode',
      helperText: { label: 'Note that when a child is selected, the parent is selected automatically, due to it being "ancestors" selection mode' },
      scope: '/properties/comboboxWithChildrenInAncestorsMode',
      type: 'Control',
      options: {
        control: 'hub-field-input-combobox',
        items: FORMATTED_ITEMS_WITH_CHILDREN,
        selectionMode: "ancestors"
      }
    }
  ]
};

export const VALUES = {
  comboboxWithMax: [ 'tag1', 'tag2', 'tag3' ]
}
