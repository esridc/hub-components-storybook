export const SUBTITLE = `The following harness shows variations of the simple list field (arcgis-hub-field-list):

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

const LIST_ITEMS = [
  {
    label: "Item 1",
    key: "item-0",
    hidden: false,
    numberConfig: {
      height: 100,
      width: 100
    }
  },
  {
    label: "Item 2",
    key: "item-2",
    hidden: false,
    numberConfig: {
      height: 200,
      width: 200
    }
  },
  {
    label: "Item 3",
    key: "item-3",
    hidden: true,
    numberConfig: {
      height: 300,
      width: 300
    }
  },
  {
    label: "Item 4",
    key: "item-4",
    hidden: false,
    numberConfig: {
      height: 400,
      width: 400
    }
  },
];

export const SCHEMA = {
  type: 'object',
  properties: {
    fullCapabilityList: {
      type: "array",
      items: {
        type: "object",
      }
    },
    displayList: {
      type: "array",
      items: {
        type: "object",
      }
    },
    dragList: {
      type: "array",
      items: {
        type: "object",
      }
    },
    visibilityList: {
      type: "array",
      items: {
        type: "object",
      }
    },
    editList: {
      type: "array",
      items: {
        type: "object",
      }
    },
    removeList: {
      type: "array",
      items: {
        type: "object",
      }
    },
    disableToggle: {
      type: "boolean",
      default: false
    },
    disabledList: {
      type: "array",
      items: {
        type: "object",
      }
    },
    editListWithCustomSchema: {
      type: "array",
      items: {
        type: "object"
      }
    },
    editListInFlow: {
      type: "array",
      items: {
        type: "object"
      }
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      label: 'Display List',
      type: 'Section',
      options: {
        "section": "card",
      },
      elements: [
        {
          scope: '/properties/displayList',
          type: 'Control',
          options: {
            control: 'hub-field-input-list',
            allowEdit: false,
            allowHide: false,
            allowReorder: false,
            allowRemove: false,
          }
        }
      ],
    },
    {
      label: 'Drag List',
      type: 'Section',
      options: {
        "section": "card",
      },
      elements: [
        {
          scope: '/properties/dragList',
          type: 'Control',
          options: {
            control: 'hub-field-input-list',
            allowEdit: false,
            allowHide: false,
            allowReorder: true,
            allowRemove: false,
          }
        }
      ],
    },
    {
      label: 'Visibility List',
      type: 'Section',
      options: {
        "section": "card",
      },
      elements: [
        {
          scope: '/properties/visibilityList',
          type: 'Control',
          options: {
            control: 'hub-field-input-list',
            allowEdit: false,
            allowHide: true,
            allowReorder: false,
            allowRemove: false,
          }
        }
      ],
    },
    {
      label: 'Edit List',
      type: 'Section',
      options: {
        "section": "card",
      },
      elements: [
        {
          scope: '/properties/editList',
          type: 'Control',
          options: {
            control: 'hub-field-input-list',
            allowEdit: true,
            maxLabelLength: 60,
            allowHide: false,
            allowReorder: false,
            allowRemove: false,
          }
        }
      ],
    },
    {
      label: 'Remove List',
      type: 'Section',
      options: {
        "section": "card",
      },
      elements: [
        {
          scope: '/properties/removeList',
          type: 'Control',
          options: {
            control: 'hub-field-input-list',
            allowEdit: false,
            allowHide: false,
            allowReorder: false,
            allowRemove: true,
          }
        }
      ],
    },

    {
      label: 'Disabled List',
      type: 'Section',
      options: {
        "section": "card",
      },
      elements: [
        {
          scope: "/properties/disableToggle",
          label: "Disable list below",
          type: "Control"
        },
        {
          scope: '/properties/disabledList',
          type: 'Control',
          options: {
            control: 'hub-field-input-list',
            allowEdit: false,
            allowHide: true,
            allowReorder: true,
            allowRemove: true,
          },
          rules: [
            {
              effect: "DISABLE",
              conditions: [
                {
                  scope: "/properties/disableToggle",
                  schema: {
                    "const": true
                  }
                }
              ]
            }
          ]
        }
      ],
    },
    {
      label: 'Full Capability List',
      type: 'Section',
      options: {
        "section": "card",
      },
      elements: [
        {
          scope: '/properties/fullCapabilityList',
          type: 'Control',
          options: {
            control: 'hub-field-input-list',
            allowEdit: true,
            maxLabelLength: 40,
            allowHide: true,
            allowReorder: true,
            allowRemove: true,
          }
        }
      ],
    },
    {
      label: 'Edit List with Custom Schema and edit prop',
      type: 'Section',
      options: {
        helperText: { label: "Note that because of the editProp = 'numberConfig', we save edited values in the 'numberConfig' property of the list item." },
        "section": "card",
      },
      elements: [
        {
          scope: '/properties/editListWithCustomSchema',
          type: 'Control',
          options: {
            control: 'hub-field-input-list',
            allowEdit: true,
            maxLabelLength: 40,
            allowHide: true,
            allowReorder: true,
            allowRemove: true,
            editProp: "numberConfig",
            editSchema: {
              type: 'object',
              properties: {
                height: {
                  type: "number",
                },
                width: {
                  type: "number",
                },
              }
            },
            editUiSchema: {
              type: 'Layout',
              elements: [
                {
                  label: 'Height',
                  type: 'Control',
                  scope: '/properties/height',
                  options: {
                    control: "hub-field-input-input",
                    type: "number"
                  }
                },
                {
                  label: 'Width',
                  type: 'Control',
                  scope: '/properties/width',
                  options: {
                    control: "hub-field-input-input",
                    type: "number"
                  }
                }
              ]
            }
          }
        }
      ],
    },
    {
      label: 'Edit List in Flow',
      type: 'Section',
      options: {
        "section": "card",
      },
      elements: [
        {
          scope: '/properties/editListInFlow',
          type: 'Control',
          options: {
            control: 'hub-field-input-list',
            allowEdit: true,
            maxLabelLength: 40,
            allowHide: true,
            allowReorder: true,
            allowRemove: true,
            editMode: "flow",
            flowTitle: "Edit List in Flow",
          }
        }
      ],
    }
  ]
};

export const VALUES = {
  fullCapabilityList: LIST_ITEMS,
  displayList: LIST_ITEMS,
  dragList: LIST_ITEMS,
  visibilityList: LIST_ITEMS,
  editList: LIST_ITEMS,
  removeList: LIST_ITEMS,
  disabledList: LIST_ITEMS,
  editListWithCustomSchema: LIST_ITEMS,
  editListInFlow: LIST_ITEMS,
}
