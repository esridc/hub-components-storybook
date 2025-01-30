import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { d as downloadPostCSV, u as updateDiscussable, s as searchPosts, g as getChannelName } from './discussions-a173baa3.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { d as dist } from './index-dd3f99ac.js';
import { R as ResizeObserverManager } from './resize-observer-dc6e269e.js';
import { D as DebounceDecoratorFactory } from './debounce-e9be81f1.js';
import { c as callOnceFactory } from './call-once-194f02c7.js';
import { A as ArcgisHubDiscussionsBlockedNoticeVariant, f as fetchPostDetails, a as fetchPostUserDetails, b as fetchParentDetails, c as fetchParentUserDetails } from './fetch-parent-user-details-ef8f8532.js';
import { f as fetchEnvironmentDetails, a as fetchEntityDetails } from './fetch-entity-details-b1fdb71f.js';
import { m as minPromiseDelayFactory } from './min-promise-delay-d6a589f6.js';
import { g as getGlobalContext, h as connectContext, d as showNotice } from './state-31a09db0.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { r as redirectToExternalUrl } from './urls-0e36649d.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { D as DiscussionType, i as isDiscussable, P as PostSort, d as SortOrder } from './utils-6bf1b713.js';
import { c as canEditItem } from './can-edit-item-e533d8e4.js';
import { C as CallWhenFactory } from './call-when-744df66d.js';
import { f as fetchChannelDetails } from './fetch-channel-details-82aa13f7.js';
import { h as getUserThumbnailUrl } from './HubInitiatives-4f4e24ce.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './extent-34a4ba2a.js';
import './request-fa80ae40.js';
import './helpers-8c7e5e31.js';
import './cache-4bea61e0.js';
import './download-list-38d6b571.js';
import './store-0a6cb79f.js';
import './fetchContent-dbc662af.js';
import './tslib.es6-9c17e83a.js';
import './_enrichments-8641475c.js';
import './get-with-default-b819d95d.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './append-custom-params-4bd856e5.js';
import './OperationError-387ae9ab.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './slugs-7b8828d5.js';
import './is-guid-982831aa.js';
import './request-3e386aeb.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './tslib.es6-0e03e357.js';
import './discussions-api-request-199cae2d.js';
import './update-6a7d5697.js';
import './get-850c466d.js';
import './update-26e2fbc1.js';
import './index-213c70d0.js';
import './_commonjsHelpers-11ca3be1.js';
import './portal-091f0ac7.js';
import './getTypeFromEntity-e149b61e.js';
import './domain-exists-4fd7dc09.js';
import './teams-38e72623.js';
import './logger-f8667200.js';
import './is-update-group-7b9eb0ea.js';
import './channels-3a706fa2.js';
import './channels-2574fd6e.js';
import './slugs-7ec67036.js';
import './themes-e08327b4.js';
import './search-c7a57aa9.js';
import './generate-random-string-1436d9e6.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './Metrics-9cb7a1fc.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';

