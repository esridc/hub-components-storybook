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
import { getProp, isDiscussable } from '@esri/hub-common';
import { Host, h, Fragment } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { fetchEnvironmentDetails } from '../../utils/discussions/fetch-environment-details';
import { fetchEntityDetails } from '../../utils/discussions/fetch-entity-details';
import { fetchChannelDetails } from '../../utils/discussions/fetch-channel-details';
import MinPromiseDelay from '../../decorators/min-promise-delay';
import { SharingAccess } from '@esri/hub-discussions';
import Sanitize from '../../decorators/sanitize';
import { CORNERS } from '../interfaces';
import { canEditItem, getRelativeWorkspaceUrl } from '@esri/hub-common';
import { bind } from '../../utils/context';
import { downloadPostCSV, getChannelName } from '../arcgis-hub-discussions/utils/discussions';
import { fetchDiscussionSettings } from '../../utils/discussions/fetch-discussion-settings';
import { geojsonToArcGIS } from '@terraformer/arcgis';
import Polygon from "@arcgis/core/geometry/Polygon";
import Memoize from '../../decorators/memoize';
import { connectContext, getGlobalContext, showNotice } from '../../utils/state';
import { dictionary, constants as telemetryConstants } from '@esri/telemetry-dictionary-hub';
// TODO: disable or (preferably) remove post-editor css transitions?
// TODO: custom board empty state?
const alertConfig = {
  autoClose: true,
  autoCloseDuration: 'fast',
  icon: true,
  noticeType: 'alert'
};
export class ArcgisHubDiscussionsBoard {
  /**
   * Pre-binds context to methods that get passed as references/callbacks.
   * @constructor
   */
  constructor() {
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
    const telemetry = Object.assign(Object.assign({}, dictionary.category.interaction.action.download.label.csv.details.export), { channelId: this.channel.id, channelAccess: this.channel.access });
    try {
      const { size, count, duration } = await downloadPostCSV({
        entityTitle: this.entity.title,
        discussion: this.discussion,
        channels: [this.channelId],
        requestOptions: this._context.hubRequestOptions,
      });
      this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { size,
        count,
        duration, response: telemetryConstants.response.SUCCESS }));
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { response: telemetryConstants.response.FAILURE }));
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
    this.hubTelemetry.emit(dictionary.category.navigation.action.view.label.content.details.about);
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
  static get is() { return "arcgis-hub-discussions-board"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-board.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-board.css"]
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
      "layout": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "DiscussionsBoardLayout",
          "resolved": "\"grid\" | \"list\" | \"map\"",
          "references": {
            "DiscussionsBoardLayout": {
              "location": "import",
              "path": "../arcgis-hub-discussions/utils/discussions"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The layout of when view is `explore`, either `map`, `grid` or `list`"
        },
        "attribute": "layout",
        "reflect": true,
        "defaultValue": "'list'"
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
              "path": "../arcgis-hub-discussions/utils/discussions"
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
        "reflect": true,
        "defaultValue": "false"
      },
      "view": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "DiscussionBoardView",
          "resolved": "\"about\" | \"explore\"",
          "references": {
            "DiscussionBoardView": {
              "location": "import",
              "path": "../arcgis-hub-discussions/utils/discussions"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The view of the component, either `explore` or `about`"
        },
        "attribute": "view",
        "reflect": true,
        "defaultValue": "'explore'"
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "allowedChannelIds": {},
      "allowedLocations": {},
      "displayFieldValid": {},
      "displayFieldValue": {},
      "displayFieldKey": {},
      "intl": {},
      "pending": {},
      "channel": {},
      "channelGroups": {},
      "discussion": {},
      "blockedWords": {},
      "defaultChannelId": {},
      "postRefs": {},
      "listScrollTarget": {},
      "threadScrollTarget": {},
      "postListProps": {},
      "threadProps": {},
      "mapView": {},
      "drawRef": {},
      "searchRef": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubDiscussionsViewThread",
        "name": "arcgisHubDiscussionsViewThread",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user transitions between thread and original post list views. Event detail\nwill be null when traversing to original post list, else will be the thread's original post id"
        },
        "complexType": {
          "original": "{ parentId: string; channelId: string }",
          "resolved": "{ parentId: string; channelId: string; }",
          "references": {}
        }
      }, {
        "method": "arcgisAppIdentityStartSignIn",
        "name": "arcgisAppIdentityStartSignIn",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Prompts the app identity manager to start sign in process"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsFeatureDeleted",
        "name": "arcgisHubDiscussionsFeatureDeleted",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when a discussions post or reply has been deleted for map updates (map-integration)"
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
          "text": "Emitted when a discussions post or reply changes for map updates (map-integration)"
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
        "method": "arcgisHubPostEditorReady",
        "name": "arcgisHubPostEditorReady",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the post or reply editor is first connected to the DOM (map-integration)"
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
          "text": "Emitted to select a feature on the map (map-integration)"
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
          "text": "Emitted to highlight a feature on the map (map-integration)"
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
          "text": "Emitted when the user elects to draw a new geometry drawing on the map (map-integration)"
        },
        "complexType": {
          "original": "IPostDrawCreateDetails",
          "resolved": "IPostDrawCreateDetails",
          "references": {
            "IPostDrawCreateDetails": {
              "location": "import",
              "path": "../arcgis-hub-discussions/utils/discussions"
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
          "text": "Emitted when the user selects a specific geometry type to draw (map-integration)"
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
          "text": "Emitted when the user elects to edit an existing geometry drawing on the map (map-integration)"
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
          "text": "Emitted when the user elects to stop editing an existing geometry drawing on the map (map-integration)"
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
          "text": "Emitted when the user elects to reset an existing geometry drawing on the map (map-integration)"
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
          "text": "Emitted to select a geometry drawing on the map (map-integration)"
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
          "text": "Emitted to deselect a geometry drawing on the map (map-integration)"
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
          "text": "Emitted when a location should be removed from the map (map-integration)"
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
          "text": "Emitted to clear geometry graphics unsaved in the map editor (map-integration)"
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
      }, {
        "method": "arcgisHubDiscussionsViewChanged",
        "name": "arcgisHubDiscussionsViewChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the view of the component changes"
        },
        "complexType": {
          "original": "DiscussionBoardView",
          "resolved": "\"about\" | \"explore\"",
          "references": {
            "DiscussionBoardView": {
              "location": "import",
              "path": "../arcgis-hub-discussions/utils/discussions"
            }
          }
        }
      }, {
        "method": "arcgisHubDiscussionsLayoutChanged",
        "name": "arcgisHubDiscussionsLayoutChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the layout of the component changes when `view` is `explore`"
        },
        "complexType": {
          "original": "DiscussionsBoardLayout",
          "resolved": "\"grid\" | \"list\" | \"map\"",
          "references": {
            "DiscussionsBoardLayout": {
              "location": "import",
              "path": "../arcgis-hub-discussions/utils/discussions"
            }
          }
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
        "name": "arcgisHubDiscussionsPostListLayoutChanged",
        "method": "handleLayoutChanged",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsPostEditorReady",
        "method": "handlePostEditorReady",
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
        "name": "arcgisHubDiscussionsPostGeographySelect",
        "method": "handleGeometryFeatureSelect",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDrawDone",
        "method": "handleDrawDone",
        "target": "body",
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
        "name": "arcgisHubDiscussionsFeatureRemove",
        "method": "handleFeatureRemove",
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
        "name": "arcgisHubDiscussionsGeometryClearAll",
        "method": "handleGeometryClearAll",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  MinPromiseDelay({ delay: 300 })
], ArcgisHubDiscussionsBoard.prototype, "fetchDependencies", null);
__decorate([
  Memoize('allowedLocations')
], ArcgisHubDiscussionsBoard.prototype, "allowedLocationsArcGIS", null);
__decorate([
  Memoize('entity.data.view.mapSettings')
], ArcgisHubDiscussionsBoard.prototype, "mapSettings", null);
__decorate([
  Memoize('entity.data.prompt'),
  Sanitize()
], ArcgisHubDiscussionsBoard.prototype, "sanitizedEntityPrompt", null);
