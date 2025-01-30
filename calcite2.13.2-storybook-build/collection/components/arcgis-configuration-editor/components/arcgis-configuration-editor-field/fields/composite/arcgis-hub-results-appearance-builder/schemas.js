import { UiSchemaRuleEffects } from "@esri/hub-common";
/**
 * UiSchema for the results appearance builder
 */
export const getResultsAppearanceBuilderUiSchema = () => {
  return {
    type: "Layout",
    elements: [
      {
        type: "Section",
        labelKey: "layout.title",
        options: {
          section: "block",
          helperText: {
            labelKey: "layout.helperText"
          }
        },
        elements: [
          {
            type: "Control",
            scope: "/properties/layout",
            options: {
              control: "hub-field-input-tile-select",
              enum: {
                i18nScope: "layout.enum",
              }
            }
          }
        ]
      },
      {
        type: "Section",
        labelKey: "cards.title",
        options: {
          section: "block",
        },
        elements: [
          {
            labelKey: "cards.cardTitleTag.label",
            type: "Control",
            scope: "/properties/cardTitleTag",
            options: {
              control: "hub-field-input-radio-group",
              helperText: {
                labelKey: "cards.cardTitleTag.helperText"
              },
              enum: {
                i18nScope: "cards.cardTitleTag.enum",
              }
            }
          },
          {
            labelKey: "cards.showThumbnail.label",
            type: "Control",
            scope: "/properties/showThumbnail",
            options: {
              control: "hub-field-input-tile-select",
              enum: {
                i18nScope: "cards.showThumbnail.enum",
              }
            }
          },
          {
            labelKey: "cards.corners.label",
            type: "Control",
            scope: "/properties/corners",
            options: {
              control: "hub-field-input-select",
              enum: {
                i18nScope: "cards.corners.enum",
              },
            }
          },
          {
            labelKey: "cards.shadow.label",
            type: "Control",
            scope: "/properties/shadow",
            options: {
              control: "hub-field-input-select",
              enum: {
                i18nScope: "cards.shadow.enum",
              },
            }
          },
          {
            labelKey: "cards.showLinkButton.label",
            type: "Control",
            scope: "/properties/showLinkButton",
            options: {
              control: "hub-field-input-switch",
              layout: "inline-space-between",
              helperText: {
                labelKey: "cards.showLinkButton.helperText",
              },
            }
          },
          {
            labelKey: "cards.linkButtonStyle.label",
            type: "Control",
            scope: "/properties/linkButtonStyle",
            rule: {
              effect: UiSchemaRuleEffects.SHOW,
              condition: {
                scope: "/properties/showLinkButton",
                schema: { const: true },
              },
            },
            options: {
              control: "hub-field-input-select",
              enum: {
                i18nScope: "cards.linkButtonStyle.enum",
              },
            }
          },
          {
            labelKey: "cards.linkButtonText.label",
            type: "Control",
            scope: "/properties/linkButtonText",
            rule: {
              effect: UiSchemaRuleEffects.SHOW,
              condition: {
                scope: "/properties/showLinkButton",
                schema: { const: true },
              },
            },
            options: {
              control: "hub-field-input-input",
              value: {
                labelkey: "cards.linkButtonText.value",
              }
            }
          }
        ]
      }
    ]
  };
};
