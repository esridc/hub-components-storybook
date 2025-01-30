'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const state = require('./state-6637df8c.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const getDownloadFormats = require('./getDownloadFormats-a9f297e8.js');
require('./store-2a385ca0.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./index-f4a4c954.js');
require('./interpolate-c1fe951a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./getDownloadFlow-94a34207.js');
require('./canUseHubDownloadSystem-5b330e55.js');
require('./hostedServiceUtils-236344a8.js');
require('./index-ef80ab27.js');
require('./types-097b54b1.js');
require('./getDownloadConfiguration-1ed2582d.js');
require('./types-2810dd27.js');
require('./utils-5a74b66e.js');

const arcgisHubDownloadListCss = ":host{display:flex;flex-direction:column;gap:0.75rem}";

const ArcgisHubDownloadList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.entity = undefined;
    this.layerIds = undefined;
    this.geometry = undefined;
    this.where = undefined;
    this.downloadFormats = [];
    context.bind(this, 'renderDownloadFormat');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
      ? getDownloadFormats.getDownloadFormats({
        entity: this.entity,
        context: state.getGlobalContext(),
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
    const { format, label, url } = interpolateTranslations.interpolateTranslations(this.intl, downloadFormat);
    return format
      // If format is defined, assume it's a download for a well-known format
      // and use the default icons / labels for the download button
      ? index.h("arcgis-hub-download-list-item", { format: format, headerLabel: label, key: format, url: url })
      // If format is not defined, assume it's an additional resource link.
      // Product / design asked that we provide a different icon / label for these.
      : index.h("arcgis-hub-download-list-item", { buttonIconEnd: 'launch', buttonIconStart: null, buttonLabel: this.intl.t('access'), headerLabel: label, key: label, url: url });
  }
  renderDynamicDownloadFormat(downloadFormat) {
    const { format } = downloadFormat;
    return (index.h("arcgis-hub-download-list-item", { entity: this.entity, format: format, geometry: this.geometry, key: format, layerIds: this.layerIds, where: this.where }));
  }
  render() {
    return (index.h(index.Host, { "data-element": "download-list" }, this.downloadFormats.map(this.renderDownloadFormat)));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "entity": ["updateDownloadFormats"],
    "layerIds": ["updateDownloadFormats"]
  }; }
};
ArcgisHubDownloadList.style = arcgisHubDownloadListCss;

exports.arcgis_hub_download_list = ArcgisHubDownloadList;
