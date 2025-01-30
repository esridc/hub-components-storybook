import { Host, h } from '@stencil/core';
import { getItemResources, removeItemResource } from '@esri/arcgis-rest-portal';
import intlManager from '../../utils/intl-manager';
import { DROP_SHADOWS, CORNERS, IMAGE_TYPES } from "../interfaces";
import { formatBytes } from '../../utils/media-gallery-utils';
import { bind } from '../../utils/context';
import { getProp, Logger, Level } from '@esri/hub-common';
import { connectContext, getGlobalContext } from '../../utils/state';
Logger.setLogLevel(Level.info);
const allowedResourceTypes = ['jpg', 'jpeg', 'gif', 'png'];
const dateFormat = { year: '2-digit', month: 'numeric', day: 'numeric' };
export class ArcgisHubMediaGallery {
  constructor() {
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
  static get is() { return "arcgis-hub-media-gallery"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-media-gallery.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-media-gallery.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "itemId": {
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
          "text": "item Id"
        },
        "attribute": "item-id",
        "reflect": false
      },
      "selectable": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "selectable",
        "reflect": false
      },
      "layout": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "'list' | 'grid'",
          "resolved": "\"grid\" | \"list\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "layout",
        "reflect": true,
        "defaultValue": "'grid'"
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "resources": {}
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "itemId",
        "methodName": "fetchResources"
      }, {
        "propName": "_context",
        "methodName": "fetchResources"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubCardAction",
        "method": "handleCardAction",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
