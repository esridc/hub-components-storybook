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
import { h, Host, Fragment } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { getUserThumbnailUrl, isDiscussable } from '@esri/hub-common';
import MinPromiseDelay from '../../decorators/min-promise-delay';
import { fetchEntityDetails } from '../../utils/discussions/fetch-entity-details';
import { searchPosts } from '@esri/hub-discussions';
import { CORNERS } from '../interfaces';
import { fetchEnvironmentDetails } from '../../utils/discussions/fetch-environment-details';
import { fetchDiscussionSettings } from '../../utils/discussions/fetch-discussion-settings';
import { fetchChannelDetails } from '../../utils/discussions/fetch-channel-details';
import CallWhen from '../../decorators/call-when';
import { bind } from '../../utils/context';
import Memoize from '../../decorators/memoize';
import Sanitize from '../../decorators/sanitize';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { connectContext, getGlobalContext } from '../../utils/state';
export class ArcgisHubDiscussionsView {
  /**
   * Pre-binds context to methods that get passed as references/callbacks.
   * @constructor
   */
  constructor() {
    this._context = getGlobalContext();
    this.entity = undefined;
    this.entityId = undefined;
    this.entityType = undefined;
    this.isHub = undefined;
    this.isMobile = undefined;
    this.channel = undefined;
    this.channelId = undefined;
    this.allowedChannelIds = undefined;
    this.showViewButton = undefined;
    this.intl = undefined;
    this.pending = true;
    this.postCount = undefined;
    bind(this, 'handleViewButtonClicked');
  }
  /**
   * Component will load lifecycle event, loads translations and dependencies
   */
  async componentWillLoad() {
    await this.loadTranslations();
    this.loadDependencies();
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  /**
   * Loads translations
   */
  async loadTranslations() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Loads dependencies and manages pending state
   */
  loadDependencies() {
    if (this._context) {
      this.pending = true;
      return this.fetchDependencies().then(dependencies => {
        Object.assign(this, dependencies, { pending: false });
      });
    }
  }
  /**
   * Fetches dependencies, enforcing a minimum delay so skeleton state can be observed
   */
  fetchDependencies() {
    return this._fetchDependencies();
  }
  /**
   * Handles changes to `context`, loads dependencies
   * @param context
   * @param prevContext
   */
  handleContextChanged(context, prevContext) {
    var _a, _b;
    if (((_a = context === null || context === void 0 ? void 0 : context.currentUser) === null || _a === void 0 ? void 0 : _a.username) !== ((_b = prevContext === null || prevContext === void 0 ? void 0 : prevContext.currentUser) === null || _b === void 0 ? void 0 : _b.username)) {
      this.loadDependencies();
    }
  }
  /**
   * Fetches and resolves all dependencies
   */
  async _fetchDependencies() {
    var _a;
    const { entity, entityId, entityType, _context, isHub, channel } = this;
    let { channelId, allowedChannelIds } = this;
    const [environmentDetails, entityDetails] = await Promise.all([
      fetchEnvironmentDetails({ isHub }, _context.hubRequestOptions),
      fetchEntityDetails({ entity, entityId, entityType, discussionType: 'board' }, _context.hubRequestOptions),
    ]);
    if (!channel && !channelId) {
      ({ allowedChannelIds } = allowedChannelIds === undefined ? await fetchDiscussionSettings(entityDetails.entity.id, _context.hubRequestOptions) : { allowedChannelIds });
      channelId = allowedChannelIds === null || allowedChannelIds === void 0 ? void 0 : allowedChannelIds[0];
    }
    let channelDetails;
    let postCount = 0;
    if (channel || channelId) {
      [channelDetails, { total: postCount }] = await Promise.all([
        fetchChannelDetails({ channelId, channel }, _context.hubRequestOptions),
        searchPosts(Object.assign({ data: {
            channels: [(_a = channel === null || channel === void 0 ? void 0 : channel.id) !== null && _a !== void 0 ? _a : channelId],
            discussion: entityDetails.discussion,
            num: 1,
            parents: [],
          } }, _context.hubRequestOptions)),
      ]);
    }
    return Object.assign(Object.assign(Object.assign(Object.assign({}, environmentDetails), entityDetails), channelDetails), { postCount });
  }
  /**
   * Handles when 'View Discussion' button is clicked and emits
   * arcgisHubDiscussionsViewButtonClicked
   */
  handleViewButtonClicked() {
    this.arcgisHubDiscussionsViewButtonClicked.emit();
    this.hubTelemetry.emit(dictionary.category.navigation.action.view.label.content.details.discussion);
  }
  /**
   * Checks if discussion item is currently discussable
   */
  get isOpenForSubmissions() {
    return Boolean(this.channel && this.entity) && isDiscussable(this.entity);
  }
  /**
   * Date range for last 30 days in ISO 8601 date time string format
   */
  get dateRange() {
    const today = new Date();
    const thirtyDaysAgoFromToday = new Date(new Date().setDate(today.getDate() - 30));
    return [thirtyDaysAgoFromToday.toISOString(), today.toISOString()];
  }
  /**
   * Sanitizes the entity description
   */
  get sanitizedEntityDescription() {
    var _a;
    return (_a = this.entity) === null || _a === void 0 ? void 0 : _a.description;
  }
  renderHeader() {
    var _a, _b, _c, _d, _e, _f, _g;
    const { entity, isOpenForSubmissions, _context, intl, handleViewButtonClicked, showViewButton } = this;
    return (h("div", { class: "entity-view-header" }, h("div", { class: "entity-view-header__hero" }, h("div", { class: "entity-view-header__thumbnail" }, h("arcgis-hub-image", { alt: intl.t('image'), corners: CORNERS.round, fallback: "https://static.arcgis.com/images/discussion.png", src: entity === null || entity === void 0 ? void 0 : entity.thumbnailUrl })), h("div", { class: "entity-view-header__details" }, h("div", { class: "entity-view-header__status" }, intl.t(isOpenForSubmissions ? 'statusOpen' : 'statusClosed')), h("header", { class: "entity-view-header__title" }, entity === null || entity === void 0 ? void 0 : entity.title), h("div", { class: "entity-view-header__avatar" }, h("calcite-avatar", { fullName: (_a = entity === null || entity === void 0 ? void 0 : entity.ownerUser) === null || _a === void 0 ? void 0 : _a.fullName, scale: "l", thumbnail: ((_b = entity === null || entity === void 0 ? void 0 : entity.ownerUser) === null || _b === void 0 ? void 0 : _b.thumbnail) &&
        getUserThumbnailUrl(_context.hubRequestOptions.portal, entity.ownerUser, (_c = _context.hubRequestOptions.authentication) === null || _c === void 0 ? void 0 : _c.token), userId: (_d = entity === null || entity === void 0 ? void 0 : entity.ownerUser) === null || _d === void 0 ? void 0 : _d.id, username: (_e = entity === null || entity === void 0 ? void 0 : entity.ownerUser) === null || _e === void 0 ? void 0 : _e.username }), h("div", { class: "entity-view-header__avatar-details" }, h("div", { class: "entity-view-header__avatar-name" }, (_f = entity === null || entity === void 0 ? void 0 : entity.ownerUser) === null || _f === void 0 ? void 0 : _f.fullName), h("div", { class: "entity-view-header__avatar-org" }, (_g = entity === null || entity === void 0 ? void 0 : entity.org) === null || _g === void 0 ? void 0 : _g.name))), showViewButton && (h("div", { class: "entity-view-header__view-action" }, h("calcite-button", { onClick: handleViewButtonClicked, round: true }, intl.t('view'))))))));
  }
  renderMain() {
    var _a, _b;
    const { entity, intl, sanitizedEntityDescription } = this;
    return (h("div", { class: "entity-view-body entity-view-main" }, Boolean((_a = entity === null || entity === void 0 ? void 0 : entity.snippet) === null || _a === void 0 ? void 0 : _a.length) && (h("div", { class: "entity-view-main__summary" }, h("h2", null, intl.t('summary')), h("div", null, entity.snippet))), Boolean((_b = entity === null || entity === void 0 ? void 0 : entity.description) === null || _b === void 0 ? void 0 : _b.length) && (h("div", { class: "entity-view-main__description" }, h("h2", null, intl.t('description')), h("div", { innerHTML: sanitizedEntityDescription })))));
  }
  renderMetadata() {
    const { entity, intl, isOpenForSubmissions } = this;
    return (h("div", { class: "entity-view-side-bar__metadata" }, h("h2", null, intl.t('details')), h("arcgis-hub-entity-metadata", { entity: entity, exclude: ['owner'] }, h("calcite-block", { description: intl.t('discussionBoard'), heading: intl.t('discussion') }, h("calcite-icon", { icon: "speech-bubble", slot: "icon-start" })), h("calcite-block", { description: intl.t(isOpenForSubmissions ? 'statusOpen' : 'statusClosed'), heading: intl.t(isOpenForSubmissions ? 'titleOpen' : 'titleClosed') }, h("calcite-icon", { icon: "mega-phone", slot: "icon-start" })))));
  }
  renderMetrics() {
    const { postCount, dateRange, intl } = this;
    return (h("div", { class: "entity-view-side-bar__metrics" }, h("h2", null, intl.t('metrics')), h("div", { class: "entity-view-metric" }, h("calcite-icon", { icon: "graph-bar" }), h("div", null, h("div", { class: "heading" }, intl.t('metric.pageViews')), h("arcgis-telemetry-report", { contentId: `portal:${this.entityId}`, endDate: dateRange[1], reportTitle: intl.t('metric.pageViews'), startDate: dateRange[0], telemetryEvent: 'page-views', type: "value" }))), h("div", { class: "entity-view-metric" }, h("calcite-icon", { icon: "speech-bubbles" }), h("div", null, h("div", { class: "heading" }, intl.t('metric.postCount')), h("div", null, intl.formatNumber(postCount))))));
  }
  renderTags() {
    var _a;
    const { entity, intl } = this;
    return (h("div", { class: "entity-view-side-bar__tags" }, h("h2", null, intl.t('tags')), (_a = entity === null || entity === void 0 ? void 0 : entity.tags) === null || _a === void 0 ? void 0 :
      _a.map(tag => {
        const _tag = encodeURIComponent(tag.toLowerCase());
        return (h("calcite-chip", { key: tag, value: tag }, h("calcite-link", { href: `/search?tags=${_tag}`, target: "_self" }, tag)));
      })));
  }
  renderCategories() {
    var _a;
    const { entity, intl } = this;
    return (h("div", { class: "entity-view-side-bar__categories" }, h("h2", null, intl.t('categories')), (_a = entity === null || entity === void 0 ? void 0 : entity.categories) === null || _a === void 0 ? void 0 :
      _a.map(category => {
        const _category = encodeURIComponent(category.toLowerCase());
        return (h("calcite-chip", { key: category, value: category }, h("calcite-link", { href: `/search?categories=${_category}`, target: "_self" }, category)));
      })));
  }
  renderSidebar() {
    return (h("div", { class: "entity-view-body entity-view-side-bar" }, this.renderMetadata(), this.renderMetrics(), this.renderTags(), this.renderCategories()));
  }
  renderSkeleton() {
    return (h(Fragment, null, h("div", { class: "entity-view-header" }, h("div", { class: "entity-view-header__hero" }, h("arcgis-skeleton-loader", { active: true, rows: 0, showHeading: false, showThumbnail: !this.isMobile }), h("arcgis-skeleton-loader", { active: true, rows: 4, showHeading: false }))), h("div", { class: "entity-view-body skeleton" }, h("arcgis-skeleton-loader", { active: true, rows: 2, showHeading: true }), h("arcgis-skeleton-loader", { active: true, rows: 4, showHeading: true })), h("div", { class: "entity-view-body entity-view-side-bar skeleton" }, h("arcgis-skeleton-loader", { active: true, rows: 10, showHeading: true }), h("arcgis-skeleton-loader", { active: true, rows: 4, showHeading: true }), h("arcgis-skeleton-loader", { active: true, rows: 1, showHeading: true }), h("arcgis-skeleton-loader", { active: true, rows: 1, showHeading: true }))));
  }
  renderView() {
    return (h(Fragment, null, this.renderHeader(), this.renderMain(), this.renderSidebar()));
  }
  render() {
    return (h(Host, { "data-element": "discussions-view" }, h("div", { class: `entity-view${this.isMobile ? '-mobile' : ''}` }, this.pending ? this.renderSkeleton() : this.renderView())));
  }
  static get is() { return "arcgis-hub-discussions-view"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-view.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-view.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IHubContent | IGroup",
          "resolved": "IGroup | IHubContent",
          "references": {
            "IHubContent": {
              "location": "import",
              "path": "@esri/hub-common"
            },
            "IGroup": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "A reference to the discussion board entity (content or group). If not provided, it will\nbe fetched using the given `entityId` and `entityType`."
        }
      },
      "entityId": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The UUID of the discussion board entity (content or group). Can be provided when a reference\nto the `entity` is not availabile in a higher scope."
        },
        "attribute": "entity-id",
        "reflect": true
      },
      "entityType": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The type of discussion board entity (content or group). Can be provided when a reference\nto the `entity` is not availabile in a higher scope."
        },
        "attribute": "entity-type",
        "reflect": true
      },
      "isHub": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "If the discussion board component is rendered within the context of a Hub Site application.\nIf not explicitly provided, the domain record will be fetched from the domains service to\ndetermine."
        },
        "attribute": "is-hub",
        "reflect": false
      },
      "isMobile": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "If the body width is < 768px"
        },
        "attribute": "is-mobile",
        "reflect": true
      },
      "channel": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IChannel",
          "resolved": "IChannel",
          "references": {
            "IChannel": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The IChannel record, if available. Providing `channel` will prevent the call to fetch\nthe entity settings and the IChannel record."
        }
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
          "text": "The channel ID, if known. Providing `channelId` will prevent the call to fetch the\nentity settings. If `channel` is not provided, the IChannel record will be fetched."
        },
        "attribute": "channel-id",
        "reflect": true
      },
      "allowedChannelIds": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The allowed channel IDs from the entity settings, if known. Providing `allowedChannelIds` will\nprevent the call to fetch the entity settings when `channelId` and `channel` are not provided."
        }
      },
      "showViewButton": {
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
          "text": "Whether to show 'View discussion' button, which emits `arcgisHubDiscussionsViewButtonClicked` event"
        },
        "attribute": "show-view-button",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "intl": {},
      "pending": {},
      "postCount": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubDiscussionsViewButtonClicked",
        "name": "arcgisHubDiscussionsViewButtonClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when 'View discussion' button clicked"
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
          "text": "Emits hub telemetry"
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
        "propName": "_context",
        "methodName": "handleContextChanged"
      }];
  }
}
__decorate([
  MinPromiseDelay({ delay: 300 })
], ArcgisHubDiscussionsView.prototype, "fetchDependencies", null);
__decorate([
  Memoize('entity.description'),
  Sanitize()
], ArcgisHubDiscussionsView.prototype, "sanitizedEntityDescription", null);
__decorate([
  CallWhen({
    when() {
      var _a, _b;
      return (_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.tags) === null || _b === void 0 ? void 0 : _b.filter(t => t.length).length;
    },
  })
], ArcgisHubDiscussionsView.prototype, "renderTags", null);
__decorate([
  CallWhen({
    when() {
      var _a, _b;
      return (_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.categories) === null || _b === void 0 ? void 0 : _b.filter(t => t.length).length;
    },
  })
], ArcgisHubDiscussionsView.prototype, "renderCategories", null);
