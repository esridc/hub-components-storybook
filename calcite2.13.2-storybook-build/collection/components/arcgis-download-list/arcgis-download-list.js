import { Host, h } from '@stencil/core';
import { FILE_FORMATS, isString } from '../../utils/download-features';
import { downloadRemoteFile } from '../../utils/download-list';
import { getService, parseServiceUrl } from '@esri/arcgis-rest-feature-layer';
import intlManager from '../../utils/intl-manager';
import { ServiceCapabilities, cloneObject, hasServiceCapability } from '@esri/hub-common';
import { getGlobalContext } from '../../utils';
/**
 * DEPRECATED. Use `arcgis-hub-download-list` instead. This component will be removed
 * once the new component is fully tested and ready for production.
 */
export class ArcgisDownloadList {
  constructor() {
    this.item = undefined;
    this.server = undefined;
    this.serverDefinition = undefined;
    this.layers = undefined;
    this.filterGeometry = undefined;
    this.layout = 'cards';
  }
  handleDownloadSuccess(event) {
    const { downloadUrl } = event.detail;
    downloadRemoteFile(downloadUrl);
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    await this.loadServer();
  }
  async onItemUpdate() {
    await this.loadServer();
  }
  async onServerUpdate() {
    await this.loadServer();
  }
  async loadServer() {
    const { requestOptions } = getGlobalContext();
    // Fetch definition from this.server (url)
    if (isString(this.server)) {
      // According to https://github.com/Esri/arcgis-rest-js/issues/920, this should fail.
      // However, I haven't been able to find an example that will throw an error
      this.serverDefinition = await getService({
        url: this.server,
        authentication: requestOptions.authentication
      });
      this.serverDefinition.url = this.server;
    }
    // Use definition at this.server (object)
    else if (this.server) {
      this.serverDefinition = cloneObject(this.server);
    }
    // Fetch definition from item.url
    else if (this.item) {
      const url = parseServiceUrl(this.item.url);
      this.serverDefinition = await getService({
        url,
        authentication: requestOptions.authentication
      });
      this.serverDefinition.url = url;
    }
  }
  get availableFormats() {
    let result = [];
    if (this.serverDefinition && hasServiceCapability(ServiceCapabilities.EXTRACT, this.serverDefinition)) {
      const supportedExportFormats = (this.serverDefinition.supportedExportFormats || '').split(',');
      // TODO: we'll eventually need to support custom ordering / hiding. Those settings will likely be stored in
      // item properties, so we'll only respect them if an item is passed in.
      //
      // Filter out unsupported formats and preserve the default order
      result = FILE_FORMATS.filter(f => supportedExportFormats.includes(f));
    }
    return result;
  }
  renderCards() {
    return this.availableFormats.map(format => (h("arcgis-download-list-card", { class: "list-card", fileFormat: format, filterGeometry: this.filterGeometry, item: this.item, key: format, layers: this.layers, server: this.server })));
  }
  renderLinks() {
    return this.availableFormats.map(format => (h("div", { class: "format-link", key: format }, h("arcgis-download-features-button", { appearance: "transparent", fileFormat: format, filterGeometry: this.filterGeometry, item: this.item, layers: this.layers, server: this.server, width: "full" }, this.intl.t(format)))));
  }
  renderDropdown() {
    return h("calcite-dropdown", null, h("calcite-button", { slot: "trigger" }, this.intl.t('download')), h("calcite-dropdown-group", { "selection-mode": "none" }, this.availableFormats.map(format => (h("calcite-dropdown-item", { class: "dropdown-option", key: format }, h("arcgis-download-features-button", { appearance: "transparent", fileFormat: format, filterGeometry: this.filterGeometry, item: this.item, layers: this.layers, server: this.server, width: "full" }, this.intl.t(format)))))));
  }
  render() {
    let list;
    switch (this.layout) {
      case 'links':
        list = this.renderLinks();
        break;
      case 'cards':
        list = this.renderCards();
        break;
      case 'dropdown':
        list = this.renderDropdown();
        break;
    }
    return (h(Host, { "data-element": "download-list" }, h("slot", null), h("div", null, list)));
  }
  static get is() { return "arcgis-download-list"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-download-list.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-download-list.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "item": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IItem",
          "resolved": "IItem",
          "references": {
            "IItem": {
              "location": "import",
              "path": "@esri/arcgis-rest-types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The portal item representing the targeted feature service.\n\nUsed for telemetry and for determining the service definition.\n\nWhen passed in, the service definition will be dynamically\nfetched from the root level of `item.url`'s service."
        }
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
          "text": "Either a url to (or a definition of) the targeted feature service.\nIf a url is passed, the definition will be dynamically fetched.\nWhen a definition is passed, it must include a `url` property.\n\nThis field takes precendence over the `item.url`"
        },
        "attribute": "server",
        "reflect": false
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
          "text": "Specifies which layers of the Feature Service should be included\nin a download and optionally defines filters that will be applied\nto each layer"
        },
        "attribute": "layers",
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
          "text": "Sets a geographic filter on which features should be included in\na download"
        }
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'cards' | 'links' | 'dropdown'",
          "resolved": "\"cards\" | \"dropdown\" | \"links\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Sets the layout format. As a default, the list will render with\nthe `cards` format"
        },
        "attribute": "layout",
        "reflect": false,
        "defaultValue": "'cards'"
      }
    };
  }
  static get states() {
    return {
      "serverDefinition": {}
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "item",
        "methodName": "onItemUpdate"
      }, {
        "propName": "server",
        "methodName": "onServerUpdate"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisDownloadSuccess",
        "method": "handleDownloadSuccess",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
