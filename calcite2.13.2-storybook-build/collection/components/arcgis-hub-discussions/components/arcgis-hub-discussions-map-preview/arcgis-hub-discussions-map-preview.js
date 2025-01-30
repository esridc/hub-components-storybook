var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { getUserThumbnailUrl } from '@esri/hub-common';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { Host, h, Fragment } from '@stencil/core';
import intlManager from '../../../../utils/intl-manager';
import { bind } from '../../../../utils/context';
import Debounce from '../../../../decorators/debounce';
import { PostSort, SortOrder, searchPosts } from '@esri/hub-discussions';
import { fetchPostDetails } from '../../../../utils/discussions/fetch-post-details';
import { fetchChannelDetails } from '../../../../utils/discussions/fetch-channel-details';
import { fetchPostUserDetails } from '../../../../utils/discussions/fetch-post-user-details';
import { getChannelName } from '../../utils/discussions';
import { getGlobalContext } from '../../../../utils/state';
export class ArcgisHubDiscussionsMapPreview {
  constructor() {
    this.locationId = undefined;
    this.postId = undefined;
    this.parentId = undefined;
    this.channelId = undefined;
    this.discussion = undefined;
    this.showChannelAvatar = undefined;
    this.loading = true;
    this.post = undefined;
    this.postCreator = undefined;
    this.channel = undefined;
    this.channelGroups = undefined;
    bind(this, 'handleViewFullThread', 'handleZoomTo', 'handleDismiss');
  }
  get _context() {
    return getGlobalContext();
  }
  /**
   * Computes creator full name string
   */
  get creatorFullName() {
    const { intl, post, postCreator } = this;
    let fullName = intl.t('anonymous');
    if (postCreator || (post === null || post === void 0 ? void 0 : post.creator)) {
      fullName = (postCreator === null || postCreator === void 0 ? void 0 : postCreator.fullName) || intl.t('privateUser');
    }
    return fullName;
  }
  /** Lifecycle Methods */
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.initialize();
  }
  componentDidRender() {
    this.arcgisHubDiscussionsPreviewDidRender.emit(this.element.offsetHeight);
  }
  /**
   * Enrich thread details
   */
  async initialize() {
    this._initialize();
  }
  async _initialize() {
    const { channelId, postId, parentId, locationId } = this;
    if (channelId && (parentId || postId || locationId)) {
      this.loading = true;
      const details = locationId && !parentId ? await this.fetchDetailsByLocationId() : await this.fetchDetails(postId);
      Object.assign(this, details, { loading: false });
      this.emitHubTelemetry(dictionary.category.interaction.action.open.label.popUp.details.post);
    }
  }
  /**
   * Fetch thread when only location id is provided
   * @returns Promise<IPostAggregate>
   */
  async fetchDetailsByLocationId() {
    const { locationId, _context, discussion } = this;
    const { items: [post], } = await searchPosts(Object.assign({ data: {
        discussion: `${discussion}%?id=%${locationId}%`,
        num: 1,
        sortBy: PostSort.UPDATED_AT,
        sortOrder: SortOrder.DESC,
        start: 1,
      } }, _context.hubRequestOptions));
    return this.fetchDetails(post.id, post);
  }
  async fetchDetails(postId, post) {
    const { _context } = this;
    const postDetails = await fetchPostDetails({ postId, post }, _context.hubRequestOptions);
    const [channelDetails, postUserDetails] = await Promise.all([
      fetchChannelDetails(postDetails, _context.hubRequestOptions),
      fetchPostUserDetails(postDetails, _context.hubRequestOptions),
    ]);
    return Object.assign(Object.assign(Object.assign({}, postDetails), channelDetails), postUserDetails);
  }
  /**
   * Telemetry helper
   * @param telemetry Dictionary string to emit
   */
  emitHubTelemetry(telemetry) {
    const { postId, parentId, channelId, channel } = this;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { postId,
      parentId,
      channelId, channelAccess: channel.access }));
  }
  /**
   * Emits arcgisHubDiscussionsViewFull
   */
  handleViewFullThread() {
    this.emitHubTelemetry(dictionary.category.interaction.action.open.label.thread.details[this.locationId ? 'location' : 'post']);
    this.arcgisHubDiscussionsViewFull.emit();
  }
  /**
   * Emits arcgisHubDiscussionsGeometryZoomTo
   */
  handleZoomTo() {
    this.emitHubTelemetry(dictionary.category.interaction.action.zoom.label.in);
    this.arcgisHubDiscussionsGeometryZoomTo.emit(this.post);
  }
  /**
   * Emits arcgisHubDiscussionsPreviewDismiss
   */
  handleDismiss() {
    this.emitHubTelemetry(dictionary.category.interaction.action.close.label.popUp.details.post);
    this.arcgisHubDiscussionsPreviewDismiss.emit();
  }
  /**
   * Renders the reply creator avatar and optionally the channel avatar
   */
  renderAvatars() {
    var _a;
    const { _context, channel, channelGroups, postCreator, post, showChannelAvatar, intl, } = this;
    const user = !postCreator && post ? { username: post.creator } : postCreator;
    return (h(Fragment, null, h("calcite-avatar", { "full-name": user === null || user === void 0 ? void 0 : user.fullName, scale: "m", thumbnail: (user === null || user === void 0 ? void 0 : user.thumbnail) && getUserThumbnailUrl(_context.hubRequestOptions.portal, user, (_a = _context.hubRequestOptions.authentication) === null || _a === void 0 ? void 0 : _a.token), "user-id": user === null || user === void 0 ? void 0 : user.id, username: user === null || user === void 0 ? void 0 : user.username }), showChannelAvatar &&
      h("calcite-avatar", { "full-name": getChannelName(channel, channelGroups, intl.t('unnamedChannel')), scale: "s" })));
  }
  /**
   * Renders main content body
   * @returns HTMLElement
   */
  renderContent() {
    const { post } = this;
    return (h(Fragment, null, h("div", { class: "avatars" }, this.renderAvatars()), h("address", null, h("b", null, this.creatorFullName), h("span", null, "\u00B7"), h("arcgis-relative-date", { dateTime: post.createdAt, formatStyle: "short" })), h("arcgis-multiline-ellipsis", { innerHTML: post.body, lines: 2 }), h("calcite-action-group", { id: "text-actions", layout: "horizontal" }, h("calcite-action", { onClick: this.handleViewFullThread, scale: "s", text: this.intl.t('view'), textEnabled: true }), false && h("calcite-action", { icon: "magnifying-glass-plus", onClick: this.handleZoomTo, scale: "s", text: this.intl.t('zoom'), textEnabled: true }), h("calcite-action", { onClick: this.handleDismiss, scale: "s", text: this.intl.t('dismiss'), textEnabled: true }))));
  }
  /**
   * Renders loading state
   * @returns HTMLArcgisHubDiscussionsPostSkeletonElement
   */
  renderLoading() {
    return h("arcgis-hub-discussions-post-skeleton", null);
  }
  render() {
    return h(Host, { "data-element": "discussions-map-preview" }, this.loading ? this.renderLoading() : this.renderContent());
  }
  static get is() { return "arcgis-hub-discussions-map-preview"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-map-preview.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-map-preview.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "locationId": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Location id of an existing feature, if associated with this discussion"
        },
        "attribute": "location-id",
        "reflect": true
      },
      "postId": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Post id for current post or parent post"
        },
        "attribute": "post-id",
        "reflect": true
      },
      "parentId": {
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
          "text": "The UUID of the parent post"
        },
        "attribute": "parent-id",
        "reflect": true
      },
      "channelId": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "UUID string of post's IChannel."
        },
        "attribute": "channel-id",
        "reflect": true
      },
      "discussion": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Discussion URI"
        },
        "attribute": "discussion",
        "reflect": true
      },
      "showChannelAvatar": {
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
          "text": "Whether to render channel avatar in the post header"
        },
        "attribute": "show-channel-avatar",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "loading": {},
      "post": {},
      "postCreator": {},
      "channel": {},
      "channelGroups": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubDiscussionsViewFull",
        "name": "arcgisHubDiscussionsViewFull",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Expands the preview to a full discussion"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsGeometryZoomTo",
        "name": "arcgisHubDiscussionsGeometryZoomTo",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Zoom to associated geometry"
        },
        "complexType": {
          "original": "IPost",
          "resolved": "IPost",
          "references": {
            "IPost": {
              "location": "import",
              "path": "@esri/hub-discussions"
            }
          }
        }
      }, {
        "method": "arcgisHubDiscussionsPreviewDidRender",
        "name": "arcgisHubDiscussionsPreviewDidRender",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits height when preview is fully rendered"
        },
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsPreviewDismiss",
        "name": "arcgisHubDiscussionsPreviewDismiss",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Dismisses the component"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits telemetry information"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "channelId",
        "methodName": "initialize"
      }, {
        "propName": "parentId",
        "methodName": "initialize"
      }, {
        "propName": "locationId",
        "methodName": "initialize"
      }, {
        "propName": "postId",
        "methodName": "initialize"
      }];
  }
}
__decorate([
  Debounce({ timeout: 0 })
], ArcgisHubDiscussionsMapPreview.prototype, "initialize", null);
