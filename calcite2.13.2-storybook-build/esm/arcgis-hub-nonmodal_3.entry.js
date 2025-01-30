import { r as registerInstance, h, H as Host, c as createEvent } from './index-57f71b44.js';
import { t as textareaToHtml } from './dom-e1e6c513.js';
import { k as isExternalLink } from './urls-0e36649d.js';
import { b as bind } from './context-7d8f7366.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './extent-34a4ba2a.js';
import './request-fa80ae40.js';
import './helpers-8c7e5e31.js';
import './getTypeFromEntity-e149b61e.js';
import './logger-f8667200.js';

const arcgisHubNonmodalCss = ":host{visibility:hidden;position:fixed;bottom:1.5rem;display:block;opacity:0;inset-inline-end:1.5rem;transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow),\n              opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88);z-index:1100;--nonmodal-padding-block:0.75rem;--nonmodal-padding-inline:1rem}:host(.open){visibility:visible;opacity:1;transition-delay:0ms}.container{display:flex;align-items:center;justify-content:center;overflow-y:hidden;--tw-shadow:0 2px 12px -4px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.16);--tw-shadow-colored:0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.nonmodal{display:flex;flex-direction:column;overflow:hidden;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1);--tw-shadow:0 2px 12px -4px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.16);--tw-shadow-colored:0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);border-radius:0.25rem;max-height:80vh;max-inline-size:45rem}.header{display:flex;border-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1);border-block-end-width:1px;border-start-end-radius:0.25rem;border-start-start-radius:0.25rem;flex:0 0 auto;max-inline-size:100%;min-inline-size:0px}.title{display:flex;flex:1 1 auto;align-items:center;padding-block:var(--nonmodal-padding-block);padding-inline:var(--nonmodal-padding-inline)}slot[name=\"header\"]::slotted(*),::slotted([slot=\"header\"]){margin:0px;font-size:var(--calcite-font-size-1);line-height:1.5rem;color:var(--calcite-color-text-1)}.content{display:block;overflow:auto;background-color:var(--calcite-color-foreground-1);block-size:100%;max-block-size:100%;padding:var(--nonmodal-padding-block)}.footer{box-sizing:border-box;display:flex;justify-content:space-between;border-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1);border-block-start-width:1px;border-end-end-radius:0.25rem;border-end-start-radius:0.25rem;flex:0 0 auto;inline-size:100%;margin-block-start:auto;padding-block:var(--nonmodal-padding-block);padding-inline:var(--nonmodal-padding-inline);z-index:var(--calcite-z-index-header)}.back{display:block;margin-inline-end:auto}.secondary{display:block;margin-inline:0.25rem}slot[name=\"primary\"]{display:block}@media (max-width: 576px){:host{bottom:0px}:host{left:0px}:host{right:0px}.footer{flex-direction:column}.back,.secondary{margin:0px}.back,.secondary{margin-block-end:0.25rem}}";

const ArcgisHubNonmodal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.open = false;
  }
  render() {
    return (h(Host, { class: { open: this.open }, "data-element": "nonmodal" }, h("div", { class: "container" }, h("div", { class: "nonmodal" }, h("div", { class: "header" }, h("header", { class: "title" }, h("slot", { name: "header" }))), h("div", { class: "content" }, h("slot", { name: "content" })), h("div", { class: "footer" }, h("span", { class: "back" }, h("slot", { name: "back" })), h("span", { class: "secondary" }, h("slot", { name: "secondary" })), h("span", { class: "primary" }, h("slot", { name: "primary" })))))));
  }
};
ArcgisHubNonmodal.style = arcgisHubNonmodalCss;

const arcgisPrivacyConsentCss = ":host{display:flex;flex-direction:column;gap:0.5rem;line-height:1.375}calcite-notice{margin-bottom:1rem}";

const ArcGisPrivacyConsent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
ArcGisPrivacyConsent.style = arcgisPrivacyConsentCss;

const arcgisPrivacySettingsCss = ":host{margin-top:1.5rem;display:block}calcite-switch{margin-inline-end:0.5rem}";

const ArcGisPrivacySettings = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubInternalUserPrivacySettingsChanged = createEvent(this, "hubInternalUserPrivacySettingsChanged", 7);
    this.userSettings = undefined;
    this.intl = undefined;
    this.anonTrackingConfigured = false;
    this.thirdPartyTrackingConfigured = false;
    this.orgInfo = undefined;
    bind(this, 'handleSettingsChange');
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
  handleSettingsChange(evt) {
    const { value: key, checked } = evt.target;
    const newSettings = {};
    const keys = key.split(',');
    keys.forEach(k => {
      newSettings[k] = checked;
    });
    this.hubInternalUserPrivacySettingsChanged.emit(Object.assign(Object.assign({}, this.userSettings), newSettings));
  }
  render() {
    var _a, _b, _c;
    return (h("form", null, h("calcite-accordion", { "icon-position": "start" }, h("calcite-accordion-item", { heading: this.intl.t('necessary.heading') }, h("p", null, this.intl.t('necessary.helpText'))), this.anonTrackingConfigured && (h("calcite-accordion-item", { heading: this.intl.t('anonymous.heading') }, h("calcite-switch", { checked: (_a = this.userSettings) === null || _a === void 0 ? void 0 : _a.performance, disabled: this.eueiDisabled, label: this.intl.t('anonymous.heading'), onCalciteSwitchChange: this.handleSettingsChange, slot: "actions-end", value: "performance" }), h("p", null, this.intl.t('anonymous.helpText')))), this.thirdPartyTrackingConfigured && (h("calcite-accordion-item", { heading: this.intl.t('thirdParty.heading') }, h("calcite-switch", { checked: ((_b = this.userSettings) === null || _b === void 0 ? void 0 : _b.targeting) || ((_c = this.userSettings) === null || _c === void 0 ? void 0 : _c.functional), disabled: this.eueiDisabled, label: this.intl.t('thirdParty.heading'), onCalciteSwitchChange: this.handleSettingsChange, slot: "actions-end", value: "targeting,functional" }), h("p", null, this.intl.t('anonymous.helpText')))))));
  }
};
ArcGisPrivacySettings.style = arcgisPrivacySettingsCss;

export { ArcgisHubNonmodal as arcgis_hub_nonmodal, ArcGisPrivacyConsent as arcgis_privacy_consent, ArcGisPrivacySettings as arcgis_privacy_settings };
