import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { n as parseHubUrl } from './urls-0e36649d.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './request-fa80ae40.js';
import './helpers-8c7e5e31.js';
import './getTypeFromEntity-e149b61e.js';
import './logger-f8667200.js';

const MAX_SUBDOMAIN_LENGTH = 63;
function getMaxLength(orgUrlKey) {
  return orgUrlKey ? MAX_SUBDOMAIN_LENGTH - (orgUrlKey.length + 1) : MAX_SUBDOMAIN_LENGTH;
}
const buildSiteUrlEditorSchema = (opts) => {
  const { orgUrlKey, envSuffix = '' } = opts || {};
  const maxLength = getMaxLength(orgUrlKey);
  return {
    type: "object",
    required: [
      "subdomain"
    ],
    properties: {
      subdomain: {
        type: "string",
        // NOTE: this throws a type error w/o any
        format: "slug",
        maxLength
      },
      hubDomain: {
        type: "string",
        enum: [
          `hub${envSuffix}.arcgis.com`,
          `opendata${envSuffix}.arcgis.com`
        ],
      }
    }
  };
};
const buildSiteUrlEditorUiSchema = (opts) => {
  const { orgUrlKey } = opts || {};
  const suffixText = orgUrlKey ? `-${orgUrlKey}.` : undefined;
  return {
    type: "Layout",
    elements: [
      {
        labelKey: "subdomain",
        scope: "/properties/subdomain",
        type: "Control",
        options: {
          control: "hub-field-input-input",
          messages: [
            {
              type: "ERROR",
              keyword: "format",
              icon: true,
              labelKey: "subdomainFormatError"
            },
            {
              type: "ERROR",
              keyword: "required",
              icon: true,
              labelKey: "subdomainRequiredError"
            }
          ],
          suffixText
        }
      },
      {
        labelKey: "baseDomain",
        scope: "/properties/hubDomain",
        type: "Control",
        options: {
          control: "hub-field-input-select"
        }
      }
    ]
  };
};

// may want to move this to a util (or hub-common?)
/**
 * build a hub site hostname from an orgUrlKey and options
 * @param orgUrlKey
 * @param opts
 * @returns
 */
const buildHubSiteHostname = (orgUrlKey, options) => {
  const { hubDomain = 'hub.arcgis.com', subdomain } = options || {};
  const hubHomeHostname = `${orgUrlKey}.${hubDomain}`;
  return (subdomain
    ? `${subdomain}-${hubHomeHostname}`
    : hubHomeHostname).toLowerCase();
};
/**
 * get hub domain from context
 * @param context
 * @returns
 */
const getHubDomain = (context) => {
  // get the base hostname from the context
  return new URL(context.hubUrl).hostname;
};
const hostnameToUrl = (hostname) => `https://${hostname}`;
const SiteUrl = class {
  // lifecycle methods
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisCompositeSiteUrlFieldChange = createEvent(this, "arcgisCompositeSiteUrlFieldChange", 7);
    /**
     * encapsulates the translation strings from this
     * component to pass into the configuration editor
     */
    /* istanbul ignore next wrapper around the built-in intl.t */
    this._translationFunc = (key, values, opts) => {
      return this._intl.t(key, values, opts);
    };
    this.urlInfo = undefined;
    this.orgUrlKey = undefined;
    this.params = undefined;
    bind(this, 'handleInternalEditorChangeEvent');
  }
  /**
   * Contextual auth & portal information
   */
  get _context() {
    return getGlobalContext();
  }
  // the supplied org urlKey w/ a fallback to the user's org's urlKey
  // NOTE: What if site is from a different org than the user?
  get _orgUrlKey() {
    var _a, _b;
    return (_b = (this.orgUrlKey || ((_a = this._context.portal) === null || _a === void 0 ? void 0 : _a.urlKey))) === null || _b === void 0 ? void 0 : _b.toLowerCase();
  }
  // lower-cased user supplied hostname w/ a fallback
  // to one derived from the org's home site
  // NOTE: fallback will **not** have a subdomain
  get _hubSiteHostname() {
    var _a;
    return (((_a = this.urlInfo) === null || _a === void 0 ? void 0 : _a.defaultHostname)
      || buildHubSiteHostname(this._orgUrlKey, { hubDomain: getHubDomain(this._context) })).toLowerCase();
  }
  // the following getters are not private for testing purposes
  get _schema() {
    const { envSuffix } = parseHubUrl(this._hubSiteHostname);
    return buildSiteUrlEditorSchema({
      orgUrlKey: this._orgUrlKey,
      envSuffix
    });
  }
  get _uiSchema() {
    return buildSiteUrlEditorUiSchema({ orgUrlKey: this._orgUrlKey });
  }
  get _values() {
    var _a;
    const subdomain = (_a = this.urlInfo) === null || _a === void 0 ? void 0 : _a.subdomain;
    const { hubDomain } = parseHubUrl(this._hubSiteHostname);
    return { subdomain, hubDomain };
  }
  get _urlPreview() {
    return hostnameToUrl(this._hubSiteHostname);
  }
  async componentWillLoad() {
    this._intl = await intlManager.loadIntlForComponent(this.element);
  }
  // event handlers
  /**
   * Handles the internal change event from the configuration editor
   * @param event
   */
  handleInternalEditorChangeEvent(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const { values } = event.detail;
    const { subdomain, hubDomain } = values;
    const defaultHostname = buildHubSiteHostname(this._orgUrlKey, { hubDomain, subdomain });
    this.arcgisCompositeSiteUrlFieldChange.emit({ url: hostnameToUrl(defaultHostname), subdomain, defaultHostname });
  }
  // render methods
  render() {
    var _a, _b, _c;
    return (h(Host, { "data-element": "site-url-field" }, h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleInternalEditorChangeEvent, scale: (_a = this.params) === null || _a === void 0 ? void 0 : _a.scale, schema: this._schema, t: this._translationFunc, uiSchema: this._uiSchema, values: this._values }), h("calcite-label", { alignment: "start", scale: (_b = this.params) === null || _b === void 0 ? void 0 : _b.scale }, this._intl.t('urlPreview'), h("calcite-input", { disabled: true, scale: (_c = this.params) === null || _c === void 0 ? void 0 : _c.scale, value: this._urlPreview }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};

export { SiteUrl as hub_composite_input_site_url };
