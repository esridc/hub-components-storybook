import { r as registerInstance, c as createEvent, h, F as Fragment, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { a as cloneObject } from './util-3e6872d9.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './get-prop-ec5be510.js';

/**
* Regular Expression snippets to validate Google Analytics tracking code
* see http://code.google.com/apis/analytics/docs/concepts/gaConceptsAccounts.html#webProperty
*
* @author  Faisalman <movedpixel@gmail.com>
* @license http://www.opensource.org/licenses/mit-license.php
* @link    http://gist.github.com/faisalman
* @param   measurementId     string to be validated
* @return  Boolean
*/
function validateMeasurementId(measurementId) {
  const G_REGEX = /^G-[A-Z0-9]{1,}$/gi;
  const toStringVal = measurementId.toString();
  return G_REGEX.test(toStringVal);
}
// Validate a ga3 tracking id
function validateTrackingId(measurementId) {
  const UA_REGEX = /^ua-\d{4,9}-\d{1,4}$/i;
  const toStringVal = measurementId.toString();
  return UA_REGEX.test(toStringVal);
}
// Validate that it is either a ga3 or ga4 style id
function validateGA(id) {
  return validateMeasurementId(id) || validateTrackingId(id);
}
function validateNonEmptyStr(str) {
  return (str === null || str === void 0 ? void 0 : str.length) > 0;
}

const arcgisTelemetryConfigurationCss = ".sc-arcgis-telemetry-configuration-h{display:block}.consent-message-info.sc-arcgis-telemetry-configuration{font-size:var(--calcite-font-size--2);line-height:1rem}.provider-subtext.sc-arcgis-telemetry-configuration{padding:0.625rem;padding-top:0px;font-size:var(--calcite-font-size--2);line-height:1rem}.provider.sc-arcgis-telemetry-configuration{margin-top:0.625rem;margin-bottom:0.625rem;border-width:2px;border-style:solid;border-color:var(--calcite-color-border-3);padding:0.625rem}.provider.sc-arcgis-telemetry-configuration header.sc-arcgis-telemetry-configuration{margin-top:0.625rem;margin-bottom:0.625rem;font-weight:var(--calcite-font-weight-bold)}.provider-header.sc-arcgis-telemetry-configuration{display:flex;align-items:center;justify-content:space-between}.provider-header__right-container.sc-arcgis-telemetry-configuration{display:flex;width:33.333333%;align-items:center;justify-content:flex-end}.no-show.sc-arcgis-telemetry-configuration{display:none}.provider.sc-arcgis-telemetry-configuration .internal-form.sc-arcgis-telemetry-configuration{margin-top:0.625rem;margin-right:0.625rem;margin-left:0.625rem}.form-input.sc-arcgis-telemetry-configuration calcite-input.sc-arcgis-telemetry-configuration,.form-input.sc-arcgis-telemetry-configuration calcite-input-message.sc-arcgis-telemetry-configuration{margin-left:0.5rem}#tracking-server-ssl-input.sc-arcgis-telemetry-configuration{margin-bottom:0.5rem}[ui=\"flat\"].sc-arcgis-telemetry-configuration-h .provider.sc-arcgis-telemetry-configuration{border-width:0px;padding:0px}[ui=\"flat\"].sc-arcgis-telemetry-configuration-h .provider.sc-arcgis-telemetry-configuration .internal-form.sc-arcgis-telemetry-configuration{margin-left:0px;margin-right:0px}[ui=\"flat\"].sc-arcgis-telemetry-configuration-h .form-input.sc-arcgis-telemetry-configuration calcite-input.sc-arcgis-telemetry-configuration,[ui=\"flat\"].sc-arcgis-telemetry-configuration-h .form-input.sc-arcgis-telemetry-configuration calcite-input-message.sc-arcgis-telemetry-configuration{margin-left:0px}";

const USE_KEY = "disabled";
// Google Analytics Keys
const GA_MEASUREMENT_ID = "measurementId";
// Adobe Analytics Launch Keys
const AL_TRACKING_SERVER = "trackingServer";
const AL_TRACKING_SERVER_SSL = "trackingServerSSL";
const AL_REPORT_SUITE = "reportSuite";
// Siteimprove Keys
const SI_CODE = "code";
// ConsentMessage Keys
const CM_TEXT = "text";
const TYPES_OF_ACCOUNTS_LINK = "https://doc.arcgis.com/en/arcgis-online/get-started/create-account.htm#ESRI_SECTION1_24871ED982AC41ED86FF1937E7604CDE";
const DATA_COLLECTION_LINK = "https://doc.arcgis.com/en/arcgis-online/reference/faq.htm#ESRI_QUESTIONANSWER_AED97F28DCD84F7682623C2FA9E5CE49";
const ADOBE_TRACKING_SERVER_DOC = "https://experienceleague.adobe.com/docs/analytics/implementation/vars/config-vars/trackingserver.html";
const ADOBE_TRACKING_SERVER_SSL_DOC = "https://experienceleague.adobe.com/docs/analytics/implementation/vars/config-vars/trackingserversecure.html";
const ADOBE_REPORT_SUITE_DOC = "https://experienceleague.adobe.com/docs/analytics/admin/manage-report-suites/new-report-suite/t-create-a-report-suite.html";
const SITE_IMPROVE_DOC = "https://help.siteimprove.com/support/solutions/articles/80000448448-adding-siteimprove-analytics-javascript-to-your-website";
var Provider;
(function (Provider) {
  Provider["Google"] = "google";
  Provider["Adobe"] = "adobe";
  Provider["SiteImprove"] = "siteImprove";
  Provider["ConsentMessage"] = "consentMessage";
})(Provider || (Provider = {}));
const ArcgisTelemetryConfiguration = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisTelemetryConfigurationChange = createEvent(this, "arcgisTelemetryConfigurationChange", 7);
    var _a, _b, _c, _d, _e, _f;
    this._tempConsentMessageValue = (_a = this.consentMessage) === null || _a === void 0 ? void 0 : _a.text;
    this._googleAnalyticsKeyValueTemp = (_b = this.googleConfig) === null || _b === void 0 ? void 0 : _b.measurementId;
    this._adobeTrackingServerValueTemp = (_c = this.adobeConfig) === null || _c === void 0 ? void 0 : _c.trackingServer;
    this._adobeTrackingServerSSLValueTemp = (_d = this.adobeConfig) === null || _d === void 0 ? void 0 : _d.trackingServerSSL;
    this._adobeLReportSuiteValueTemp = (_e = this.adobeConfig) === null || _e === void 0 ? void 0 : _e.reportSuite;
    this._siCodeValueTemp = (_f = this.siteImproveConfig) === null || _f === void 0 ? void 0 : _f.code;
    this.configuration = { plugins: {} };
    this.allowGA3 = false;
    this.showArcgisOnlineDisclosure = undefined;
    this.ui = "accordion";
    this.isUpdatingObj = {};
    this.isListenerSetup = {};
    this.configurationState = undefined;
    this.isConsentMessageValid = true;
    this.isGAValid = null;
    this.isAdobeTrackingServerValid = null;
    this.isAdobeTrackingServerSSLValid = null;
    this.isALReportSuiteValid = null;
    this.isSIValid = null;
    bind(this, "_assignConsentListener", "_saveGoogleKey", "_saveAdobeTrackingServer", "_saveAdobeTrackingServerSSL", "_saveAdobeReportSuite", "_saveSiteCode", "_validateGMeasurementID", "_validateAdobeTrackingServer", "_validateAdobeSSLTrackingServer", "_validateAdobeReportSuite", "_validateSICode", "_validateConsentMessage");
  }
  get numberOfProviders() {
    const { googleConfig, adobeConfig, siteImproveConfig } = this;
    return [googleConfig, adobeConfig, siteImproveConfig].filter(config => config && !(config === null || config === void 0 ? void 0 : config.disabled)).length;
  }
  get _getConsentConfiguredMsg() {
    var _a;
    return ((_a = this.consentMessage) === null || _a === void 0 ? void 0 : _a.disabled)
      ? this.intl.t("notConfigured")
      : this.intl.t("configured");
  }
  get googleConfig() {
    var _a, _b, _c, _d;
    const telemProps = (_d = (_b = (_a = this.configurationState) === null || _a === void 0 ? void 0 : _a.plugins) !== null && _b !== void 0 ? _b : (_c = this.configuration) === null || _c === void 0 ? void 0 : _c.plugins) !== null && _d !== void 0 ? _d : {};
    const gaSettings = telemProps === null || telemProps === void 0 ? void 0 : telemProps[Provider.Google];
    if (gaSettings) {
      return {
        disabled: Boolean(gaSettings === null || gaSettings === void 0 ? void 0 : gaSettings[USE_KEY]),
        measurementId: gaSettings === null || gaSettings === void 0 ? void 0 : gaSettings[GA_MEASUREMENT_ID]
      };
    }
  }
  get adobeConfig() {
    var _a, _b, _c, _d;
    const telemProps = (_d = (_b = (_a = this.configurationState) === null || _a === void 0 ? void 0 : _a.plugins) !== null && _b !== void 0 ? _b : (_c = this.configuration) === null || _c === void 0 ? void 0 : _c.plugins) !== null && _d !== void 0 ? _d : {};
    const alSettings = telemProps === null || telemProps === void 0 ? void 0 : telemProps[Provider.Adobe];
    if (alSettings) {
      return {
        disabled: Boolean(alSettings === null || alSettings === void 0 ? void 0 : alSettings[USE_KEY]),
        trackingServer: alSettings === null || alSettings === void 0 ? void 0 : alSettings[AL_TRACKING_SERVER],
        trackingServerSSL: alSettings === null || alSettings === void 0 ? void 0 : alSettings[AL_TRACKING_SERVER_SSL],
        reportSuite: alSettings === null || alSettings === void 0 ? void 0 : alSettings[AL_REPORT_SUITE]
      };
    }
  }
  get siteImproveConfig() {
    var _a, _b, _c, _d;
    const telemProps = (_d = (_b = (_a = this.configurationState) === null || _a === void 0 ? void 0 : _a.plugins) !== null && _b !== void 0 ? _b : (_c = this.configuration) === null || _c === void 0 ? void 0 : _c.plugins) !== null && _d !== void 0 ? _d : {};
    const siSettings = telemProps === null || telemProps === void 0 ? void 0 : telemProps[Provider.SiteImprove];
    if (siSettings) {
      return {
        disabled: Boolean(siSettings === null || siSettings === void 0 ? void 0 : siSettings[USE_KEY]),
        code: siSettings === null || siSettings === void 0 ? void 0 : siSettings[SI_CODE]
      };
    }
  }
  get consentMessage() {
    var _a, _b;
    const telemProps = (_b = (_a = this.configurationState) !== null && _a !== void 0 ? _a : this.configuration) !== null && _b !== void 0 ? _b : {};
    const cmSettings = telemProps === null || telemProps === void 0 ? void 0 : telemProps[Provider.ConsentMessage];
    if (cmSettings) {
      return {
        disabled: Boolean(cmSettings === null || cmSettings === void 0 ? void 0 : cmSettings[USE_KEY]),
        text: cmSettings === null || cmSettings === void 0 ? void 0 : cmSettings[CM_TEXT]
      };
    }
  }
  get isUpdating() {
    return Object.values(this.isUpdatingObj)
      .reduce((acc, curr) => { return acc || curr; }, false);
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  componentDidLoad() {
    // Call all validation functions for the first time,
    // so that invalid fields show from the start
    this.googleConfig && this._validateGMeasurementID();
    if (this.adobeConfig) {
      // note: we do not call SSL tracking server validation
      // because it always validates as true, and will call an on update event
      // if the base validation function is changed, the _validateAdobeSSLTrackingServer
      // will need to be called here as well
      this._validateAdobeTrackingServer();
      this._validateAdobeReportSuite();
    }
    this.siteImproveConfig && this._validateSICode();
    this.consentMessage && this._validateConsentMessage();
  }
  _assignConsentListener(editorElement) {
    this._tempConsentMessageValue = this._tempConsentMessageValue; // for eslint
    editorElement.addEventListener("arcgisHubRichTextChange", (e) => {
      var _a;
      const enteredHTMLString = (_a = e === null || e === void 0 ? void 0 : e.path) === null || _a === void 0 ? void 0 : _a[0].value;
      this._tempConsentMessageValue = enteredHTMLString;
    });
    editorElement.addEventListener("focusout", (e) => {
      this._validateConsentMessage(e);
    });
  }
  _addSwitchListener(providerID, calciteSwitch) {
    if (this.isListenerSetup[providerID] == null) {
      this.isListenerSetup[providerID] = true;
      calciteSwitch.addEventListener("calciteSwitchChange", (e) => {
        var _a;
        const newEnabled = !((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.checked);
        this._updateOutput(providerID, USE_KEY, newEnabled);
      });
    }
  }
  render() {
    return (this.ui === "accordion"
      ? this._renderAccordionUI()
      : this._renderFlatUI());
  }
  _renderAccordionUI() {
    return (h("calcite-accordion", { "selection-mode": "single" }, h("calcite-accordion-item", { description: this.intl.t("enabled", { numberOfProviders: this.numberOfProviders }), heading: this.intl.t("accordionHeader1"), iconStart: "configure-popup" }, this._renderProviderForms()), this.consentMessage && h("calcite-accordion-item", { description: this._getConsentConfiguredMsg, heading: this.intl.t("accordionHeader2"), iconStart: "edit-attributes" }, this._renderConsentForm())));
  }
  _renderFlatUI() {
    return (h(Fragment, null, this._renderProviderForms(), this.consentMessage && this._renderConsentForm()));
  }
  _renderProviderForms() {
    return [
      this.googleConfig && this._renderGoogleAnalyticsForm(),
      this.adobeConfig && this._renderAdobeForm(),
      this.siteImproveConfig && this._renderSiteImproveForm(),
      this.showArcgisOnlineDisclosure && this._renderInfoMsg()
    ];
  }
  _renderConsentForm() {
    return this._renderProvider(this.intl.t("consentMessage"), this.consentMessage, Provider.ConsentMessage, (h(Fragment, null, h("div", null, h("strong", null, this.intl.t("consentMessageLabel"))), h("arcgis-hub-rich-text", { disabled: this.isUpdating, ref: this._assignConsentListener, toolbar: 'link', value: this.consentMessage.text }))), (h("div", { class: "consent-message-info" }, h("p", null, this.intl.t("consentMessageInfo")), h("p", null, h("strong", null, this.intl.t("consentGuidance")), "\u00A0", h("calcite-link", { href: "https://iapp.org/", target: "_blank" }, this.intl.t("learnMore"))))));
  }
  _renderProvider(title, providerConfig, providerID, internalForm, optionalUnderTitleDOM) {
    const { disabled } = providerConfig;
    return (h("div", { class: "provider" }, h("div", { class: "provider-header" }, h("header", null, title), h("div", { class: "provider-header__right-container" }, this.isUpdatingObj[providerID] == true ? this._renderLoader() : null, h("calcite-switch", { checked: !disabled, "data-test": providerID, disabled: this.isUpdating, ref: this._addSwitchListener.bind(this, providerID) }))), optionalUnderTitleDOM, h("div", { class: disabled ? "no-show" : "internal-form" }, internalForm)));
  }
  _renderLoader() {
    return h("calcite-loader", { label: this.intl.t("updating"), "no-padding": true, scale: "s", type: "indeterminate" });
  }
  _updateOutput(providerID, key, value) {
    var _a, _b;
    let state = cloneObject((_a = this.configurationState) !== null && _a !== void 0 ? _a : this.configuration);
    state = providerID === Provider.ConsentMessage ? Object.assign(Object.assign({}, state), { consentMessage: Object.assign(Object.assign({}, state.consentMessage), { [key]: value }) }) : Object.assign(Object.assign({}, state), { plugins: Object.assign(Object.assign({}, state === null || state === void 0 ? void 0 : state.plugins), { [providerID]: Object.assign(Object.assign({}, (_b = state === null || state === void 0 ? void 0 : state.plugins) === null || _b === void 0 ? void 0 : _b[providerID]), { [key]: value }) }) });
    this.configurationState = state;
    this.arcgisTelemetryConfigurationChange.emit(state);
  }
  _renderInfoMsg() {
    return (h("div", { class: "provider-subtext" }, this.intl.t("providerInfo", {
      accountsLink: (...str) => h("p", null, h("calcite-link", { href: TYPES_OF_ACCOUNTS_LINK, target: '_blank' }, str)),
      dataCollectionLink: (...str) => h("p", null, h("calcite-link", { href: DATA_COLLECTION_LINK, target: '_blank' }, str))
    })));
  }
  _renderGoogleAnalyticsForm() {
    let googleAnalyticsTitle = 'Google Analytics';
    // if only ga4 allowed, add special title
    if (!this.allowGA3) {
      googleAnalyticsTitle = `${googleAnalyticsTitle} (GA4)`;
    }
    return this._renderProvider(googleAnalyticsTitle, this.googleConfig, Provider.Google, (h(Fragment, null, h("calcite-label", { class: "form-input" }, this.intl.t("measurementId"), h("calcite-input", { disabled: this.isUpdating, maxLength: 30, onBlur: this._validateGMeasurementID, onCalciteInputInput: this._saveGoogleKey, placeholder: `G-XXXXXXXXXX`, status: this._calcStatus(this.isGAValid), value: this.googleConfig.measurementId }), h("calcite-input-message", { hidden: !(this.isGAValid != null && !this.isGAValid), icon: "exclamation-mark-triangle", status: "invalid" }, this.intl.t('googleInvalidForm'))), h("calcite-block", { collapsible: true, heading: this.intl.t("additionalInfo") }, h("ul", null, h("li", null, this.intl.t("gaInfo1")), h("li", null, this.intl.t("gaInfo2")), h("li", null, this.intl.t("gaInfo3")))))));
  }
  _renderAdobeForm() {
    return this._renderProvider("Adobe Analytics", this.adobeConfig, Provider.Adobe, (h(Fragment, null, h("calcite-label", { class: "form-input" }, this.intl.t("trackingServer"), h("calcite-input", { disabled: this.isUpdating, maxLength: 256, onBlur: this._validateAdobeTrackingServer, onCalciteInputInput: this._saveAdobeTrackingServer, onLoad: this._validateAdobeTrackingServer, placeholder: `${this.intl.t("example")}: jimsbrims.sc.omtrdc.net`, status: this._calcStatus(this.isAdobeTrackingServerValid), value: this.adobeConfig.trackingServer }), h("calcite-input-message", { hidden: !(this.isAdobeTrackingServerValid != null
        && !this.isAdobeTrackingServerValid), icon: "exclamation-mark-triangle", status: "invalid" }, this.intl.t("fieldCannotBeEmpty"))), h("calcite-label", { class: "form-input" }, this.intl.t("trackingServerSSL"), " (", this.intl.t("optional"), ")", h("calcite-input", { disabled: this.isUpdating, id: "tracking-server-ssl-input", maxLength: 256, onBlur: this._validateAdobeSSLTrackingServer, onCalciteInputInput: this._saveAdobeTrackingServerSSL, placeholder: `${this.intl.t("example")}: data.example.com`, status: this._calcStatus(this.isAdobeTrackingServerSSLValid), value: this.adobeConfig.trackingServerSSL })), h("calcite-label", { class: "form-input" }, this.intl.t("reportSuiteId"), h("calcite-input", { disabled: this.isUpdating, maxLength: 256, onBlur: this._validateAdobeReportSuite, onCalciteInputInput: this._saveAdobeReportSuite, placeholder: `mySuiteID`, status: this._calcStatus(this.isALReportSuiteValid), value: this.adobeConfig.reportSuite }), h("calcite-input-message", { hidden: !(this.isALReportSuiteValid != null && !this.isALReportSuiteValid), icon: "exclamation-mark-triangle", status: "invalid" }, this.intl.t("fieldCannotBeEmpty"))), h("calcite-block", { collapsible: true, heading: this.intl.t("additionalInfo") }, h("ul", null, h("li", null, this.intl.t("readAbout"), " ", h("calcite-link", { href: `${ADOBE_TRACKING_SERVER_DOC}?lang=${this.intl.locale}`, target: "_blank" }, this.intl.t("trackingServer"))), h("li", null, this.intl.t("readAbout"), " ", h("calcite-link", { href: `${ADOBE_TRACKING_SERVER_SSL_DOC}?lang=${this.intl.locale}`, target: "_blank" }, this.intl.t("trackingServerSSL"))), h("li", null, this.intl.t("readAbout"), " ", h("calcite-link", { href: `${ADOBE_REPORT_SUITE_DOC}?lang=${this.intl.locale}`, target: "_blank" }, this.intl.t("reportSuiteId"))))))));
  }
  _renderSiteImproveForm() {
    return this._renderProvider("Siteimprove", this.siteImproveConfig, Provider.SiteImprove, (h(Fragment, null, h("calcite-label", { class: "form-input" }, this.intl.t("siteImproveCode"), h("calcite-input", { disabled: this.isUpdating, maxLength: 30, onBlur: this._validateSICode, onCalciteInputInput: this._saveSiteCode, placeholder: `ABC1234`, status: this._calcStatus(this.isSIValid), value: this.siteImproveConfig.code }), h("calcite-input-message", { hidden: !(this.isSIValid != null && !this.isSIValid), icon: "exclamation-mark-triangle", status: "invalid" }, this.intl.t("fieldCannotBeEmpty"))), h("calcite-block", { collapsible: true, heading: this.intl.t("additionalInfo") }, h("ul", null, h("li", null, this.intl.t("siteImproveInfo", {
      providerName: "Siteimprove Code",
      codeExample: "\"XXXXX\"",
      calciteLink: (...str) => h("calcite-link", { href: SITE_IMPROVE_DOC, target: "_blank" }, str)
    })))))));
  }
  _calcStatus(validity) {
    if (validity == null) {
      return null;
    }
    return !validity ? "invalid" : "valid";
  }
  _saveGoogleKey(e) {
    this._googleAnalyticsKeyValueTemp = e.target.value;
  }
  _saveAdobeTrackingServer(e) {
    this._adobeTrackingServerValueTemp = e.target.value;
  }
  _saveAdobeTrackingServerSSL(e) {
    this._adobeTrackingServerSSLValueTemp = e.target.value;
  }
  _saveAdobeReportSuite(e) {
    this._adobeLReportSuiteValueTemp = e.target.value;
  }
  _saveSiteCode(e) {
    this._siCodeValueTemp = e.target.value;
  }
  _validateGMeasurementID(evt) {
    const validationFunc = this.allowGA3 ? validateGA : validateMeasurementId;
    this._validateForm('_googleAnalyticsKeyValueTemp', validationFunc, 'isGAValid', GA_MEASUREMENT_ID, Provider.Google, GA_MEASUREMENT_ID, evt);
  }
  _validateAdobeTrackingServer(evt) {
    this._validateForm("_adobeTrackingServerValueTemp", validateNonEmptyStr, "isAdobeTrackingServerValid", AL_TRACKING_SERVER, Provider.Adobe, AL_TRACKING_SERVER, evt);
  }
  _validateAdobeSSLTrackingServer(evt) {
    this._validateForm("_adobeTrackingServerSSLValueTemp", () => true, "isAdobeTrackingServerSSLValid", AL_TRACKING_SERVER_SSL, Provider.Adobe, AL_TRACKING_SERVER_SSL, evt);
  }
  _validateAdobeReportSuite(evt) {
    this._validateForm("_adobeLReportSuiteValueTemp", validateNonEmptyStr, "isALReportSuiteValid", AL_REPORT_SUITE, Provider.Adobe, AL_REPORT_SUITE, evt);
  }
  _validateSICode(evt) {
    this._validateForm("_siCodeValueTemp", validateNonEmptyStr, "isSIValid", SI_CODE, Provider.SiteImprove, SI_CODE, evt);
  }
  _validateConsentMessage(evt) {
    this._validateForm("_tempConsentMessageValue", () => true, "isConsentMessageValid", CM_TEXT, Provider.ConsentMessage, CM_TEXT, evt);
  }
  /** Runs Form Validation and assigns values properly */
  _validateForm(tempValRef, validationFunc, isValidRef, valueRef, providerID, keyForValueToWrite, blurEvent) {
    var _a, _b, _c, _d;
    let value = (_d = (_a = this[tempValRef]) !== null && _a !== void 0 ? _a : (_c = (_b = blurEvent === null || blurEvent === void 0 ? void 0 : blurEvent.path) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : "";
    value = value === null || value === void 0 ? void 0 : value.trim();
    this[isValidRef] = validationFunc(value);
    // Note: without taking into account the validity of the field before the update,
    // means that you can't clear the value out without replacing it, which maybe is what we want
    if (this[isValidRef] && this[valueRef] != value) {
      this[valueRef] = value;
      this._updateOutput(providerID, keyForValueToWrite, value);
    }
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisTelemetryConfiguration.style = arcgisTelemetryConfigurationCss;

export { ArcgisTelemetryConfiguration as arcgis_telemetry_configuration };
