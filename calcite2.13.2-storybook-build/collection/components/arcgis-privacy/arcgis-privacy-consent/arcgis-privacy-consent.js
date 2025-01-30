import { Host, h, } from '@stencil/core';
import { textareaToHtml } from '../../../utils/dom';
import { isExternalLink } from '../../../utils/urls';
/**
 * This component renders the consent messages
 * it is not likely to be used by itself but exists so we get style encapsulation
 * when rendered in a wormholed modal
 * @export
 * @class ArcGisPrivacyConsent
 */
export class ArcGisPrivacyConsent {
  constructor() {
    this.config = {};
    this.intl = undefined;
    this.anonTrackingConfigured = false;
    this.thirdPartyTrackingConfigured = false;
    this.orgInfo = undefined;
  }
  get allTrackingConfigured() {
    return this.anonTrackingConfigured && this.thirdPartyTrackingConfigured;
  }
  get eueiDisabled() {
    var _a;
    /*
      NOTE: this will return:
        - false if we have no org info - the user is not logged in so we don't know anything about their org
        - false if we have org info and eueiEnabled is true
        - true if we have org info and eueiEnabled is false
    */
    return ((_a = this.orgInfo) === null || _a === void 0 ? void 0 : _a.eueiEnabled) === false;
  }
  renderEueiNotice() {
    let result;
    if (this.eueiDisabled) {
      result = h("calcite-notice", { kind: "info", open: true, slot: "content", width: "full" }, h("span", { slot: "title" }, this.intl.t('eueiNotice.title', { orgName: this.orgInfo.name })), h("span", { slot: "message" }, this.intl.t('eueiNotice.message', { orgName: this.orgInfo.name })), h("calcite-link", { href: "https://doc.arcgis.com/en/arcgis-online/administer/configure-general.htm#ESRI_SECTION1_1530A7E7A1644852B30CDFCB060A46E9", iconEnd: "launch", slot: "link", target: "_blank" }, this.intl.t('eueiNotice.link')));
    }
    return result;
  }
  /**
   * Renders the consent message
   * this will be rendered into the notice and the settings ui
   * @return {*}  {VNode[]}
   * @memberof ArcGisPrivacy
   */
  renderConsentMessage() {
    var _a, _b, _c, _d;
    const customerConsentNotice = (_c = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.disclaimer) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.text;
    const customerConsentLink = (_d = this.config) === null || _d === void 0 ? void 0 : _d.policyURL;
    const customerConsentIcon = !!customerConsentLink && isExternalLink(customerConsentLink)
      ? 'launch'
      : undefined;
    // const esriMessage = this.trackingConfigured ? this.intl.t('privacyPolicy') : this.intl.t('notTracking');
    let esriMessageKey = 'consentNotice.noTracking';
    if (this.allTrackingConfigured) {
      esriMessageKey = 'consentNotice.allTracking';
    }
    else if (this.anonTrackingConfigured) {
      esriMessageKey = 'consentNotice.anonymousTracking';
    }
    else if (this.thirdPartyTrackingConfigured) {
      esriMessageKey = 'consentNotice.thirdPartyTracking';
    }
    const result = [
      this.renderEueiNotice(),
      h("div", { key: "esri-privacy-policy" }, this.intl.t(esriMessageKey)),
      h("calcite-link", { href: "https://www.esri.com/privacy", "icon-end": "launch", key: "esri-privacy-link" }, this.intl.t('consent.esriPrivacyLink'))
    ];
    // TODO: sanitize HTML w/ https://github.com/Esri/arcgis-html-sanitizer
    customerConsentNotice && result.push(h("div", { innerHTML: textareaToHtml(customerConsentNotice || '') }));
    customerConsentLink && result.push(h("calcite-link", { href: customerConsentLink, "icon-end": customerConsentIcon }, this.intl.t('consent.customerConsentLink')));
    return result;
  }
  render() {
    return (h(Host, null, this.renderConsentMessage()));
  }
  static get is() { return "arcgis-privacy-consent"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-privacy-consent.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-privacy-consent.css"]
    };
  }
  static get properties() {
    return {
      "config": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IPrivacyConfig",
          "resolved": "IPrivacyConfig",
          "references": {
            "IPrivacyConfig": {
              "location": "import",
              "path": "../../../utils/privacy/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "{}"
      },
      "intl": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ComponentIntl",
          "resolved": "ComponentIntl",
          "references": {
            "ComponentIntl": {
              "location": "import",
              "path": "../../../utils/stencil-intl"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "anonTrackingConfigured": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "anon-tracking-configured",
        "reflect": false,
        "defaultValue": "false"
      },
      "thirdPartyTrackingConfigured": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "third-party-tracking-configured",
        "reflect": false,
        "defaultValue": "false"
      },
      "orgInfo": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IOrgInfo",
          "resolved": "IOrgInfo",
          "references": {
            "IOrgInfo": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
}
