import { h, Host } from '@stencil/core';
import { getTotalRecordCount, CreateReplicaOptionsBuilder, storeCreateReplicaError, isString, isNumberArray, isILayerOptionsArray, fileFormatToDisplayName, getDownloadUrlFromService, shouldRecordDownloadErrors } from '../../utils/download-features';
import { bind } from '../../utils/context';
import { parseServiceUrl } from '@esri/arcgis-rest-feature-layer';
import { dictionary, constants as telemetryConstants } from '@esri/telemetry-dictionary-hub';
import intlManager from '../../utils/intl-manager';
import { getGlobalContext } from '../../utils/state';
/**
 * DEPRECATED. Use `arcgis-hub-download-list` instead. This component will be
 * removed once the new component is fully tested and ready for production.
 */
export class ArcgisDownloadFeaturesButton {
  constructor() {
    /**
     * Defines the amount of time (in milliseconds) that the button will display in a success or error state
     *
     * E.g., after the "successful download" state has been displayed for _resetInterval milliseconds,
     * the button will go back to the default state
     */
    this._resetInterval = 3000;
    this.item = undefined;
    this.server = undefined;
    this.layers = undefined;
    this.fileFormat = undefined;
    this.filterGeometry = undefined;
    this.appearance = 'solid';
    this.width = 'auto';
    this.loading = false;
    this.status = undefined;
    this.totalFeatureCount = undefined;
    this.replicaProgress = undefined;
    bind(this, 'handleClick');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get hasSlottedContent() {
    return !!this.element.innerHTML;
  }
  get serviceUrl() {
    let url;
    if (isString(this.server)) {
      url = this.server;
    }
    else if (this.server) {
      url = this.server.url;
    }
    else if (this.item) {
      url = parseServiceUrl(this.item.url);
    }
    return url;
  }
  /**
   * Resets the button to its default state after a set interval
   */
  resetAfterInterval() {
    this._resetTimeoutId = setTimeout(() => {
      this.status = null;
      this._resetTimeoutId = null;
    }, this._resetInterval);
  }
  async handleClick() {
    if (this.loading) {
      return;
    }
    this._resetTimeoutId && clearTimeout(this._resetTimeoutId);
    this.loading = true;
    this.status = 'Pending';
    const { serviceUrl, fileFormat } = this;
    const start = new Date().valueOf();
    try {
      this.arcgisDownloadInitiated.emit();
      const { requestOptions } = getGlobalContext();
      const options = this.createReplicaOptions;
      this.totalFeatureCount = await getTotalRecordCount(serviceUrl, options, requestOptions.authentication);
      const downloadUrl = await getDownloadUrlFromService({
        serviceUrl,
        statusChangeEvent: this._createReplicaStatusChange,
        authentication: requestOptions.authentication,
        createReplicaOptions: options,
        pollTime: 2000
      });
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.download), { label: fileFormatToDisplayName(fileFormat), details: serviceUrl, response: telemetryConstants.response.SUCCESS, duration: new Date().valueOf() - start }));
      this.arcgisDownloadSuccess.emit({ serviceUrl, fileFormat, downloadUrl });
    }
    catch (error) {
      const { hubUrl } = getGlobalContext();
      this.status = 'Failed';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.download), { label: fileFormatToDisplayName(fileFormat), details: serviceUrl, response: `${telemetryConstants.response.FAILURE} | ${error.message}}`, duration: new Date().valueOf() - start }));
      this.arcgisDownloadError.emit({ serviceUrl, fileFormat, error });
      // TODO: move to hub.js or remove this once Hub download API is
      // used for hosted downloads instead of create replica API
      if (shouldRecordDownloadErrors(getGlobalContext())) {
        storeCreateReplicaError(hubUrl, {
          itemId: this.item.id,
          layers: this.createReplicaOptions.layers,
          jobId: error.jobId,
          format: this.fileFormat
        });
      }
    }
    this.loading = false;
    this.resetAfterInterval();
  }
  handleCreateReplicaStatusChange(event) {
    event.preventDefault();
    const { status, recordCount } = event.detail;
    this.replicaProgress = recordCount / this.totalFeatureCount;
    this.status = status;
  }
  get createReplicaOptions() {
    let layers;
    let layerQueries;
    if (isString(this.layers)) {
      layers = this.layers;
      layerQueries = this.layers
        .split(',')
        .reduce((queries, id) => {
        queries[+id] = { queryOption: 'all' };
        return queries;
      }, {});
    }
    else if (isNumberArray(this.layers)) {
      layers = this.layers.join(',');
      layerQueries = this.layers
        .reduce((queries, id) => {
        queries[id] = { queryOption: 'all' };
        return queries;
      }, {});
    }
    else if (isILayerOptionsArray(this.layers)) {
      layers = this.layers
        .map(layer => layer.id)
        .join(',');
      layerQueries = this.layers
        .reduce((queries, { id, where }) => {
        queries[id] = { queryOption: 'all' };
        if (where) {
          queries[id] = {
            where,
            queryOption: 'useFilter',
          };
        }
        return queries;
      }, {});
    }
    let builder = new CreateReplicaOptionsBuilder();
    if (layers) {
      builder = builder.layers(layers);
    }
    if (layerQueries) {
      builder = builder.layerQueries(layerQueries);
    }
    if (this.fileFormat) {
      builder = builder.dataFormat(this.fileFormat);
    }
    if (this.filterGeometry) {
      builder = builder.geometry(this.filterGeometry);
    }
    return builder.build();
  }
  get loadingButtonContent() {
    return this.status === 'ExportingData'
      ? h("span", null, Math.round(this.replicaProgress * 100), "% ", this.intl.t(this.status))
      : this.intl.t(this.status);
  }
  get buttonDisplayConfig() {
    let result = this.hasSlottedContent
      ? { content: h("slot", null) }
      : { content: this.intl.t('download'), icon: 'downloadTo' };
    if (this.loading) {
      result = { content: this.loadingButtonContent };
    }
    else if (this.status === 'Completed') {
      result = { content: this.intl.t('Completed'), icon: 'check' };
    }
    else if (this.status === 'Failed') {
      result = { content: this.intl.t('failure'), icon: 'exclamationMarkTriangle' };
    }
    return result;
  }
  renderProgressBar() {
    if (this.loading && this.status === 'ExportingData') {
      return h("calcite-progress", { type: "determinate", value: this.replicaProgress });
    }
  }
  render() {
    const { icon, content } = this.buttonDisplayConfig;
    return (h(Host, { "data-element": "download-features-button" }, this.renderProgressBar(), h("calcite-button", { appearance: this.appearance, disabled: this.loading, "icon-start": icon, loading: this.loading, onClick: this.handleClick, scale: "l", width: this.width }, h("div", { class: "button-text" }, " ", content, " "))));
  }
  static get is() { return "arcgis-download-features-button"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-download-features-button.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-download-features-button.css"]
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
          "text": "The portal item representing the targeted feature service.\nUsed for determining the service's root url."
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
          "text": "Either a url to (or a definition of) the targeted feature service.\nWhen a definition, it must include a `url` property.\nThis field takes precendence over the `item.url`"
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
          "text": "The format of the file to download"
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
          "text": "Sets a geographic filter on which features should be included in\na download"
        }
      },
      "appearance": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'solid' | 'outline' | 'transparent'",
          "resolved": "\"outline\" | \"solid\" | \"transparent\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Pass-through prop to the underlying calcite button.\nSets predefined styling classes"
        },
        "attribute": "appearance",
        "reflect": false,
        "defaultValue": "'solid'"
      },
      "width": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'auto' | 'full' | 'half'",
          "resolved": "\"auto\" | \"full\" | \"half\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Pass-through prop to the underlying calcite button.\nSets width of the button"
        },
        "attribute": "width",
        "reflect": false,
        "defaultValue": "'auto'"
      }
    };
  }
  static get states() {
    return {
      "loading": {},
      "status": {},
      "totalFeatureCount": {},
      "replicaProgress": {}
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
      }, {
        "method": "_createReplicaStatusChange",
        "name": "_createReplicaStatusChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [{
              "name": "private",
              "text": "This event is used in utility function `getDownloadUrlFromService()`\nwhere it emits status and exported record count from create replica.\nConsumers of this component should not listen to this event."
            }],
          "text": ""
        },
        "complexType": {
          "original": "ICreateReplicaStatusChangePayload",
          "resolved": "ICreateReplicaStatusChangePayload",
          "references": {
            "ICreateReplicaStatusChangePayload": {
              "location": "import",
              "path": "../../utils/download-features"
            }
          }
        }
      }, {
        "method": "arcgisDownloadSuccess",
        "name": "arcgisDownloadSuccess",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits when the feature service successfully makes the file and has it\nready for client download"
        },
        "complexType": {
          "original": "{ serviceUrl: string, fileFormat: string, downloadUrl: string }",
          "resolved": "{ serviceUrl: string; fileFormat: string; downloadUrl: string; }",
          "references": {}
        }
      }, {
        "method": "arcgisDownloadError",
        "name": "arcgisDownloadError",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits when an error occurs in the file-making process"
        },
        "complexType": {
          "original": "{ serviceUrl: string, fileFormat: string, error: any }",
          "resolved": "{ serviceUrl: string; fileFormat: string; error: any; }",
          "references": {}
        }
      }, {
        "method": "arcgisDownloadInitiated",
        "name": "arcgisDownloadInitiated",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits when the button is clicked and the file-making process begins"
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "createReplicaStatusChange",
        "method": "handleCreateReplicaStatusChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
