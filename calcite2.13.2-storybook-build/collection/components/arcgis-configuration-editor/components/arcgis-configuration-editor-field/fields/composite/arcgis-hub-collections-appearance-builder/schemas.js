export const COLLECTIONS_APPEARANCE_BUILDER_SCHEMA = {
  type: "object",
  properties: {
    sort: {
      type: "string",
      enum: ["relevance", "title", "created", "modified"]
    },
    filters: {
      type: "array",
      items: {
        type: "object",
        // TODO: fill in schema for creating new filters
      }
    }
  }
};
export const getCollectionsAppearanceBuilderUiSchema = (options) => {
  const { intl } = options;
  return {
    type: "Layout",
    elements: [
      {
        type: "Section",
        label: intl.t("sort.label"),
        options: {
          section: "block",
          open: true,
        },
        elements: [
          {
            scope: "/properties/sort",
            type: "Control",
            options: {
              helperText: { label: intl.t("sort.helperText") },
              control: "hub-field-input-tile-select",
              labels: [intl.t("sort.relevance.label"), intl.t("sort.title.label"), intl.t("sort.created.label"), intl.t("sort.modified.label")],
              type: "radio",
            }
          },
        ],
      },
      {
        type: "Section",
        label: intl.t("filters.label"),
        options: {
          section: "block",
          open: true
        },
        elements: [
          {
            scope: "/properties/filters",
            type: "Control",
            options: {
              control: "hub-field-input-list",
              // TODO: fill in all of the uiSchema options for new filters
            }
          }
        ]
      }
    ]
  };
};
