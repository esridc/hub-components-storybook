import { Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
import { cloneObject, } from '@esri/hub-common';
import { buildUiSchema, SCHEMA } from './schema';
import intlManager from '../../utils/intl-manager';
import { CONFIGURATION_VARIANTS } from '../arcgis-configuration-editor/resources';
import { interpolateTranslations } from '../../utils';
export class ArcgisPrivacyConfig {
  constructor() {
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
  static get is() { return "arcgis-privacy-config"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-privacy-config.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-privacy-config.css"]
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
              "text": "ArcgisPrivacyConfig"
            }],
          "text": "The privacy configuration"
        },
        "defaultValue": "{ }"
      },
      "isLayoutEditor": {
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
              "name": "type",
              "text": "{boolean}"
            }, {
              "name": "memberof",
              "text": "ArcgisPrivacyConfig"
            }],
          "text": "Is this being rendered in the opendata-ui layout editor?\nNote that this is a temporary prop that will be removed once we no longer need this component in the layout editor"
        },
        "attribute": "is-layout-editor",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "hubPrivacyPreferencesConfigChanged",
        "name": "hubPrivacyPreferencesConfigChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IConfigurationValues",
          "resolved": "IConfigurationValues",
          "references": {
            "IConfigurationValues": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "config",
        "methodName": "configChanged"
      }];
  }
}