const arcgisHubDiscussionsCss = ".sc-arcgis-hub-discussions-h{display:block;max-height:100%;overflow:auto;background-color:var(--calcite-color-foreground-1);--arcgis-hub-layout-list-gap:0rem}calcite-panel.sc-arcgis-hub-discussions{height:max-content}section.sc-arcgis-hub-discussions{margin-top:1rem;margin-bottom:1rem;margin-left:0.75rem;margin-right:0.75rem;display:grid;gap:0.75rem;border-radius:0.25rem;padding:0.75rem;--tw-shadow:0 2px 8px 0 rgba(0, 0, 0, 0.12);--tw-shadow-colored:0 2px 8px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}header.sc-arcgis-hub-discussions{margin:0px;font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold)}p.sc-arcgis-hub-discussions{margin:0px;font-size:var(--calcite-font-size-0);line-height:1.375rem}section.sc-arcgis-hub-discussions calcite-button.sc-arcgis-hub-discussions{width:-moz-fit-content;width:fit-content}calcite-button[icon-start=\"speech-bubble-plus\"].sc-arcgis-hub-discussions{margin-top:1.5rem;margin-bottom:1.5rem;margin-left:1rem;margin-right:1rem;display:block}arcgis-hub-discussions-private-notice.sc-arcgis-hub-discussions,arcgis-hub-discussions-blocked-notice.sc-arcgis-hub-discussions{margin-left:1rem;margin-right:1rem;margin-bottom:1.5rem}.empty.sc-arcgis-hub-discussions arcgis-hub-discussions-private-notice.sc-arcgis-hub-discussions,.empty.sc-arcgis-hub-discussions arcgis-hub-discussions-blocked-notice.sc-arcgis-hub-discussions{margin:0px;margin-top:0.25rem}arcgis-hub-discussions-thread.sc-arcgis-hub-discussions{overflow:hidden;padding-top:1rem;padding-bottom:1rem}arcgis-hub-discussions-post-list.sc-arcgis-hub-discussions{background-color:var(--calcite-color-foreground-1)}arcgis-hub-discussions-post-list.location-list.sc-arcgis-hub-discussions{padding-top:0.25rem;padding-bottom:0.25rem}[data-element=\"discussions-options-panel\"].sc-arcgis-hub-discussions>div.sc-arcgis-hub-discussions{background-color:var(--calcite-color-foreground-1);padding:1rem}[data-element=\"discussions-options-panel\"].sc-arcgis-hub-discussions>div.sc-arcgis-hub-discussions div.sc-arcgis-hub-discussions{display:flex;justify-content:flex-end;padding-top:0.5rem}[data-element=\"discussions-options-panel\"].sc-arcgis-hub-discussions>div.sc-arcgis-hub-discussions div.sc-arcgis-hub-discussions+calcite-notice.sc-arcgis-hub-discussions{margin-top:1rem;width:100%}.discussions-options.sc-arcgis-hub-discussions:active .discussions-options-icon.sc-arcgis-hub-discussions{--tw-text-opacity:1;color:rgb(21 21 21 / var(--tw-text-opacity))}.discussions-go-to.sc-arcgis-hub-discussions:active .discussions-go-to-icon.sc-arcgis-hub-discussions{--tw-text-opacity:1;color:rgb(21 21 21 / var(--tw-text-opacity))}.discussions-back.sc-arcgis-hub-discussions{border-width:0px;border-right-width:1px;border-style:solid;border-right-color:var(--calcite-color-border-3)}.discussions-back.sc-arcgis-hub-discussions:active .discussions-back-icon.sc-arcgis-hub-discussions{--tw-text-opacity:1;color:rgb(21 21 21 / var(--tw-text-opacity))}arcgis-hub-discussions-post-editor[slot=\"list-before\"].sc-arcgis-hub-discussions{margin-top:1.5rem;margin-bottom:1.5rem;margin-left:0.75rem;margin-right:0.75rem}";

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const alertConfig = {
  autoClose: true,
  autoCloseDuration: 'fast',
  icon: true,
  noticeType: 'alert'
};
const ArcgisHubDiscussions = class {
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubPostEditorReady = createEvent(this, "arcgisHubPostEditorReady", 7);
    this.arcgisHubGeometryGoTo = createEvent(this, "arcgisHubGeometryGoTo", 7);
    this.arcgisHubDiscussionsFeature = createEvent(this, "arcgisHubDiscussionsFeature", 7);
    this.arcgisHubDiscussionsFeatureDeleted = createEvent(this, "arcgisHubDiscussionsFeatureDeleted", 7);
    this.arcgisHubGeometryFeatureSelect = createEvent(this, "arcgisHubGeometryFeatureSelect", 7);
    this.arcgisHubGeometryFeatureHover = createEvent(this, "arcgisHubGeometryFeatureHover", 7);
    this.arcgisHubGeometryDrawCreate = createEvent(this, "arcgisHubGeometryDrawCreate", 7);
    this.arcgisHubGeometryDrawTypeSelect = createEvent(this, "arcgisHubGeometryDrawTypeSelect", 7);
    this.arcgisHubGeometryDrawEdit = createEvent(this, "arcgisHubGeometryDrawEdit", 7);
    this.arcgisHubGeometryDrawEditCancel = createEvent(this, "arcgisHubGeometryDrawEditCancel", 7);
    this.arcgisHubGeometryDrawReset = createEvent(this, "arcgisHubGeometryDrawReset", 7);
    this.arcgisHubGeometrySelect = createEvent(this, "arcgisHubGeometrySelect", 7);
    this.arcgisHubGeometryDeselect = createEvent(this, "arcgisHubGeometryDeselect", 7);
    this.arcgisHubDiscussionsViewThread = createEvent(this, "arcgisHubDiscussionsViewThread", 7);
    this.arcgisHubDiscussionsDismiss = createEvent(this, "arcgisHubDiscussionsDismiss", 7);
    this.arcgisHubDiscussionsClose = createEvent(this, "arcgisHubDiscussionsClose", 7);
    this.arcgisHubFeatureRemove = createEvent(this, "arcgisHubFeatureRemove", 7);
    this.arcgisHubGeometryClearAll = createEvent(this, "arcgisHubGeometryClearAll", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.discussion = undefined;
    this.parentId = undefined;
    this.postId = undefined;
    this.channelId = undefined;
    this.locationId = undefined;
    this.unsavedFeatures = [];
    this.unsavedRelatedFeatures = [];
    this.unsavedExistingFeatures = [];
    this.hasMap = undefined;
    this.isHub = undefined;
    this.showChannelAvatar = undefined;
    this.showChannelName = undefined;
    this.dismissible = undefined;
    this.enableGoTo = undefined;
    this.disableNavigation = undefined;
    this.entityId = undefined;
    this.entityType = undefined;
    this.entity = undefined;
    this.threadScrollTarget = undefined;
    this._context = getGlobalContext();
    this.postListProps = undefined;
    this.threadProps = undefined;
    this.listScrollTarget = undefined;
    this._loading = true;
    this.displayFieldValid = undefined;
    this.displayFieldValue = undefined;
    this.displayFieldKey = undefined;
    this.error = null;
    this.optionsError = null;
    this.optionsSaving = false;
    this.showPostEditor = false;
    this.isMobile = undefined;
    this.showOptions = false;
    this.intl = undefined;
    bind(this, 'handleCheckStatus', 'handleBackToList', 'handleBackToThread', 'handleGeometryGoTo', 'handleNewPost', 'renderLoading', 'renderAddOrCreatePostButton', 'renderPostEditor', 'renderThread', 'renderPostList', 'renderError', 'handleDiscussionOptionsClick', 'handleDiscussionsDownloadClick', 'handleOptionsBack', 'checkIsMobile', 'handleSaveOptions', 'handleResetOptionsError', 'handlePostListUpdated', 'renderRequiresAuth', 'handleThreadReady', 'handlePostListReady');
  }
  /**
   * Component will load lifecycle method, fetches translations and data
   * needed to render the UI
   */
  async componentWillLoad() {
    // do not await dependencies so loading indicator renders
    this.initialize();
  }
  /**
   * Component did load lifecycle method, starts observer
   */
  componentDidLoad() {
    this.observe();
  }
  /**
   * Connected callback lifecycle method, starts observer
   */
  connectedCallback() {
    connectContext(this);
    this.observe();
  }
  /**
   * Disconnected callback lifecycle method, ends observing
   */
  disconnectedCallback() {
    this.disconnect();
    this.disconnectContext();
  }
  /**
   * Loads dependencies and updates dpendency states
   */
  async loadDependencies() {
    this._loading = true;
    return this.fetchDependencies()
      .then(dependencies => {
      Object.assign(this, dependencies);
    })
      .catch(e => {
      this.error = e;
    })
      .finally(() => {
      this._loading = false;
    });
  }
  /**
   * Loads translations and dependencies
   */
  async initialize() {
    this.loadTranslations();
    if (this._context) {
      this.loadDependencies();
    }
  }
  /**
   * Loads translations
   */
  async loadTranslations() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Fetches dependencies, enforcing a mimimum delay for skeleton state to be observed
   */
  async fetchDependencies() {
    return this._fetchDependencies();
  }
  /**
   * Fetches dependencies
   */
  async _fetchDependencies() {
    const { isHub, _context, discussion, entityId, entityType, entity, locationId } = this;
    const [environmentDetails, entityDetails] = await Promise.all([
      fetchEnvironmentDetails({ isHub }, _context.hubRequestOptions),
      fetchEntityDetails({ discussion, entityId, entityType, entity, locationId }, _context.hubRequestOptions),
    ]);
    return Object.assign(Object.assign({}, environmentDetails), entityDetails);
  }
  /**
   * Reloads dependencies when context changes
   */
  handleContextChanged(context, prevContext) {
    var _a, _b;
    if (((_a = context === null || context === void 0 ? void 0 : context.currentUser) === null || _a === void 0 ? void 0 : _a.username) !== ((_b = prevContext === null || prevContext === void 0 ? void 0 : prevContext.currentUser) === null || _b === void 0 ? void 0 : _b.username)) {
      this.resetState();
      this.loadDependencies();
    }
  }
  /**
   * Resets state
   */
  resetState() {
    this.error = null;
    this._loading = false;
    this.threadScrollTarget = null;
    this.listScrollTarget = null;
    this.optionsError = null;
    this.optionsSaving = false;
    this.showPostEditor = false;
    this.showOptions = false;
    this.entity = undefined;
    this.displayFieldValid = undefined;
    this.displayFieldValue = undefined;
    this.displayFieldKey = undefined;
    this.postListProps = null;
    this.threadProps = null;
  }
  /**
   * Resets the active thread so the thread list renders
   */
  async handleBackToList() {
    var _a;
    const { thread } = this;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.close.label.thread), { postId: thread.postId, parentId: thread.parentId, channelId: thread.channelId, channelAccess: (_a = thread.channel) === null || _a === void 0 ? void 0 : _a.access }));
    this.threadScrollTarget = null;
    this.threadProps = null;
    this.channelId = null;
    this.parentId = null;
    this.postId = null;
    this.arcgisHubDiscussionsViewThread.emit({
      parentId: null,
      channelId: null,
    });
  }
  /**
   * Starts observer
   */
  observe() {
    ResizeObserverManager.addHandler(window.document.body, this.checkIsMobile);
  }
  /**
   * Disconnects observer
   */
  disconnect() {
    ResizeObserverManager.removeHandler(window.document.body, this.checkIsMobile);
  }
  /**
   * Scrolls to the given HTMLElement
   * @param target HTMLElement
   */
  scrollToTarget(target) {
    this.element.scrollTo({
      behavior: 'smooth',
      left: target.offsetLeft,
      top: target.offsetTop,
    });
  }
  /**
   * Optionally scrolls to the post editor or post list upon drilling into a thread
   * when the Reply or View N replies actions are clicked
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
    const target = await ((_a = this.postListEl) === null || _a === void 0 ? void 0 : _a.getPostRefByPostId(this.listScrollTarget));
    if (target) {
      this.listScrollTarget = null;
      this.scrollToTarget(target);
    }
  }
  /**
   * Handles user clicks to the new original post button
   */
  handleNewPost() {
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.open.label.editor);
    this.showPostEditor = true;
  }
  /**
   * Updates postListProps cache when the post results change
   * @param evt arcgisHubDiscussionsPostListUpdated event
   */
  handlePostListUpdated(evt) {
    const target = evt.target;
    const { nextStart, start, total, items } = target;
    this.postListProps = {
      nextStart,
      start,
      total,
      items,
    };
  }
  /**
   * Re-emits arcgisHubPostEditorReady so map integrator can reconcile the event
   * @param evt arcgisHubDiscussionsPostEditorReady event
   */
  handlePostEditorReady(evt) {
    const { detail: post } = evt;
    evt.stopPropagation();
    this.arcgisHubPostEditorReady.emit(post);
  }
  /**
   * Handles arcgisHubDiscussionsPostCancel events, hides the post authoring component
   * @param evt arcgisHubDiscussionsPostCancel event
   */
  handlePostCanceled(evt) {
    evt.stopPropagation();
    this.showPostEditor = false;
  }
  /**
   * Handles arcgisHubDiscussionsPostCreate events, emits arcgisHubDiscussionsFeature
   * @param evt arcgisHubDiscussionsPostCreate event
   */
  handlePostCreate(evt) {
    this.arcgisHubDiscussionsFeature.emit({ post: evt.detail, create: true });
  }
  /**
   * Handles arcgisHubDiscussionsThreadReady event and calls scrollToThreadTarget
   * after a short delay
   */
  handleThreadReady() {
    setTimeout(() => this.scrollToThreadTarget(), 500);
  }
  /**
   * Handles arcgisHubDiscussionsPostListReady event and calls scrollToListTarget
   * after a short delay
   */
  handlePostListReady() {
    setTimeout(() => this.scrollToListTarget(), 500);
  }
  /**
   * Handles the event that's emitted when a post is deleted, removes the deleted post
   * from any cached post list or thread results
   * @param evt A arcgisHubDiscussionsPostDelete event
   */
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
   * Handles users clicking the back panel action when deep-linked to a reply
   */
  handleBackToThread() {
    const { thread: { postId, parentId, channelId, channel }, } = this;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.open.label.thread), { postId,
      parentId,
      channelId, channelAccess: channel === null || channel === void 0 ? void 0 : channel.access }));
    this.postId = null;
    this.arcgisHubDiscussionsViewThread.emit({ parentId, channelId });
  }
  /**
   * Emits event to zoom to current discussion graphics on map
   */
  handleGeometryGoTo() {
    const { thread } = this;
    this.arcgisHubGeometryGoTo.emit(thread === null || thread === void 0 ? void 0 : thread.parent);
  }
  /**
   * Handles the event that's emitted when a feature is to be selected on
   * the map
   * @param evt A custom event with a Feature payload
   */
  handleGeometryFeatureSelect(evt) {
    evt.stopPropagation();
    this.arcgisHubGeometryFeatureSelect.emit(evt.detail);
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
   * Handles the event that's emitted when a feature should
   * be removed from the map
   */
  handleFeatureRemove(evt) {
    evt.stopPropagation();
    this.arcgisHubFeatureRemove.emit(evt.detail);
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
  /**
   * Handles event that's emitted when the calcite-panel is dismissed
   * @param evt A custom event
   */
  handleCalcitePanelDismissedChange(evt) {
    evt.stopPropagation();
    this.arcgisHubDiscussionsDismiss.emit();
  }
  /**
   * Handles event that's emitted when the calcite-panel close button is clicked
   * @param evt A custom event
   */
  handleCalcitePanelDismissChange(evt) {
    evt.stopPropagation();
    this.arcgisHubDiscussionsClose.emit();
  }
  /**
   * Captures empty state telemetry impression
   */
  captureEmptyListImpression() {
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.viewed.label.empty);
  }
  /**
   * Handles clicks to the check status link when an error occurs
   */
  handleCheckStatus(evt) {
    evt.preventDefault();
    const target = evt.target;
    this.hubTelemetry.emit(dist.dictionary.category.navigation.action.external.label.hubStatus);
    setTimeout(() => redirectToExternalUrl(target.href), 250);
  }
  /**
   * Debounces _checkIsMobile
   */
  checkIsMobile() {
    this._checkIsMobile(globalThis.document.body);
  }
  /**
   * Checks if the client is in a mobile layout
   */
  _checkIsMobile(el) {
    this.isMobile = el.clientWidth < 768;
  }
  /**
   * Handles clicks to the Discussions Options calcite action
   */
  handleDiscussionOptionsClick() {
    this.showOptions = true;
    this.showPostEditor = false;
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.open.label.panel.details.discussionOptions);
  }
  async handleDiscussionsDownloadClick() {
    try {
      const { size, count, duration } = await downloadPostCSV({
        entityTitle: this.entity.title,
        discussion: this.discussion,
        requestOptions: this._context.hubRequestOptions,
      });
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.download.label.csv.details.export), { size,
        count,
        duration, response: dist.constants.response.SUCCESS }));
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.download.label.csv.details.export), { response: dist.constants.response.FAILURE }));
      showNotice({
        title: this.intl.t('download.error'),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') }),
      });
    }
    this.discussionOptionsPopoverEl.open = false;
  }
  /**
   * Resets the view back to original post list from settings panel
   */
  handleOptionsBack() {
    this.showOptions = false;
  }
  /**
   * Updates the item or group with or without the cannotDiscuss typeKeyord
   * depending on their option selection
   */
  async handleSaveOptions() {
    const { entity, _context, optionsElement, entityType } = this;
    const { value } = optionsElement;
    const categoryKey = entityType === DiscussionType.CONTENT ? entityType : 'groups';
    const detailsKey = value ? 'allowDiscussions' : 'blockDiscussions';
    const telemetry = dist.dictionary.category[categoryKey].action.update.label.settings.details[detailsKey];
    this.optionsSaving = true;
    this.optionsError = null;
    try {
      const reference = await updateDiscussable(Object.assign({ subject: entity, discussable: value }, _context.requestOptions));
      this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { response: dist.constants.response.SUCCESS }));
      this.entity = reference;
    }
    catch (error) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { response: dist.constants.response.FAILURE }));
      this.optionsError = error;
    }
    finally {
      this.optionsSaving = false;
    }
  }
  /**
   * Resets the options error state
   */
  handleResetOptionsError() {
    this.optionsError = null;
  }
  /**
   * Computes true if intl or dependencies loading
   */
  get loading() {
    return !this.intl || this._loading;
  }
  /**
   * A getter method that returns the appropriate view
   * for the current component state
   */
  get view() {
    const { error, channelId, parentId, loading, showOptions, _context } = this;
    let renderMethod;
    if (!(_context === null || _context === void 0 ? void 0 : _context.currentUser)) {
      renderMethod = this.renderRequiresAuth;
    }
    else if (error) {
      renderMethod = this.renderError;
    }
    else if (loading) {
      renderMethod = this.renderLoading;
    }
    else if (showOptions) {
      renderMethod = this.renderOptions;
    }
    else if (channelId && parentId) {
      renderMethod = this.renderThread;
    }
    else {
      renderMethod = this.renderPostList;
    }
    return renderMethod;
  }
  /**
   * Computes if the discussions options action should render in the panel header
   */
  get shouldRenderOptions() {
    const { _context, entityType, entity, dismissible } = this;
    let shouldRender = false;
    if (!dismissible) {
      shouldRender =
        entityType === DiscussionType.CONTENT
          ? canEditItem(entity.item, _context.currentUser)
          : // TODO: support groups
            false;
    }
    return shouldRender;
  }
  /**
   * Computes blocked notice variant
   */
  get blockedNotice() {
    let variant;
    const { entity, entityType } = this;
    if (entity && !isDiscussable(entity)) {
      variant = entityType === 'group' ? ArcgisHubDiscussionsBlockedNoticeVariant.Group : ArcgisHubDiscussionsBlockedNoticeVariant.Item;
    }
    return variant;
  }
  /**
   * Renders the requires auth view
   */
  renderRequiresAuth() {
    const { intl } = this;
    if (intl) {
      return (h("section", { class: "requires-auth" }, h("calcite-icon", { icon: "frown", scale: "l" }), h("header", null, intl.t('auth.title')), h("p", null, intl.t('auth.text'))));
    }
  }
  /**
   * Renders empty state
   */
  renderEmpty() {
    const { intl, deletedDuringSession, blockedNotice, postListProps, showPostEditor } = this;
    if ((postListProps === null || postListProps === void 0 ? void 0 : postListProps.total) === 0 && !showPostEditor) {
      if (!deletedDuringSession) {
        this.captureEmptyListImpression();
      }
      return (h("section", { class: "empty", slot: "empty" }, h("calcite-icon", { icon: "speech-bubble", scale: "l" }), h("header", null, intl.t('emptyHeading')), h("p", null, intl.t('emptyMessage')), h("calcite-button", { disabled: Boolean(blockedNotice), onClick: this.handleNewPost, round: true, scale: "l" }, intl.t('createPost')), blockedNotice ? h("arcgis-hub-discussions-blocked-notice", { variant: ArcgisHubDiscussionsBlockedNoticeVariant.Item }) : h("arcgis-hub-discussions-private-notice", null)));
    }
  }
  /**
   * Renders the discussion options view
   */
  renderOptions() {
    const { entity, entityType, optionsSaving, intl, blockedNotice, optionsError } = this;
    return (h("calcite-panel", { "data-element": "discussions-options-panel", description: entity.title, disabled: optionsSaving, heading: intl.t('options.heading') }, h("calcite-action", { class: "discussions-back", onClick: this.handleOptionsBack, scale: "s", slot: "header-actions-start", text: "Back" }, h("calcite-icon", { class: "discussions-back-icon", icon: "chevron-left", scale: "s" })), h("div", null, h("arcgis-hub-discussions-options", { layout: "vertical", ref: (optionsElement) => {
        this.optionsElement = optionsElement;
      }, value: !blockedNotice, variant: entityType }), h("div", null, h("calcite-button", { disabled: optionsSaving, loading: optionsSaving, onClick: this.handleSaveOptions, round: true, scale: "l", type: "submit" }, intl.t(optionsSaving ? 'options.saving' : 'options.save'))), optionsError && (h("calcite-notice", { closable: true, kind: "danger", onCalciteNoticeClose: this.handleResetOptionsError, open: true }, h("header", { slot: "title" }, intl.t('options.failure.title')), h("p", { slot: "message" }, intl.t('options.failure.message')))))));
  }
  /**
   * Renders the post authoring component
   */
  renderPostEditor() {
    const { unsavedFeatures, discussion, entity, entityId, entityType, isHub, hasMap, unsavedRelatedFeatures, unsavedExistingFeatures, isMobile, locationId } = this;
    return (h(Fragment, null, h("arcgis-hub-discussions-post-editor", { discussion: discussion, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, isHub: isHub, isMobile: isMobile, locationId: locationId, showHeader: true, showLocations: true, slot: "list-before", unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures }), h("arcgis-hub-discussions-private-notice", { slot: "list-before" })));
  }
  /**
   * Renders the Add Post button
   */
  renderAddOrCreatePostButton() {
    const { intl, handleNewPost, postListProps, blockedNotice } = this;
    if ((postListProps === null || postListProps === void 0 ? void 0 : postListProps.total) === undefined) {
      return null;
    }
    else if (postListProps.total) {
      return (h(Fragment, null, h("calcite-button", { appearance: "outline", color: "blue", disabled: Boolean(blockedNotice), "icon-start": "speech-bubble-plus", onClick: handleNewPost, scale: "l", slot: "list-before", type: "button", width: "auto" }, intl.t('addPost')), blockedNotice ? (h("arcgis-hub-discussions-blocked-notice", { slot: "list-before", variant: ArcgisHubDiscussionsBlockedNoticeVariant.Item })) : (h("arcgis-hub-discussions-private-notice", { slot: "list-before" }))));
    }
  }
  /**
   * Renders Go-to action in panel header
   */
  renderGoToAction() {
    const { enableGoTo, intl } = this;
    if (enableGoTo) {
      return (h("calcite-action", { class: "discussions-go-to", onClick: this.handleGeometryGoTo, slot: "header-actions-end", text: intl.t('showFullDiscussion') }, h("calcite-icon", { class: "discussions-go-to-icon", icon: "extent", scale: "s" })));
    }
  }
  /**
   * Renders the thread list
   */
  renderPostList() {
    const { discussion, entity, entityId, entityType, displayFieldKey, displayFieldValid, displayFieldValue, showChannelAvatar, showChannelName, hasMap, isHub, unsavedFeatures, unsavedRelatedFeatures, unsavedExistingFeatures, showPostEditor, locationId, intl, shouldRenderOptions, isMobile, dismissible, postListProps, handlePostListUpdated, handlePostListReady, } = this;
    const classes = { 'location-list': Boolean(locationId) };
    const heading = locationId && displayFieldValue ? displayFieldValue : intl.t('list.heading');
    const description = locationId ? intl.t('location.summary') : entity.title;
    return (h("calcite-panel", { closable: dismissible, description: description, heading: heading }, this.renderGoToAction(), shouldRenderOptions && (h(Fragment, null, h("calcite-action", { class: "discussions-options", ref: (el) => { this.discussionOptionsActionEl = el; }, scale: "m", slot: "header-actions-end", text: intl.t('options') }, h("calcite-icon", { class: "discussions-options-icon", icon: "ellipsis", scale: "s" })), h("calcite-popover", { autoClose: true, flipPlacements: ['top-end', 'bottom-end'], offsetDistance: 0, overlayPositioning: "absolute", placement: "bottom-end", pointerDisabled: true, ref: (el) => { this.discussionOptionsPopoverEl = el; }, referenceElement: this.discussionOptionsActionEl }, h("calcite-action-group", { layout: "vertical" }, h("calcite-action", { alignment: "center", disabled: !(postListProps === null || postListProps === void 0 ? void 0 : postListProps.total), onClick: this.handleDiscussionsDownloadClick, scale: "m", text: intl.t('download'), textEnabled: true }), h("calcite-action", { alignment: "left", onClick: this.handleDiscussionOptionsClick, scale: "m", text: intl.t('settings'), textEnabled: true }))))), h("arcgis-hub-discussions-post-list", { class: classes, discussion: locationId ? `${discussion}%?id=%${locationId}` : `${discussion}`, displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, displayFieldValue: displayFieldValue, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, isHub: isHub, isMobile: isMobile, items: postListProps === null || postListProps === void 0 ? void 0 : postListProps.items, locationId: locationId, nextStart: postListProps === null || postListProps === void 0 ? void 0 : postListProps.nextStart, onArcgisHubDiscussionsPostListReady: handlePostListReady, onArcgisHubDiscussionsPostListUpdated: handlePostListUpdated, parentIds: !locationId && [], ref: (postListEl) => {
        this.postListEl = postListEl;
      }, showChannelAvatar: showChannelAvatar, showChannelName: showChannelName, showLocations: true, start: postListProps === null || postListProps === void 0 ? void 0 : postListProps.start, total: postListProps === null || postListProps === void 0 ? void 0 : postListProps.total, unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures }, !locationId && (showPostEditor ? this.renderPostEditor() : this.renderAddOrCreatePostButton()), this.renderEmpty())));
  }
  /**
   * Renders the loading indicator when fetching content necessary
   * to render the UI
   */
  renderLoading() {
    // TODO: skeleton state?
    return null;
  }
  /**
   * Renders a generic error state if any of the XHRs responsible
   * for fetching content required to render the UI fails
   */
  renderError() {
    const { intl } = this;
    return (h("section", null, h("calcite-icon", { icon: "frown", scale: "l" }), h("header", null, intl.t('error.title')), h("p", null, intl.t('error.text')), h("calcite-button", { appearance: "transparent", color: "red", href: "https://hubstatus.arcgis.com/", onClick: this.handleCheckStatus, round: true, scale: "l" }, intl.t('error.button'))));
  }
  /**
   * Renders an invidual thread
   */
  renderThread() {
    const { hasMap, isHub, unsavedFeatures, unsavedRelatedFeatures, unsavedExistingFeatures, discussion, entity, entityId, entityType, dismissible, displayFieldKey, displayFieldValid, displayFieldValue, showChannelAvatar, showChannelName, intl, handleBackToList, postId, parentId, locationId, handleBackToThread, handleThreadReady, disableNavigation, isMobile, channelId, threadProps, } = this;
    let heading = 'generic.heading';
    let description = 'thread.summary';
    let handleBackClick = handleBackToList;
    if (postId) {
      heading = 'reply.heading';
      description = 'reply.summary';
      handleBackClick = handleBackToThread;
    }
    else if (locationId) {
      heading = 'location.heading';
    }
    if (disableNavigation) {
      heading = 'list.heading';
    }
    return (h("calcite-panel", { closable: dismissible, description: intl.t(description), heading: intl.t(heading) }, !disableNavigation && (h("calcite-action", { class: "discussions-back", onClick: handleBackClick, scale: "s", slot: "header-actions-start", text: intl.t('back') }, h("calcite-icon", { class: "discussions-back-icon", icon: "chevron-left", scale: "s" }))), this.renderGoToAction(), h("arcgis-hub-discussions-thread", { channel: threadProps === null || threadProps === void 0 ? void 0 : threadProps.channel, channelGroups: threadProps === null || threadProps === void 0 ? void 0 : threadProps.channelGroups, channelId: channelId, discussion: discussion, displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, displayFieldValue: displayFieldValue, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, isHub: isHub, isMobile: isMobile, locationId: locationId, onArcgisHubDiscussionsThreadReady: handleThreadReady, parent: threadProps === null || threadProps === void 0 ? void 0 : threadProps.parent, parentCreator: threadProps === null || threadProps === void 0 ? void 0 : threadProps.parentCreator, parentCreatorOrg: threadProps === null || threadProps === void 0 ? void 0 : threadProps.parentCreatorOrg, parentId: parentId, post: threadProps === null || threadProps === void 0 ? void 0 : threadProps.post, postCreator: threadProps === null || threadProps === void 0 ? void 0 : threadProps.postCreator, postCreatorOrg: threadProps === null || threadProps === void 0 ? void 0 : threadProps.postCreatorOrg, postId: postId, ref: (thread) => {
        this.thread = thread;
      }, showChannelAvatar: showChannelAvatar, showChannelName: showChannelName, showLocations: true, unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures })));
  }
  /**
   * Primary render entrypoint
   */
  render() {
    return h(Host, { "data-element": "discussions" }, this.view());
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "_context": ["handleContextChanged"]
  }; }
};
__decorate$3([
  minPromiseDelayFactory({ delay: 300 })
], ArcgisHubDiscussions.prototype, "fetchDependencies", null);
__decorate$3([
  callOnceFactory()
], ArcgisHubDiscussions.prototype, "captureEmptyListImpression", null);
__decorate$3([
  DebounceDecoratorFactory({ timeout: 250 })
], ArcgisHubDiscussions.prototype, "checkIsMobile", null);
ArcgisHubDiscussions.style = arcgisHubDiscussionsCss;

