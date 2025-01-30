'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const intlManager = require('./intl-manager-f0103583.js');
const state = require('./state-6637df8c.js');
const urls = require('./urls-2533c98f.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./request-67da3c71.js');
require('./helpers-64227739.js');
require('./getTypeFromEntity-9476954e.js');
require('./logger-5db3d659.js');

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
    index.registerInstance(this, hostRef);
    this.arcgisCompositeSiteUrlFieldChange = index.createEvent(this, "arcgisCompositeSiteUrlFieldChange", 7);
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
    context.bind(this, 'handleInternalEditorChangeEvent');
  }
  /**
   * Contextual auth & portal information
   */
  get _context() {
    return state.getGlobalContext();
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
    const { envSuffix } = urls.parseHubUrl(this._hubSiteHostname);
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
    const { hubDomain } = urls.parseHubUrl(this._hubSiteHostname);
    return { subdomain, hubDomain };
  }
  get _urlPreview() {
    return hostnameToUrl(this._hubSiteHostname);
  }
  async componentWillLoad() {
    this._intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
    return (index.h(index.Host, { "data-element": "site-url-field" }, index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleInternalEditorChangeEvent, scale: (_a = this.params) === null || _a === void 0 ? void 0 : _a.scale, schema: this._schema, t: this._translationFunc, uiSchema: this._uiSchema, values: this._values }), index.h("calcite-label", { alignment: "start", scale: (_b = this.params) === null || _b === void 0 ? void 0 : _b.scale }, this._intl.t('urlPreview'), index.h("calcite-input", { disabled: true, scale: (_c = this.params) === null || _c === void 0 ? void 0 : _c.scale, value: this._urlPreview }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};

exports.hub_composite_input_site_url = SiteUrl;
