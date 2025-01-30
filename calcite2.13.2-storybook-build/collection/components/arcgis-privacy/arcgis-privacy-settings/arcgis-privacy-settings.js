import { h, } from '@stencil/core';
import { bind } from '../../../utils/context';
/**
 * This component renders the consent settings
 * it is not likely to be used by itself but exists so we get style encapsulation
 * when rendered in a wormholed modal and to simplify testing
 * @export
 * @class ArcGisPrivacySettings
 */
export class ArcGisPrivacySettings {
  constructor() {
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
    { /* NOTE: it would be really nice to use the arcgis-configuration-editor here
              but it does not currently support the desired ux (accordions with switches on them)
              also, for this ux, we have one switch that maps to two props */
    }
    return (h("form", null, h("calcite-accordion", { "icon-position": "start" }, h("calcite-accordion-item", { heading: this.intl.t('necessary.heading') }, h("p", null, this.intl.t('necessary.helpText'))), this.anonTrackingConfigured && (h("calcite-accordion-item", { heading: this.intl.t('anonymous.heading') }, h("calcite-switch", { checked: (_a = this.userSettings) === null || _a === void 0 ? void 0 : _a.performance, disabled: this.eueiDisabled, label: this.intl.t('anonymous.heading'), onCalciteSwitchChange: this.handleSettingsChange, slot: "actions-end", value: "performance" }), h("p", null, this.intl.t('anonymous.helpText')))), this.thirdPartyTrackingConfigured && (h("calcite-accordion-item", { heading: this.intl.t('thirdParty.heading') }, h("calcite-switch", { checked: ((_b = this.userSettings) === null || _b === void 0 ? void 0 : _b.targeting) || ((_c = this.userSettings) === null || _c === void 0 ? void 0 : _c.functional), disabled: this.eueiDisabled, label: this.intl.t('thirdParty.heading'), onCalciteSwitchChange: this.handleSettingsChange, slot: "actions-end", value: "targeting,functional" }), h("p", null, this.intl.t('anonymous.helpText')))))));
  }
  static get is() { return "arcgis-privacy-settings"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-privacy-settings.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-privacy-settings.css"]
    };
  }
  static get properties() {
    return {
      "userSettings": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IPrivacySettings",
          "resolved": "IPrivacySettings",
          "references": {
            "IPrivacySettings": {
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
        }
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
          "tags": [{
              "name": "memberof",
              "text": "ArcGisPrivacySettings"
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
              "text": "ArcGisPrivacySettings"
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
  static get events() {
    return [{
        "method": "hubInternalUserPrivacySettingsChanged",
        "name": "hubInternalUserPrivacySettingsChanged",
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
              "path": "../../../utils/privacy/types"
            }
          }
        }
      }];
  }
}