const arcgisHubDiscussionsMapActionNoticeCss = ":host{left:50%;width:auto;display:var(--display);transform:translate(-50%, 0)}:host([aria-hidden=\"true\"]){display:none}div{border-bottom-right-radius:0.75rem;border-bottom-left-radius:0.75rem;padding-left:0.75rem;padding-right:0.75rem;padding-top:0.75rem;padding-bottom:0.75rem;text-align:center;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));background-color:var(--hub-map-outline);font-weight:var(--calcite-font-weight-bold);font-size:var(--calcite-font-size--1)}calcite-button{margin-left:1rem}";

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const HUB_MAP_OUTLINE = '#9747FF';
const ArcgisHubDiscussionsMapActionNotice = class {
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubDrawDone = createEvent(this, "arcgisHubDrawDone", 7);
    /**
     * Styles applied when notice is active
     */
    this.activeStyles = {
      outline: `.25rem solid ${HUB_MAP_OUTLINE}`,
      padding: '.25rem',
      outlineOffset: '-.25rem'
    };
    this.view = undefined;
    this.isConnected = undefined;
    bind(this, 'handleDone');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.el);
  }
  connectedCallback() {
    this._connect();
  }
  disconnectedCallback() {
    this._disconnect();
  }
  /**
   * Connects component element and styles to MapView UI container
   */
  _connect() {
    const { view, el, activeStyles } = this;
    const addStyle = (key) => view.ui.container.style[key] = activeStyles[key];
    Object
      .keys(activeStyles)
      .forEach(addStyle);
    view.ui.add(el);
    setTimeout(() => {
      this.isConnected = true;
    }, 50);
  }
  /**
   * Removes component element and styles from UI container
   */
  _disconnect() {
    const { view, activeStyles, el } = this;
    const removeStyle = (key) => view.ui.container.style.removeProperty(key);
    Object
      .keys(activeStyles)
      .forEach(removeStyle);
    view.ui.remove(el);
    this.isConnected = false;
  }
  handleDone() {
    this.arcgisHubDrawDone.emit();
  }
  /**
   * Checks if MapView is available with UI container
   */
  get hasViewUI() {
    const { view } = this;
    return Boolean(view && view.ui);
  }
  get styles() {
    const { isConnected } = this;
    return {
      '--display': (isConnected) ? 'block' : 'none',
      '--hub-map-outline': HUB_MAP_OUTLINE
    };
  }
  render() {
    const { intl, styles, isConnected } = this;
    return (h(Host, { "aria-hidden": isConnected, "data-element": "discussions-map-action-notice", style: styles, tabindex: 0 }, h("div", null, h("span", null, intl.t('adding.notice')), h("calcite-button", { appearance: 'outline-fill', kind: 'neutral', onClick: this.handleDone, round: true, scale: 's' }, intl.t('adding.action')))));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return getElement(this); }
};
__decorate$2([
  DebounceDecoratorFactory({ timeout: 100 }),
  CallWhenFactory({ when() { return this.hasViewUI && !this.isConnected; } })
], ArcgisHubDiscussionsMapActionNotice.prototype, "_connect", null);
__decorate$2([
  CallWhenFactory({ when() { return this.hasViewUI && this.isConnected; } })
], ArcgisHubDiscussionsMapActionNotice.prototype, "_disconnect", null);
ArcgisHubDiscussionsMapActionNotice.style = arcgisHubDiscussionsMapActionNoticeCss;

