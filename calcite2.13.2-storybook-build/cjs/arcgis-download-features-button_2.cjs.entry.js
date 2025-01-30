'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const downloadFeatures = require('./download-features-060012cd.js');
const context = require('./context-0167a31e.js');
const index$1 = require('./index-6f16fe65.js');
const intlManager = require('./intl-manager-f0103583.js');
const state = require('./state-6637df8c.js');
const helpers = require('./helpers-64227739.js');
require('./checkPermission-11ab5992.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./get-prop-4bd8fc1a.js');
require('./map-by-a7a75788.js');
require('./request-67da3c71.js');
require('./util-38e73510.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./clean-url-1dfecac0.js');

const arcgisDownloadFeaturesButtonCss = ":host{display:block}.button-text{font-size:var(--calcite-font-size-1);line-height:1.5rem}";

const ArcgisDownloadFeaturesButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this._createReplicaStatusChange = index.createEvent(this, "_createReplicaStatusChange", 7);
    this.arcgisDownloadSuccess = index.createEvent(this, "arcgisDownloadSuccess", 7);
    this.arcgisDownloadError = index.createEvent(this, "arcgisDownloadError", 7);
    this.arcgisDownloadInitiated = index.createEvent(this, "arcgisDownloadInitiated", 7);
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
    context.bind(this, 'handleClick');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get hasSlottedContent() {
    return !!this.element.innerHTML;
  }
  get serviceUrl() {
    let url;
    if (downloadFeatures.isString(this.server)) {
      url = this.server;
    }
    else if (this.server) {
      url = this.server.url;
    }
    else if (this.item) {
      url = helpers.parseServiceUrl(this.item.url);
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
      const { requestOptions } = state.getGlobalContext();
      const options = this.createReplicaOptions;
      this.totalFeatureCount = await downloadFeatures.getTotalRecordCount(serviceUrl, options, requestOptions.authentication);
      const downloadUrl = await downloadFeatures.getDownloadUrlFromService({
        serviceUrl,
        statusChangeEvent: this._createReplicaStatusChange,
        authentication: requestOptions.authentication,
        createReplicaOptions: options,
        pollTime: 2000
      });
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.download), { label: downloadFeatures.fileFormatToDisplayName(fileFormat), details: serviceUrl, response: index$1.dist.constants.response.SUCCESS, duration: new Date().valueOf() - start }));
      this.arcgisDownloadSuccess.emit({ serviceUrl, fileFormat, downloadUrl });
    }
    catch (error) {
      const { hubUrl } = state.getGlobalContext();
      this.status = 'Failed';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.download), { label: downloadFeatures.fileFormatToDisplayName(fileFormat), details: serviceUrl, response: `${index$1.dist.constants.response.FAILURE} | ${error.message}}`, duration: new Date().valueOf() - start }));
      this.arcgisDownloadError.emit({ serviceUrl, fileFormat, error });
      // TODO: move to hub.js or remove this once Hub download API is
      // used for hosted downloads instead of create replica API
      if (downloadFeatures.shouldRecordDownloadErrors(state.getGlobalContext())) {
        downloadFeatures.storeCreateReplicaError(hubUrl, {
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
    if (downloadFeatures.isString(this.layers)) {
      layers = this.layers;
      layerQueries = this.layers
        .split(',')
        .reduce((queries, id) => {
        queries[+id] = { queryOption: 'all' };
        return queries;
      }, {});
    }
    else if (downloadFeatures.isNumberArray(this.layers)) {
      layers = this.layers.join(',');
      layerQueries = this.layers
        .reduce((queries, id) => {
        queries[id] = { queryOption: 'all' };
        return queries;
      }, {});
    }
    else if (downloadFeatures.isILayerOptionsArray(this.layers)) {
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
    let builder = new downloadFeatures.CreateReplicaOptionsBuilder();
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
      ? index.h("span", null, Math.round(this.replicaProgress * 100), "% ", this.intl.t(this.status))
      : this.intl.t(this.status);
  }
  get buttonDisplayConfig() {
    let result = this.hasSlottedContent
      ? { content: index.h("slot", null) }
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
      return index.h("calcite-progress", { type: "determinate", value: this.replicaProgress });
    }
  }
  render() {
    const { icon, content } = this.buttonDisplayConfig;
    return (index.h(index.Host, { "data-element": "download-features-button" }, this.renderProgressBar(), index.h("calcite-button", { appearance: this.appearance, disabled: this.loading, "icon-start": icon, loading: this.loading, onClick: this.handleClick, scale: "l", width: this.width }, index.h("div", { class: "button-text" }, " ", content, " "))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisDownloadFeaturesButton.style = arcgisDownloadFeaturesButtonCss;

const arcgisDownloadListCardUiCss = ":host{display:block;border-width:1px;border-style:solid}.list-card-content{position:relative;margin:1rem;display:flex;flex-direction:column;gap:0.75rem}.list-card-header{display:flex;flex-direction:row;align-items:center;gap:0.5rem}::slotted([slot=\"header\"]){font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium);overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}";

const ArcgisDownloadListCardUi = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.icon = undefined;
  }
  render() {
    return (index.h(index.Host, { "data-element": "download-list-card-ui" }, index.h("div", { class: "list-card-content" }, index.h("div", { class: "list-card-header" }, this.icon && index.h("calcite-icon", { icon: this.icon }), index.h("slot", { name: "header" })), index.h("slot", { name: "button" }), index.h("slot", { name: "errors" }))));
  }
  get element() { return index.getElement(this); }
};
ArcgisDownloadListCardUi.style = arcgisDownloadListCardUiCss;

exports.arcgis_download_features_button = ArcgisDownloadFeaturesButton;
exports.arcgis_download_list_card_ui = ArcgisDownloadListCardUi;
