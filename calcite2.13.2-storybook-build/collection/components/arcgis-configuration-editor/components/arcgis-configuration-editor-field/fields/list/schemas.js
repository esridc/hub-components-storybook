/**
 * Returns the default schema for editing a list item.
 * @param options
 * @returns
 */
export const getDefaultEditSchema = (options) => {
  const { maxLabelLength } = options;
  const labelOptions = {};
  if (maxLabelLength) {
    labelOptions.maxLength = maxLabelLength;
  }
  return {
    type: "object",
    required: ["label"],
    properties: {
      label: Object.assign({ type: "string" }, labelOptions),
    }
  };
};
/**
 * Returns the default uiSchema for editing a list item.
 * @param options
 * @returns
 */
export const getDefaultEditUiSchema = (options) => {
  const { maxLabelLength, intl } = options;
  return {
    type: "Layout",
    elements: [
      {
        labelKey: "itemEditModal.fields.label.label",
        scope: "/properties/label",
        type: "Control",
        options: {
          messages: [
            {
              type: "ERROR",
              keyword: "required",
              icon: true,
              labelKey: "itemEditModal.fields.label.requiredMessage",
            },
            {
              type: "ERROR",
              keyword: "maxLength",
              icon: true,
              labelKey: intl.t("itemEditModal.fields.label.maxLengthMessage", { maxLength: maxLabelLength }),
            }
          ]
        }
      },
    ]
  };
};
export const EDIT_UI_SCHEMA = {
  type: "Layout",
  elements: [
    {
      labelKey: "itemEditModal.fields.label.label",
      scope: "/properties/label",
      type: "Control",
      options: {
        messages: [
          {
            type: "ERROR",
            keyword: "required",
            icon: true,
            labelKey: "itemEditModal.fields.label.requiredMessage"
          }
        ]
      }
    },
  ]
};