const arcgisHubDiscussionsMapPreviewCss = ":host{display:block;background-color:var(--calcite-color-foreground-1);padding:1rem;padding-bottom:0.5rem;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}address{margin-bottom:0.125rem;display:grid;font-size:var(--calcite-font-size--1);font-style:normal;line-height:1.25rem;grid-template-columns:minmax(0, max-content) 1rem minmax(0, max-content)}address b{font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}address span{display:flex;justify-content:center;color:var(--calcite-color-text-2)}address arcgis-relative-date{color:var(--calcite-color-text-2)}arcgis-multiline-ellipsis{font-size:var(--calcite-font-size-0);line-height:1.375}calcite-action-group{margin-left:2.75rem}.avatars{position:relative;grid-row:span 2 / span 2;float:left;margin-right:1.25rem;display:flex}.avatars:has(calcite-avatar:only-child){margin-right:0.5rem}.avatars calcite-avatar+calcite-avatar{position:absolute;top:1rem;left:1rem;z-index:10;border-radius:9999px;border:3px solid var(--calcite-color-foreground-1)}.avatars calcite-avatar:only-child{block-size:2.5rem;inline-size:2.5rem}@media only screen and (max-width: 640px){:host{border-radius:1.75rem}}@media only screen and (min-width: 640px){:host{border-radius:1.75rem 1.75rem 1.75rem 0}}";

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ArcgisHubDiscussionsMapPreview = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubDiscussionsViewFull = createEvent(this, "arcgisHubDiscussionsViewFull", 7);
    this.arcgisHubDiscussionsGeometryZoomTo = createEvent(this, "arcgisHubDiscussionsGeometryZoomTo", 7);
    this.arcgisHubDiscussionsPreviewDidRender = createEvent(this, "arcgisHubDiscussionsPreviewDidRender", 7);
    this.arcgisHubDiscussionsPreviewDismiss = createEvent(this, "arcgisHubDiscussionsPreviewDismiss", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
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
      this.emitHubTelemetry(dist.dictionary.category.interaction.action.open.label.popUp.details.post);
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
    this.emitHubTelemetry(dist.dictionary.category.interaction.action.open.label.thread.details[this.locationId ? 'location' : 'post']);
    this.arcgisHubDiscussionsViewFull.emit();
  }
  /**
   * Emits arcgisHubDiscussionsGeometryZoomTo
   */
  handleZoomTo() {
    this.emitHubTelemetry(dist.dictionary.category.interaction.action.zoom.label.in);
    this.arcgisHubDiscussionsGeometryZoomTo.emit(this.post);
  }
  /**
   * Emits arcgisHubDiscussionsPreviewDismiss
   */
  handleDismiss() {
    this.emitHubTelemetry(dist.dictionary.category.interaction.action.close.label.popUp.details.post);
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
    return (h(Fragment, null, h("div", { class: "avatars" }, this.renderAvatars()), h("address", null, h("b", null, this.creatorFullName), h("span", null, "\u00B7"), h("arcgis-relative-date", { dateTime: post.createdAt, formatStyle: "short" })), h("arcgis-multiline-ellipsis", { innerHTML: post.body, lines: 2 }), h("calcite-action-group", { id: "text-actions", layout: "horizontal" }, h("calcite-action", { onClick: this.handleViewFullThread, scale: "s", text: this.intl.t('view'), textEnabled: true }), false , h("calcite-action", { onClick: this.handleDismiss, scale: "s", text: this.intl.t('dismiss'), textEnabled: true }))));
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "channelId": ["initialize"],
    "parentId": ["initialize"],
    "locationId": ["initialize"],
    "postId": ["initialize"]
  }; }
};
__decorate$1([
  DebounceDecoratorFactory({ timeout: 0 })
], ArcgisHubDiscussionsMapPreview.prototype, "initialize", null);
ArcgisHubDiscussionsMapPreview.style = arcgisHubDiscussionsMapPreviewCss;

