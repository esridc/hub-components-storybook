'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const interfaces = require('./interfaces-fc0046ff.js');
const mediaGalleryUtils = require('./media-gallery-utils-2a448ebd.js');
const context = require('./context-0167a31e.js');
const state = require('./state-6637df8c.js');
const logger = require('./logger-5db3d659.js');
const get = require('./get-0368c931.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const remove = require('./remove-921f5dc7.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./tslib.es6-e7faa7f3.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./request-67da3c71.js');
require('./append-custom-params-0f5d0fe2.js');

const arcgisHubMediaGalleryCss = ":host([layout='grid']){display:grid;gap:0.5rem;grid-template-columns:repeat(auto-fill, minmax(max(400px, (100% - (4 - 1) * 0.5rem) / 4), 1fr))}:host([layout='list']) arcgis-hub-card{margin-bottom:0.5rem}";

logger.Logger.setLogLevel(logger.Level.info);
const allowedResourceTypes = ['jpg', 'jpeg', 'gif', 'png'];
const dateFormat = { year: '2-digit', month: 'numeric', day: 'numeric' };
const ArcgisHubMediaGallery = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this._context = state.getGlobalContext();
    this.itemId = undefined;
    this.selectable = undefined;
    this.layout = 'grid';
    this.resources = [];
    context.bind(this, 'renderImageResource');
  }
  connectedCallback() {
    state.connectContext(this);
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
      const response = await get.getItemResources(this.itemId, { portal: portalSharingUrl });
      this.resources = response.resources;
    }
    catch (error) {
      const msg = getProp.getProp(error, 'message');
      logger.Logger.error(msg);
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
        await remove.removeItemResource({
          authentication: (_b = this._context) === null || _b === void 0 ? void 0 : _b.session,
          id: this.itemId,
          resource: resourceToRemove
        });
        this.fetchResources();
      }
      catch (error) {
        const msg = getProp.getProp(error, 'message');
        logger.Logger.error(msg);
      }
    }
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
    size = mediaGalleryUtils.formatBytes(size);
    return `size:${size}|dateCreated:${date}|resourceName:${name}`;
  }
  renderImageResource(res) {
    const actionLinks = [{ action: 'delete-action', icon: 'trash', label: this.intl.t('deleteFile') }];
    const thumbnailUrl = this.getImageUrl(res.resource);
    return (index.h("arcgis-hub-card", { "additional-info": this.getPopoverInfo(res.size, res.created, res.resource), cardActionLinks: actionLinks, corners: interfaces.CORNERS.round, family: "image", identifier: res.resource, imageType: interfaces.IMAGE_TYPES.thumbnail, layout: this.layout === 'grid' ? "card" : "row", lazy: true, selectable: this.selectable, shadow: interfaces.DROP_SHADOWS.medium, showOwner: false, showThumbnail: true, thumbnailUrl: thumbnailUrl, type: "Image" }));
  }
  render() {
    return (index.h(index.Host, null, this.imageResources.map(this.renderImageResource)));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "itemId": ["fetchResources"],
    "_context": ["fetchResources"]
  }; }
};
ArcgisHubMediaGallery.style = arcgisHubMediaGalleryCss;

exports.arcgis_hub_media_gallery = ArcgisHubMediaGallery;
