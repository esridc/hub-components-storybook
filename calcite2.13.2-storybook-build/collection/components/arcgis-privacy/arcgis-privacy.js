import { Fragment, Host, h, } from '@stencil/core';
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
import { dictionary } from '@esri/telemetry-dictionary-hub';
export class ArcGisPrivacy {
  constructor() {
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
      this.hubTelemetry.emit(dictionary.category.interaction.action.viewed.label.notice.details.privacy);
    }
  }
  userSettingsChanged(newSettings) {
    this._userSettings = Object.assign({}, newSettings);
  }
  async handleManagePrivacyClick() {
    this.shouldShowNotice = true;
    this.shouldShowModal = true;
    this.shouldShowNonmodal = false;
    this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.notice.details.privacy);
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
    this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.settings.details.privacy);
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
  static get is() { return "arcgis-privacy"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-privacy.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-privacy.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
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
              "path": "../../utils/privacy/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{IPrivacyConfig}"
            }, {
              "name": "memberof",
              "text": "ArcGisPrivacy"
            }],
          "text": "The privacy configuration of the site"
        }
      },
      "userSettings": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IPrivacySettings",
          "resolved": "IPrivacySettings",
          "references": {
            "IPrivacySettings": {
              "location": "import",
              "path": "../../utils/privacy/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{IPrivacySettings}"
            }, {
              "name": "memberof",
              "text": "ArcGisPrivacy"
            }],
          "text": "The user's privacy settings"
        }
      },
      "hideManageButton": {
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
          "tags": [{
              "name": "memberof",
              "text": "ArcGisPrivacy"
            }],
          "text": "Controls whether we show the manage privacy button\nThis is for cases where we want to show the consent notice without rendering the manage button\neg on in the hub application on the explore routes"
        },
        "attribute": "hide-manage-button",
        "reflect": true,
        "defaultValue": "false"
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
          "tags": [{
              "name": "memberof",
              "text": "ArcGisPrivacy"
            }],
          "text": "Controls whether we show the anonymous tracking settings"
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
          "tags": [{
              "name": "memberof",
              "text": "ArcGisPrivacy"
            }],
          "text": "Controls whether we show the third party tracking settings"
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
              "path": "./interfaces"
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
  static get states() {
    return {
      "_userSettings": {},
      "shouldShowModal": {},
      "shouldShowNonmodal": {},
      "shouldShowNotice": {}
    };
  }
  static get events() {
    return [{
        "method": "hubUserPrivacySettingsChanged",
        "name": "hubUserPrivacySettingsChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IPrivacySettings",
          "resolved": "IPrivacySettings",
          "references": {
            "IPrivacySettings": {
              "location": "import",
              "path": "../../utils/privacy/types"
            }
          }
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "userSettings",
        "methodName": "userSettingsChanged"
      }];
  }
}
