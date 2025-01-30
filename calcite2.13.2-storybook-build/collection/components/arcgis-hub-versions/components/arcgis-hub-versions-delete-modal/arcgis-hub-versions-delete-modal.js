import { h, } from '@stencil/core';
import intlManager from '../../../../utils/intl-manager';
import { bind } from '../../../../utils/context';
export class ArcgisHubVersionsDeleteModal {
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor() {
    this.version = undefined;
    this.displayName = undefined;
    this.shouldShow = false;
    this.error = undefined;
    bind(this, 'onHide', 'onDelete');
  }
  /**
   * Component will load lifecycle method, fetches translations and data
   * needed to render the UI
   */
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  onHide(event) {
    event.stopPropagation();
    this.arcgisHubVersionsDeleteModalClose.emit();
  }
  async onDelete(event) {
    event.stopPropagation();
    this.arcgisHubVersionsDeleteModalDelete.emit(this.version);
  }
  renderError() {
    if (this.error) {
      return (h("calcite-notice", { color: "red", icon: true, kind: "danger", open: true, scale: "s" }, h("div", { slot: "title" }, this.intl.t('error'))));
    }
  }
  render() {
    if (!!this.version) {
      return (h("calcite-modal", { "close-button-disabled": true, "focus-trap-disabled": true, onCalciteModalClose: this.onHide, open: this.shouldShow }, h("div", { slot: "header" }, h("h2", null, this.intl.t('title'))), h("div", { slot: "content" }, h("p", null, this.intl.t('message')), h("strong", null, this.displayName), this.renderError()), h("calcite-button", { appearance: "solid", kind: "danger", onClick: this.onDelete, slot: "primary" }, this.intl.t('delete')), h("calcite-button", { appearance: "outline", onClick: this.onHide, slot: "secondary" }, this.intl.t('cancel'))));
    }
  }
  static get is() { return "arcgis-hub-versions-delete-modal"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-versions-delete-modal.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-versions-delete-modal.css"]
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
      "displayName": {
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
          "text": ""
        },
        "attribute": "display-name",
        "reflect": false
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
          "text": "Should we show the delete modal?"
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
  static get events() {
    return [{
        "method": "arcgisHubVersionsDeleteModalDelete",
        "name": "arcgisHubVersionsDeleteModalDelete",
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
        "method": "arcgisHubVersionsDeleteModalClose",
        "name": "arcgisHubVersionsDeleteModalClose",
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
}
