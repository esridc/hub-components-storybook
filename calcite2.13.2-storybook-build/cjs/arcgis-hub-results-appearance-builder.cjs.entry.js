'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const types = require('./types-60347c5c.js');
const CatalogSchema = require('./CatalogSchema-d9a0c750.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./ProjectSchema-d1b6b7cf.js');
require('./MetricSchema-b212808d.js');
require('./enums-0160df9d.js');
require('./definitions-94c1da69.js');
require('./HubItemEntitySchema-62590777.js');
require('./types-097b54b1.js');
require('./subschemas-61a41e85.js');
require('./InitiativeSchema-5a0a1956.js');
require('./SiteSchema-85074143.js');
require('./DiscussionSchema-24407ed6.js');
require('./PageSchema-f15eb977.js');
require('./ContentSchema-92224d5f.js');
require('./TemplateSchema-d46d6f3b.js');
require('./GroupSchema-e21948a6.js');
require('./InitiativeTemplateSchema-c5d2cb31.js');
require('./SurveySchema-9ec907b6.js');
require('./EventSchemaCreate-bf05e6ea.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./types-751ad3a9.js');
require('./validations-121c30e3.js');
require('./UserSchema-5e3cafa7.js');

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
              effect: types.UiSchemaRuleEffects.SHOW,
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
              effect: types.UiSchemaRuleEffects.SHOW,
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
    index.registerInstance(this, hostRef);
    this.arcgisHubResultsAppearanceBuilderChange = index.createEvent(this, "arcgisHubResultsAppearanceBuilderChange", 7);
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
    this._intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Returns the schema for the results appearance builder
   */
  get _schema() {
    return CatalogSchema.GalleryDisplayConfigSchema;
  }
  ;
  /**
   * Returns the uiSchema for the results appearance builder
   */
  get _uiSchema() {
    return getResultsAppearanceBuilderUiSchema();
  }
  render() {
    return (index.h(index.Host, { "data-element": "results-appearance-builder" }, index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleResultsAppearanceBuilderChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this.displayConfig })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};

exports.arcgis_hub_results_appearance_builder = ArcgisHubResultsAppearanceBuilder;
