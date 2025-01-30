import { h, Host } from '@stencil/core';
import { bind } from '../../../../../../../utils/context';
import intlManager from '../../../../../../../utils/intl-manager';
import { getGlobalContext } from '../../../../../../../utils/state';
import { parseHubUrl } from '../../../../../../../utils/urls';
import { buildSiteUrlEditorSchema, buildSiteUrlEditorUiSchema } from './schemas';
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
// TODO: this component needs to be updated slightly
// in order to work in enterprise sites, we need to:
// 1. use only the subdomain as the input/output
// 2. only show the subdomain field in the UI
// 3. not show the orgUrlKey suffix in the UI
// 4. probably use different strings
// see the domain-settings-modal Ember component
// for any additional requirements.
/**
 * A composite input field for a site's URL.
 *
 * Currently only supports "default" URLs (i.e. subdomains of hub.arcgis.com or opendata.arcgis.com).
 *
 */
export class SiteUrl {
  // lifecycle methods
  constructor() {
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
  static get is() { return "hub-composite-input-site-url"; }
  static get encapsulation() { return "shadow"; }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "urlInfo": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubSiteUrlInfo",
          "resolved": "IHubSiteUrlInfo",
          "references": {
            "IHubSiteUrlInfo": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The site's URL info including subdomain and hostname"
        }
      },
      "orgUrlKey": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The site's organization's URL key, ex: 'my-org'"
        },
        "attribute": "org-url-key",
        "reflect": false
      },
      "params": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IRenderParams",
          "resolved": "IRenderParams",
          "references": {
            "IRenderParams": {
              "location": "import",
              "path": "../../resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The render parameters for the component"
        }
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisCompositeSiteUrlFieldChange",
        "name": "arcgisCompositeSiteUrlFieldChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Every field component emits this event. The\narcgis-configuration-editor-field component\nlistens for these events to emit editor changes\nup to the arcgis-configuration-editor"
        },
        "complexType": {
          "original": "IHubSiteUrlInfo",
          "resolved": "IHubSiteUrlInfo",
          "references": {
            "IHubSiteUrlInfo": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
