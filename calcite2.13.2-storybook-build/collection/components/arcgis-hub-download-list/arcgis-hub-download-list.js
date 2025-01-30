import { Host, h } from '@stencil/core';
import { getDownloadFormats } from '@esri/hub-common';
import { bind } from '../../utils/context';
import { getGlobalContext } from '../../utils/state';
import intlManager from '../../utils/intl-manager';
import { interpolateTranslations } from '../../utils';
export class ArcgisHubDownloadList {
  constructor() {
    this.entity = undefined;
    this.layerIds = undefined;
    this.geometry = undefined;
    this.where = undefined;
    this.downloadFormats = [];
    bind(this, 'renderDownloadFormat');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  componentDidLoad() {
    this.updateDownloadFormats();
  }
  /**
   * Update the list of download formats when the entity or layers change.
   *
   * NOTE: The only reason this operation is async is because anonymous downloads
   * for enterprise requires a complex flow that dynamically fetches exported items
   * from the Portal API using type keywords as discriminator. This is also the only
   * reason we have to re-fetch the download formats when the layers change.
   *
   * We'll be able to remove the "async" once createReplica is stable in enterprise.
   * and we no longer need to use this workaround.
   */
  updateDownloadFormats() {
    this.downloadFormats = !!this.entity
      ? getDownloadFormats({
        entity: this.entity,
        context: getGlobalContext(),
        layers: this.layerIds,
      })
      : [];
  }
  renderDownloadFormat(downloadFormat) {
    return downloadFormat.type === 'static'
      // Static download formats usually represent one of the following:
      // - An additional resource url (defined in the formal item metadata)
      // - A static file link to support downloading for anonymous users in enterprise
      ? this.renderStaticDownloadFormat(downloadFormat)
      // Dynamic download format files are generated on the fly by an API
      : this.renderDynamicDownloadFormat(downloadFormat);
  }
  renderStaticDownloadFormat(downloadFormat) {
    const { format, label, url } = interpolateTranslations(this.intl, downloadFormat);
    return format
      // If format is defined, assume it's a download for a well-known format
      // and use the default icons / labels for the download button
      ? h("arcgis-hub-download-list-item", { format: format, headerLabel: label, key: format, url: url })
      // If format is not defined, assume it's an additional resource link.
      // Product / design asked that we provide a different icon / label for these.
      : h("arcgis-hub-download-list-item", { buttonIconEnd: 'launch', buttonIconStart: null, buttonLabel: this.intl.t('access'), headerLabel: label, key: label, url: url });
  }
  renderDynamicDownloadFormat(downloadFormat) {
    const { format } = downloadFormat;
    return (h("arcgis-hub-download-list-item", { entity: this.entity, format: format, geometry: this.geometry, key: format, layerIds: this.layerIds, where: this.where }));
  }
  render() {
    return (h(Host, { "data-element": "download-list" }, this.downloadFormats.map(this.renderDownloadFormat)));
  }
  static get is() { return "arcgis-hub-download-list"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-download-list.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-download-list.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubEditableContent",
          "resolved": "IHubEditableContent",
          "references": {
            "IHubEditableContent": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The entity to download data from"
        }
      },
      "layerIds": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "number[]",
          "resolved": "number[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "List of layer ids that should be included in the download.\nMust be provided for Feature Service entities."
        }
      },
      "geometry": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.Geometry",
          "resolved": "Geometry",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Geometry to filter the download by."
        }
      },
      "where": {
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
          "text": "Where clause to filter the download by."
        },
        "attribute": "where",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "downloadFormats": {}
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "entity",
        "methodName": "updateDownloadFormats"
      }, {
        "propName": "layerIds",
        "methodName": "updateDownloadFormats"
      }];
  }
}
