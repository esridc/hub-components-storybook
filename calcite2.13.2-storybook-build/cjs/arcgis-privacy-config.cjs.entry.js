'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const types = require('./types-60347c5c.js');
const subschemas = require('./subschemas-61a41e85.js');
const intlManager = require('./intl-manager-f0103583.js');
const resources = require('./resources-42021303.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const util = require('./util-38e73510.js');
require('./ProjectSchema-d1b6b7cf.js');
require('./MetricSchema-b212808d.js');
require('./enums-0160df9d.js');
require('./definitions-94c1da69.js');
require('./HubItemEntitySchema-62590777.js');
require('./types-097b54b1.js');
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
require('./index-f4a4c954.js');
require('./interpolate-c1fe951a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./get-prop-4bd8fc1a.js');

const SCHEMA = subschemas.PRIVACY_CONFIG_SCHEMA.properties.consentNotice;
const buildUiSchema = () => {
  return {
    type: 'Layout',
    elements: [
      {
        type: 'Section',
        scope: '/properties/allowPrivacyConfig',
        labelKey: 'allowPrivacyConfig.label',
        options: {
          section: 'subblock',
          toggleDisplay: 'switch',
        },
        elements: [
          {
            type: "Section",
            rule: {
              effect: types.UiSchemaRuleEffects.SHOW,
              condition: {
                scope: '/properties/allowPrivacyConfig',
                schema: { const: true }
              }
            },
            elements: [
              {
                type: 'Control',
                options: {
                  control: 'hub-field-input-tile-select',
                  labels: ['{{blocking.optional.label:translate}}', '{{blocking.required.label:translate}}'],
                  descriptions: ['{{blocking.optional.description:translate}}', '{{blocking.required.description:translate}}'],
                  type: 'radio',
                },
                labelKey: 'blocking.label',
                scope: '/properties/blocking'
              }
            ]
          }
        ]
      },
      {
        type: 'Section',
        labelKey: 'additionalInfo.label',
        options: {
          section: 'subblock',
          // helperText: {
          //   labelKey: 'additionalInfo.helperText',
          // }
        },
        elements: [
          {
            scope: '/properties/disclaimer/items/0/properties/text',
            labelKey: 'consentText.label',
            type: 'Control',
            options: {
              type: 'textarea',
              helperText: {
                labelKey: 'consentText.helperText',
              },
            },
          },
          {
            scope: '/properties/policyURL',
            labelKey: 'policyURL.label',
            type: 'Control',
            options: {
              helperText: {
                labelKey: 'policyURL.helperText'
              },
              messages: [
                {
                  type: 'ERROR',
                  keyword: 'pattern',
                  icon: true,
                  labelKey: 'policyURL.error'
                }
              ],
            }
          }
        ]
      }
    ]
  };
};

const arcgisPrivacyConfigCss = ":host{display:block}";

const ArcgisPrivacyConfig = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubPrivacyPreferencesConfigChanged = index.createEvent(this, "hubPrivacyPreferencesConfigChanged", 7);
    this._schema = util.cloneObject(SCHEMA);
    this.config = {};
    this.isLayoutEditor = false;
    context.bind(this, 'handleEditorChange', 'translationFunc');
  }
  configChanged(newConfig) {
    if (newConfig) {
      this._config = util.cloneObject(newConfig);
    }
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this._uiSchema = interpolateTranslations.interpolateTranslations(this.intl, util.cloneObject(buildUiSchema()));
    this.configChanged(this.config);
  }
  handleEditorChange(evt) {
    const { values } = evt.detail;
    evt.stopPropagation();
    this._config = Object.assign(Object.assign({}, this._config), values);
    const consentNotice = util.cloneObject(this._config);
    this.hubPrivacyPreferencesConfigChanged.emit(consentNotice);
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  render() {
    return (index.h(index.Host, { "data-element": "privacy-preferences-config" }, index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this._config, variant: this.isLayoutEditor ? resources.CONFIGURATION_VARIANTS.layoutEditor : undefined })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "config": ["configChanged"]
  }; }
};
ArcgisPrivacyConfig.style = arcgisPrivacyConfigCss;

exports.arcgis_privacy_config = ArcgisPrivacyConfig;
