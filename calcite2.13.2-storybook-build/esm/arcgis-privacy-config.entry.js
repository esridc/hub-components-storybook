import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import { P as PRIVACY_CONFIG_SCHEMA } from './subschemas-4d56570e.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { C as CONFIGURATION_VARIANTS } from './resources-3247991b.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { a as cloneObject } from './util-3e6872d9.js';
import './ProjectSchema-060a6b72.js';
import './MetricSchema-da66a5ad.js';
import './enums-783e40b4.js';
import './definitions-193d63f9.js';
import './HubItemEntitySchema-5c1f4677.js';
import './types-2eaa1a18.js';
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
import './index-213c70d0.js';
import './interpolate-d39d6151.js';
import './_commonjsHelpers-11ca3be1.js';
import './get-prop-ec5be510.js';

const SCHEMA = PRIVACY_CONFIG_SCHEMA.properties.consentNotice;
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
              effect: UiSchemaRuleEffects.SHOW,
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
    registerInstance(this, hostRef);
    this.hubPrivacyPreferencesConfigChanged = createEvent(this, "hubPrivacyPreferencesConfigChanged", 7);
    this._schema = cloneObject(SCHEMA);
    this.config = {};
    this.isLayoutEditor = false;
    bind(this, 'handleEditorChange', 'translationFunc');
  }
  configChanged(newConfig) {
    if (newConfig) {
      this._config = cloneObject(newConfig);
    }
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this._uiSchema = interpolateTranslations(this.intl, cloneObject(buildUiSchema()));
    this.configChanged(this.config);
  }
  handleEditorChange(evt) {
    const { values } = evt.detail;
    evt.stopPropagation();
    this._config = Object.assign(Object.assign({}, this._config), values);
    const consentNotice = cloneObject(this._config);
    this.hubPrivacyPreferencesConfigChanged.emit(consentNotice);
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  render() {
    return (h(Host, { "data-element": "privacy-preferences-config" }, h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this._config, variant: this.isLayoutEditor ? CONFIGURATION_VARIANTS.layoutEditor : undefined })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "config": ["configChanged"]
  }; }
};
ArcgisPrivacyConfig.style = arcgisPrivacyConfigCss;

export { ArcgisPrivacyConfig as arcgis_privacy_config };
