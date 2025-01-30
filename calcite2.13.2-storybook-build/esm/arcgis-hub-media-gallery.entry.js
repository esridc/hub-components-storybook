import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { C as CORNERS, I as IMAGE_TYPES, D as DROP_SHADOWS } from './interfaces-0d0bef14.js';
import { f as formatBytes } from './media-gallery-utils-99b9c1e7.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getGlobalContext, h as connectContext } from './state-31a09db0.js';
import { L as Logger, a as Level } from './logger-f8667200.js';
import { b as getItemResources } from './get-f0caeb52.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { a as removeItemResource } from './remove-7361a90a.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './tslib.es6-7023f322.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './request-fa80ae40.js';
import './append-custom-params-4bd856e5.js';

const arcgisHubMediaGalleryCss = ":host([layout='grid']){display:grid;gap:0.5rem;grid-template-columns:repeat(auto-fill, minmax(max(400px, (100% - (4 - 1) * 0.5rem) / 4), 1fr))}:host([layout='list']) arcgis-hub-card{margin-bottom:0.5rem}";

Logger.setLogLevel(Level.info);
const allowedResourceTypes = ['jpg', 'jpeg', 'gif', 'png'];
const dateFormat = { year: '2-digit', month: 'numeric', day: 'numeric' };
const ArcgisHubMediaGallery = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this._context = getGlobalContext();
    this.itemId = undefined;
    this.selectable = undefined;
    this.layout = 'grid';
    this.resources = [];
    bind(this, 'renderImageResource');
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  getImageUrl(file) {
    var _a;
    const id = this.itemId;
    const portalSharingUrl = (_a = this._context) === null || _a === void 0 ? void 0 : _a.sharingApiUrl;
    return portalSharingUrl
      ? `${portalSharingUrl}/content/items/${id}/resources/${file}`
      : undefined;
  }
  /**
   * Convert the unix timestamp to 'month day, year' format
   */
  parseCreatedDate(timestamp) {
    return this.intl.formatDate(timestamp, dateFormat);
  }
  /**
   * Fetch the resources of itemId
   */
  async fetchResources() {
    var _a;
    if (!this.itemId) {
      return;
    }
    // resetting resources back to an empty array to to resolve a possible race condition on delete
    this.resources = [];
    try {
      const portalSharingUrl = (_a = this._context) === null || _a === void 0 ? void 0 : _a.sharingApiUrl;
      const response = await getItemResources(this.itemId, { portal: portalSharingUrl });
      this.resources = response.resources;
    }
    catch (error) {
      const msg = getProp(error, 'message');
      Logger.error(msg);
    }
  }
  /**
   * Remove a resource of itemId
   */
  async handleCardAction(evt) {
    var _a, _b;
    evt.stopPropagation();
    if (evt.detail.action === 'delete-action' && ((_a = this._context) === null || _a === void 0 ? void 0 : _a.session)) {
      const resourceToRemove = evt.detail.model.id;
      try {
        await removeItemResource({
          authentication: (_b = this._context) === null || _b === void 0 ? void 0 : _b.session,
          id: this.itemId,
          resource: resourceToRemove
        });
        this.fetchResources();
      }
      catch (error) {
        const msg = getProp(error, 'message');
        Logger.error(msg);
      }
    }
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    return this.fetchResources();
  }
  get imageResources() {
    return this.resources.filter(resource => {
      const resourceType = resource.resource.split('.')[1];
      return allowedResourceTypes.includes(resourceType);
    });
  }
  getPopoverInfo(size, date, name) {
    date = this.parseCreatedDate(date);
    size = formatBytes(size);
    return `size:${size}|dateCreated:${date}|resourceName:${name}`;
  }
  renderImageResource(res) {
    const actionLinks = [{ action: 'delete-action', icon: 'trash', label: this.intl.t('deleteFile') }];
    const thumbnailUrl = this.getImageUrl(res.resource);
    return (h("arcgis-hub-card", { "additional-info": this.getPopoverInfo(res.size, res.created, res.resource), cardActionLinks: actionLinks, corners: CORNERS.round, family: "image", identifier: res.resource, imageType: IMAGE_TYPES.thumbnail, layout: this.layout === 'grid' ? "card" : "row", lazy: true, selectable: this.selectable, shadow: DROP_SHADOWS.medium, showOwner: false, showThumbnail: true, thumbnailUrl: thumbnailUrl, type: "Image" }));
  }
  render() {
    return (h(Host, null, this.imageResources.map(this.renderImageResource)));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "itemId": ["fetchResources"],
    "_context": ["fetchResources"]
  }; }
};
ArcgisHubMediaGallery.style = arcgisHubMediaGalleryCss;

export { ArcgisHubMediaGallery as arcgis_hub_media_gallery };
