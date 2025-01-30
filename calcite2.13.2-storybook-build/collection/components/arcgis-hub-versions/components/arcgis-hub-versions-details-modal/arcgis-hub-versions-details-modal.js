import { h } from '@stencil/core';
import { cloneObject, mergeObjects, } from '@esri/hub-common';
import intlManager from '../../../../utils/intl-manager';
import { bind } from '../../../../utils/context';
import { SCHEMA, UI_SCHEMA } from '../../schema';
export class ArcgisHubVersionsDetailsModal {
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor() {
    this.version = undefined;
    this.shouldShow = false;
    this._version = undefined;
    this.error = undefined;
    bind(this, 'onDetailsChange', 'onHide', 'onSave', 'translationFunc');
  }
  /**
   * Component will load lifecycle method, fetches translations and data
   * needed to render the UI
   */
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.versionChangeHandler(this.version);
  }
  versionChangeHandler(version) {
    this._version = cloneObject(version);
  }
  onDetailsChange(event) {
    event.stopPropagation();
    const { valid, values } = event.detail;
    if (valid) {
      this._version = mergeObjects(values, this.version, ['description', 'name']);
    }
  }
  onHide(event) {
    event.stopPropagation();
    this._version = null;
    this.arcgisHubVersionsDetailsModalClose.emit();
  }
  async onSave(event) {
    event.stopPropagation();
    this.arcgisHubVersionsDetailsModalSave.emit(this._version);
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  renderError() {
    if (this.error) {
      return (h("calcite-notice", { color: "red", icon: true, kind: "danger", open: true, scale: "s" }, h("div", { slot: "title" }, this.intl.t('error'))));
    }
  }
  render() {
    if (!!this.version) {
      return (h("calcite-modal", { "close-button-disabled": true, "focus-trap-disabled": true, onCalciteModalClose: this.onHide, open: this.shouldShow }, h("div", { slot: "header" }, h("h2", null, this.intl.t('title'))), h("div", { slot: "content" }, h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.onDetailsChange, schema: SCHEMA, t: this.translationFunc, uiSchema: UI_SCHEMA, values: this._version }), this.renderError()), h("calcite-button", { onClick: this.onSave, slot: "primary" }, this.intl.t('save')), h("calcite-button", { appearance: "outline", onClick: this.onHide, slot: "secondary" }, this.intl.t('cancel'))));
    }
  }
  static get is() { return "arcgis-hub-versions-details-modal"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-versions-details-modal.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-versions-details-modal.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "version": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IVersionMetadata",
          "resolved": "IVersionMetadata",
          "references": {
            "IVersionMetadata": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The versions for the specified item"
        }
      },
      "shouldShow": {
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
          "text": "Should we show the details modal?"
        },
        "attribute": "should-show",
        "reflect": false,
        "defaultValue": "false"
      },
      "error": {
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
        "attribute": "error",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "_version": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubVersionsDetailsModalSave",
        "name": "arcgisHubVersionsDetailsModalSave",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IVersionMetadata",
          "resolved": "IVersionMetadata",
          "references": {
            "IVersionMetadata": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "arcgisHubVersionsDetailsModalClose",
        "name": "arcgisHubVersionsDetailsModalClose",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "version",
        "methodName": "versionChangeHandler"
      }];
  }
}
