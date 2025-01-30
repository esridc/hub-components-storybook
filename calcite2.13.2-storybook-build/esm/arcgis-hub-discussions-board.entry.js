import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { f as fetchEnvironmentDetails, a as fetchEntityDetails } from './fetch-entity-details-b1fdb71f.js';
import { f as fetchChannelDetails } from './fetch-channel-details-82aa13f7.js';
import { m as minPromiseDelayFactory } from './min-promise-delay-d6a589f6.js';
import { S as SanitizeDecoratorFactory } from './sanitize-1830cdda.js';
import { C as CORNERS } from './interfaces-0d0bef14.js';
import { b as bind } from './context-7d8f7366.js';
import { d as downloadPostCSV, g as getChannelName } from './discussions-a173baa3.js';
import { f as fetchDiscussionSettings } from './fetch-discussion-settings-9829ac8d.js';
import { q as geojsonToArcGIS } from './compose-d5b83ab7.js';
import Polygon from '@arcgis/core/geometry/Polygon.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import { g as getGlobalContext, h as connectContext, d as showNotice } from './state-31a09db0.js';
import { d as dist } from './index-dd3f99ac.js';
import { i as isDiscussable, a as SharingAccess } from './utils-6bf1b713.js';
import { c as canEditItem } from './can-edit-item-e533d8e4.js';
import { g as getRelativeWorkspaceUrl } from './getRelativeWorkspaceUrl-ac123b7f.js';
import { g as getProp } from './get-prop-ec5be510.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './domain-exists-4fd7dc09.js';
import './teams-38e72623.js';
import './cache-4bea61e0.js';
import './get-850c466d.js';
import './tslib.es6-7023f322.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './request-fa80ae40.js';
import './append-custom-params-4bd856e5.js';
import './channels-3a706fa2.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './channels-2574fd6e.js';
import './index-55cb25f7.js';
import './_commonjsHelpers-11ca3be1.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './download-list-38d6b571.js';
import './store-0a6cb79f.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './fetchContent-dbc662af.js';
import './tslib.es6-9c17e83a.js';
import './_enrichments-8641475c.js';
import './util-3e6872d9.js';
import './get-with-default-b819d95d.js';
import './get-f0caeb52.js';
import './helpers-8c7e5e31.js';
import './OperationError-387ae9ab.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './slugs-7b8828d5.js';
import './is-guid-982831aa.js';
import './index-edff2d62.js';
import './get-family-543fac52.js';
import './getLayer-464ff70e.js';
import './tslib.es6-0e03e357.js';
import './update-6a7d5697.js';
import './update-26e2fbc1.js';
import './settings-2d4e159a.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './generate-random-string-1436d9e6.js';
import './is-update-group-7b9eb0ea.js';
import './getTypeFromEntity-e149b61e.js';

