import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as isString, F as FILE_FORMATS } from './download-features-e3ac76f6.js';
import { d as downloadRemoteFile } from './download-list-38d6b571.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { g as getService } from './getService-e61b8c6e.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { p as parseServiceUrl } from './helpers-8c7e5e31.js';
import { h as hasServiceCapability, S as ServiceCapabilities } from './hostedServiceUtils-f22b023b.js';
import './checkPermission-6c5be250.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './get-prop-ec5be510.js';
import './map-by-a2234e13.js';
import './request-fa80ae40.js';
import './index-213c70d0.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './clean-url-dff2b6ee.js';

const arcgisDownloadListCss = ":host{display:flex;flex-direction:column}.list-card:not(:first-child){margin-top:0.75rem}.format-link:not(:first-child){margin-top:0.75rem}.dropdown-option{width:100%}";

const ArcgisDownloadList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "item": ["onItemUpdate"],
    "server": ["onServerUpdate"]
  }; }
};
ArcgisDownloadList.style = arcgisDownloadListCss;

export { ArcgisDownloadList as arcgis_download_list };