const arcgisHubDiscussionsPrivateNoticeCss = ":host{display:block}";

const ArcgisHubDiscussionsPrivateNotice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.el);
  }
  render() {
    const { intl } = this;
    return (h(Host, null, h("calcite-notice", { open: true, scale: "m" }, h("div", { slot: "title" }, intl.t('title')), h("div", { slot: "message" }, intl.t('message')), h("calcite-link", { href: "https://doc.arcgis.com/en/hub/team/how-discussions-work.htm", iconEnd: "launch", slot: "link", title: intl.t('link.title') }, intl.t('link.text')))));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return getElement(this); }
};
ArcgisHubDiscussionsPrivateNotice.style = arcgisHubDiscussionsPrivateNoticeCss;

const arcgisHubDiscussionsThreadCss = ".sc-arcgis-hub-discussions-thread-h{--arcgis-hub-layout-list-gap:0;display:block;overflow:hidden;background-color:var(--calcite-color-foreground-1);padding-top:0.75rem;padding-bottom:0.75rem}arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-thread{margin-top:1.5rem;margin-bottom:1.5rem;padding-left:0.75rem;padding-right:0.75rem}arcgis-hub-discussions-post-list.sc-arcgis-hub-discussions-thread{margin-left:1rem;margin-right:1rem}arcgis-hub-discussions-post.loading.sc-arcgis-hub-discussions-thread:not([parent-id]){margin-left:1rem;margin-right:1rem;margin-bottom:1rem}arcgis-hub-discussions-post[parent-id].sc-arcgis-hub-discussions-thread{padding-left:1rem;padding-right:1rem}arcgis-hub-discussions-post.sc-arcgis-hub-discussions-thread:not([parent-id])+arcgis-hub-discussions-post[parent-id].sc-arcgis-hub-discussions-thread{margin-top:1.5rem;margin-bottom:1.5rem}calcite-notice.sc-arcgis-hub-discussions-thread{margin-top:1.5rem;margin-bottom:1.5rem;padding-left:1rem;padding-right:1rem}calcite-notice.sc-arcgis-hub-discussions-thread:first-child{margin-top:0px}arcgis-hub-discussions-blocked-notice.sc-arcgis-hub-discussions-thread{margin-top:1.5rem;margin-bottom:1.5rem;margin-left:1rem;margin-right:1rem}";

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
// TODO: e2e test updates
var ThreadView;
(function (ThreadView) {
  ThreadView["Loading"] = "loading";
  ThreadView["ParentAndReply"] = "parent_and_reply";
  ThreadView["ParentAndReplies"] = "parent_and_replies";
  ThreadView["ThreadDeleted"] = "thread_deleted";
  ThreadView["ChannelDeleted"] = "channel_deleted";
})(ThreadView || (ThreadView = {}));
const ArcgisHubDiscussionsThread = class {
  /**
   * Constructor method, pre-bind context to methods that are passed by reference
   */
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubDiscussionsPostSelect = createEvent(this, "arcgisHubDiscussionsPostSelect", 7);
    this.arcgisAppIdentityStartSignIn = createEvent(this, "arcgisAppIdentityStartSignIn", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.arcgisHubDiscussionsThreadReady = createEvent(this, "arcgisHubDiscussionsThreadReady", 7);
    this.hasMap = undefined;
    this.isHub = undefined;
    this.unsavedFeatures = undefined;
    this.unsavedRelatedFeatures = undefined;
    this.unsavedExistingFeatures = [];
    this.postId = undefined;
    this.post = undefined;
    this.postCreator = undefined;
    this.postCreatorOrg = undefined;
    this.parent = undefined;
    this.parentId = undefined;
    this.parentCreator = undefined;
    this.parentCreatorOrg = undefined;
    this.channelId = undefined;
    this.channel = undefined;
    this.channelGroups = undefined;
    this.discussion = undefined;
    this.entityId = undefined;
    this.entityType = undefined;
    this.entity = undefined;
    this.displayFieldValid = undefined;
    this.displayFieldValue = undefined;
    this.displayFieldKey = undefined;
    this.isMobile = undefined;
    this.locationId = undefined;
    this.showLocations = undefined;
    this.disableSelectExistingLocation = undefined;
    this.locationDescriptionText = undefined;
    this.showChannelAvatar = undefined;
    this.showChannelName = undefined;
    this._context = getGlobalContext();
    this.intl = undefined;
    this._loading = undefined;
    this.parentReady = false;
    this.postReady = false;
    this.postListReady = false;
    this.postEditorReady = false;
    this.ready = false;
    bind(this, 'renderParentAndReply', 'renderParentAndReplies', 'renderThreadDeleted', 'handleViewAllReplies', 'handleViewAllPosts', 'renderLoading', 'handleParentReady', 'handlePostReady', 'handlePostListReady', 'handlePostEditorReady', 'handleSignInClicked');
  }
  /**
   * Component will load lifecycle hook
   */
  componentWillLoad() {
    this.initialize();
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  /**
   * Loads translations and dependencies
   */
  async initialize() {
    this.loadTranslations();
    if (this._context) {
      this.loadDependencies();
    }
  }
  /**
   * Loads translations
   */
  async loadTranslations() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Loads dependencies
   */
  async loadDependencies() {
    this._loading = true;
    return this.fetchDependencies().then(dependencies => {
      Object.assign(this, dependencies);
      this._loading = false;
    });
  }
  /**
   * Wraps the _fetchDependencies method with a minimum delay so
   * skeleton state can be observed
   */
  fetchDependencies() {
    return this._fetchDependencies();
  }
  /**
   * Watches for changes to context and loads dependencies
   */
  handleContextChanged(context, prevContext) {
    var _a, _b;
    if (((_a = context === null || context === void 0 ? void 0 : context.currentUser) === null || _a === void 0 ? void 0 : _a.username) !== ((_b = prevContext === null || prevContext === void 0 ? void 0 : prevContext.currentUser) === null || _b === void 0 ? void 0 : _b.username)) {
      this.loadDependencies();
    }
  }
  /**
   * Handles parent post's arcgisHubDiscussionsPostReady event
   */
  handleParentReady() {
    this.parentReady = true;
    this.updateReady();
  }
  /**
   * Handles reply post's arcgisHubDiscussionsPostReady event
   */
  handlePostReady() {
    this.postReady = true;
    this.updateReady();
  }
  /**
   * Handles arcgisHubDiscussionsPostEditorReady event
   */
  handlePostEditorReady() {
    this.postEditorReady = true;
    this.updateReady();
  }
  /**
   * Handles arcgisHubDiscussionsPostListReady event
   */
  handlePostListReady() {
    this.postListReady = true;
    this.updateReady();
  }
  /**
   * Watches for change to ready and fires arcgisHubDiscussionsThreadReady when true
   */
  handleReadyChange(ready) {
    if (ready) {
      this.arcgisHubDiscussionsThreadReady.emit();
    }
  }
  /**
   * Updates ready state when elements (parent, post editor, reply or post list) fire their ready event
   */
  updateReady() {
    const elementReadyStates = [
      [this.postEditorRef, this.postEditorReady],
      [this.parentRef, this.parentReady],
      [this.postRef, this.postReady],
      [this.postListRef, this.postListReady],
    ];
    this.ready = elementReadyStates
      .filter(([elRef]) => Boolean(elRef))
      .every(([_elRef, elReady]) => elReady);
  }
  /**
   * Method that resolves a reference to the post editor component
   */
  async getPostEditorRef() {
    return this.postEditorRef;
  }
  /**
   * Method that resolves a reference to the post list component
   */
  async getPostListRef() {
    return this.postListRef;
  }
  /**
   * Fetches dependencies
   */
  async _fetchDependencies() {
    const { isHub, _context, postId, post, parent, parentId, discussion, entityId, entityType, entity, locationId, parentCreator, channelId, channel, channelGroups, displayFieldKey, displayFieldValid, displayFieldValue, } = this;
    const [postDetails, environmentDetails] = await Promise.all([
      fetchPostDetails({ postId, post }, _context.hubRequestOptions),
      fetchEnvironmentDetails({ isHub }, _context.hubRequestOptions),
    ]);
    const parentDetails = await fetchParentDetails(Object.assign({ parentId, parent }, postDetails), _context.hubRequestOptions);
    const [parentUserDetails, entityDetails, channelDetails] = await Promise.all([
      fetchParentUserDetails(Object.assign({ parentCreator }, parentDetails), _context.hubRequestOptions),
      fetchEntityDetails(Object.assign(Object.assign({ discussion, entityId, entityType, entity, locationId, displayFieldKey, displayFieldValid, displayFieldValue }, postDetails), parentDetails), _context.hubRequestOptions),
      fetchChannelDetails(Object.assign(Object.assign({ channelId, channel, channelGroups }, postDetails), parentDetails), _context.hubRequestOptions),
    ]);
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, postDetails), parentDetails), parentUserDetails), environmentDetails), entityDetails), channelDetails);
  }
  /**
   * Computes true when no context provided or dependencies are
   * being fetched
   */
  get loading() {
    const { intl, _loading, _context, channel } = this;
    return !intl || !_context || _loading || channel === undefined;
  }
  /**
   * Handles arcgisHubDiscussionsPostDelete events and updates state if the deleted
   * post is rendered within this thread
   * @param evt arcgisHubDiscussionsPostDelete event
   */
  handlePostOrReplyDeleted(evt) {
    const { parent, post } = this;
    if (evt.detail.id === (parent === null || parent === void 0 ? void 0 : parent.id) || evt.detail.id === (post === null || post === void 0 ? void 0 : post.id)) {
      if (evt.detail.id === (parent === null || parent === void 0 ? void 0 : parent.id)) {
        this.parent = null;
      }
      else {
        this.post = null;
      }
      this.deletedDuringSession = true;
    }
  }
  /**
   * Handles clicks to the View All Replies action
   */
  handleViewAllReplies() {
    const { channelId, channel, channelGroups, parent, parentId, postId, parentCreator, parentCreatorOrg } = this;
    this.arcgisHubDiscussionsPostSelect.emit({
      channel,
      channelId,
      channelGroups,
      parentId,
      parent,
      parentCreator,
      parentCreatorOrg,
    });
    this.emitHubTelemetry(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.open.label.thread), { postId,
      parentId }));
  }
  /**
   * Handles clicks to the View All Posts action
   */
  handleViewAllPosts() {
    const { parentId, postId } = this;
    this.arcgisHubDiscussionsPostSelect.emit({
      channelId: null,
      channel: null,
      channelGroups: null,
      parent: null,
      parentId: null,
      parentCreator: null,
      parentCreatorOrg: null,
    });
    this.emitHubTelemetry(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.close.label.thread), { postId,
      parentId }));
  }
  /**
   * Emits hub telemetry events, adding common properties
   */
  emitHubTelemetry(telemetry) {
    const { channelId, channel } = this;
    this.hubTelemetry.emit(Object.assign({ channelId: channelId, channelAccess: channel === null || channel === void 0 ? void 0 : channel.access }, telemetry));
  }
  /**
   * Computes map of views to render methods
   */
  get views() {
    const { renderLoading, renderParentAndReply, renderParentAndReplies, renderThreadDeleted, renderChannelDeleted } = this;
    return {
      [ThreadView.Loading]: {
        render: renderLoading,
      },
      [ThreadView.ParentAndReply]: {
        render: renderParentAndReply,
      },
      [ThreadView.ParentAndReplies]: {
        render: renderParentAndReplies,
      },
      [ThreadView.ThreadDeleted]: {
        render: renderThreadDeleted,
      },
      [ThreadView.ChannelDeleted]: {
        render: renderChannelDeleted,
      },
    };
  }
  /**
   * Computes the correct view to render
   */
  get view() {
    const { views, parentId, postId, parent, post, loading, channel } = this;
    let target;
    if (loading) {
      target = ThreadView.Loading;
    }
    else if (channel === null) {
      target = ThreadView.ChannelDeleted;
    }
    else if (parentId && postId && parent === null && post === null) {
      target = ThreadView.ThreadDeleted;
    }
    else if (postId) {
      target = ThreadView.ParentAndReply;
    }
    else {
      target = ThreadView.ParentAndReplies;
    }
    return views[target];
  }
  /**
   * Overrides or suppresses specific telemetry events that vary when viewing within
   * a thread. This is not ideal, but avoids the need to pass telemetry-only props after
   * consolidation refactor
   * @param evt hubTelemetry event
   */
  handleHubTelemetry(evt) {
    const eventsToOverride = [
      {
        from: dist.dictionary.category.interaction.action.viewed.label.post.details.postList,
        to: dist.dictionary.category.interaction.action.viewed.label.post.details.thread,
      },
      {
        from: dist.dictionary.category.interaction.action.open.label.postList,
        to: null,
      },
    ];
    const isEvent = (details) => Object.entries(details).every(([key, val]) => { var _a; return ((_a = evt.detail) === null || _a === void 0 ? void 0 : _a[key]) === val; });
    const eventToOverride = eventsToOverride.find(({ from }) => isEvent(from));
    if (eventToOverride) {
      if (eventToOverride.to) {
        Object.assign(evt.detail, eventToOverride.to);
      }
      else {
        evt.stopPropagation();
      }
    }
  }
  /**
   * Captures thread deleted impression
   */
  captureThreadDeletedImpression() {
    const { postId, parentId } = this;
    this.emitHubTelemetry(Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.viewed.label.post.details.thread), { postId,
      parentId, response: dist.constants.response.FAILURE }));
  }
  /**
   * Computes blocked notice configuration
   */
  get blockedNotice() {
    const { entity, entityType, channelGroups } = this;
    const areGroupsDiscussable = (channelGroups === null || channelGroups === void 0 ? void 0 : channelGroups.length)
      ? channelGroups.every(group => !group || isDiscussable(group))
      : true;
    const isSubjectDiscussable = isDiscussable(entity);
    let variant;
    if (!areGroupsDiscussable && !isSubjectDiscussable) {
      variant = ArcgisHubDiscussionsBlockedNoticeVariant.Reply;
    }
    else if (!areGroupsDiscussable) {
      variant = ArcgisHubDiscussionsBlockedNoticeVariant.Group;
    }
    else if (!isSubjectDiscussable) {
      variant = entityType === 'group' ? ArcgisHubDiscussionsBlockedNoticeVariant.Group : ArcgisHubDiscussionsBlockedNoticeVariant.Item;
    }
    return variant;
  }
  /**
   * Renders when deep linking to a thread or reply but the channel was deleted.
   * TODO: add long-term UI.
   */
  renderChannelDeleted() {
    return h("p", null, "channel deleted");
  }
  /**
   * Renders the parent post
   */
  renderParent() {
    const { channel, channelGroups, channelId, discussion, displayFieldKey, displayFieldValid, displayFieldValue, showChannelAvatar, showChannelName, entity, entityId, entityType, hasMap, isHub, isMobile, locationDescriptionText, locationId, parentId, parent, unsavedExistingFeatures, unsavedFeatures, unsavedRelatedFeatures, parentCreator, parentCreatorOrg, handleParentReady, showLocations, } = this;
    return (h("arcgis-hub-discussions-post", { channel: channel, channelGroups: channelGroups, channelId: channelId, discussion: discussion, displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, displayFieldValue: displayFieldValue, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, isHub: isHub, isMobile: isMobile, locationDescriptionText: locationDescriptionText, locationId: locationId, onArcgisHubDiscussionsPostReady: handleParentReady, parentCreatorOrg: parentCreatorOrg, post: parent, postCreator: parentCreator, postId: parentId, ref: (parentRef) => { this.parentRef = parentRef; }, showChannelAvatar: showChannelAvatar, showChannelName: showChannelName, showLocations: showLocations, unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures }));
  }
  /**
   * Renders the reply editor
   */
  renderReplyEditor() {
    const { _context, hasMap, unsavedFeatures, unsavedRelatedFeatures, unsavedExistingFeatures, isHub, discussion, parentId, parent, entity, entityId, entityType, channelId, channel, channelGroups, isMobile, locationId, handlePostEditorReady, showLocations, disableSelectExistingLocation, blockedNotice, } = this;
    if (Boolean(parent) && !blockedNotice && _context.currentUser) {
      return (h("arcgis-hub-discussions-post-editor", { channel: channel, channelGroups: channelGroups, channelId: channelId, disableSelectExistingLocation: disableSelectExistingLocation, discussion: discussion, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, isHub: isHub, isMobile: isMobile, locationId: locationId, onArcgisHubDiscussionsPostEditorReady: handlePostEditorReady, parent: parent, parentId: parentId, ref: (postEditorRef) => {
          this.postEditorRef = postEditorRef;
        }, showLocations: showLocations, unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures }));
    }
  }
  handleSignInClicked() {
    this.arcgisAppIdentityStartSignIn.emit();
  }
  /**
   * Renders applicable notice
   */
  renderNotice() {
    const { blockedNotice, intl, _context } = this;
    let notice;
    if (blockedNotice) {
      notice = (h("arcgis-hub-discussions-blocked-notice", { variant: blockedNotice }));
    }
    else if (!_context.currentUser) {
      notice = (h("calcite-notice", { icon: "information", kind: "info", open: true, scale: "m" }, h("div", { slot: "title" }, intl.t('signInTitle')), h("calcite-link", { onClick: this.handleSignInClicked, slot: "link" }, intl.t('signInAction'))));
    }
    return notice;
  }
  /**
   * Renders the post + replies view
   */
  renderParentAndReplies() {
    const { hasMap, unsavedFeatures, unsavedRelatedFeatures, unsavedExistingFeatures, displayFieldKey, displayFieldValid, displayFieldValue, intl, isHub, discussion, parentId, entity, entityId, entityType, isMobile, locationDescriptionText, locationId, handlePostListReady, showLocations, } = this;
    return (h(Fragment, null, this.renderParent(), this.renderReplyEditor(), this.renderNotice(), h("arcgis-hub-discussions-post-list", { discussion: discussion, displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, displayFieldValue: displayFieldValue, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, isHub: isHub, isMobile: isMobile, locationDescriptionText: locationDescriptionText, locationId: locationId, onArcgisHubDiscussionsPostListReady: handlePostListReady, parentIds: [parentId], ref: (postListRef) => {
        this.postListRef = postListRef;
      }, showLocations: showLocations, unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures }, h("calcite-notice", { kind: "danger", open: true, scale: "m", slot: "error" }, h("div", { slot: "title" }, intl.t('error')), h("div", { slot: "message" }, intl.t('repliesFailure'))))));
  }
  /**
   * Renders deep-linked reply view
   */
  renderParentAndReply() {
    const { intl, handleViewAllReplies, post, postCreator, postCreatorOrg, unsavedFeatures, hasMap, isHub, unsavedRelatedFeatures, unsavedExistingFeatures, channel, channelGroups, channelId, isMobile, locationId, discussion, displayFieldKey, displayFieldValid, displayFieldValue, showChannelAvatar, showChannelName, entity, entityId, entityType, parentId, parent, parentCreator, parentCreatorOrg, postId, handlePostReady, } = this;
    return (h(Fragment, null, this.renderParent(), Boolean(post) && (h("calcite-notice", { open: true, scale: "s" }, h("div", { slot: "title" }, intl.t('reply.single.title')), h("calcite-link", { onClick: handleViewAllReplies, slot: "link" }, intl.t('reply.single.link')))), h("arcgis-hub-discussions-post", { channel: channel, channelGroups: channelGroups, channelId: channelId, discussion: discussion, displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, displayFieldValue: displayFieldValue, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, isHub: isHub, isMobile: isMobile, locationDescriptionText: this.locationDescriptionText, locationId: locationId, onArcgisHubDiscussionsPostReady: handlePostReady, parent: parent, parentCreator: parentCreator, parentCreatorOrg: parentCreatorOrg, parentId: parentId, post: post, postCreator: postCreator, postCreatorOrg: postCreatorOrg, postId: postId, ref: (postRef) => { this.postRef = postRef; }, showChannelAvatar: showChannelAvatar, showChannelName: showChannelName, showLocations: this.showLocations, unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures })));
  }
  /**
   * Renders thread deleted notice
   */
  renderThreadDeleted() {
    const { intl, deletedDuringSession } = this;
    if (!deletedDuringSession) {
      this.captureThreadDeletedImpression();
    }
    return (h("calcite-notice", { kind: "danger", open: true, scale: "m" }, h("div", { slot: "title" }, intl.t('thread.deleted.title')), h("div", { slot: "message" }, intl.t('thread.deleted.message')), h("calcite-link", { onClick: this.handleViewAllPosts, slot: "link" }, intl.t('thread.deleted.action'))));
  }
  /**
   * Renders loading state
   */
  renderLoading() {
    // TODO: skeleton state?
    return null;
  }
  /**
   * Primary render method
   */
  render() {
    const { view } = this;
    return h(Host, { "data-element": "discussions-thread" }, view.render());
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "_context": ["handleContextChanged"],
    "ready": ["handleReadyChange"]
  }; }
};
__decorate([
  minPromiseDelayFactory({ delay: 300 })
], ArcgisHubDiscussionsThread.prototype, "fetchDependencies", null);
__decorate([
  callOnceFactory()
], ArcgisHubDiscussionsThread.prototype, "captureThreadDeletedImpression", null);
ArcgisHubDiscussionsThread.style = arcgisHubDiscussionsThreadCss;

export { ArcgisHubDiscussions as arcgis_hub_discussions, ArcgisHubDiscussionsMapActionNotice as arcgis_hub_discussions_map_action_notice, ArcgisHubDiscussionsMapPreview as arcgis_hub_discussions_map_preview, ArcgisHubDiscussionsPrivateNotice as arcgis_hub_discussions_private_notice, ArcgisHubDiscussionsThread as arcgis_hub_discussions_thread };