const arcgisHubDiscussionsBoardCss = ".sc-arcgis-hub-discussions-board-h{display:block;background-color:var(--calcite-color-background);font-size:var(--calcite-font-size--1);line-height:1rem}.map-integrator-container.sc-arcgis-hub-discussions-board{height:var(--max-discussion-board-height, 100%)}.map-container.sc-arcgis-hub-discussions-board{position:relative;height:100%}arcgis-hub-map.sc-arcgis-hub-discussions-board{height:100%}.sc-arcgis-hub-discussions-board-h:not([is-mobile]):not([layout=\"map\"]) .hero-and-content-container.sc-arcgis-hub-discussions-board{display:grid;column-gap:3.5rem;padding:1rem;grid-template-columns:minmax(20.5rem, 25rem) minmax(20rem, 53.5rem);grid-template-rows:1fr}.sc-arcgis-hub-discussions-board-h:not([is-mobile])[layout=\"map\"] .hero-and-content-container.sc-arcgis-hub-discussions-board:has(arcgis-hub-discussions-thread){padding:0px}.sc-arcgis-hub-discussions-board-h:not([is-mobile]):not([layout=\"map\"]) .map-integrator-container.sc-arcgis-hub-discussions-board{position:absolute;width:0.125rem;top:-9999999999999999999999px;left:-9999999999999999999999px}.sc-arcgis-hub-discussions-board-h:not([is-mobile])[layout=\"map\"] .board-container.sc-arcgis-hub-discussions-board{display:grid;grid-template-columns:minmax(20.5rem, 25rem) 1fr}.sc-arcgis-hub-discussions-board-h:not([is-mobile])[layout=\"map\"] .hero-and-content-container.sc-arcgis-hub-discussions-board{position:relative;box-sizing:border-box;overflow-y:auto;overflow-x:hidden;padding:1rem;height:var(--max-discussion-board-height, auto)}.sc-arcgis-hub-discussions-board-h:not([is-mobile])[layout=\"map\"] .hero-and-content-container.sc-arcgis-hub-discussions-board:has(arcgis-hub-discussions-thread) .discussions_hero.sc-arcgis-hub-discussions-board{padding:1rem}[is-mobile].sc-arcgis-hub-discussions-board-h:not([layout=\"map\"]) .map-integrator-container.sc-arcgis-hub-discussions-board{position:absolute;width:0.125rem;top:-9999999999999999999999px;left:-9999999999999999999999px}[is-mobile].sc-arcgis-hub-discussions-board-h:not([layout=\"map\"]) .hero-and-content-container.sc-arcgis-hub-discussions-board{position:relative;box-sizing:border-box;overflow-y:auto;overflow-x:hidden;padding:1rem;height:var(--max-discussion-board-height, auto)}[is-mobile].sc-arcgis-hub-discussions-board-h:not([layout=\"map\"]) .hero-and-content-container.sc-arcgis-hub-discussions-board:has(arcgis-hub-discussions-thread){padding:0px}[is-mobile][parent-id].sc-arcgis-hub-discussions-board-h:not([layout=\"map\"]) .hero-and-content-container.sc-arcgis-hub-discussions-board{background-color:var(--calcite-color-foreground-1);padding:0px}[is-mobile][parent-id].sc-arcgis-hub-discussions-board-h:not([layout=\"map\"]) .discussions_hero.sc-arcgis-hub-discussions-board{display:none}[is-mobile].sc-arcgis-hub-discussions-board-h:not([layout=\"map\"]) .discussions_content.sc-arcgis-hub-discussions-board{padding-bottom:1.5rem}[is-mobile][layout=\"map\"].sc-arcgis-hub-discussions-board-h .hero-and-content-container.sc-arcgis-hub-discussions-board{display:none}[is-mobile][layout=\"map\"].sc-arcgis-hub-discussions-board-h .map-integrator-container.sc-arcgis-hub-discussions-board{position:relative}.toggle-container-outer.sc-arcgis-hub-discussions-board{position:sticky;bottom:1rem;z-index:100000}.toggle-container-inner.sc-arcgis-hub-discussions-board{position:relative;display:flex;justify-content:center}.toggle-container-inner.sc-arcgis-hub-discussions-board calcite-fab.sc-arcgis-hub-discussions-board{position:absolute;bottom:1rem}.discussions_hero.sc-arcgis-hub-discussions-board{margin-bottom:2rem;overflow-wrap:break-word}.discussions_intro.sc-arcgis-hub-discussions-board{display:grid;row-gap:1rem}.sc-arcgis-hub-discussions-board-h:not([is-mobile]) .discussions_intro.sc-arcgis-hub-discussions-board{grid-template-columns:minmax(20.5rem, 25rem)}.discussions_channel_warning.sc-arcgis-hub-discussions-board{font-size:var(--calcite-font-size--1);line-height:1rem}.discussions_channel_status.sc-arcgis-hub-discussions-board{display:grid;grid-template-rows:repeat(2, minmax(0, 1fr));row-gap:0.25rem;column-gap:0.25rem;font-size:var(--calcite-font-size--1);line-height:1rem;grid-template-columns:auto 32px}.discussions_channel_status__info.sc-arcgis-hub-discussions-board{grid-row-start:2;display:flex;flex-wrap:nowrap;font-size:var(--calcite-font-size--1);line-height:1rem}.discussions_channel_status__status.sc-arcgis-hub-discussions-board{font-weight:var(--calcite-font-weight-medium);text-transform:uppercase;color:var(--calcite-color-text-2)}.discussions_channel_status__name.sc-arcgis-hub-discussions-board{word-break:break-all;color:var(--calcite-color-text-2);overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.discussions_channel_status_options.sc-arcgis-hub-discussions-board{grid-row:span 2 / span 2;align-self:center;justify-self:end}.discussions_channel_status__info.sc-arcgis-hub-discussions-board>span.sc-arcgis-hub-discussions-board{display:flex;width:1rem;justify-content:center}.discussions_entity_details.sc-arcgis-hub-discussions-board{display:grid;row-gap:0.5rem}.sc-arcgis-hub-discussions-board-h:not([is-mobile]) .discussions_entity_details.sc-arcgis-hub-discussions-board{grid-template-columns:minmax(20.5rem, 25rem)}.discussions_entity_details.sc-arcgis-hub-discussions-board>header.sc-arcgis-hub-discussions-board{font-size:var(--calcite-font-size-3);line-height:2rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}.discussions_entity_details.sc-arcgis-hub-discussions-board>div.sc-arcgis-hub-discussions-board{font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-color-text-1)}[is-mobile].sc-arcgis-hub-discussions-board-h .discussions_entity_details.sc-arcgis-hub-discussions-board>header.sc-arcgis-hub-discussions-board{font-size:var(--calcite-font-size-0);line-height:1.25rem}arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-board{margin-bottom:2rem}arcgis-hub-discussions-post-list.sc-arcgis-hub-discussions-board{--arcgis-hub-layout-list-min-column-width:20rem;--arcgis-hub-layout-list-gap:1rem;--arcgis-hub-layout-list-actions-gap:.25rem;--arcgis-hub-layout-list-actions-margin:1rem;background-color:var(--calcite-color-background)}calcite-panel.sc-arcgis-hub-discussions-board [slot=\"header-actions-start\"].sc-arcgis-hub-discussions-board{border-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);border-inline-end-width:1px}calcite-notice.sc-arcgis-hub-discussions-board{margin-bottom:1rem}arcgis-hub-discussions-view.sc-arcgis-hub-discussions-board{padding-left:3.5rem;padding-right:3.5rem;padding-top:1rem;padding-bottom:1rem}[is-mobile].sc-arcgis-hub-discussions-board-h arcgis-hub-discussions-view.sc-arcgis-hub-discussions-board{padding:1rem}#draw-tools-container.sc-arcgis-hub-discussions-board{display:none}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// TODO: disable or (preferably) remove post-editor css transitions?
// TODO: custom board empty state?
const alertConfig = {
  autoClose: true,
  autoCloseDuration: 'fast',
  icon: true,
  noticeType: 'alert'
};
const ArcgisHubDiscussionsBoard = class {
  /**
   * Pre-binds context to methods that get passed as references/callbacks.
   * @constructor
   */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubDiscussionsViewThread = createEvent(this, "arcgisHubDiscussionsViewThread", 7);
    this.arcgisAppIdentityStartSignIn = createEvent(this, "arcgisAppIdentityStartSignIn", 7);
    this.arcgisHubDiscussionsFeatureDeleted = createEvent(this, "arcgisHubDiscussionsFeatureDeleted", 7);
    this.arcgisHubDiscussionsFeature = createEvent(this, "arcgisHubDiscussionsFeature", 7);
    this.arcgisHubPostEditorReady = createEvent(this, "arcgisHubPostEditorReady", 7);
    this.arcgisHubGeometryFeatureSelect = createEvent(this, "arcgisHubGeometryFeatureSelect", 7);
    this.arcgisHubGeometryFeatureHover = createEvent(this, "arcgisHubGeometryFeatureHover", 7);
    this.arcgisHubGeometryDrawCreate = createEvent(this, "arcgisHubGeometryDrawCreate", 7);
    this.arcgisHubGeometryDrawTypeSelect = createEvent(this, "arcgisHubGeometryDrawTypeSelect", 7);
    this.arcgisHubGeometryDrawEdit = createEvent(this, "arcgisHubGeometryDrawEdit", 7);
    this.arcgisHubGeometryDrawEditCancel = createEvent(this, "arcgisHubGeometryDrawEditCancel", 7);
    this.arcgisHubGeometryDrawReset = createEvent(this, "arcgisHubGeometryDrawReset", 7);
    this.arcgisHubGeometrySelect = createEvent(this, "arcgisHubGeometrySelect", 7);
    this.arcgisHubGeometryDeselect = createEvent(this, "arcgisHubGeometryDeselect", 7);
    this.arcgisHubFeatureRemove = createEvent(this, "arcgisHubFeatureRemove", 7);
    this.arcgisHubGeometryClearAll = createEvent(this, "arcgisHubGeometryClearAll", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.arcgisHubDiscussionsViewChanged = createEvent(this, "arcgisHubDiscussionsViewChanged", 7);
    this.arcgisHubDiscussionsLayoutChanged = createEvent(this, "arcgisHubDiscussionsLayoutChanged", 7);
    this.entity = undefined;
    this.entityId = undefined;
    this.entityType = undefined;
    this.parentId = undefined;
    this.postId = undefined;
    this.channelId = undefined;
    this.isHub = undefined;
    this.isMobile = undefined;
    this.layout = 'list';
    this.unsavedFeatures = [];
    this.unsavedRelatedFeatures = [];
    this.unsavedExistingFeatures = [];
    this.hasMap = false;
    this.view = 'explore';
    this._context = getGlobalContext();
    this.allowedChannelIds = undefined;
    this.allowedLocations = undefined;
    this.displayFieldValid = undefined;
    this.displayFieldValue = undefined;
    this.displayFieldKey = undefined;
    this.intl = undefined;
    this.pending = true;
    this.channel = undefined;
    this.channelGroups = undefined;
    this.discussion = undefined;
    this.blockedWords = undefined;
    this.defaultChannelId = undefined;
    this.postRefs = {};
    this.listScrollTarget = undefined;
    this.threadScrollTarget = undefined;
    this.postListProps = undefined;
    this.threadProps = undefined;
    this.mapView = undefined;
    this.drawRef = undefined;
    this.searchRef = undefined;
    bind(this, 'renderParent', 'handlePostReady', 'handleBackToList', 'handleBackToThread', 'handleThreadReady', 'handlePostListReady', 'handlePostListUpdated', 'handleAboutSelected', 'handleAboutBack', 'handleSignInClicked', 'handleLayoutToggleClicked', 'handleMapViewReady', 'handleDiscussionsDownloadClick');
  }
  /**
   * Component will load lifecycle event, loads translations and dependencies
   */
  componentWillLoad() {
    this.loadTranslations();
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
   * From within the 'about flow' panel header, set view to
   * default when user clicks back
   */
  handleAboutBack() {
    this.changeView('explore');
  }
  handleSignInClicked() {
    this.arcgisAppIdentityStartSignIn.emit();
  }
  handleLayoutToggleClicked() {
    this.changeLayout(this.layout === 'map' ? 'list' : 'map');
  }
  /**
   * Set's mapView state to instance emitted by arcgisHubMapViewReady and
   * clears any default UI components
   */
  async handleMapViewReady(evt) {
    const { view } = evt.detail;
    view.ui.components = [];
    await view.when();
    this.mapView = view;
  }
  /**
   * Fetches dependencies, enforcing a mininimum delay so skeleton state can be observed
   */
  fetchDependencies() {
    return this._fetchDependencies();
  }
  /**
   * Fetches and resolves all dependencies
   */
  async _fetchDependencies() {
    var _a;
    const { isHub, _context, entity, entityId, entityType } = this;
    const [environmentDetails, entityDetails] = await Promise.all([
      fetchEnvironmentDetails({ isHub }, _context.hubRequestOptions),
      fetchEntityDetails({ entity, entityId, entityType, discussionType: 'board' }, _context.hubRequestOptions),
    ]);
    const discussionSettings = await fetchDiscussionSettings(entityDetails.entity.id, _context.hubRequestOptions);
    let channelDetails;
    if ((_a = discussionSettings.allowedChannelIds) === null || _a === void 0 ? void 0 : _a.length) {
      channelDetails = await fetchChannelDetails({ channelId: discussionSettings.allowedChannelIds[0] }, _context.hubRequestOptions);
    }
    return Object.assign(Object.assign(Object.assign(Object.assign({}, environmentDetails), entityDetails), discussionSettings), channelDetails);
  }
  /**
   * Computes true when intl or dependencies are loading or context is not provided
   */
  get isLoading() {
    const { intl, _context, pending } = this;
    return !intl || !_context || pending;
  }
  /**
   * Determines if the board is open for discussions.
   */
  get isOpenForSubmissions() {
    return Boolean(this.channel) && isDiscussable(this.entity);
  }
  /**
   * Computes the appropriate access icon configuration
   */
  get accessIcon() {
    const { intl, channel } = this;
    let icon;
    let label;
    if (channel.access === SharingAccess.PRIVATE) {
      icon = 'lock';
      label = intl.t('visiblePrivate');
    }
    else if (channel.access === SharingAccess.ORG) {
      icon = 'organization';
      label = intl.t('visibleOrg');
    }
    else {
      icon = 'globe';
      label = intl.t('visibleAll');
    }
    return { icon, label };
  }
  /**
   * Computes the notice configuration
   */
  get noticeConfig() {
    let config;
    const { relativeWorkspaceUrl, entity, _context, channel, isOpenForSubmissions, parentId, allowedChannelIds } = this;
    if (channel) {
      if (!parentId) {
        if (!isOpenForSubmissions) {
          config = {
            kind: 'warning',
            title: 'statusClosed',
            message: 'statusClosedMessage',
          };
        }
        else if (!(_context === null || _context === void 0 ? void 0 : _context.currentUser)) {
          config = {
            title: 'signInTitle',
            kind: 'info',
            icon: 'information',
            link: {
              text: 'signInAction',
              action: this.handleSignInClicked,
            },
          };
        }
      }
    }
    else {
      // TODO: support other entity types, e.g. groups?
      const canEdit = _context.currentUser && canEditItem(entity.item, _context.currentUser);
      const isChannelConfigured = Boolean(allowedChannelIds === null || allowedChannelIds === void 0 ? void 0 : allowedChannelIds.length);
      if (isChannelConfigured) {
        config = canEdit ? {
          title: 'channelNotAccessibleEditableTitle',
          message: 'channelNotAccessibleEditableMessage',
          link: {
            text: 'channelNotAccessibleEditableAction',
            href: relativeWorkspaceUrl,
          },
          kind: 'warning',
          icon: 'exclamation-mark-triangle',
        } : {
          title: 'channelNotAccessibleNonEditableTitle',
          message: 'channelNotAccessibleNonEditableMessage',
          kind: 'warning',
          icon: 'exclamation-mark-triangle',
        };
      }
      else {
        config = canEdit ? {
          title: 'channelNotSetTitle',
          message: 'channelNotSetMessage',
          link: {
            text: 'channelNotSetAction',
            href: relativeWorkspaceUrl,
          },
          kind: 'danger',
          icon: 'exclamation-mark-triangle',
        } : {
          title: 'comingSoonTitle',
          message: 'comingSoonMessage',
          kind: 'warning',
          icon: 'exclamation-mark-triangle',
        };
      }
    }
    return config;
  }
  /**
   * Computes the relative workspace url for the discussion board
   */
  get relativeWorkspaceUrl() {
    const { isHub, _context, entity, entityId } = this;
    return (isHub ? '' : _context.hubUrl) + getRelativeWorkspaceUrl(entity.type, entityId, 'participation');
  }
  /**
   * The alternative location description string when not in map layout
   */
  get locationDescriptionText() {
    let description;
    // TODO: If we configure boards to optionally not include a map layout,
    // we should disable layout descriptions altogether
    if (this.layout !== 'map') {
      description = this.intl.t('locationDescriptionText');
    }
    return description;
  }
  get allowedLocationsArcGIS() {
    var _a;
    return (_a = this.allowedLocations) === null || _a === void 0 ? void 0 : _a.map(geom => new Polygon(geojsonToArcGIS(geom)));
  }
  /**
   * The entity's map settings values,
   * allows for custom map or scene under discussion
   * e.g.: { baseViewItemId: 'abc123' }
   */
  get mapSettings() {
    return getProp(this.entity, 'data.view.mapSettings');
  }
  /**
   * Sanitizes the entity prompt
   */
  get sanitizedEntityPrompt() {
    var _a;
    return (_a = this.entity.data) === null || _a === void 0 ? void 0 : _a.prompt;
  }
  async handlePostDeleted(evt) {
    var _a, _b;
    const { postListProps, threadProps } = this;
    const isDeletedPost = ({ id }) => id === evt.detail.id;
    if ((_a = this.postListProps) === null || _a === void 0 ? void 0 : _a.items.find(isDeletedPost)) {
      this.postListProps = Object.assign(Object.assign({}, postListProps), { items: postListProps.items.filter(item => !isDeletedPost(item)), nextStart: postListProps.nextStart > -1 ? postListProps.nextStart - 1 : postListProps.nextStart, total: postListProps.total - 1 });
    }
    if (evt.detail.id === ((_b = threadProps === null || threadProps === void 0 ? void 0 : threadProps.parent) === null || _b === void 0 ? void 0 : _b.id)) {
      this.threadProps = Object.assign(Object.assign({}, threadProps), { parent: null });
    }
    this.arcgisHubDiscussionsFeatureDeleted.emit(evt.detail);
  }
  /**
   * Handles the event that's emitted when a post is edited, updates the edited post
   * from any cached post list or thread results
   * @param evt A arcgisHubDiscussionsPostEdit event
   */
  async handlePostEdited(evt) {
    var _a, _b;
    const { postListProps, threadProps } = this;
    const isEditedPost = ({ id }) => id === evt.detail.id;
    if ((_a = this.postListProps) === null || _a === void 0 ? void 0 : _a.items.find(isEditedPost)) {
      this.postListProps = Object.assign(Object.assign({}, postListProps), { items: postListProps.items.map(item => (isEditedPost(item) ? evt.detail : item)) });
    }
    if (evt.detail.id === ((_b = threadProps === null || threadProps === void 0 ? void 0 : threadProps.parent) === null || _b === void 0 ? void 0 : _b.id)) {
      this.threadProps = Object.assign(Object.assign({}, threadProps), { parent: evt.detail });
    }
    this.arcgisHubDiscussionsFeature.emit({ post: evt.detail, create: false });
  }
  /**
   * Handles arcgisHubDiscussionsPostSelect events and emits arcgisHubDiscussionsViewThread
   * when a user elects to view a full thread
   * @param evt A arcgisHubDiscussionsPostEdit event
   */
  handlePostSelect(evt) {
    const { parentId, channelId, channel, channelGroups, parent, parentCreator, parentCreatorOrg, scrollTarget, postId, post, postCreator, postCreatorOrg } = evt.detail;
    Object.assign(this, {
      parentId,
      channelId,
      threadScrollTarget: scrollTarget,
      listScrollTarget: parentId,
      postId,
      showPostEditor: false,
      threadProps: parentId
        ? {
          channel,
          channelGroups,
          parent,
          parentCreator,
          parentCreatorOrg,
          post,
          postCreator,
          postCreatorOrg,
        }
        : null,
    });
    this.arcgisHubDiscussionsViewThread.emit({ parentId, channelId });
  }
  /**
   * Handles arcgisHubDiscussionsPostListLayoutChanged events to modify layout when switched
   * to map layout
   * @param evt arcgisHubDiscussionsPostListLayoutChanged event
   */
  handleLayoutChanged(evt) {
    evt.stopPropagation();
    this.activeFeature = undefined;
    this.changeLayout(evt.detail);
  }
  /**
   * Re-emits arcgisHubPostEditorReady so map integrator can reconcile the event
   * @param evt arcgisHubDiscussionsPostEditorReady event
   */
  handlePostEditorReady(evt) {
    const { detail: post } = evt;
    evt.stopPropagation();
    if (!evt.target.hidden) {
      // Only emit for explicit post edits, not hidden element renders
      this.arcgisHubPostEditorReady.emit(post);
    }
  }
  /**
   * Handles arcgisHubDiscussionsPostCreate events, emits arcgisHubDiscussionsFeature
   * @param evt arcgisHubDiscussionsPostCreate event
   */
  handlePostCreate(evt) {
    this.arcgisHubDiscussionsFeature.emit({ post: evt.detail, create: true });
  }
  /**
   * Handles the event that's emitted when a feature is to be selected on
   * the map
   * @param evt A custom event with a Feature payload
   */
  handleGeometryFeatureSelect(evt) {
    evt.stopPropagation();
    if (this.layout !== 'map') {
      // Switch to map layout if feature selected
      this.activeFeature = evt.detail;
      this.changeLayout('map');
    }
    else if (this.layout === 'map' && this.isMobile) {
      // On mobile, toggle map view if feature selected
      this.changeLayout('map');
    }
    // wait for other events to race up the dom before emitting so highlight works as expected
    setTimeout(() => {
      this.arcgisHubGeometryFeatureSelect.emit(evt.detail);
    }, 250);
  }
  handleDrawDone() {
    if (this.layout === 'map' && this.isMobile) {
      this.changeLayout('list');
    }
  }
  /**
   * Handles the event that's emitted when a feature is hovered on
   * the map
   * @param evt A custom event with a Feature payload
   */
  handleGeometryFeatureHover(evt) {
    evt.stopPropagation();
    this.arcgisHubGeometryFeatureHover.emit(evt.detail);
  }
  /**
   * Handles the event that's emitted when a drawing geometry is to be
   * captured on the map
   * @param evt A custom event with post or reply ID payload
   */
  handleGeometryDrawCreate(evt) {
    evt.stopPropagation();
    this.arcgisHubGeometryDrawCreate.emit(evt.detail);
    this.changeLayout('map');
  }
  /**
   * Handles the event that's emitted when a user selects a specific
   * geometry type to draw
   * @param evt A custom event with type Tool payload
   */
  handleGeometryDrawTypeSelect(evt) {
    evt.stopPropagation();
    this.arcgisHubGeometryDrawTypeSelect.emit(evt.detail);
  }
  /**
   * Handles the event that's emitted when a drawing is to be edited
   * on the map
   * @param evt A custom event with a Feature payload
   */
  handleGeometryDrawEdit(evt) {
    evt.stopPropagation();
    this.arcgisHubGeometryDrawEdit.emit(evt.detail);
  }
  /**
   * Handles the event that's emitted when a drawing that is being edited
   * on the map is canceled
   * @param evt A custom event with a Feature payload
   */
  handleGeometryDrawEditCancel(evt) {
    evt.stopPropagation();
    this.arcgisHubGeometryDrawEditCancel.emit();
  }
  /**
   * Handles the event that's emitted when a drawing is to be reset
   * on the map
   * @param evt A custom event
   */
  handleGeometryDrawReset(evt) {
    evt.stopPropagation();
    this.arcgisHubGeometryDrawReset.emit();
  }
  /**
   * Handles the event that's emitted when a drawing geometry is to
   * be selected on the map
   * @param evt A custom event with a post or reply ID payload
   */
  handleGeometrySelect(evt) {
    evt.stopPropagation();
    this.arcgisHubGeometrySelect.emit(evt.detail);
  }
  /**
   *
   * Handles the event that's emitted when a feature should
   * be removed from the map
   */
  handleFeatureRemove(evt) {
    evt.stopPropagation();
    this.arcgisHubFeatureRemove.emit(evt.detail);
  }
  /**
   * Handles the event that's emitted when a drawing geometry is to
   * be deselected on the map
   * @param evt A custom event
   */
  handleGeometryDeselect(evt) {
    evt.stopPropagation();
    this.arcgisHubGeometryDeselect.emit();
  }
  /**
   *
   * Handles the event to clear all staging graphics from
   * the map editor
   */
  handleGeometryClearAll(evt) {
    evt.stopPropagation();
    this.arcgisHubGeometryClearAll.emit();
  }
  async handleDiscussionsDownloadClick() {
    const telemetry = Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.download.label.csv.details.export), { channelId: this.channel.id, channelAccess: this.channel.access });
    try {
      const { size, count, duration } = await downloadPostCSV({
        entityTitle: this.entity.title,
        discussion: this.discussion,
        channels: [this.channelId],
        requestOptions: this._context.hubRequestOptions,
      });
      this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { size,
        count,
        duration, response: dist.constants.response.SUCCESS }));
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { response: dist.constants.response.FAILURE }));
      showNotice({
        title: this.intl.t('download.error'),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') }),
      });
    }
    this.discussionOptionsPopoverEl.open = false;
  }
  /**
   * Scrolls to the given HTMLElement
   * @param target HTMLElement
   */
  scrollToTarget(target) {
    if (this.heroContentContainerEl && target) {
      this.heroContentContainerEl.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: target.offsetTop,
      });
    }
  }
  /**
   * Updates the view to the given view and emits an arcgisHubDiscussionsLayoutChanged
   * event with the given layout
   * @param layout
   */
  changeView(view) {
    this.view = view;
    this.arcgisHubDiscussionsViewChanged.emit(view);
  }
  /**
   * Updates the layout to the given layout and emits an arcgisHubDiscussionsLayoutChanged
   * event with the given layout
   * @param layout
   */
  changeLayout(layout) {
    this.layout = layout;
    this.arcgisHubDiscussionsLayoutChanged.emit(layout);
  }
  /**
   * Optionally scrolls to the post editor or post list upon drilling into a thread
   * when the Reply or View N replies actions are clicked,
   */
  async scrollToThreadTarget() {
    var _a, _b;
    let target;
    if (this.threadScrollTarget === 'list') {
      target = await ((_a = this.thread) === null || _a === void 0 ? void 0 : _a.getPostListRef());
    }
    else if (this.threadScrollTarget === 'editor') {
      target = await ((_b = this.thread) === null || _b === void 0 ? void 0 : _b.getPostEditorRef());
    }
    if (target) {
      this.threadScrollTarget = null;
      this.scrollToTarget(target);
    }
  }
  /**
   * Scrolls to the post whose thread was most recently drilled into upon returning
   * to the post list
   */
  async scrollToListTarget() {
    var _a;
    if (this.listScrollTarget) {
      const target = await ((_a = this.postListEl) === null || _a === void 0 ? void 0 : _a.getPostRefByPostId(this.listScrollTarget));
      if (target) {
        this.listScrollTarget = null;
        this.scrollToTarget(target);
      }
    }
  }
  /**
   * Handles arcgisHubDiscussionsThreadReady event and calls scrollToThreadTarget
   * after a short delay
   */
  handleThreadReady() {
    setTimeout(() => this.scrollToThreadTarget(), 1000);
  }
  /**
   * Handles arcgisHubDiscussionsPostListReady event and calls scrollToListTarget
   * after a short delay
   */
  handlePostListReady() {
    setTimeout(() => this.scrollToListTarget(), 1000);
  }
  /**
   * Updates postListProps cache when the post results change
   * @param evt arcgisHubDiscussionsPostListUpdated event
   */
  handlePostListUpdated(evt) {
    const target = evt.target;
    const { nextStart, start, total, items, bodyText } = target;
    this.postListProps = {
      nextStart,
      start,
      total,
      items,
      bodyText
    };
  }
  /**
   * Handles users clicking the back panel action when deep-linked to a parent post
   */
  handleBackToList() {
    this.threadScrollTarget = null;
    this.threadProps = null;
    this.channelId = null;
    this.parentId = null;
    this.postId = null;
    this.arcgisHubDiscussionsViewThread.emit({ parentId: null, channelId: null });
  }
  /**
   * Handles users clicking the back panel action when deep-linked to a reply
   */
  handleBackToThread() {
    const { thread: { parentId, channelId }, } = this;
    this.postId = null;
    this.arcgisHubDiscussionsViewThread.emit({ parentId, channelId });
  }
  /**
   * Handles `arcgisHubDiscussionsPostReady` event and updates `postRefs` with a reference to
   * the post element.
   */
  handlePostReady(evt) {
    const target = evt.target;
    this.postRefs = Object.assign(Object.assign({}, this.postRefs), { [target.postId]: evt.target });
  }
  /**
   * Handles about this discussion board being clicked and changes view
   */
  handleAboutSelected(event) {
    if (!event.code || event.code === 'Space' || event.code === 'Enter') {
      this.changeView('about');
    }
    this.hubTelemetry.emit(dist.dictionary.category.navigation.action.view.label.content.details.about);
  }
  /**
   * Renders the skeleton ui
   */
  renderSkeleton() {
    // TODO: skeleton state
    return null;
  }
  /**
   * Renders the channel status
   */
  renderHeroChannelStatus() {
    const { channel, channelGroups, postListProps } = this;
    if (channel) {
      const { accessIcon, isOpenForSubmissions, intl } = this;
      return (h("div", { class: "discussions_channel_status" }, h("div", { class: "discussions_channel_status__status" }, intl.t(isOpenForSubmissions ? 'statusOpen' : 'statusClosed')), h("div", { class: "discussions_channel_status__info" }, h("div", { class: "discussions_channel_status__name" }, getChannelName(channel, channelGroups, intl.t('unnamedChannel'))), h("span", null, "\u00B7"), h("calcite-icon", { icon: accessIcon.icon, scale: "s", "text-label": accessIcon.label })), h("div", { class: "discussions_channel_status_options" }, h("calcite-action", { appearance: "transparent", icon: "ellipsis", iconScale: "s", ref: (el) => { this.discussionOptionsActionEl = el; }, scale: "s", slot: "header-actions-end", text: intl.t('options') }), h("calcite-popover", { autoClose: true, flipPlacements: ['top-end', 'bottom-end'], offsetDistance: 0, overlayPositioning: "absolute", placement: "bottom-end", pointerDisabled: true, ref: (el) => { this.discussionOptionsPopoverEl = el; }, referenceElement: this.discussionOptionsActionEl }, h("calcite-action-group", { layout: "vertical" }, h("calcite-action", { alignment: "left", disabled: !(postListProps === null || postListProps === void 0 ? void 0 : postListProps.total), onClick: this.handleDiscussionsDownloadClick, scale: "m", text: intl.t('download'), textEnabled: true }))))));
    }
  }
  /**
   * Renders the entity info
   */
  renderHeroEntityInfo() {
    const { entity } = this;
    return (h("div", { class: "discussions_entity_details" }, h("header", null, entity.title), h("div", { innerHTML: this.sanitizedEntityPrompt })));
  }
  /**
   * Renders the hero thumbnail
   */
  renderHeroThumbnail() {
    const { isMobile, entity } = this;
    if (!isMobile) {
      return h("arcgis-hub-image", { alt: this.intl.t('thumbnail'), corners: CORNERS.round, fallback: "https://static.arcgis.com/images/discussion.png", src: entity.thumbnailUrl });
    }
  }
  /**
   * Renders the hero links
   */
  renderHeroLinks() {
    return (h("div", null, h("calcite-link", { onClick: this.handleAboutSelected, onKeyDown: this.handleAboutSelected }, this.intl.t('linkAbout'))));
  }
  /**
   * Renders the hero intro section
   */
  renderHeroIntro() {
    return (h("div", { class: "discussions_intro" }, this.renderHeroChannelStatus(), this.renderHeroThumbnail(), this.renderHeroEntityInfo(), this.renderHeroLinks()));
  }
  /**
   * Renders the hero section
   */
  renderHero() {
    // should not render the hero when viewing a thread in map view
    if (!(this.parentId && this.layout === 'map')) {
      return (h("div", { class: "discussions_hero" }, this.renderHeroIntro()));
    }
  }
  /**
   * Renders the post editor
   */
  renderEditor() {
    if (this.isOpenForSubmissions) {
      const { _context, channel, entity, intl, discussion, hasMap, unsavedFeatures, unsavedExistingFeatures, unsavedRelatedFeatures } = this;
      if (_context.currentUser && channel) {
        return (h("arcgis-hub-discussions-post-editor", { channel: channel, createParentBodyPlaceholderText: intl.t('postBodyPlaceholder'), createParentSaveButtonText: intl.t('addPostButtonText'), disableSelectExistingLocation: true, discussion: discussion, entity: entity, hasMap: hasMap, showLocations: true, unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures }));
      }
    }
  }
  /**
   * Custom render method for discussion board original posts
   * @param post The post record
   * @param index The post index
   * @param posts An Array of all post records
   * @param loading If the post is in a forced loading state, e.g. waiting for all posts within a page of results to finish loading their dependencies
   */
  renderParent(post, index, posts, loading) {
    const { isHub, entity, entityId, entityType, isMobile, channel, channelGroups, postRefs, discussion, displayFieldValid, displayFieldKey, displayFieldValue, channelId, hasMap, handlePostReady, locationDescriptionText, unsavedExistingFeatures, unsavedFeatures, unsavedRelatedFeatures } = this;
    return (h("arcgis-hub-discussions-post", { disableSelectExistingLocation: true, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, index: index, isHub: isHub, isMobile: isMobile, key: post.id, lastIndex: posts.length - 1, loading: loading, locationDescriptionText: locationDescriptionText, onArcgisHubDiscussionsPostReady: handlePostReady, post: post, postId: post.id, preview: true, role: "listitem", showLocations: true, unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures }, Boolean(postRefs[post.id]) && (h(Fragment, null, h("arcgis-hub-discussions-post-header", { channel: channel, channelGroups: channelGroups, iconScale: "l", index: index, isHub: isHub, post: post, postCreator: postRefs[post.id].postCreator, postCreatorOrg: postRefs[post.id].postCreatorOrg, showChannelAccessIcon: true, showCreatorAvatar: true, showPopover: true, showTimestamp: true, slot: "metadata" }), h("arcgis-hub-discussions-post-editor", { channel: channel, channelGroups: channelGroups, channelId: channelId, disableSelectExistingLocation: true, discussion: discussion, displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, displayFieldValue: displayFieldValue, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, index: index, isHub: isHub, isMobile: isMobile, post: post, postCreator: postRefs[post.id].postCreator, postCreatorOrg: postRefs[post.id].postCreatorOrg, postId: post.id, showHeader: true, showLocations: true, slot: "editor", unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures })))));
  }
  /**
   * Renders the post list
   */
  renderPostList() {
    const { entity, channel, discussion, renderParent, displayFieldKey, displayFieldValid, displayFieldValue, entityId, entityType, hasMap, isHub, isMobile, layout, locationDescriptionText, postListProps, unsavedExistingFeatures, unsavedFeatures, unsavedRelatedFeatures } = this;
    if (channel) {
      return (h("arcgis-hub-discussions-post-list", { bodyText: postListProps === null || postListProps === void 0 ? void 0 : postListProps.bodyText, channelIds: [channel.id], disableSelectExistingLocation: true, discussion: discussion, displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, displayFieldValue: displayFieldValue, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, isHub: isHub, isMobile: isMobile, items: postListProps === null || postListProps === void 0 ? void 0 : postListProps.items, layout: layout, locationDescriptionText: locationDescriptionText, nextStart: postListProps === null || postListProps === void 0 ? void 0 : postListProps.nextStart, onArcgisHubDiscussionsPostListReady: this.handlePostListReady, onArcgisHubDiscussionsPostListUpdated: this.handlePostListUpdated, parentIds: [], ref: (postListEl) => {
          this.postListEl = postListEl;
        }, renderPost: renderParent, showCounts: true, showLayoutActions: true, showLocations: true, showSearchActions: true, showSortActions: true, start: postListProps === null || postListProps === void 0 ? void 0 : postListProps.start, total: postListProps === null || postListProps === void 0 ? void 0 : postListProps.total, unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures }));
    }
  }
  /**
   * Renders the thread
   */
  renderThread() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const panelConfig = this.postId ? {
      heading: this.intl.t('reply.heading'),
      description: this.intl.t('reply.description'),
      handleBackClick: this.handleBackToThread
    } : {
      heading: this.intl.t('heading'),
      description: this.intl.t('description'),
      handleBackClick: this.handleBackToList
    };
    return (h("calcite-panel", { description: panelConfig.description, heading: panelConfig.heading }, h("calcite-action", { onClick: panelConfig.handleBackClick, scale: "s", slot: "header-actions-start", text: this.intl.t('back') }, h("calcite-icon", { icon: "chevron-left", scale: "s" })), h("arcgis-hub-discussions-thread", { channel: (_a = this.threadProps) === null || _a === void 0 ? void 0 : _a.channel, channelGroups: (_b = this.threadProps) === null || _b === void 0 ? void 0 : _b.channelGroups, channelId: this.channel.id, disableSelectExistingLocation: true, displayFieldKey: this.displayFieldKey, displayFieldValue: this.displayFieldValue, entityId: this.entityId, entityType: this.entityType, hasMap: this.hasMap, isHub: this.isHub, isMobile: this.isMobile, locationDescriptionText: this.locationDescriptionText, onArcgisHubDiscussionsThreadReady: this.handleThreadReady, parent: (_c = this.threadProps) === null || _c === void 0 ? void 0 : _c.parent, parentCreator: (_d = this.threadProps) === null || _d === void 0 ? void 0 : _d.parentCreator, parentCreatorOrg: (_e = this.threadProps) === null || _e === void 0 ? void 0 : _e.parentCreatorOrg, parentId: this.parentId, post: (_f = this.threadProps) === null || _f === void 0 ? void 0 : _f.post, postCreator: (_g = this.threadProps) === null || _g === void 0 ? void 0 : _g.postCreator, postCreatorOrg: (_h = this.threadProps) === null || _h === void 0 ? void 0 : _h.postCreatorOrg, postId: this.postId, ref: (thread) => {
        this.thread = thread;
      }, showLocations: true, unsavedExistingFeatures: this.unsavedExistingFeatures, unsavedFeatures: this.unsavedFeatures, unsavedRelatedFeatures: this.unsavedRelatedFeatures })));
  }
  /**
   * Renders notices
   */
  renderNotice() {
    const { noticeConfig, intl } = this;
    if (noticeConfig) {
      return (h("calcite-notice", { icon: noticeConfig.icon, kind: noticeConfig.kind, open: true, scale: "m" }, h("div", { slot: "title" }, intl.t(noticeConfig.title)), Boolean(noticeConfig.message) && h("div", { slot: "message" }, intl.t(noticeConfig.message)), Boolean(noticeConfig.link) && (h("calcite-link", { href: noticeConfig.link.href, onClick: noticeConfig.link.action, slot: "link" }, intl.t(noticeConfig.link.text)))));
    }
  }
  /**
   * Renders the post-editor & post-list
   */
  renderEditorAndPostList() {
    return (h(Fragment, null, this.renderEditor(), this.renderPostList()));
  }
  /**
   * Renders the discussion board content (post-editor, post-list, thread & notices)
   */
  renderContent() {
    return (h("div", { class: "discussions_content" }, this.renderNotice(), (this.channel && this.parentId)
      ? this.renderThread()
      : this.renderEditorAndPostList()));
  }
  /**
   * Renders the 'about' view
   */
  renderAbout() {
    var _a;
    const { intl } = this;
    return (h("calcite-panel", { description: intl.t('flowAboutDescription'), heading: intl.t('flowAboutHeading'), onCalciteFlowItemBack: this.handleAboutBack }, h("calcite-action", { onClick: this.handleAboutBack, scale: "s", slot: "header-actions-start", text: intl.t('back') }, h("calcite-icon", { icon: "chevron-left", scale: "s" })), h("arcgis-hub-discussions-view", { allowedChannelIds: this.allowedChannelIds, channel: this.channel, channelId: (_a = this.channel) === null || _a === void 0 ? void 0 : _a.id, entity: this.entity, entityId: this.entityId, entityType: this.entityType, isHub: this.isHub, isMobile: this.isMobile, onArcgisHubDiscussionsViewButtonClicked: this.handleAboutBack, showViewButton: true })));
  }
  /**
   * Renders the map and map-integrator
   */
  renderMap() {
    return (h("div", { class: "map-integrator-container" }, h("div", { class: "map-container" }, h("arcgis-hub-map", {
      // TODO: allow basemap to be set via prop, but for now
      // set default to 'gray-vector'
      basemap: 'gray-vector', onArcgisHubMapViewReady: this.handleMapViewReady, settings: this.mapSettings
    })), this.renderMapIntegrator()));
  }
  /**
   * Renders the discussion board
   */
  renderExplore() {
    return (h(Fragment, null, h("div", { class: "board-container" }, h("div", { class: "hero-and-content-container", ref: (heroContentContainerEl) => { this.heroContentContainerEl = heroContentContainerEl; } }, this.renderHero(), this.renderContent()), this.renderMap()), this.renderMapListToggle()));
  }
  /**
   * Renders the map/list toggle button on mobile
   */
  renderMapListToggle() {
    const { isMobile, view, intl } = this;
    if (intl && isMobile && view === 'explore') {
      return (h("div", { class: "toggle-container-outer" }, h("div", { class: "toggle-container-inner" }, h("calcite-fab", { appearance: "outline-fill", icon: "map", onClick: this.handleLayoutToggleClicked, text: this.intl.t(this.layout === 'map' ? 'button.toggleList' : 'button.toggleMap'), "text-enabled": true }))));
    }
  }
  renderMapIntegrator() {
    var _a;
    if (this.mapView && ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.id)) {
      const { activeFeature, element, drawRef, searchRef, entity, isHub, isMobile, mapView, channel } = this;
      const viewPosition = 'top-right';
      const scale = 'm';
      return (h(Fragment, null, h("arcgis-hub-discussions-map-integrator", { activeFeature: activeFeature, channelIds: [channel.id], discussionsRef: element, drawRef: drawRef, entity: entity, isHub: isHub, isMobile: isMobile, searchRef: searchRef, view: mapView }), h("arcgis-hub-map-widget-container", { "expand-disabled": true, scale: scale, view: mapView, viewPosition: viewPosition }, h("arcgis-hub-map-widget-search", { ref: (element) => { this.searchRef = element; }, scale: scale, view: mapView })), h("arcgis-hub-map-widget-container", { "expand-disabled": true, scale: scale, view: mapView, viewPosition: viewPosition }, h("arcgis-hub-map-widget-zoom", { scale: scale, view: mapView })), h("arcgis-hub-map-widget-container", { "expand-disabled": true, id: "draw-tools-container", scale: scale, view: mapView, viewPosition: viewPosition }, h("arcgis-hub-map-widget-draw", { boundaries: this.allowedLocationsArcGIS, disablePrimaryOptions: true, enableMapTips: true, ref: (element) => { this.drawRef = element; }, scale: scale, tools: ['select', 'point', 'polyline', 'polygon'], view: mapView }))));
    }
  }
  /**
   * Renders the discussion board
   */
  renderBoard() {
    return this.view === 'about'
      ? this.renderAbout()
      : this.renderExplore();
  }
  /**
   * Primary render method
   */
  render() {
    return (h(Host, { "data-element": "discussions-board" }, this.isLoading ? this.renderSkeleton() : this.renderBoard()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "_context": ["handleContextChanged"]
  }; }
};
__decorate([
  minPromiseDelayFactory({ delay: 300 })
], ArcgisHubDiscussionsBoard.prototype, "fetchDependencies", null);
__decorate([
  MemoizeDecoratorFactory('allowedLocations')
], ArcgisHubDiscussionsBoard.prototype, "allowedLocationsArcGIS", null);
__decorate([
  MemoizeDecoratorFactory('entity.data.view.mapSettings')
], ArcgisHubDiscussionsBoard.prototype, "mapSettings", null);
__decorate([
  MemoizeDecoratorFactory('entity.data.prompt'),
  SanitizeDecoratorFactory()
], ArcgisHubDiscussionsBoard.prototype, "sanitizedEntityPrompt", null);
ArcgisHubDiscussionsBoard.style = arcgisHubDiscussionsBoardCss;

export { ArcgisHubDiscussionsBoard as arcgis_hub_discussions_board };
