'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const downloadFeatures = require('./download-features-060012cd.js');
const downloadList = require('./download-list-00ce3845.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const state = require('./state-6637df8c.js');
require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const getService = require('./getService-b27eda44.js');
const util = require('./util-38e73510.js');
const helpers = require('./helpers-64227739.js');
const hostedServiceUtils = require('./hostedServiceUtils-236344a8.js');
require('./checkPermission-11ab5992.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./get-prop-4bd8fc1a.js');
require('./map-by-a7a75788.js');
require('./request-67da3c71.js');
require('./index-f4a4c954.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./clean-url-1dfecac0.js');

const arcgisDownloadListCss = ":host{display:flex;flex-direction:column}.list-card:not(:first-child){margin-top:0.75rem}.format-link:not(:first-child){margin-top:0.75rem}.dropdown-option{width:100%}";

const ArcgisDownloadList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.item = undefined;
    this.server = undefined;
    this.serverDefinition = undefined;
    this.layers = undefined;
    this.filterGeometry = undefined;
    this.layout = 'cards';
  }
  handleDownloadSuccess(event) {
    const { downloadUrl } = event.detail;
    downloadList.downloadRemoteFile(downloadUrl);
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    await this.loadServer();
  }
  async onItemUpdate() {
    await this.loadServer();
  }
  async onServerUpdate() {
    await this.loadServer();
  }
  async loadServer() {
    const { requestOptions } = state.getGlobalContext();
    // Fetch definition from this.server (url)
    if (downloadFeatures.isString(this.server)) {
      // According to https://github.com/Esri/arcgis-rest-js/issues/920, this should fail.
      // However, I haven't been able to find an example that will throw an error
      this.serverDefinition = await getService.getService({
        url: this.server,
        authentication: requestOptions.authentication
      });
      this.serverDefinition.url = this.server;
    }
    // Use definition at this.server (object)
    else if (this.server) {
      this.serverDefinition = util.cloneObject(this.server);
    }
    // Fetch definition from item.url
    else if (this.item) {
      const url = helpers.parseServiceUrl(this.item.url);
      this.serverDefinition = await getService.getService({
        url,
        authentication: requestOptions.authentication
      });
      this.serverDefinition.url = url;
    }
  }
  get availableFormats() {
    let result = [];
    if (this.serverDefinition && hostedServiceUtils.hasServiceCapability(hostedServiceUtils.ServiceCapabilities.EXTRACT, this.serverDefinition)) {
      const supportedExportFormats = (this.serverDefinition.supportedExportFormats || '').split(',');
      // TODO: we'll eventually need to support custom ordering / hiding. Those settings will likely be stored in
      // item properties, so we'll only respect them if an item is passed in.
      //
      // Filter out unsupported formats and preserve the default order
      result = downloadFeatures.FILE_FORMATS.filter(f => supportedExportFormats.includes(f));
    }
    return result;
  }
  renderCards() {
    return this.availableFormats.map(format => (index.h("arcgis-download-list-card", { class: "list-card", fileFormat: format, filterGeometry: this.filterGeometry, item: this.item, key: format, layers: this.layers, server: this.server })));
  }
  renderLinks() {
    return this.availableFormats.map(format => (index.h("div", { class: "format-link", key: format }, index.h("arcgis-download-features-button", { appearance: "transparent", fileFormat: format, filterGeometry: this.filterGeometry, item: this.item, layers: this.layers, server: this.server, width: "full" }, this.intl.t(format)))));
  }
  renderDropdown() {
    return index.h("calcite-dropdown", null, index.h("calcite-button", { slot: "trigger" }, this.intl.t('download')), index.h("calcite-dropdown-group", { "selection-mode": "none" }, this.availableFormats.map(format => (index.h("calcite-dropdown-item", { class: "dropdown-option", key: format }, index.h("arcgis-download-features-button", { appearance: "transparent", fileFormat: format, filterGeometry: this.filterGeometry, item: this.item, layers: this.layers, server: this.server, width: "full" }, this.intl.t(format)))))));
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
    return (index.h(index.Host, { "data-element": "download-list" }, index.h("slot", null), index.h("div", null, list)));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "item": ["onItemUpdate"],
    "server": ["onServerUpdate"]
  }; }
};
ArcgisDownloadList.style = arcgisDownloadListCss;

exports.arcgis_download_list = ArcgisDownloadList;
