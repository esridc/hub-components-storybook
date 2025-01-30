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
import { createPost, updatePost, SharingAccess, parseDiscussionURI, isDiscussable, searchChannels, fetchChannel, fetchPost, PostRelation, createReply, updateChannel, parseMentionedUsers, } from '@esri/hub-discussions';
import { cloneObject, getChannelUsersQuery } from '@esri/hub-common';
import { bind } from '../../../../utils/context';
import { augmentDiscussionURIWithFeature, MAX_TITLE_LENGTH, MAX_BODY_LENGTH, WARNING_BODY_LENGTH, featuresToGeometryCollection, postToFeatures, determineChannelOwner, getChannelName, } from '../../utils/discussions';
import intlManager from '../../../../utils/intl-manager';
import { TIME_INTERVAL, TIME_UNIT } from '../../../../utils/date-time';
import { fetchTeamFromCache } from '../../../../utils/teams';
import { STEP } from './types';
import { dictionary, constants as telemetryConstants } from '@esri/telemetry-dictionary-hub';
import MinPromiseDelay from '../../../../decorators/min-promise-delay';
import CallWhen from '../../../../decorators/call-when';
import { ArcgisHubDiscussionsBlockedNoticeVariant } from '../arcgis-hub-discussions-blocked-notice/resources';
import { fetchChannelDetails } from '../../../../utils/discussions/fetch-channel-details';
import { fetchEntityDetails } from '../../../../utils/discussions/fetch-entity-details';
import { fetchEnvironmentDetails } from '../../../../utils/discussions/fetch-environment-details';
import { fetchParentDetails } from '../../../../utils/discussions/fetch-parent-details';
import { fetchParentUserDetails } from '../../../../utils/discussions/fetch-parent-user-details';
import { fetchPostUserDetails } from '../../../../utils/discussions/fetch-post-user-details';
import { searchChannelsWithRecentUserActivity } from '../../../../utils/discussions/search-channels-with-recent-user-activity';
import { fetchPostDetails } from '../../../../utils/discussions/fetch-post-details';
import Memoize from '../../../../decorators/memoize';
import { connectContext, getGlobalContext } from '../../../../utils/state';
// TODO: consolidate other methods
export class ArcgisHubDiscussionsPostEditor {
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor() {
    this.post = undefined;
    this.postCreator = undefined;
    this.postCreatorOrg = undefined;
    this.postId = undefined;
    this.parent = undefined;
    this.parentCreator = undefined;
    this.parentId = undefined;
    this.channel = undefined;
    this.channelAccess = undefined;
    this.channelGroupIds = undefined;
    this.channelGroups = undefined;
    this.channelId = undefined;
    this.entity = undefined;
    this.entityId = undefined;
    this.entityType = undefined;
    this.discussion = undefined;
    this.displayFieldKey = undefined;
    this.displayFieldValid = undefined;
    this.displayFieldValue = undefined;
    this.locationId = undefined;
    this.hasMap = undefined;
    this.isHub = undefined;
    this.unsavedFeatures = [];
    this.unsavedRelatedFeatures = [];
    this.unsavedExistingFeatures = [];
    this.index = undefined;
    this.isMobile = undefined;
    this.createParentSaveButtonText = undefined;
    this.createParentBodyPlaceholderText = undefined;
    this.showLocations = undefined;
    this.disableSelectExistingLocation = undefined;
    this.showHeader = undefined;
    this.collapsible = undefined;
    this.collapsed = undefined;
    this.channelModifiable = undefined;
    this.initialValues = undefined;
    this._context = getGlobalContext();
    this._unsavedFeatures = [];
    this._unsavedRelatedFeatures = [];
    this._unsavedExistingFeatures = [];
    this.pending = false;
    this.loading = undefined;
    this.titleValue = '';
    this.bodyValue = '';
    this.discussionValue = '';
    this.geometryValue = undefined;
    this.geometryValueHasChanges = undefined;
    this.locationActionElement = undefined;
    this.recentChannelsResults = undefined;
    this.step = STEP.AUDIENCE;
    this.errorMessage = null;
    this.confirmCancel = false;
    this.addLocationsActiveGeometryType = undefined;
    this.addLocationsPopoverOpen = undefined;
    this.asAnonymous = false;
    bind(this, 'handleSubmit', 'handleCancel', 'handleCancelOrConfirm', 'handleConfirmBackButtonClicked', 'updateTitleValue', 'handleSelectRecentChannel', 'handleChannelSelectedFromCombobox', 'handleBack', 'focusInput', 'handleGroupSearchOpened', 'proceedToContentCreation', 'setActiveGeometryDrawType', 'handleReplySubmit', 'handleHelpPopoverOpen', 'handleLocationPopoverOpen', 'handleHelpPopoverClose', 'handleLocationPopoverClose', 'handleBodyElementRef', 'handleTitleElementRef', 'getMentionQuery', 'handleAnonToggle');
  }
  /**
   * Component will load lifecycle method, fetches translations and data
   * needed to render the UI
   */
  async componentWillLoad() {
    const [intl] = await Promise.all([intlManager.loadIntlForComponent(this.element), this.initialize(this._context)]);
    this.intl = intl;
    this.initializeValues();
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  /**
   * True when the language is rtl
   */
  get isRtl() {
    return this.intl.direction === 'rtl';
  }
  /**
   * Computes if cancel action should be confirmed
   */
  get shouldConfirmCancel() {
    const { titleValue, bodyValue, post, isReply } = this;
    let confirm;
    if (post) {
      confirm = isReply && bodyValue !== post.body;
    }
    else {
      confirm = isReply ? bodyValue.length > 0 : titleValue.length > 0 || bodyValue.length > 0;
    }
    return confirm;
  }
  /**
   * IPost with augmented with current location edits
   */
  get postWithLocationEdits() {
    const { post, geometryValue, discussionValue } = this;
    let _post;
    if (post) {
      _post = cloneObject(post);
      _post.geometry = geometryValue;
      if (discussionValue !== post.discussion) {
        _post.discussion = discussionValue;
      }
    }
    return _post;
  }
  get hasMentionedUsers() {
    const mentionedUsers = parseMentionedUsers(this.bodyValue);
    return !!mentionedUsers.length;
  }
  /**
   * Fetches the post editor dependencies
   */
  async fetchDependencies() {
    const { postId, postCreator, postCreatorOrg, parent, parentId, post, channel, channelId, _context, discussion, entityId, entity, entityType, displayFieldKey, displayFieldValid, displayFieldValue, isHub, channelGroupIds, channelAccess, locationId, parentCreator, channelGroups, } = this;
    const [postDetails, environmentDetails] = await Promise.all([
      fetchPostDetails({ postId, post }, _context.hubRequestOptions),
      fetchEnvironmentDetails({ isHub }, _context.hubRequestOptions),
    ]);
    const [postUserDetails, parentDetails] = await Promise.all([
      fetchPostUserDetails(Object.assign({ postCreator, postCreatorOrg }, postDetails), _context.hubRequestOptions),
      fetchParentDetails(Object.assign({ parentId, parent }, postDetails), _context.hubRequestOptions),
    ]);
    const [entityDetails, channelDetails, parentUserDetails] = await Promise.all([
      fetchEntityDetails(Object.assign(Object.assign({ discussion, entityId, entityType, entity, displayFieldKey, displayFieldValid, displayFieldValue, locationId }, postDetails), parentDetails), _context.hubRequestOptions),
      fetchChannelDetails(Object.assign(Object.assign({ channelId, channel: channel, channelGroups, channelGroupIds, channelAccess }, postDetails), parentDetails), _context.hubRequestOptions),
      fetchParentUserDetails(Object.assign({ parentCreator }, parentDetails), _context.hubRequestOptions),
    ]);
    Object.assign(this, postDetails, postUserDetails, parentDetails, parentUserDetails, channelDetails, entityDetails, environmentDetails);
  }
  /**
   * Initializes the component
   */
  async initialize(context, prevContext) {
    var _a, _b;
    if (((_a = context === null || context === void 0 ? void 0 : context.currentUser) === null || _a === void 0 ? void 0 : _a.username) !== ((_b = prevContext === null || prevContext === void 0 ? void 0 : prevContext.currentUser) === null || _b === void 0 ? void 0 : _b.username)) {
      this.loading = true;
      await this.fetchDependencies();
      const { post, channel } = this;
      if (post) {
        const { title, body, discussion, geometry } = post;
        this.bodyValue = body;
        if (post.title) {
          this.titleValue = title;
        }
        this.discussionValue = discussion;
        const geometryClone = cloneObject(geometry);
        this.geometryValue = Object.keys(geometryClone || {}).length ? geometryClone : null;
      }
      channel ? this.proceedToContentCreation() : this.fetchRecentChannelDetails();
      this.arcgisHubDiscussionsPostEditorReady.emit(post);
      this.loading = false;
    }
  }
  /**
   * Sets initial title and body values, useful when wanting to render the
   * editor component with any previously entered title or body strings
   */
  initializeValues() {
    const { initialValues } = this;
    if (initialValues) {
      const { title, body } = initialValues;
      this.titleValue = title;
      this.bodyValue = body;
    }
  }
  /**
   * Emits arcgisHubDiscussionsPostChanged when title and
   * body values are changed
   */
  handleTitleBodyValueUpdate() {
    this.arcgisHubDiscussionsPostChanged.emit({
      title: this.titleValue,
      body: this.bodyValue
    });
  }
  /**
   * Fetches a collection of channel detailss in which the user has most recently
   * posted to and enforces a minimum delay of 300ms before the promise resolves
   * so skeleton state can be observed
   * @returns Promise that resolves IChannelDetails[]
   */
  async _fetchRecentChannelDetails() {
    const { _context } = this;
    try {
      const { items } = await searchChannelsWithRecentUserActivity(_context.currentUser.username, _context.hubRequestOptions);
      if (items.length === 0) {
        this.hubTelemetry.emit(dictionary.category.interaction.action.viewed.label.empty);
      }
      else {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.viewed.label.recents), { response: telemetryConstants.response.SUCCESS }));
      }
      return items;
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.viewed.label.recents), { response: telemetryConstants.response.FAILURE }));
      console.error('Failed to fetch recent channels:', e.message);
      throw e;
    }
  }
  /**
   * Fetches a collection of channel details in which the user has most recently
   * posted to and updates state
   */
  async fetchRecentChannelDetails() {
    this.errorMessage = null;
    try {
      this.recentChannelsResults = await this._fetchRecentChannelDetails();
    }
    catch (e) {
      this.errorMessage = 'error.load';
      this.recentChannelsResults = [];
    }
  }
  /**
   * Emits telemetry with default props
   * @param telemetry
   */
  emitHubTelemetry(telemetry) {
    const { channel, channelGroups } = this;
    const { groupAccesses, groupOrgIds } = (channelGroups !== null && channelGroups !== void 0 ? channelGroups : []).reduce((acc, group) => group
      ? {
        groupAccesses: [...acc.groupAccesses, group.access],
        groupOrgIds: [...acc.groupOrgIds, group.orgId],
      }
      : acc, { groupAccesses: [], groupOrgIds: [] });
    this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { channelAccess: channel.access, channelId: channel.id, groupAccess: groupAccesses.filter(Boolean).join(', '), groupId: channel.groups.join(', '), groupOrgId: groupOrgIds.filter(Boolean).join(', '), orgId: channel.orgs.join(', ') }));
  }
  formatTimeString(date) {
    const delta = Date.now() - new Date(date).valueOf();
    const days = Math.floor(delta / TIME_INTERVAL.DAY);
    const timeStr = this.intl.formatRelativeTime(-days, TIME_UNIT.DAY);
    return timeStr;
  }
  /**
   * Called when the user selects a group from the Recent Groups section
   * @param evt A mouse click event object
   */
  handleSelectRecentChannel(evt) {
    const target = evt.target;
    const index = target.dataset.channelIndex;
    this.channel = this.recentChannelsResults[index].channel;
    this.channelGroups = this.recentChannelsResults[index].channelGroups;
    this.emitHubTelemetry(Object.assign(Object.assign({}, dictionary.category.interaction.action.select.label.groups.details.recents), { position: index }));
    this.proceedToContentCreation();
  }
  /**
   * Handles users clicking the Select Group button after having selected
   * a group from the combobox
   */
  handleChannelSelectedFromCombobox() {
    this.emitHubTelemetry(dictionary.category.interaction.action.select.label.groups);
    this.proceedToContentCreation();
  }
  /**
   * Change to the content creation step
   */
  proceedToContentCreation() {
    this.step = STEP.CONTENT;
  }
  /**
   * Handles the calcite-combobox calciteComboboxChange event, if a group is selected
   * it fetches the group details to use for net new posts
   * @param evt A CustomEvent that includes the items selected by the calcite-combobox
   */
  async handleComboboxChange(evt) {
    const { _context } = this;
    const { selectedItems } = evt.target;
    if (selectedItems.length) {
      const [{ value: groupId }] = selectedItems;
      const [group, { items: [channel], },] = await Promise.all([
        fetchTeamFromCache(groupId, _context.hubRequestOptions),
        searchChannels(Object.assign({ data: {
            num: 1,
            groups: [groupId],
            access: [SharingAccess.PRIVATE],
          } }, _context.hubRequestOptions)),
      ]);
      if (channel) {
        this.channel = channel;
        this.channelGroups = [group];
        this.channelId = channel.id;
      }
      else {
        this.channel = {
          access: SharingAccess.PRIVATE,
          groups: [group.id],
          orgs: [_context.currentUser.orgId],
        };
        this.channelGroups = [group];
        this.channelId = null;
      }
      this.emitHubTelemetry(dictionary.category.interaction.action.select.label.groups);
    }
    else {
      this.emitHubTelemetry(dictionary.category.interaction.action.deselect.label.groups);
      this.channel = null;
      this.channelGroups = null;
      this.channelId = null;
    }
  }
  handleGeometryValueUpdated() {
    if (this.post) {
      const { post: { geometry }, geometryValue, } = this;
      this.geometryValueHasChanges = JSON.stringify(geometryValue) !== JSON.stringify(geometry);
    }
  }
  /**
   * Updates internal _feature state when the unsavedFeatures prop value changes
   * @param feature A Feature object
   */
  mapFeaturePropToState(unsavedFeatures) {
    var _a;
    // Used to discriminate between incoming props when multiple replies open (edit post || edit reply || create reply in thread)
    const { postId, post } = this;
    if (unsavedFeatures.length) {
      const featureId = (_a = unsavedFeatures[0].properties) === null || _a === void 0 ? void 0 : _a.id;
      const isRecipient = postId === featureId || (!post && !featureId);
      if (isRecipient) {
        this._unsavedFeatures = unsavedFeatures.filter(({ properties }) => {
          // filter any pending drawings
          return !(properties === null || properties === void 0 ? void 0 : properties.pending);
        });
        this.resetActiveGeometryDrawType();
      }
    }
    else {
      this._unsavedFeatures = [];
    }
  }
  /**
   * Updates internal _feature state when the unsavedExistingFeatures prop value changes
   * @param feature A Feature object
   */
  mapExistingFeaturePropToState(unsavedExistingFeatures) {
    var _a;
    // Used to discriminate between incoming props when multiple replies open (edit post || edit reply || create reply in thread)
    const { postId } = this;
    if (unsavedExistingFeatures.length) {
      const featureId = (_a = unsavedExistingFeatures[0].properties) === null || _a === void 0 ? void 0 : _a.id;
      const isRecipient = postId === featureId;
      if (isRecipient) {
        this._unsavedExistingFeatures = unsavedExistingFeatures;
        unsavedExistingFeatures.forEach(feature => {
          const { geometry, properties } = feature;
          if (!geometry) {
            // remove features with empty geometry
            this.removeFeature(properties.index, null, false);
          }
        });
        this.resetActiveGeometryDrawType();
      }
    }
    else {
      this._unsavedExistingFeatures = [];
    }
  }
  /**
   * Updates internal _relatedFeature state when the relatedFeature prop value changes
   * @param relatedFeature An IPostRelatedFeatureDetails object
   */
  mapRelatedFeaturePropToState(unsavedRelatedFeatures) {
    // Used to discrimate between incoming props when multiple replies open (edit post || edit reply || create reply in thread)
    const { postId } = this;
    if (unsavedRelatedFeatures.length) {
      const relatedFeatureId = unsavedRelatedFeatures[0].postId;
      const isRecipient = postId === relatedFeatureId || (!postId && !relatedFeatureId);
      if (isRecipient) {
        this._unsavedRelatedFeatures = unsavedRelatedFeatures;
        this.resetActiveGeometryDrawType();
      }
    }
    else {
      this._unsavedRelatedFeatures = [];
    }
  }
  handleAddLocationsActiveGeometryTypeChanged(geometryType) {
    if (geometryType) {
      this.arcgisHubDiscussionsGeometryDrawTypeSelect.emit(geometryType);
    }
  }
  /**
   * Handles form submissions when editing or creating a net new post
   * @param evt A form submit event
   * @returns a Promise<IPost>
   */
  handleSubmit(evt) {
    evt.preventDefault();
    const promise = this.postId ? this.handleEdit() : this.handleCreate();
    this.pending = true;
    return promise.finally(() => {
      this.pending = false;
      this.arcgisHubDiscussionsGeometryClearAll.emit();
      this.addLocationsActiveGeometryType = null;
    });
  }
  /**
   * Creates a net new post
   * @returns a Promise<IPost>
   */
  async handleCreate() {
    var _a;
    const { _context, _unsavedFeatures, _unsavedRelatedFeatures, bodyValue, titleValue, channelId, channelGroups, discussion, asAnonymous, entity: { url }, arcgisHubDiscussionsPostCreate, } = this;
    let { channel } = this;
    let uri = discussion;
    if (_unsavedRelatedFeatures.length) {
      const layerId = url.split('/').pop();
      const objectIds = new Set(_unsavedRelatedFeatures.map(feature => feature.objectId));
      uri = augmentDiscussionURIWithFeature(uri, layerId, Array.from(objectIds));
    }
    let geometry = null;
    if (_unsavedFeatures.length) {
      geometry = _unsavedFeatures.length > 1 ? featuresToGeometryCollection(_unsavedFeatures) : _unsavedFeatures[0].geometry;
    }
    this.errorMessage = null;
    let post;
    const channelProps = (channel === null || channel === void 0 ? void 0 : channel.id)
      ? { channelId: channel.id }
      : {
        access: (channel === null || channel === void 0 ? void 0 : channel.access) || SharingAccess.PRIVATE,
        groups: (channel === null || channel === void 0 ? void 0 : channel.groups) || [],
      };
    try {
      const { id } = await createPost(Object.assign({ data: Object.assign(Object.assign({}, channelProps), { discussion: uri, title: titleValue.trim() || undefined, body: bodyValue.trim(), geometry,
          asAnonymous }), mentionUrl: window.location.href }, _context.hubRequestOptions));
      post = await fetchPost(Object.assign({ postId: id, data: {
          relations: [PostRelation.REACTIONS],
        } }, this._context.hubRequestOptions));
      post.replyCount = 0;
      channel = await fetchChannel(Object.assign({ channelId: post.channelId }, _context.hubRequestOptions));
      const updatedChannelOwner = determineChannelOwner(channel, channelGroups);
      if (channel.creator === _context.currentUser.username && channel.creator !== updatedChannelOwner) {
        await updateChannel(Object.assign({ channelId: post.channelId, data: { creator: updatedChannelOwner } }, _context.hubRequestOptions));
      }
      this.titleValue = '';
      this.bodyValue = '';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.create.label.post), { response: telemetryConstants.response.SUCCESS, details: (_a = post.title) !== null && _a !== void 0 ? _a : null, groupId: channel.groups.join(', '), postId: post.id, channelId: channel.id, channelAccess: channel.access }));
      arcgisHubDiscussionsPostCreate.emit(post);
      this.focusInput();
      return post;
    }
    catch (e) {
      this.errorMessage = 'error.create';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.create.label.post), { response: telemetryConstants.response.FAILURE, groupId: channel === null || channel === void 0 ? void 0 : channel.groups.join(', '), channelId, channelAccess: channel === null || channel === void 0 ? void 0 : channel.access }));
      console.error('Failed to create post:', e.message);
      return null;
    }
  }
  /**
   * Edits an existing post
   * @returns a Promise<IPost>
   */
  handleEdit() {
    const { _context, bodyValue, titleValue, channelId, channel, post, _unsavedFeatures, _unsavedExistingFeatures, _unsavedRelatedFeatures, arcgisHubDiscussionsPostEdit, entity: { url }, } = this;
    this.errorMessage = null;
    let uri = this.discussionValue;
    if (_unsavedRelatedFeatures.length) {
      const layerId = url.split('/').pop();
      const objectIds = _unsavedRelatedFeatures.map(feature => feature.objectId);
      uri = augmentDiscussionURIWithFeature(uri, layerId, objectIds);
    }
    const originalPostFeatures = this.geometryValue && Object.keys(this.geometryValue).length ? postToFeatures(Object.assign(Object.assign({}, post), { geometry: this.geometryValue })) : [];
    _unsavedExistingFeatures.forEach(feature => {
      // Apply any existing geometry updates to originalPostFeatures
      const { properties: { index }, geometry, } = feature;
      if (geometry) {
        originalPostFeatures[+index].geometry = geometry;
      }
    });
    let geometry = null;
    const combinedFeatures = [...originalPostFeatures, ..._unsavedFeatures];
    if (combinedFeatures.length) {
      geometry =
        combinedFeatures.length > 1
          ? featuresToGeometryCollection(combinedFeatures)
          : combinedFeatures[0].geometry.coordinates.length
            ? combinedFeatures[0].geometry
            : null;
    }
    return updatePost(Object.assign({ postId: post.id, data: {
        title: titleValue.trim() || null,
        body: bodyValue.trim(),
        discussion: uri,
        geometry,
      }, mentionUrl: window.location.href }, _context.hubRequestOptions))
      .then(editedPost => fetchPost(Object.assign({ postId: editedPost.id, data: {
        relations: [PostRelation.REACTIONS, PostRelation.REPLIES],
      } }, this._context.hubRequestOptions)))
      .then(editedPost => {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.update.label.post), { response: telemetryConstants.response.SUCCESS, postId: post.id, channelId, channelAccess: channel.access }));
      editedPost.replyCount = editedPost.replies.total;
      delete editedPost.replies;
      arcgisHubDiscussionsPostEdit.emit(editedPost);
      return editedPost;
    })
      .catch(e => {
      this.errorMessage = 'error.edit';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.update.label.post), { response: telemetryConstants.response.FAILURE, postId: post.id, channelId, channelAccess: channel.access }));
      console.error('Failed to edit post:', e.message);
      return null;
    });
  }
  /**
   * Called when the user elects to cancel creating a net new post or
   * an editing an existing post. Emits arcgisHubDiscussionsPostCancel
   * @param evt A mouse click event
   */
  handleCancel(evt) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const { channel, post, parent, channelGroups, channelModifiable } = this;
    evt.preventDefault();
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.close.label.editor), { groupId: (_b = (_a = channelGroups === null || channelGroups === void 0 ? void 0 : channelGroups[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null, groupAccess: (_c = channelGroups === null || channelGroups === void 0 ? void 0 : channelGroups[0].access) !== null && _c !== void 0 ? _c : null, parentId: (_d = parent === null || parent === void 0 ? void 0 : parent.id) !== null && _d !== void 0 ? _d : null, postId: (_e = post === null || post === void 0 ? void 0 : post.id) !== null && _e !== void 0 ? _e : null, channelId: (_f = channel === null || channel === void 0 ? void 0 : channel.id) !== null && _f !== void 0 ? _f : null, channelAccess: (_g = channel === null || channel === void 0 ? void 0 : channel.access) !== null && _g !== void 0 ? _g : null }));
    const event = this.arcgisHubDiscussionsPostCancel.emit();
    this.collapse();
    this.confirmCancel = false;
    const geometryClone = cloneObject(post === null || post === void 0 ? void 0 : post.geometry);
    this.geometryValue = Object.keys(geometryClone || {}).length ? geometryClone : null;
    this.titleValue = (_h = post === null || post === void 0 ? void 0 : post.title) !== null && _h !== void 0 ? _h : '';
    this.bodyValue = (_j = post === null || post === void 0 ? void 0 : post.body) !== null && _j !== void 0 ? _j : '';
    this._unsavedExistingFeatures = (_k = this.unsavedExistingFeatures) !== null && _k !== void 0 ? _k : [];
    this._unsavedFeatures = (_l = this.unsavedFeatures) !== null && _l !== void 0 ? _l : [];
    this._unsavedRelatedFeatures = (_m = this.unsavedRelatedFeatures) !== null && _m !== void 0 ? _m : [];
    if (event.defaultPrevented) {
      return;
    }
    ;
    if (!post && channelModifiable) {
      this.channelId = null;
      this.channel = null;
      this.channelGroups = null;
      this.step = STEP.AUDIENCE;
    }
  }
  /**
   * Determines whether to confirm the cancellation or close the editor
   */
  handleCancelOrConfirm(evt) {
    if (this.shouldConfirmCancel) {
      this.confirmCancel = true;
    }
    else {
      this.handleCancel(evt);
    }
    this.arcgisHubDiscussionsGeometryClearAll.emit();
  }
  handleStepChanged(step, prevStep) {
    if (step !== prevStep && step === STEP.AUDIENCE) {
      this.fetchRecentChannelDetails();
    }
    else {
      this.recentChannelsResults = undefined;
    }
  }
  /**
   * Called when the cancel confirmation back button is clicked
   */
  handleConfirmBackButtonClicked() {
    this.confirmCancel = false;
  }
  /**
   * Called when the user elects to traverse from the content creation step
   * back to the group selection step. Resets any previously selected groups
   * from the combobox and refreshes the recent groups list
   */
  handleBack() {
    if (this.shouldConfirmCancel) {
      this.confirmCancel = true;
    }
    else {
      this.emitHubTelemetry(Object.assign({}, dictionary.category.interaction.action.close.label.editor.details.addPost));
      this.channelId = null;
      this.channelGroups = null;
      this.channel = null;
      this.step = STEP.AUDIENCE;
    }
  }
  /**
   * Emit telemetry when help popover is opened
   */
  handleHelpPopoverOpen() {
    this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.popover.details.help);
  }
  /**
   * Emit telemetry when help popover is closed
   */
  handleHelpPopoverClose() {
    this.hubTelemetry.emit(dictionary.category.interaction.action.close.label.popover.details.help);
  }
  /**
   * Modify state when add location popover is opened
   */
  handleLocationPopoverOpen() {
    this.addLocationsPopoverOpen = true;
  }
  /**
   * Modify state when add location popover is closed
   */
  handleLocationPopoverClose() {
    this.addLocationsPopoverOpen = false;
  }
  /**
   * Expands the editor when the focusin event is handled
   */
  handleFocusin() {
    this.expand();
  }
  /**
   * Expands the editor
   */
  expand() {
    if (this.collapsible) {
      this.collapsed = false;
    }
  }
  /**
   * Collapses the editor
   */
  collapse() {
    if (this.collapsible) {
      this.collapsed = true;
    }
  }
  /**
   * Collapses the editor when the focusout event is handled
   */
  handleFocusout() {
    this.collapse();
  }
  /**
   * Called when the group search combobox is opened
   */
  handleGroupSearchOpened() {
    this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.search);
  }
  /**
   * Called when the user changes the text of the post body content
   * @param evt An onChange event for the post body calcite-input
   */
  updateBodyValue(evt) {
    this.bodyValue = evt.target.value;
  }
  handleFeatureRemove(evt) {
    const { detail: { properties: { relatedFeatureId, index, unsaved }, }, } = evt;
    this.removeFeature(index, relatedFeatureId, unsaved);
  }
  removeFeature(index, relatedFeatureId, unsaved) {
    var _a;
    if (!unsaved) {
      if (relatedFeatureId) {
        // remove relatedFeature from discsussion URI
        const { features } = parseDiscussionURI(this.discussionValue);
        const layerId = this.entity.url.split('/').pop();
        features.splice(features.indexOf(relatedFeatureId), 1);
        this.discussionValue = augmentDiscussionURIWithFeature(this.discussionValue.split('?')[0], layerId, features);
      }
      else {
        // remove feature from discussion geometry
        if (((_a = this.geometryValue) === null || _a === void 0 ? void 0 : _a.type) === 'GeometryCollection') {
          if (unsaved) {
            this.geometryValue.geometries.splice(index, 1);
          }
          else {
            this.geometryValue.geometries[index] = null;
          }
          this.geometryValue = Object.assign({}, this.geometryValue);
        }
        else {
          this.geometryValue = null;
        }
      }
    }
  }
  handleDrawDone() {
    this.arcgisHubDiscussionsGeometryDrawReset.emit();
    this.addLocationsActiveGeometryType = null;
  }
  handleDrawCancel() {
    this.addLocationsActiveGeometryType = null;
  }
  /**
   * Called when the user changes the text of the post title content
   * @param evt An onChange event for the reply body calcite-inpu
   */
  updateTitleValue(evt) {
    this.titleValue = evt.target.value;
  }
  setActiveGeometryDrawType(evt) {
    const { target } = evt;
    const geometryType = target.dataset.type;
    this.addLocationsActiveGeometryType = geometryType;
    this.locationPopoverElement.open = false;
    this.enableAddLocation();
  }
  resetActiveGeometryDrawType() {
    this.addLocationsActiveGeometryType = undefined;
  }
  enableAddLocation() {
    const { post, arcgisHubDiscussionsGeometryDrawCreate, isReply } = this;
    const postType = isReply ? 'reply' : 'post';
    arcgisHubDiscussionsGeometryDrawCreate.emit({ post, postType });
  }
  /**
   * Computes if the title value is valid
   */
  get isTitleValid() {
    const { titleValue } = this;
    return titleValue.length <= MAX_TITLE_LENGTH;
  }
  /**
   * Computes if the body value is valid
   */
  get isBodyValid() {
    const { bodyValue } = this;
    const trimmed = bodyValue.trim();
    return trimmed.length > 0 && trimmed.length <= MAX_BODY_LENGTH;
  }
  /**
   * Returns true if post has new location changes or updates
   */
  get hasLocationChanges() {
    if (this.post) {
      const { post: { discussion }, discussionValue, } = this;
      return (Boolean(this._unsavedFeatures.length + this._unsavedRelatedFeatures.length + this._unsavedExistingFeatures.length) ||
        discussionValue !== discussion ||
        this.geometryValueHasChanges);
    }
    return false;
  }
  /**
   * Computes title warning/error messages
   */
  get titleMessage() {
    const { titleValue, isTitleValid, intl } = this;
    const { length } = titleValue;
    if (length >= MAX_TITLE_LENGTH - 5) {
      return isTitleValid
        ? {
          status: 'idle',
          text: intl.t('post.title.validation.warning'),
        }
        : {
          icon: 'exclamation-mark-circle',
          status: 'invalid',
          text: intl.t('post.title.validation.error', { characters: length - MAX_TITLE_LENGTH }),
        };
    }
  }
  /**
   * Computes body warning/error messages
   */
  get bodyMessage() {
    const { bodyValue, isBodyValid, intl } = this;
    const { length } = bodyValue;
    if (length >= WARNING_BODY_LENGTH) {
      return isBodyValid
        ? {
          status: 'idle',
          text: intl.t('post.body.validation.warning'),
        }
        : {
          icon: 'exclamation-mark-circle',
          status: 'invalid',
          text: intl.t('post.body.validation.error'),
        };
    }
  }
  /**
   * Computes if the editor is creating or editing a reply
   */
  get isReply() {
    return Boolean(this.parent || this.parentId);
  }
  /**
   * Computes the blocked noticed variant
   */
  get blockedNotice() {
    let variant;
    const { channelGroups, entity, entityType, isReply } = this;
    if (channelGroups) {
      const areGroupsDiscussable = (channelGroups === null || channelGroups === void 0 ? void 0 : channelGroups.length) ? channelGroups.every(group => !group || isDiscussable(group)) : true;
      const isSubjectDiscussable = isDiscussable(entity);
      if (!areGroupsDiscussable && !isSubjectDiscussable) {
        variant = isReply ? ArcgisHubDiscussionsBlockedNoticeVariant.EditReply : ArcgisHubDiscussionsBlockedNoticeVariant.EditPost;
      }
      else if (!areGroupsDiscussable) {
        variant = isReply ? ArcgisHubDiscussionsBlockedNoticeVariant.EditReplyGroup : ArcgisHubDiscussionsBlockedNoticeVariant.EditPostGroup;
      }
      else if (!isSubjectDiscussable) {
        if (entityType === 'group') {
          variant = isReply ? ArcgisHubDiscussionsBlockedNoticeVariant.EditReplyGroup : ArcgisHubDiscussionsBlockedNoticeVariant.EditPostGroup;
        }
        else {
          variant = isReply ? ArcgisHubDiscussionsBlockedNoticeVariant.EditReplyItem : ArcgisHubDiscussionsBlockedNoticeVariant.EditPostItem;
        }
      }
    }
    return variant;
  }
  /**
   * Builds the appropriate mention query for the given channel and input string
   * @param input The user-provided input text
   * @returns an IQuery
   */
  getMentionQuery(input) {
    var _a;
    const { channel, _context } = this;
    const query = getChannelUsersQuery([input], channel, (_a = _context.currentUser) === null || _a === void 0 ? void 0 : _a.username);
    return query;
  }
  /**
   * Renders the editor's primary action button for editing an existing
   * or creating a net new post
   */
  renderPrimaryActionButton() {
    const { post, isReply, intl, titleValue, bodyValue, isBodyValid, isTitleValid, pending, hasLocationChanges, blockedNotice, createParentSaveButtonText } = this;
    let text;
    let isInvalid;
    if (isReply) {
      isInvalid = !isBodyValid;
      text = intl.t('createReply');
    }
    else {
      isInvalid = !isBodyValid || !isTitleValid;
      text = createParentSaveButtonText || intl.t('post.create');
    }
    let disabled = Boolean(blockedNotice) || isInvalid;
    if (post) {
      if (isReply) {
        text = intl.t('saveReply');
        disabled = disabled || (bodyValue === post.body && !hasLocationChanges);
      }
      else {
        text = intl.t('post.save');
        disabled = disabled || (((!titleValue && !post.title) || titleValue === post.title) && bodyValue === post.body && !hasLocationChanges);
      }
    }
    return (h("calcite-button", { appearance: "solid", class: "hub-discussions-post-editor-post-actions__primary", disabled: disabled || pending, key: "primary", kind: "brand", label: text, loading: pending, round: true, scale: "l", type: "submit" }, text));
  }
  /**
   * Renders the editor's secondary action button, currently the cancel
   * edit/create post button
   */
  renderSecondaryActionButton() {
    const { post, isReply, intl, handleCancelOrConfirm } = this;
    const text = intl.t('cancel');
    if (!isReply || (isReply && post)) {
      return (h("calcite-button", { appearance: "transparent", class: "hub-discussions-post-editor-post-actions__secondary", kind: "neutral", label: text, onClick: handleCancelOrConfirm, round: true, scale: "l", type: "reset" }, text));
    }
  }
  renderAddLocationsButton() {
    const { showLocations, disableSelectExistingLocation, hasMap, blockedNotice, addLocationsActiveGeometryType, intl, addLocationsPopoverOpen, handleLocationPopoverOpen, handleLocationPopoverClose } = this;
    if (showLocations) {
      const locationActionTypes = [
        ...(!disableSelectExistingLocation ? [{ type: 'select', icon: 'select' }] : []),
        { type: 'point', icon: 'pin' },
        { type: 'polyline', icon: 'freehand' },
        { type: 'polygon', icon: 'freehand-area' },
      ];
      const locationActions = locationActionTypes.map(({ type, icon }) => {
        return (h("calcite-action", { active: addLocationsActiveGeometryType === type, "data-type": type, icon: icon, key: type, onClick: this.setActiveGeometryDrawType, text: intl.t(`location.action.${type}`), textEnabled: true }));
      });
      return (h(Fragment, null, h("calcite-action", { active: addLocationsPopoverOpen, appearance: "solid", class: "add-location-post", disabled: !hasMap || Boolean(blockedNotice), ref: (locationActionElement) => {
          this.locationActionElement = locationActionElement;
        }, text: intl.t('location.heading') }, h("calcite-icon", { class: "add-location-icon", icon: "pin-plus", scale: "s" })), h("calcite-tooltip", { closeOnClick: true, label: intl.t('location.tooltip'), referenceElement: this.locationActionElement }, h("span", null, intl.t('location.tooltip'))), hasMap && !blockedNotice && (h("calcite-popover", { autoClose: true, label: intl.t('location.heading'), onCalcitePopoverClose: handleLocationPopoverClose, onCalcitePopoverOpen: handleLocationPopoverOpen, overlayPositioning: "fixed", pointerDisabled: true, ref: (locationPopoverElement) => {
          this.locationPopoverElement = locationPopoverElement;
        }, referenceElement: this.locationActionElement }, locationActions))));
    }
  }
  /**
   * Renders the title field
   */
  renderTitleField() {
    const { collapsible, collapsed, intl, titleValue, updateTitleValue, titleMessage, blockedNotice } = this;
    if (!collapsible || (collapsible && !collapsed)) {
      return (h(Fragment, null, h("input", { "aria-label": intl.t('post.title.label'), class: "hub-discussions-post-editor__title", disabled: Boolean(blockedNotice), onInput: updateTitleValue, placeholder: intl.t('post.title.placeholder'), ref: this.handleTitleElementRef, type: "text", value: titleValue }), titleMessage && (h("calcite-input-message", { class: "hub-discussions-post-editor__message", icon: titleMessage.icon, scale: "l", status: titleMessage.status }, titleMessage.text))));
    }
  }
  /**
   * Renders the body field
   */
  renderBodyField() {
    const { createParentBodyPlaceholderText, intl, bodyValue, bodyMessage, pending, getMentionQuery, blockedNotice, asAnonymous } = this;
    return (h(Fragment, null, h("arcgis-hub-rich-text", { class: "hub-discussions-post-editor__body", disabled: Boolean(blockedNotice) || pending, getMentionQuery: getMentionQuery, label: intl.t('post.body.label'), mention: !asAnonymous, mentionCount: 100, placeholder: createParentBodyPlaceholderText || intl.t('post.body.placeholder'), ref: this.handleBodyElementRef, "text-transform": true, toolbar: "", value: bodyValue }), bodyMessage && (h("calcite-input-message", { class: "hub-discussions-post-editor__message", icon: bodyMessage.icon, scale: "l", status: bodyMessage.status }, bodyMessage.text))));
  }
  /**
   *
   * @param iconScale The scale of the creator or channel avatar, creator avatar takes precendence when both are rendered
   * @param showCreatorAvatar Shows the creator avatar
   * @param showChannelAvatar Shows the channel avatar
   * @param showChannelAccessIcon Shows the channel access icon
   * @param showChannelName Shows the channel name
   * @param showTimestamp Shows the post timestamp text
   * @param showCreatorUsername Shows the post creator username
   * @param showPostPopover Wraps the avatars in the post popover
   */
  renderPostHeader(iconScale, showCreatorAvatar, showChannelAvatar, showChannelAccessIcon, showChannelName, showTimestamp, showCreatorUsername, showPostPopover) {
    const { postId, post, postCreator, postCreatorOrg, channel, channelGroups, index, isHub, asAnonymous } = this;
    return (h("arcgis-hub-discussions-post-header", { channel: channel, channelGroups: channelGroups, class: "hub-discussions-post-editor__header", displayAnon: asAnonymous, iconScale: iconScale, index: index, isHub: isHub, post: postId && channel && post, postCreator: postId && channel && postCreator, postCreatorOrg: postId && channel && postCreatorOrg, showChannelAccessIcon: showChannelAccessIcon, showChannelAvatar: showChannelAvatar, showChannelName: showChannelName, showCreatorAvatar: showCreatorAvatar, showCreatorUsername: showCreatorUsername, showPopover: showPostPopover, showTimestamp: showTimestamp }));
  }
  /**
   * Handles anonymous onCalciteSwitchChange
   * @param e Event
   */
  handleAnonToggle(e) {
    const element = e.target;
    this.asAnonymous = element.checked;
  }
  /**
   * Renders anonymous posting toggle switch
   * @returns HTMLElement
   */
  renderAnonToggle() {
    const { channel, postId, asAnonymous, hasMentionedUsers, intl } = this;
    return channel.allowAsAnonymous && !postId && (h("div", { class: "anon-toggle" }, h("calcite-switch", { disabled: hasMentionedUsers, label: intl.t('anonymous.label'), onCalciteSwitchChange: this.handleAnonToggle, ref: (anonToggleRef) => {
        this.anonToggleRef = anonToggleRef;
      } }), h("p", null, intl.t("anonymous.label")), asAnonymous &&
      h("p", null, intl.t("anonymous.desc")), hasMentionedUsers &&
      h("calcite-tooltip", { referenceElement: this.anonToggleRef }, h("span", null, intl.t("anonymous.tooltip")))));
  }
  /**
   * Renders the UI for creating/editing post content step
   */
  renderContentStep() {
    const { intl, post, errorMessage, blockedNotice, isCollapsed, showHeader } = this;
    return this.confirmCancel ? (this.renderConfirmCancel()) : (h("form", { onSubmit: this.handleSubmit }, Boolean(showHeader && post) && h("header", null, intl.t('editPost')), this.renderAnonToggle(), isCollapsed ? this.renderPostHeader('m', true) : this.renderPostHeader('l', true, true, true, true, true, false, true), this.renderTitleField(), this.renderBodyField(), this.renderGeographies(), h("div", { class: "hub-discussions-post-editor-post-actions" }, this.renderAddLocationsButton(), !isCollapsed && this.renderSecondaryActionButton(), this.renderPrimaryActionButton()), blockedNotice && h("arcgis-hub-discussions-blocked-notice", { class: "hub-discussions-post-editor__not-discussable-notice", scale: "s", variant: blockedNotice }), errorMessage && (h("calcite-notice", { class: "hub-discussions-post-editor__crud-error", kind: "danger", open: true, scale: "s" }, h("div", { slot: "title" }, intl.t('error.title')), h("div", { slot: "message" }, errorMessage && intl.t(errorMessage))))));
  }
  /**
   * Renders the header UI for the group selection and content creation steps
   */
  renderHeader() {
    const { showHeader, intl, handleCancelOrConfirm, handleBack, confirmCancel, step, handleHelpPopoverOpen, handleHelpPopoverClose } = this;
    if (showHeader) {
      let config = {
        action: handleCancelOrConfirm,
        icon: 'x',
      };
      if (step === STEP.CONTENT) {
        config = {
          action: handleBack,
          icon: 'chevron-left',
        };
      }
      return (h("header", { class: "hub-discussions-post-editor-header" }, Boolean(config) && (h("calcite-button", { appearance: "outline-fill", disabled: confirmCancel, "icon-start": config.icon, kind: "neutral", label: intl.t(`header.${step}.back`), onClick: config.action, round: true, scale: "l", type: "button" })), h("p", { class: "hub-discussions-post-editor-header__title" }, intl.t(`header.${step}.title`)), h("calcite-button", { appearance: "transparent", disabled: confirmCancel, "icon-start": "lightbulb", kind: "neutral", label: intl.t('header.help'), ref: (helpButtonRef) => {
          this.helpButtonRef = helpButtonRef;
        }, round: true, scale: "l", type: "button" }), h("calcite-popover", { closable: true, label: intl.t('header.help'), onCalcitePopoverClose: handleHelpPopoverClose, onCalcitePopoverOpen: handleHelpPopoverOpen, placement: "bottom-end", referenceElement: this.helpButtonRef }, h("p", { class: "hub-discussions-post-editor-header__popover" }, intl.t(`header.${step}.help`)))));
    }
  }
  /**
   * Renders the UI for cancel confirmation
   */
  renderConfirmCancel() {
    const { intl, handleConfirmBackButtonClicked, handleCancel, isReply } = this;
    return (h("div", { class: "hub-discussions-post-editor-cancel-confirm" }, h("header", { class: "hub-discussions-post-editor-cancel-confirm__header" }, intl.t('confirm.header')), h("p", { class: "hub-discussions-post-editor-cancel-confirm__message" }, intl.t(isReply ? 'confirm' : 'confirm.body')), h("footer", { class: "hub-discussions-post-editor-cancel-confirm__footer" }, h("calcite-button", { appearance: "transparent", class: "hub-discussions-post-editor-cancel-confirm__button", kind: "neutral", onClick: handleConfirmBackButtonClicked, round: true, scale: "l" }, intl.t('confirm.back')), h("calcite-button", { class: "hub-discussions-post-editor-cancel-confirm__button", kind: "danger", onClick: handleCancel, round: true, scale: "l" }, intl.t('confirm.discard')))));
  }
  /**
   * Renders the UI for the group selection step
   */
  renderGroupSelectionStep() {
    const { intl, channelGroups, handleChannelSelectedFromCombobox, _context } = this;
    return (h(Fragment, null, h("calcite-combobox", { "clear-disabled": true, label: intl.t('groups.label'), placeholder: intl.t('groups.placeholder'), scale: "l", "selection-mode": "single", value: channelGroups ? channelGroups[0].id : null }, _context.currentUser.groups.map(group => {
      const canDiscuss = isDiscussable(group);
      return h("calcite-combobox-item", { disabled: !canDiscuss, heading: group.title, icon: canDiscuss ? undefined : 'circle-disallowed', key: group.id, label: group.title,
        // textLabel is deprecated, but also required by calcite in v2.12.1
        textLabel: group.title, value: group.id });
    })), (channelGroups === null || channelGroups === void 0 ? void 0 : channelGroups.length) && (h("calcite-button", { class: "hub-discussions-post-editor-groups__action", onClick: handleChannelSelectedFromCombobox, round: true, scale: "l", type: "button", width: "full" }, intl.t('groups.label'))), this.renderRecentChannels()));
  }
  /**
   * Renders a channel details
   * @param channelDetails An IChannelDetails object
   * @param index The index to build the data-channel-index value
   * @returns
   */
  renderRecentChannelDetails(channelDetails, index) {
    const { intl, handleSelectRecentChannel } = this;
    const { post, channel, channelGroups } = channelDetails;
    const timeStr = post
      ? intl.t('groups.posted', { timeStr: this.formatTimeString(post.createdAt) })
      : intl.t('groups.created', { timeStr: this.formatTimeString(channel.createdAt) });
    return (h("li", { class: "hub-discussions-post-editor-recent__item", key: channel.id }, h("calcite-avatar", { class: "hub-discussions-post-editor-recent__avatar", "full-name": getChannelName(channel, channelGroups, intl.t('unnamedChannel')), scale: "l" }), h("b", { class: "hub-discussions-post-editor-recent__title" }, getChannelName(channel, channelGroups, intl.t('unnamedChannel'))), h("i", { class: "hub-discussions-post-editor-recent__last-activity" }, timeStr), h("calcite-button", { appearance: "outline-fill", class: "hub-discussions-post-editor-recent__action", "data-channel-index": index, "icon-start": "chevron-right", kind: "neutral", onClick: handleSelectRecentChannel, round: true, scale: "l", type: "button" })));
  }
  /**
   * Renders a recent channel skeleton loader
   * @param index The index to build the key
   */
  renderRecentChannelSkeleton(index) {
    return (h("li", { class: "hub-discussions-post-editor-recent__skeleton", key: `skeleton-${index}` }, h("arcgis-skeleton-loader", { active: true, rows: 0, showFooter: false, showHeading: false, showThumbnail: false }, h("div", null), h("div", null, h("div", null), h("div", null)))));
  }
  /**
   * Renders the empty state when no recent channels exist yet
   */
  renderRecentChannelsEmpty() {
    const { intl } = this;
    return (h("calcite-notice", { class: "hub-discussions-post-editor__empty", open: true, scale: "m" }, h("div", { slot: "title" }, intl.t('empty.title')), h("div", { slot: "message" }, intl.t('empty.message')), h("calcite-link", { href: "https://doc.arcgis.com/en/hub/team/how-discussions-work.htm", iconEnd: "launch", slot: "link" }, intl.t('empty.link'))));
  }
  /**
   * Renders the error when recent channels fail to load
   */
  renderRecentChannelsError() {
    const { errorMessage, intl } = this;
    return (h("calcite-notice", { class: "hub-discussions-post-editor__load-error", kind: "danger", open: true }, h("div", { slot: "title" }, intl.t('error.load.title')), h("div", { slot: "message" }, errorMessage && intl.t(errorMessage))));
  }
  /**
   * Renders the recent channels list
   */
  renderRecentChannels() {
    const { intl, errorMessage, recentChannelsResults = Array.from({ length: 4 }).map(_ => null) } = this;
    let rendered;
    if (errorMessage) {
      rendered = this.renderRecentChannelsError();
    }
    else if (recentChannelsResults.length) {
      rendered = (h("ul", { class: "hub-discussions-post-editor-recent__list" }, recentChannelsResults.map((recentChannelResult, index) => recentChannelResult ? this.renderRecentChannelDetails(recentChannelResult, index) : this.renderRecentChannelSkeleton(index))));
    }
    else {
      rendered = this.renderRecentChannelsEmpty();
    }
    return (h(Fragment, null, h("header", { class: "hub-discussions-post-editor-recent__header" }, intl.t('recentChannels')), rendered));
  }
  /**
   * Renders the UI for creating net new posts
   */
  renderCreate() {
    return (h(Fragment, null, this.renderHeader(), this.step === STEP.AUDIENCE ? this.renderGroupSelectionStep() : this.renderContentStep()));
  }
  /**
   * Renders the post editor
   */
  renderPostEditor() {
    return this.postId ? this.renderContentStep() : this.renderCreate();
  }
  /**
   * Primary render entrypoint
   */
  render() {
    const { isReply, _context, loading, isRtl } = this;
    return (h(Host, { class: { rtl: isRtl }, "data-element": "discussions-post-editor" }, Boolean(_context) && !loading && (isReply ? this.renderReplyEditor() : this.renderPostEditor())));
  }
  /**
   * True when the component is collapsible and is in a collapsed state
   */
  get isCollapsed() {
    return this.collapsible && this.collapsed;
  }
  /**
   * Computes input warning/error messages
   */
  get inputMessage() {
    const { bodyValue, isBodyValid, intl } = this;
    if (bodyValue.trim().length >= WARNING_BODY_LENGTH) {
      return isBodyValid
        ? {
          status: 'idle',
          text: intl.t('reply.body.validation.warning'),
        }
        : {
          icon: 'exclamation-mark-circle',
          status: 'invalid',
          text: intl.t('reply.body.validation.error'),
        };
    }
  }
  handleTitleElementRef(titleElement) {
    this.titleElement = titleElement;
  }
  handleBodyElementRef(bodyElement) {
    this.bodyElement = bodyElement;
  }
  /**
   * Sets focus on the appropriate input control
   */
  focusInput() {
    setTimeout(() => {
      const { titleElement, bodyElement, isReply } = this;
      if (isReply) {
        if (bodyElement) {
          bodyElement.setFocus();
        }
      }
      else if (titleElement) {
        titleElement.focus();
      }
    }, 500);
  }
  /**
   * Handles reply create/edit form submissions and performs actions common to both
   * @param evt An onsubmit event
   */
  handleReplySubmit(evt) {
    evt.preventDefault();
    this.pending = true;
    const promise = this.postId ? this.handleEditReply() : this.handleCreateReply();
    return promise
      .catch(e => {
      console.error(`Could not create reply:`, e.message);
      return null;
    })
      .finally(async () => {
      this.pending = false;
      this.arcgisHubDiscussionsGeometryClearAll.emit();
      this.addLocationsActiveGeometryType = null;
      this.focusInput();
    });
  }
  /**
   * Handles reply create form submissions
   */
  handleCreateReply() {
    const { _context, _unsavedFeatures, _unsavedRelatedFeatures, bodyValue, parent, channel, discussion, asAnonymous, entity: { url }, arcgisHubDiscussionsPostCreate, } = this;
    let uri = discussion;
    if (_unsavedRelatedFeatures.length) {
      const layerId = url.split('/').pop();
      const objectIds = new Set(_unsavedRelatedFeatures.map(feature => feature.objectId));
      uri = augmentDiscussionURIWithFeature(uri, layerId, Array.from(objectIds));
    }
    let geometry = null;
    if (_unsavedFeatures.length) {
      geometry = _unsavedFeatures.length > 1 ? featuresToGeometryCollection(_unsavedFeatures) : _unsavedFeatures[0].geometry;
    }
    this.errorMessage = null;
    return createReply(Object.assign({ postId: parent.id, data: {
        discussion: uri,
        body: bodyValue.trim(),
        geometry,
        asAnonymous
      }, mentionUrl: window.location.href }, _context.hubRequestOptions))
      .then(reply => {
      this.bodyValue = '';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.create.label.reply), { response: telemetryConstants.response.SUCCESS, postId: reply.id, parentId: parent.id, channelId: channel.id, channelAccess: channel.access }));
      return fetchPost(Object.assign({ postId: reply.id, data: {
          relations: [PostRelation.REACTIONS],
        } }, _context.hubRequestOptions));
    })
      .then(reply => {
      reply.replyCount = 0;
      arcgisHubDiscussionsPostCreate.emit(reply);
      return reply;
    })
      .catch(e => {
      this.errorMessage = 'createFailure';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.create.label.reply), { response: telemetryConstants.response.FAILURE, parentId: parent.id, channelId: channel.id, channelAccess: channel.access }));
      console.error('Failed to create reply:', e.message);
      return null;
    });
  }
  /**
   * Handles reply edit form submissions
   */
  handleEditReply() {
    const { _context, bodyValue, post, parentId, channel, arcgisHubDiscussionsPostEdit, _unsavedFeatures, _unsavedRelatedFeatures, _unsavedExistingFeatures, entity: { url }, } = this;
    this.errorMessage = null;
    let uri = this.discussionValue;
    if (_unsavedRelatedFeatures.length) {
      const layerId = url.split('/').pop();
      const objectIds = _unsavedRelatedFeatures.map(feature => feature.objectId);
      uri = augmentDiscussionURIWithFeature(uri, layerId, objectIds);
    }
    const originalPostFeatures = this.geometryValue && Object.keys(this.geometryValue).length ? postToFeatures(Object.assign(Object.assign({}, post), { geometry: this.geometryValue })) : [];
    _unsavedExistingFeatures.forEach(feature => {
      // Apply any existing geometry updates to originalPostFeatures
      const { properties: { index }, geometry, } = feature;
      if (geometry) {
        originalPostFeatures[+index].geometry = geometry;
      }
    });
    let geometry = null;
    const combinedFeatures = [...originalPostFeatures, ..._unsavedFeatures];
    if (combinedFeatures.length) {
      if (combinedFeatures.length > 1) {
        geometry = featuresToGeometryCollection(combinedFeatures);
      }
      else {
        geometry = combinedFeatures[0].geometry.coordinates.length ? combinedFeatures[0].geometry : null;
      }
    }
    return updatePost(Object.assign({ postId: post.id, data: {
        body: bodyValue.trim(),
        discussion: uri,
        geometry,
      }, mentionUrl: window.location.href }, _context.hubRequestOptions))
      .then(updatedReply => fetchPost(Object.assign({ postId: updatedReply.id, data: {
        relations: [PostRelation.REACTIONS],
      } }, _context.hubRequestOptions)))
      .then(updatedReply => {
      updatedReply.replyCount = 0;
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.update.label.reply), { response: telemetryConstants.response.SUCCESS, postId: post.id, parentId, channelId: channel.id, channelAccess: channel.access }));
      arcgisHubDiscussionsPostEdit.emit(updatedReply);
      return updatedReply;
    })
      .catch(e => {
      this.errorMessage = 'editFailure';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.update.label.reply), { response: telemetryConstants.response.FAILURE, postId: post.id, parentId, channelId: channel.id, channelAccess: channel.access }));
      console.error('Failed to edit reply:', e.message);
      return null;
    });
  }
  /**
   * Renders the calcite-input element
   */
  renderInput() {
    const { bodyValue, inputMessage, pending, intl, parentCreator, getMentionQuery, blockedNotice, asAnonymous } = this;
    const placeholder = (parentCreator === null || parentCreator === void 0 ? void 0 : parentCreator.firstName) ? intl.t('replyToUserPost', { firstName: parentCreator.firstName }) : intl.t('replyToPost');
    return (h(Fragment, null, h("arcgis-hub-rich-text", { class: "hub-discussions-reply-editor__body", disabled: Boolean(blockedNotice) || pending, getMentionQuery: getMentionQuery, label: intl.t('inputLabel'), mention: !asAnonymous, mentionCount: 100, placeholder: placeholder, ref: this.handleBodyElementRef, "text-transform": true, toolbar: "", value: bodyValue }), inputMessage && (h("calcite-input-message", { class: "hub-discussions-reply-editor__message", icon: inputMessage.icon, scale: "l", status: inputMessage.status }, inputMessage.text))));
  }
  /**
   * Renders the post geographies
   */
  renderGeographies() {
    const { channelId, channel, hasMap, postWithLocationEdits, _unsavedFeatures, _unsavedRelatedFeatures, _unsavedExistingFeatures, displayFieldValid, displayFieldKey, blockedNotice, isMobile, parentId, entity, showLocations, } = this;
    if (showLocations) {
      return (h("arcgis-hub-discussions-post-geography", { channel: channel, channelId: channelId, disabled: !hasMap, disabledActions: Boolean(blockedNotice), displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, hasMap: hasMap, isMobile: isMobile, parentId: parentId, post: postWithLocationEdits, postId: postWithLocationEdits === null || postWithLocationEdits === void 0 ? void 0 : postWithLocationEdits.id, renderedInEditor: true, showLocationDescriptionText: !isMobile, unsavedExistingFeatures: _unsavedExistingFeatures, unsavedFeatures: _unsavedFeatures, unsavedRelatedFeatures: _unsavedRelatedFeatures, url: entity === null || entity === void 0 ? void 0 : entity.url }));
    }
  }
  /**
   * Renders the editor form controls
   */
  renderEditor() {
    const { intl, errorMessage, blockedNotice } = this;
    return (h(Fragment, null, this.renderInput(), this.renderGeographies(), h("div", { class: "hub-discussions-post-editor-post-actions" }, this.renderAddLocationsButton(), this.renderSecondaryActionButton(), this.renderPrimaryActionButton()), blockedNotice && h("arcgis-hub-discussions-blocked-notice", { class: "hub-discussions-reply-editor__not-discussable-notice", scale: "s", variant: blockedNotice }), errorMessage && (h("calcite-notice", { class: "hub-discussions-reply-editor__notice", kind: "danger", open: true, scale: "s" }, h("div", { slot: "title" }, intl.t('error')), h("div", { slot: "message" }, intl.t(errorMessage))))));
  }
  /**
   * Renders the reply editor
   */
  renderReplyEditor() {
    const { confirmCancel } = this;
    return (h("form", { class: "hub-discussions-reply-editor__form", onSubmit: this.handleReplySubmit }, this.renderAnonToggle(), this.renderPostHeader('m', true), confirmCancel ? this.renderConfirmCancel() : this.renderEditor()));
  }
  static get is() { return "arcgis-hub-discussions-post-editor"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-post-editor.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-post-editor.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "post": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IPost",
          "resolved": "IPost",
          "references": {
            "IPost": {
              "location": "import",
              "path": "@esri/hub-discussions"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional reference to an existing IPost to edit. If `post` is not provided\nbut `postId` is, the IPost record will be fetched."
        }
      },
      "postCreator": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IUser",
          "resolved": "IUser",
          "references": {
            "IUser": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional reference to an IUser representing the post author. If not\nprovided, the IUser record will be fetched."
        }
      },
      "postCreatorOrg": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IPortal",
          "resolved": "IPortal",
          "references": {
            "IPortal": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional reference to an existing IPortal object representing the post author's\norganization. If not provided, the IPortal record will be fetched."
        }
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
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional UUID string of an existing IPost to edit. If `postId`\nis provided but `post` is not, the IPost record will be fetched."
        },
        "attribute": "post-id",
        "reflect": true
      },
      "parent": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IPost",
          "resolved": "IPost",
          "references": {
            "IPost": {
              "location": "import",
              "path": "@esri/hub-discussions"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional reference to a parent IPost for which to create a replies. If `parentId`\nis provided, but `parent` is not, the IPost record will be fetched."
        }
      },
      "parentCreator": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IUser",
          "resolved": "IUser",
          "references": {
            "IUser": {
              "location": "import",
              "path": "@esri/arcgis-rest-portal"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional reference to an IUser representing the parent post author. If not\nprovided, the IUser record will be fetched."
        }
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
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional UUID string of an existing parent IPost for which to create replies. If\n`parentId` is provided but `parent` is not, the IPost record will be fetched."
        },
        "attribute": "parent-id",
        "reflect": true
      },
      "channel": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "Partial<IChannel>",
          "resolved": "{ id?: string; access?: SharingAccess; allowAnonymous?: boolean; allowAsAnonymous?: boolean; allowedReactions?: PostReaction[]; allowPost?: boolean; allowReaction?: boolean; allowReply?: boolean; blockWords?: string[]; channelAcl?: IChannelAclPermission[]; defaultPostStatus?: PostStatus; groups?: string[]; metadata?: IChannelMetadata; name?: string; orgId?: string; orgs?: string[]; posts?: IPost[]; softDelete?: boolean; creator?: string; editor?: string; createdAt?: Date; updatedAt?: Date; }",
          "references": {
            "Partial": {
              "location": "global"
            },
            "IChannel": {
              "location": "import",
              "path": "@esri/hub-discussions"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional reference to an existing IChannel to create new IPost records within, or a reference\nto an existing IChannel for a given `postId`, `post`, `parentId`, or `parent`. If `channel`\nis not provided, it will be fetched using the given `channelId`, `postId`, `post`, `parentId`,\nor `parent`."
        }
      },
      "channelAccess": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "SharingAccess",
          "resolved": "SharingAccess.ORG | SharingAccess.PRIVATE | SharingAccess.PUBLIC",
          "references": {
            "SharingAccess": {
              "location": "import",
              "path": "@esri/hub-discussions"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional string representing a channel access level when creating a new parent post and the\nIChannel is not yet known. When providing `channelAccess` and `channelGroupIds` and an IChannel\ndoes not yet exist with those access settings, a new IChannel will be created on the fly at the\ntime the IPost record is created. If an IChannel already exists with the provided `channelAccess`\nand `channelGroupIds`, that IChannel will be reused."
        },
        "attribute": "channel-access",
        "reflect": false
      },
      "channelGroupIds": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "string[] | null",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional UUID string array representing a private channel's groups when creating a new parent\npost and the IChannel is not yet known. When providing `channelGroupIds` and `channelAccess` and\nan IChannel does not yet exist with those access settings, a new IChannel will be created on the\nfly at the IPost record is created. If an IChannel already exists with the provided `channelGroupIds`\nand `channelAccess`, that IChannel will be reused."
        }
      },
      "channelGroups": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IGroup[] | null",
          "resolved": "IGroup[]",
          "references": {
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
          "text": "An optional Array of IGroup objects representing a private IChannel groups. If `channelGroups` is\nnot provided, it will be fetched."
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
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional UUID string of an existing IChannel to create new IPost records within, or an existing\nIChannel for a given `postId`, `post`, `parentId`, or `parent`. If `channelId` is provided but\n`channel` is not, the IChannel will be fetched."
        },
        "attribute": "channel-id",
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
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional reference to the IHubContent or IGroup representing the subject entity of the discussion.\nIf `entity` is not provided, it will be fetched using the given `entityId` & `entityType` or the given\n`discussion`."
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
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional string representing the type (`content` or `group`) of subject entity of the discussion.\nIf `entityType` and `entityId` are provided but `entity` is not, the entity will be fetched."
        },
        "attribute": "entity-type",
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
          "text": "A URI string representing the subject entity of the discussion, e.g. `hub://content/1fc` or `hub://group/2fc`.\nWhen `entity`, `entityId`, and `entityType` are not provided, the entity will be fetched by parsing the URI."
        },
        "attribute": "discussion",
        "reflect": true
      },
      "displayFieldKey": {
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
          "text": "An optional display field key as configured by the layer when entity is IHubContent. Will be fetched if not\nexplicitly provided."
        },
        "attribute": "display-field-key",
        "reflect": false
      },
      "displayFieldValid": {
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
          "text": "An optional boolean indicating if the display field key configured by the layer is valid when entity is IHubContent"
        },
        "attribute": "display-field-valid",
        "reflect": false
      },
      "displayFieldValue": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional display field value as configured by the layer when entity is IHubContent. Will be fetched if not\nexplicitly provided."
        },
        "attribute": "display-field-value",
        "reflect": false
      },
      "locationId": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "A UUID string representing a feature ID on the map that is the target of the discussion"
        },
        "attribute": "location-id",
        "reflect": false
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
          "text": "If a map is present on the page"
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
          "text": "If this component is embedded in a Hub site. The domain service will be called to make this\ndetermination if a value is not explicitly provided."
        },
        "attribute": "is-hub",
        "reflect": false
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
          "text": "New features (geometry) unsaved for location updates"
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
              "path": "../../utils/discussions"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "New related features unsaved for location updates"
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
      "index": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional index when the post is rendered within a list"
        },
        "attribute": "index",
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
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the body width is < 768px"
        },
        "attribute": "is-mobile",
        "reflect": false
      },
      "createParentSaveButtonText": {
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
          "text": "Overrides the Create Post save button text"
        },
        "attribute": "create-parent-save-button-text",
        "reflect": false
      },
      "createParentBodyPlaceholderText": {
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
          "text": "Overrides the Create Post `body` placeholder text"
        },
        "attribute": "create-parent-body-placeholder-text",
        "reflect": false
      },
      "showLocations": {
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
          "text": "Add Location button and post location list render when true"
        },
        "attribute": "show-locations",
        "reflect": false
      },
      "disableSelectExistingLocation": {
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
          "text": "Disable 'Select' location draw action"
        },
        "attribute": "disable-select-existing-location",
        "reflect": false
      },
      "showHeader": {
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
          "text": "The post heaader, e.g. `Add Post`, `Edit Post`, etc, render when true"
        },
        "attribute": "show-header",
        "reflect": false
      },
      "collapsible": {
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
          "text": "When true, the component can be toggled between expanded/collapsed states"
        },
        "attribute": "collapsible",
        "reflect": false
      },
      "collapsed": {
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
          "text": "When true and `collapsible` is true, the component will render a collapsed state that hides\nthe title field, add location button, cancel button & location list, and renders fewer post/channel\ndetails"
        },
        "attribute": "collapsed",
        "reflect": true
      },
      "channelModifiable": {
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
          "text": "When `true` allows for changing the channel when creating a new parent post"
        },
        "attribute": "channel-modifiable",
        "reflect": false
      },
      "initialValues": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Pick<IPost, \"title\" | \"body\">",
          "resolved": "{ body: string; title: string; }",
          "references": {
            "Pick": {
              "location": "global"
            },
            "IPost": {
              "location": "import",
              "path": "@esri/hub-discussions"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Intial values used to pre-populate editor"
        }
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "_unsavedFeatures": {},
      "_unsavedRelatedFeatures": {},
      "_unsavedExistingFeatures": {},
      "pending": {},
      "loading": {},
      "titleValue": {},
      "bodyValue": {},
      "discussionValue": {},
      "geometryValue": {},
      "geometryValueHasChanges": {},
      "locationActionElement": {},
      "recentChannelsResults": {},
      "step": {},
      "errorMessage": {},
      "confirmCancel": {},
      "addLocationsActiveGeometryType": {},
      "addLocationsPopoverOpen": {},
      "asAnonymous": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubDiscussionsPostEditorReady",
        "name": "arcgisHubDiscussionsPostEditorReady",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the editor's dependencies have been fetched"
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
        "method": "arcgisHubDiscussionsPostCancel",
        "name": "arcgisHubDiscussionsPostCancel",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user elects to cancel creating or editing a post"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsPostCreate",
        "name": "arcgisHubDiscussionsPostCreate",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user successfully creates a new post"
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
        "method": "arcgisHubDiscussionsPostEdit",
        "name": "arcgisHubDiscussionsPostEdit",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user successfully edits an existing post"
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
        "method": "arcgisHubDiscussionsPostChanged",
        "name": "arcgisHubDiscussionsPostChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user changes the post title or body"
        },
        "complexType": {
          "original": "Pick<IPost, \"title\" | \"body\">",
          "resolved": "{ body: string; title: string; }",
          "references": {
            "Pick": {
              "location": "global"
            },
            "IPost": {
              "location": "import",
              "path": "@esri/hub-discussions"
            }
          }
        }
      }, {
        "method": "arcgisHubDiscussionsGeometryDrawCreate",
        "name": "arcgisHubDiscussionsGeometryDrawCreate",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user requests to begin drawing a geometry for the post"
        },
        "complexType": {
          "original": "IPostDrawCreateDetails",
          "resolved": "IPostDrawCreateDetails",
          "references": {
            "IPostDrawCreateDetails": {
              "location": "import",
              "path": "../../utils/discussions"
            }
          }
        }
      }, {
        "method": "arcgisHubDiscussionsGeometryDrawTypeSelect",
        "name": "arcgisHubDiscussionsGeometryDrawTypeSelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user requests to draw a specific geometry type"
        },
        "complexType": {
          "original": "Tool",
          "resolved": "\"circle\" | \"point\" | \"polygon\" | \"polyline\" | \"rectangle\" | \"select\"",
          "references": {
            "Tool": {
              "location": "import",
              "path": "../../../arcgis-hub-map-widget-container/arcgis-hub-map-widget-draw/types"
            }
          }
        }
      }, {
        "method": "arcgisHubDiscussionsGeometryDrawEdit",
        "name": "arcgisHubDiscussionsGeometryDrawEdit",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user edits a drawn geometry for the post"
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
        "method": "arcgisHubDiscussionsGeometryDrawReset",
        "name": "arcgisHubDiscussionsGeometryDrawReset",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user resets a drawn geometry for the post"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsGeometrySelect",
        "name": "arcgisHubDiscussionsGeometrySelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user selects a feature on the map"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsGeometryDeselect",
        "name": "arcgisHubDiscussionsGeometryDeselect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user deselects a feature on the map"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsGeometryClearAll",
        "name": "arcgisHubDiscussionsGeometryClearAll",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user cancels or submits a post - clears all unsaved features"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsPostClose",
        "name": "arcgisHubDiscussionsPostClose",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the close button is clicked from the post editor header"
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
        "methodName": "initialize"
      }, {
        "propName": "titleValue",
        "methodName": "handleTitleBodyValueUpdate"
      }, {
        "propName": "bodyValue",
        "methodName": "handleTitleBodyValueUpdate"
      }, {
        "propName": "geometryValue",
        "methodName": "handleGeometryValueUpdated"
      }, {
        "propName": "unsavedFeatures",
        "methodName": "mapFeaturePropToState"
      }, {
        "propName": "unsavedExistingFeatures",
        "methodName": "mapExistingFeaturePropToState"
      }, {
        "propName": "unsavedRelatedFeatures",
        "methodName": "mapRelatedFeaturePropToState"
      }, {
        "propName": "addLocationsActiveGeometryType",
        "methodName": "handleAddLocationsActiveGeometryTypeChanged"
      }, {
        "propName": "step",
        "methodName": "handleStepChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "calciteComboboxChange",
        "method": "handleComboboxChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "focusin",
        "method": "handleFocusin",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "focusout",
        "method": "handleFocusout",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "calciteComboboxOpen",
        "method": "handleGroupSearchOpened",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubRichTextChange",
        "method": "updateBodyValue",
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
        "name": "arcgisHubDrawDone",
        "method": "handleDrawDone",
        "target": "body",
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDrawCancel",
        "method": "handleDrawCancel",
        "target": "body",
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  Memoize('bodyValue')
], ArcgisHubDiscussionsPostEditor.prototype, "hasMentionedUsers", null);
__decorate([
  MinPromiseDelay({ delay: 300 })
], ArcgisHubDiscussionsPostEditor.prototype, "_fetchRecentChannelDetails", null);
__decorate([
  CallWhen({
    when() {
      return (!this.isMobile || this.showLocations) && this.hasMap;
    },
  })
], ArcgisHubDiscussionsPostEditor.prototype, "renderAddLocationsButton", null);
