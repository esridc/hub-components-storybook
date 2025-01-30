import { Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
import { fileFormatToDisplayName, isAGORateLimitError } from '../../utils/download-features';
import intlManager from '../../utils/intl-manager';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { getFormatIcon } from '../../utils/download-list';
import { checkPermission } from '@esri/hub-common';
import { getGlobalContext } from '../../utils';
/**
 * DEPRECATED. Use `arcgis-hub-download-list` instead.
 * This component will be removed once the new component is fully tested and ready for production.
 */
export class ArcgisDownloadListCard {
  constructor() {
    this.fileFormat = undefined;
    this.filterGeometry = undefined;
    this.item = undefined;
    this.layers = undefined;
    this.server = undefined;
    this.showError = false;
    this.errorMessage = '';
    bind(this, 'handleCalciteNoticeClose');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get formatIcon() {
    return getFormatIcon(this.fileFormat);
  }
  get _context() { return getGlobalContext(); }
  get canDisplayErrorMessage() {
    return checkPermission('hub:content:downloads:displayErrors', this._context).access;
  }
  handleCalciteNoticeClose() {
    var _a, _b, _c, _d;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.download), { label: fileFormatToDisplayName(this.fileFormat), details: 'dismiss limit reached', id: (_a = this.item) === null || _a === void 0 ? void 0 : _a.id, type: (_b = this.item) === null || _b === void 0 ? void 0 : _b.type, access: (_c = this.item) === null || _c === void 0 ? void 0 : _c.access, contentOrgId: (_d = this.item) === null || _d === void 0 ? void 0 : _d.orgId, response: 'Failure' }));
  }
  clearErrors() {
    this.showError = false;
  }
  handleArcgisDownloadError(event) {
    var _a, _b, _c, _d;
    const { error } = event.detail;
    this.showError = true;
    if (isAGORateLimitError(error)) {
      this.errorMessage = error.message;
    }
    else if (this.canDisplayErrorMessage) {
      // TODO: @caleb + @aaron -- Rework this after Caleb's hub.js PR lands to include error message as the title 
      // of the accordion and error details as the accordion item
      this.errorMessage = error.details ? error.details[0] : error.message;
    }
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.download), { label: fileFormatToDisplayName(this.fileFormat), details: error.message, id: (_a = this.item) === null || _a === void 0 ? void 0 : _a.id, type: (_b = this.item) === null || _b === void 0 ? void 0 : _b.type, access: (_c = this.item) === null || _c === void 0 ? void 0 : _c.access, contentOrgId: (_d = this.item) === null || _d === void 0 ? void 0 : _d.orgId, response: 'Failure' }));
  }
  handleCalciteInternalAccordionChange(e) {
    this.hubTelemetry.emit(!e.detail.requestedAccordionItem.expanded
      ? Object.assign({}, dictionary.category.interaction.action.open.label.accordion.details.downloadErrorMessage) : Object.assign({}, dictionary.category.interaction.action.close.label.accordion.details.downloadErrorMessage));
  }
  renderErrorContent() {
    return this.canDisplayErrorMessage
      ? (h("calcite-accordion", { appearance: "transparent", class: "error-accordion-item", "icon-type": "caret" }, h("calcite-accordion-item", { class: "error-accordion-item-heading", description: "", heading: this.intl.t('errorHeader'), "icon-start": "exclamation-mark-triangle" }, h("p", { class: "error-accordion-item-content" }, this.errorMessage))))
      : (h("div", null, h("calcite-icon", { class: "error-header-icon", icon: "exclamation-mark-triangle" }), h("span", { class: "error-header" }, this.intl.t('errorHeader'))));
  }
  render() {
    return (h(Host, { "data-element": "download-list-card" }, h("arcgis-download-list-card-ui", { icon: this.formatIcon }, h("div", { slot: "header" }, this.intl.t(this.fileFormat)), h("arcgis-download-features-button", { appearance: "outline", fileFormat: this.fileFormat, filterGeometry: this.filterGeometry, item: this.item, layers: this.layers, server: this.server, slot: "button", width: "full" }), this.showError &&
      h("div", { class: "error-header-container", slot: "errors" }, this.renderErrorContent()))));
  }
  static get is() { return "arcgis-download-list-card"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-download-list-card.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-download-list-card.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "fileFormat": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FileFormat",
          "resolved": "\"csv\" | \"excel\" | \"featureCollection\" | \"filegdb\" | \"geoPackage\" | \"geojson\" | \"json\" | \"shapefile\" | \"sqlite\"",
          "references": {
            "FileFormat": {
              "location": "import",
              "path": "../../utils/download-features"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "file-format",
        "reflect": false
      },
      "filterGeometry": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IGeometry",
          "resolved": "IGeometry",
          "references": {
            "IGeometry": {
              "location": "import",
              "path": "../../utils/download-features"
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
      "item": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IItem",
          "resolved": "IItem",
          "references": {
            "IItem": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
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
      "layers": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | number[] | ILayerOptions[]",
          "resolved": "ILayerOptions[] | number[] | string",
          "references": {
            "ILayerOptions": {
              "location": "import",
              "path": "../../utils/download-features"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "layers",
        "reflect": false
      },
      "server": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | IServerDefinition",
          "resolved": "IServerDefinition | string",
          "references": {
            "IServerDefinition": {
              "location": "import",
              "path": "../../utils/download-features"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "server",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "showError": {},
      "errorMessage": {}
    };
  }
  static get events() {
    return [{
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
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "calciteNoticeClose",
        "method": "handleCalciteNoticeClose",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisDownloadInitiated",
        "method": "clearErrors",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisDownloadSuccess",
        "method": "clearErrors",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisDownloadError",
        "method": "handleArcgisDownloadError",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "calciteInternalAccordionChange",
        "method": "handleCalciteInternalAccordionChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
