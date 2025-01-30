import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { d as dist } from './index-dd3f99ac.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';

const arcgisPrivacyCss = ":host{display:inline-block;font-weight:initial;text-align:initial}:host([hide-manage-button]){position:absolute}";

const ArcGisPrivacy = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubUserPrivacySettingsChanged = createEvent(this, "hubUserPrivacySettingsChanged", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.config = undefined;
    this.userSettings = undefined;
    this.hideManageButton = false;
    this.anonTrackingConfigured = false;
    this.thirdPartyTrackingConfigured = false;
    this.orgInfo = undefined;
    this._userSettings = undefined;
    this.shouldShowModal = false;
    this.shouldShowNonmodal = false;
    this.shouldShowNotice = true;
    bind(this, 'handleAcceptAllClick', 'handleAcceptNecessaryClick', 'handleConfirmClick', 'handleManagePrivacyClick', 'handleModalClose', 'handleNonmodalClose', 'handleSettingsChange', 'handleViewSettingsClick');
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
  async componentWillLoad() {
    var _a, _b, _c, _d;
    this.userSettingsChanged(this.userSettings);
    this.intl = await intlManager.loadIntlForComponent(this.element);
    const shouldShowConsentNotice = !!((_a = this.config) === null || _a === void 0 ? void 0 : _a.allowPrivacyConfig) && !((_b = this._userSettings) === null || _b === void 0 ? void 0 : _b.accepted);
    this.shouldShowNonmodal = shouldShowConsentNotice && !((_c = this.config) === null || _c === void 0 ? void 0 : _c.blocking);
    this.shouldShowModal = shouldShowConsentNotice && !!((_d = this.config) === null || _d === void 0 ? void 0 : _d.blocking);
  }
  componentDidLoad() {
    var _a;
    // we showed them the notice
    if (!((_a = this._userSettings) === null || _a === void 0 ? void 0 : _a.accepted)) {
      // i am not sure this will ever actually get logged - if it is not accepted, we should not be logging telemetry
      this.hubTelemetry.emit(dist.dictionary.category.interaction.action.viewed.label.notice.details.privacy);
    }
  }
  userSettingsChanged(newSettings) {
    this._userSettings = Object.assign({}, newSettings);
  }
  async handleManagePrivacyClick() {
    this.shouldShowNotice = true;
    this.shouldShowModal = true;
    this.shouldShowNonmodal = false;
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.open.label.notice.details.privacy);
  }
  handleAcceptAllClick() {
    this._userSettings = Object.assign(Object.assign({}, this._userSettings), { accepted: true, functional: true, performance: true, targeting: true });
    this.hubUserPrivacySettingsChanged.emit(this._userSettings);
    this.shouldShowModal = false;
    this.shouldShowNonmodal = false;
  }
  handleAcceptNecessaryClick() {
    this._userSettings = Object.assign(Object.assign({}, this._userSettings), { accepted: true, functional: false, performance: false, targeting: false });
    this.hubUserPrivacySettingsChanged.emit(this._userSettings);
    this.shouldShowModal = false;
    this.shouldShowNonmodal = false;
  }
  handleViewSettingsClick() {
    this.shouldShowNotice = false;
    this.shouldShowNonmodal = false;
    this.shouldShowModal = true;
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.open.label.settings.details.privacy);
  }
  handleSettingsChange(evt) {
    evt.stopPropagation();
    this._userSettings = Object.assign(Object.assign({}, this._userSettings), evt.detail);
  }
  async handleConfirmClick() {
    this._userSettings = Object.assign(Object.assign({}, this._userSettings), { accepted: true });
    this.hubUserPrivacySettingsChanged.emit(this._userSettings);
    this.shouldShowModal = false;
    this.shouldShowNonmodal = false;
  }
  handleModalClose() {
    this.shouldShowModal = false;
  }
  handleNonmodalClose() {
    this.shouldShowNonmodal = false;
  }
  renderButtons() {
    // NOTE: i'm certain there is a way to do this with less code but the logic is easier to reason about if we do it the long way
    const reviewSettingsButton = h("calcite-button", { appearance: "outline-fill", key: "view-settings", kind: "brand", onClick: this.handleViewSettingsClick, slot: "back", width: "full" }, this.intl.t('notice.reviewSettingsButton'));
    const acceptNecessaryButtonOutline = h("calcite-button", { appearance: 'outline', key: "accept-necessary", onClick: this.handleAcceptNecessaryClick, slot: "secondary", width: "full" }, this.intl.t('notice.acceptNecessaryButton'));
    const acceptNecessaryButtonSolid = h("calcite-button", { appearance: 'solid', key: "accept-necessary", onClick: this.handleAcceptNecessaryClick, slot: "secondary", width: "full" }, this.intl.t('notice.acceptNecessaryButton'));
    const confirmButton = h("calcite-button", { appearance: 'solid', key: "accept-necessary", onClick: this.handleAcceptNecessaryClick, slot: "secondary", width: "full" }, this.intl.t('notice.confirmButton'));
    const acceptAllButton = h("calcite-button", { key: "accept-all", onClick: this.handleAcceptAllClick, slot: "primary", width: "full" }, this.intl.t('notice.acceptAllButton'));
    const trackingConfigured = this.anonTrackingConfigured || this.thirdPartyTrackingConfigured;
    let result;
    if (trackingConfigured) {
      /* eslint-disable unicorn/prefer-ternary */
      if (this.eueiDisabled) {
        result = [reviewSettingsButton, acceptNecessaryButtonSolid];
      }
      else {
        result = [reviewSettingsButton, acceptNecessaryButtonOutline, acceptAllButton];
      }
    }
    else {
      result = [reviewSettingsButton, confirmButton];
      /* eslint-enable unicorn/prefer-ternary */
    }
    return result;
  }
  /**
   * Renders the consent notice
   * this will either be rendered into the modal or the non-modal
   * @return {*}  {VNode}
   * @memberof ArcGisPrivacy
   */
  renderNotice() {
    return h(Fragment, null, h("div", { slot: "header" }, this.intl.t('notice.heading')), h("arcgis-privacy-consent", { anonTrackingConfigured: this.anonTrackingConfigured, config: this.config, intl: this.intl, orgInfo: this.orgInfo, slot: "content", thirdPartyTrackingConfigured: this.thirdPartyTrackingConfigured }), this.renderButtons());
  }
  /**
   * Renders the settings ui
   * this will always be rendered into the modal
   * @return {*}  {VNode}
   * @memberof ArcGisPrivacy
   */
  renderSettings() {
    return h(Fragment, null, h("div", { slot: "header" }, this.intl.t('settings.heading')), h("arcgis-privacy-consent", { anonTrackingConfigured: this.anonTrackingConfigured, config: this.config, intl: this.intl, orgInfo: this.orgInfo, slot: "content", thirdPartyTrackingConfigured: this.thirdPartyTrackingConfigured }), h("arcgis-privacy-settings", { anonTrackingConfigured: this.anonTrackingConfigured, intl: this.intl, onHubInternalUserPrivacySettingsChanged: this.handleSettingsChange, orgInfo: this.orgInfo, slot: "content", thirdPartyTrackingConfigured: this.thirdPartyTrackingConfigured, userSettings: this._userSettings }), h("calcite-button", { appearance: "solid", onClick: this.handleConfirmClick, slot: "primary", width: "full" }, this.intl.t('settings.confirmButton')));
  }
  /**
   * Renders the modal privacy consent ui
   * this will contain either the notice or the settings
   * @return {*}  {VNode}
   * @memberof ArcGisPrivacy
   */
  renderModal() {
    const { shouldShowNotice } = this;
    return h("arcgis-wormhole", null, h("calcite-modal", { closeButtonDisabled: true, docked: true, escapeDisabled: true, onCalciteModalClose: this.handleModalClose, open: this.shouldShowModal, outsideCloseDisabled: true, scale: "s", width: shouldShowNotice ? "m" : "s" }, this.shouldShowNotice ? this.renderNotice() : this.renderSettings()));
  }
  /**
   * Renders the non-modal privacy notice
   * this will always contain the notice
   * @return {*}  {VNode}
   * @memberof ArcGisPrivacy
   */
  renderNonmodal() {
    const props = {
      onHubNonmodalClose: this.handleNonmodalClose,
      open: this.shouldShowNonmodal,
    };
    return h("arcgis-hub-nonmodal", Object.assign({}, props), this.renderNotice());
  }
  /**
   * Renders the manage privacy button
   * @return {*}  {VNode}
   * @memberof ArcGisPrivacy
   */
  renderButton() {
    let result;
    if (!this.hideManageButton) {
      result = h("calcite-button", { appearance: "transparent", kind: "neutral", onClick: this.handleManagePrivacyClick, scale: "l" }, this.intl.t('managePrivacyButton'));
    }
    return result;
  }
  _render() {
    return h(Fragment, null, this.renderButton(), this.renderModal(), this.renderNonmodal());
  }
  render() {
    return (h(Host, { "data-element": "privacy-preferences" }, this._render()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "userSettings": ["userSettingsChanged"]
  }; }
};
ArcGisPrivacy.style = arcgisPrivacyCss;

export { ArcGisPrivacy as arcgis_privacy };
