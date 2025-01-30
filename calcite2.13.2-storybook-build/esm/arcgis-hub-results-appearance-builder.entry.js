import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import { G as GalleryDisplayConfigSchema } from './CatalogSchema-e8481cdb.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './ProjectSchema-060a6b72.js';
import './MetricSchema-da66a5ad.js';
import './enums-783e40b4.js';
import './definitions-193d63f9.js';
import './HubItemEntitySchema-5c1f4677.js';
import './types-2eaa1a18.js';
import './subschemas-4d56570e.js';
import './InitiativeSchema-4fb31f85.js';
import './SiteSchema-3e282ce1.js';
import './DiscussionSchema-6e5016d0.js';
import './PageSchema-4cbe3bd9.js';
import './ContentSchema-d913d8e9.js';
import './TemplateSchema-83e65297.js';
import './GroupSchema-13ff9290.js';
import './InitiativeTemplateSchema-bf5d8531.js';
import './SurveySchema-0fcb1d64.js';
import './EventSchemaCreate-2f6ba245.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './types-db540898.js';
import './validations-3d61466c.js';
import './UserSchema-abc4f738.js';

/**
 * UiSchema for the results appearance builder
 */
const getResultsAppearanceBuilderUiSchema = () => {
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

const ArcgisHubResultsAppearanceBuilder = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubResultsAppearanceBuilderChange = createEvent(this, "arcgisHubResultsAppearanceBuilderChange", 7);
    this.translationFunc = (key, values, opts) => {
      return this._intl.t(key, values, opts);
    };
    /**
     * Event handler for when the results appearance configuration editor changes
     */
    this.handleResultsAppearanceBuilderChange = (event) => {
      this.arcgisHubResultsAppearanceBuilderChange.emit(event.detail);
    };
    this.displayConfig = undefined;
  }
  async componentWillLoad() {
    this._intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Returns the schema for the results appearance builder
   */
  get _schema() {
    return GalleryDisplayConfigSchema;
  }
  ;
  /**
   * Returns the uiSchema for the results appearance builder
   */
  get _uiSchema() {
    return getResultsAppearanceBuilderUiSchema();
  }
  render() {
    return (h(Host, { "data-element": "results-appearance-builder" }, h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleResultsAppearanceBuilderChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this.displayConfig })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};

export { ArcgisHubResultsAppearanceBuilder as arcgis_hub_results_appearance_builder };
