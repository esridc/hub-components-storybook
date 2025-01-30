import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { g as getDownloadFormats } from './getDownloadFormats-3dc2a95d.js';
import './store-0a6cb79f.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './index-213c70d0.js';
import './interpolate-d39d6151.js';
import './_commonjsHelpers-11ca3be1.js';
import './getDownloadFlow-6c6d04d5.js';
import './canUseHubDownloadSystem-a22afbb9.js';
import './hostedServiceUtils-f22b023b.js';
import './index-edff2d62.js';
import './types-2eaa1a18.js';
import './getDownloadConfiguration-6cb6d32f.js';
import './types-303cd4d6.js';
import './utils-cde3af49.js';

const arcgisHubDownloadListCss = ":host{display:flex;flex-direction:column;gap:0.75rem}";

const ArcgisHubDownloadList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "entity": ["updateDownloadFormats"],
    "layerIds": ["updateDownloadFormats"]
  }; }
};
ArcgisHubDownloadList.style = arcgisHubDownloadListCss;

export { ArcgisHubDownloadList as arcgis_hub_download_list };
