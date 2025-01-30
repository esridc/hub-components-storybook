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
import { Host, h, Fragment } from '@stencil/core';
import { DiscussionType, isDiscussable } from '@esri/hub-discussions';
import { canEditItem } from '@esri/hub-common';
import { updateDiscussable, downloadPostCSV } from './utils/discussions';
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
import { dictionary, constants as telemetryConstants } from '@esri/telemetry-dictionary-hub';
import { ResizeObserverManager } from '../../utils/resize-observer';
import Debounce from '../../decorators/debounce';
import CallOnce from '../../decorators/call-once';
import { ArcgisHubDiscussionsBlockedNoticeVariant } from './components/arcgis-hub-discussions-blocked-notice/resources';
import { fetchEnvironmentDetails } from '../../utils/discussions/fetch-environment-details';
import { fetchEntityDetails } from '../../utils/discussions/fetch-entity-details';
import MinPromiseDelay from '../../decorators/min-promise-delay';
import { connectContext, getGlobalContext } from '../../utils/state';
import { redirectToExternalUrl, showNotice } from '../../utils';
const alertConfig = {
  autoClose: true,
  autoCloseDuration: 'fast',
  icon: true,
  noticeType: 'alert'
};
export class ArcgisHubDiscussions {
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor() {
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.close.label.thread), { postId: thread.postId, parentId: thread.parentId, channelId: thread.channelId, channelAccess: (_a = thread.channel) === null || _a === void 0 ? void 0 : _a.access }));
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
    this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.editor);
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.open.label.thread), { postId,
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
    this.hubTelemetry.emit(dictionary.category.interaction.action.viewed.label.empty);
  }
  /**
   * Handles clicks to the check status link when an error occurs
   */
  handleCheckStatus(evt) {
    evt.preventDefault();
    const target = evt.target;
    this.hubTelemetry.emit(dictionary.category.navigation.action.external.label.hubStatus);
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
    this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.panel.details.discussionOptions);
  }
  async handleDiscussionsDownloadClick() {
    try {
      const { size, count, duration } = await downloadPostCSV({
        entityTitle: this.entity.title,
        discussion: this.discussion,
        requestOptions: this._context.hubRequestOptions,
      });
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.download.label.csv.details.export), { size,
        count,
        duration, response: telemetryConstants.response.SUCCESS }));
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.download.label.csv.details.export), { response: telemetryConstants.response.FAILURE }));
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
    const telemetry = dictionary.category[categoryKey].action.update.label.settings.details[detailsKey];
    this.optionsSaving = true;
    this.optionsError = null;
    try {
      const reference = await updateDiscussable(Object.assign({ subject: entity, discussable: value }, _context.requestOptions));
      this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { response: telemetryConstants.response.SUCCESS }));
      this.entity = reference;
    }
    catch (error) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { response: telemetryConstants.response.FAILURE }));
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
  static get is() { return "arcgis-hub-discussions"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "discussion": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional discussion URI string"
        },
        "attribute": "discussion",
        "reflect": true
      },
      "parentId": {
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
          "text": "An optional UUID string of a parent post. Required when\n`postId` is provided. Used when deep linking to a parent\nor a reply"
        },
        "attribute": "parent-id",
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
          "text": "An optional UUID string of a reply post. Used when deep linking\nto a reply"
        },
        "attribute": "post-id",
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
          "text": "An optional channel ID string used for deep-linking to a specific post or reply.\nRequired when parentId is provided."
        },
        "attribute": "channel-id",
        "reflect": true
      },
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
          "text": "An optional location ID string used for displaying posts and replies that\nreference an location by its' feature ID in the discussion URI"
        },
        "attribute": "location-id",
        "reflect": true
      },
      "unsavedFeatures": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Feature[]",
          "resolved": "Feature<Geometry, { [name: string]: any; }>[]",
          "references": {
            "Feature": {
              "location": "import",
              "path": "geojson"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Features (geometries) unsaved for location updates"
        },
        "defaultValue": "[]"
      },
      "unsavedRelatedFeatures": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IPostRelatedFeatureDetails[]",
          "resolved": "IPostRelatedFeatureDetails[]",
          "references": {
            "IPostRelatedFeatureDetails": {
              "location": "import",
              "path": "./utils/discussions"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Related Features (ID's of features in associated feature service) unsaved for location updates"
        },
        "defaultValue": "[]"
      },
      "unsavedExistingFeatures": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Feature[]",
          "resolved": "Feature<Geometry, { [name: string]: any; }>[]",
          "references": {
            "Feature": {
              "location": "import",
              "path": "geojson"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Feature geometry edits for existing post locations"
        },
        "defaultValue": "[]"
      },
      "hasMap": {
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
          "text": "If a map is present in the DOM that this component should integrate with"
        },
        "attribute": "has-map",
        "reflect": false
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
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If this component is embedded in a Hub site"
        },
        "attribute": "is-hub",
        "reflect": false
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
      },
      "showChannelName": {
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
          "text": "Whether to render channel name in the post header"
        },
        "attribute": "show-channel-name",
        "reflect": false
      },
      "dismissible": {
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
          "text": "If the calcite-panel renders the dismiss button"
        },
        "attribute": "dismissible",
        "reflect": false
      },
      "enableGoTo": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the component renders the header action to go to current extent of posts on the map"
        },
        "attribute": "enable-go-to",
        "reflect": false
      },
      "disableNavigation": {
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
          "text": "If the component should disable back navigation"
        },
        "attribute": "disable-navigation",
        "reflect": false
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
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional UUID string of an IHubContent or IGroup representing the subject entity of the discussion.\nIf `entityId` and `entityType` are provided but `entity` is not, the entity will be fetched."
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
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional string representing the type (`content` or `group`) of subject entity of the discussion.\nIf `entityType` and `entityId` are provided but `entity` is not, the entity will be fetched."
        },
        "attribute": "entity-type",
        "reflect": true
      },
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
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional reference to the IHubContent or IGroup representing the subject entity of the discussion.\nIf `entity` is not provided, it will be fetched using the given `entityId` & `entityType` or the given\n`discussion`."
        }
      }
    };
  }
  static get states() {
    return {
      "threadScrollTarget": {},
      "_context": {},
      "postListProps": {},
      "threadProps": {},
      "listScrollTarget": {},
      "_loading": {},
      "displayFieldValid": {},
      "displayFieldValue": {},
      "displayFieldKey": {},
      "error": {},
      "optionsError": {},
      "optionsSaving": {},
      "showPostEditor": {},
      "isMobile": {},
      "showOptions": {},
      "intl": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubPostEditorReady",
        "name": "arcgisHubPostEditorReady",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the post or reply editor is first connected to the DOM"
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
        "method": "arcgisHubGeometryGoTo",
        "name": "arcgisHubGeometryGoTo",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted to zoom to extent of current dicussion thread"
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
        "method": "arcgisHubDiscussionsFeature",
        "name": "arcgisHubDiscussionsFeature",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when a discussions post or reply changes for map updates"
        },
        "complexType": {
          "original": "{ post: IPost; create: boolean }",
          "resolved": "{ post: IPost; create: boolean; }",
          "references": {
            "IPost": {
              "location": "import",
              "path": "@esri/hub-discussions"
            }
          }
        }
      }, {
        "method": "arcgisHubDiscussionsFeatureDeleted",
        "name": "arcgisHubDiscussionsFeatureDeleted",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when a discussions post or reply has been deleted for map updates"
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
        "method": "arcgisHubGeometryFeatureSelect",
        "name": "arcgisHubGeometryFeatureSelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted to select a feature on the map"
        },
        "complexType": {
          "original": "Feature",
          "resolved": "Feature<Geometry, { [name: string]: any; }>",
          "references": {
            "Feature": {
              "location": "import",
              "path": "geojson"
            }
          }
        }
      }, {
        "method": "arcgisHubGeometryFeatureHover",
        "name": "arcgisHubGeometryFeatureHover",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted to highlight a feature on the map"
        },
        "complexType": {
          "original": "Feature",
          "resolved": "Feature<Geometry, { [name: string]: any; }>",
          "references": {
            "Feature": {
              "location": "import",
              "path": "geojson"
            }
          }
        }
      }, {
        "method": "arcgisHubGeometryDrawCreate",
        "name": "arcgisHubGeometryDrawCreate",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user elects to draw a new geometry drawing on the map"
        },
        "complexType": {
          "original": "IPostDrawCreateDetails",
          "resolved": "IPostDrawCreateDetails",
          "references": {
            "IPostDrawCreateDetails": {
              "location": "import",
              "path": "./utils/discussions"
            }
          }
        }
      }, {
        "method": "arcgisHubGeometryDrawTypeSelect",
        "name": "arcgisHubGeometryDrawTypeSelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user selects a specific geometry type to draw"
        },
        "complexType": {
          "original": "Tool",
          "resolved": "\"circle\" | \"point\" | \"polygon\" | \"polyline\" | \"rectangle\" | \"select\"",
          "references": {
            "Tool": {
              "location": "import",
              "path": "../arcgis-hub-map-widget-container/arcgis-hub-map-widget-draw/types"
            }
          }
        }
      }, {
        "method": "arcgisHubGeometryDrawEdit",
        "name": "arcgisHubGeometryDrawEdit",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user elects to edit an existing geometry drawing on the map"
        },
        "complexType": {
          "original": "Feature",
          "resolved": "Feature<Geometry, { [name: string]: any; }>",
          "references": {
            "Feature": {
              "location": "import",
              "path": "geojson"
            }
          }
        }
      }, {
        "method": "arcgisHubGeometryDrawEditCancel",
        "name": "arcgisHubGeometryDrawEditCancel",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user elects to stop editing an existing geometry drawing on the map"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubGeometryDrawReset",
        "name": "arcgisHubGeometryDrawReset",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user elects to reset an existing geometry drawing on the map"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubGeometrySelect",
        "name": "arcgisHubGeometrySelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted to select a geometry drawing on the map"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "arcgisHubGeometryDeselect",
        "name": "arcgisHubGeometryDeselect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted to deselect a geometry drawing on the map"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsViewThread",
        "name": "arcgisHubDiscussionsViewThread",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user transitions between thread and thread list views. Event detail\nwill be null when traversing to thread list, else will be the thread's original post id"
        },
        "complexType": {
          "original": "{ parentId: string; channelId: string }",
          "resolved": "{ parentId: string; channelId: string; }",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsDismiss",
        "name": "arcgisHubDiscussionsDismiss",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when dismissible is true and user clicks the panel dismiss button"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsClose",
        "name": "arcgisHubDiscussionsClose",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when dicussions panel is closed"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubFeatureRemove",
        "name": "arcgisHubFeatureRemove",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when a location should be removed from the map"
        },
        "complexType": {
          "original": "Feature",
          "resolved": "Feature<Geometry, { [name: string]: any; }>",
          "references": {
            "Feature": {
              "location": "import",
              "path": "geojson"
            }
          }
        }
      }, {
        "method": "arcgisHubGeometryClearAll",
        "name": "arcgisHubGeometryClearAll",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted to clear geometry graphics unsaved in the map editor"
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
        "propName": "_context",
        "methodName": "handleContextChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubDiscussionsPostEditorReady",
        "method": "handlePostEditorReady",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsPostCancel",
        "method": "handlePostCanceled",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsPostCreate",
        "method": "handlePostCreate",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsPostDelete",
        "method": "handlePostDeleted",
        "target": "body",
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsPostEdit",
        "method": "handlePostEdited",
        "target": "body",
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsPostSelect",
        "method": "handlePostSelect",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsPostGeographySelect",
        "method": "handleGeometryFeatureSelect",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsPostGeographyHover",
        "method": "handleGeometryFeatureHover",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsGeometryDrawCreate",
        "method": "handleGeometryDrawCreate",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsGeometryDrawTypeSelect",
        "method": "handleGeometryDrawTypeSelect",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsGeometryDrawEdit",
        "method": "handleGeometryDrawEdit",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsGeometryDrawEditCancel",
        "method": "handleGeometryDrawEditCancel",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsGeometryDrawReset",
        "method": "handleGeometryDrawReset",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsGeometrySelect",
        "method": "handleGeometrySelect",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsGeometryDeselect",
        "method": "handleGeometryDeselect",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsFeatureRemove",
        "method": "handleFeatureRemove",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsGeometryClearAll",
        "method": "handleGeometryClearAll",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "calcitePanelDismissedChange",
        "method": "handleCalcitePanelDismissedChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "calcitePanelClose",
        "method": "handleCalcitePanelDismissChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  MinPromiseDelay({ delay: 300 })
], ArcgisHubDiscussions.prototype, "fetchDependencies", null);
__decorate([
  CallOnce()
], ArcgisHubDiscussions.prototype, "captureEmptyListImpression", null);
__decorate([
  Debounce({ timeout: 250 })
], ArcgisHubDiscussions.prototype, "checkIsMobile", null);
