import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as isString, g as getTotalRecordCount, b as getDownloadUrlFromService, f as fileFormatToDisplayName, s as shouldRecordDownloadErrors, c as storeCreateReplicaError, d as isNumberArray, e as isILayerOptionsArray, C as CreateReplicaOptionsBuilder } from './download-features-e3ac76f6.js';
import { b as bind } from './context-7d8f7366.js';
import { d as dist } from './index-dd3f99ac.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { p as parseServiceUrl } from './helpers-8c7e5e31.js';
import './checkPermission-6c5be250.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './get-prop-ec5be510.js';
import './map-by-a2234e13.js';
import './request-fa80ae40.js';
import './util-3e6872d9.js';
import './_commonjsHelpers-11ca3be1.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './clean-url-dff2b6ee.js';

const arcgisDownloadFeaturesButtonCss = ":host{display:block}.button-text{font-size:var(--calcite-font-size-1);line-height:1.5rem}";

const ArcgisDownloadFeaturesButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this._createReplicaStatusChange = createEvent(this, "_createReplicaStatusChange", 7);
    this.arcgisDownloadSuccess = createEvent(this, "arcgisDownloadSuccess", 7);
    this.arcgisDownloadError = createEvent(this, "arcgisDownloadError", 7);
    this.arcgisDownloadInitiated = createEvent(this, "arcgisDownloadInitiated", 7);
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.download), { label: fileFormatToDisplayName(fileFormat), details: serviceUrl, response: dist.constants.response.SUCCESS, duration: new Date().valueOf() - start }));
      this.arcgisDownloadSuccess.emit({ serviceUrl, fileFormat, downloadUrl });
    }
    catch (error) {
      const { hubUrl } = getGlobalContext();
      this.status = 'Failed';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.download), { label: fileFormatToDisplayName(fileFormat), details: serviceUrl, response: `${dist.constants.response.FAILURE} | ${error.message}}`, duration: new Date().valueOf() - start }));
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisDownloadFeaturesButton.style = arcgisDownloadFeaturesButtonCss;

const arcgisDownloadListCardUiCss = ":host{display:block;border-width:1px;border-style:solid}.list-card-content{position:relative;margin:1rem;display:flex;flex-direction:column;gap:0.75rem}.list-card-header{display:flex;flex-direction:row;align-items:center;gap:0.5rem}::slotted([slot=\"header\"]){font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium);overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}";

const ArcgisDownloadListCardUi = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.icon = undefined;
  }
  render() {
    return (h(Host, { "data-element": "download-list-card-ui" }, h("div", { class: "list-card-content" }, h("div", { class: "list-card-header" }, this.icon && h("calcite-icon", { icon: this.icon }), h("slot", { name: "header" })), h("slot", { name: "button" }), h("slot", { name: "errors" }))));
  }
  get element() { return getElement(this); }
};
ArcgisDownloadListCardUi.style = arcgisDownloadListCardUiCss;

export { ArcgisDownloadFeaturesButton as arcgis_download_features_button, ArcgisDownloadListCardUi as arcgis_download_list_card_ui };
