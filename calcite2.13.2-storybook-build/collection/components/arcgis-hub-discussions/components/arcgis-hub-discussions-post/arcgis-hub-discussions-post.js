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
import { removePost, canModifyPost, canDeletePost, PostStatus, updatePostStatus, canModifyPostStatus, fetchPost, PostRelation, } from '@esri/hub-discussions';
import { getUserThumbnailUrl } from '@esri/hub-common';
import { bind } from '../../../../utils/context';
import { getChannelName } from '../../utils/discussions';
import intlManager from '../../../../utils/intl-manager';
import { dictionary, constants as telemetryConstants } from '@esri/telemetry-dictionary-hub';
import AutoLink from '../../../../decorators/auto-link';
import Sanitize from '../../../../decorators/sanitize';
import CallOnce from '../../../../decorators/call-once';
import MentionPopoverTransform from '../../decorators/mention-popover-transform';
import { copyLinkToPost } from '../../utils/string';
import { fetchChannelDetails } from '../../../../utils/discussions/fetch-channel-details';
import { fetchEntityDetails } from '../../../../utils/discussions/fetch-entity-details';
import { fetchEnvironmentDetails } from '../../../../utils/discussions/fetch-environment-details';
import { fetchParentDetails } from '../../../../utils/discussions/fetch-parent-details';
import { fetchParentUserDetails } from '../../../../utils/discussions/fetch-parent-user-details';
import { fetchPostUserDetails } from '../../../../utils/discussions/fetch-post-user-details';
import { fetchPostDetails } from '../../../../utils/discussions/fetch-post-details';
import { fetchPostMentionedUsers } from '../../../../utils/discussions/fetch-post-mentioned-users';
import MinPromiseDelay from '../../../../decorators/min-promise-delay';
import HighlightBlockedWords from '../../decorators/highlight-blocked-words';
import Memoize from '../../../../decorators/memoize';
import { connectContext, getGlobalContext } from '../../../../utils/state';
var PostView;
(function (PostView) {
  PostView["Skeleton"] = "skeleton";
  PostView["Post"] = "post";
  PostView["Reply"] = "reply";
  PostView["OutOfContext"] = "outOfContext";
  PostView["Editor"] = "editor";
  PostView["Deleted"] = "deleted";
  PostView["Hidden"] = "hidden";
})(PostView || (PostView = {}));
var ANIMATION_CLASSES;
(function (ANIMATION_CLASSES) {
  ANIMATION_CLASSES["IN"] = "in";
  ANIMATION_CLASSES["OUT"] = "out";
  ANIMATION_CLASSES["HIDDEN"] = "hidden";
})(ANIMATION_CLASSES || (ANIMATION_CLASSES = {}));
/**
 * @slot editor - A slot to render an arcgis-hub-discussions-post-editor component instance with custom configuration
 * @slot metadata - A slot to render an arcgis-hub-discussions-post-header component instance with custom configuration
 */
export class ArcgisHubDiscussionsPost {
  /**
   * Constructor method, pre-bind context to methods that are passed by reference
   */
  constructor() {
    this.postId = undefined;
    this.post = undefined;
    this.postCreator = undefined;
    this.postCreatorOrg = undefined;
    this.postError = undefined;
    this.postMentionedUsers = undefined;
    this.channelId = undefined;
    this.channel = undefined;
    this.channelGroups = undefined;
    this.parentId = undefined;
    this.parent = undefined;
    this.parentCreator = undefined;
    this.parentCreatorOrg = undefined;
    this.hasMap = undefined;
    this.isHub = undefined;
    this.unsavedFeatures = undefined;
    this.unsavedRelatedFeatures = undefined;
    this.unsavedExistingFeatures = [];
    this.preview = undefined;
    this.index = undefined;
    this.discussion = undefined;
    this.entityId = undefined;
    this.entityType = undefined;
    this.entity = undefined;
    this.displayFieldValid = undefined;
    this.displayFieldValue = undefined;
    this.displayFieldKey = undefined;
    this.isMobile = undefined;
    this.locationId = undefined;
    this.lead = undefined;
    this.lastIndex = undefined;
    this.loading = undefined;
    this.showLocations = undefined;
    this.disableSelectExistingLocation = undefined;
    this.locationDescriptionText = undefined;
    this.showChannelAvatar = undefined;
    this.showChannelName = undefined;
    this._context = getGlobalContext();
    this.minHeight = null;
    this.popoverIsOpen = undefined;
    this.articleClass = null;
    this.editorClass = ANIMATION_CLASSES.HIDDEN;
    this.renderedEl = null;
    this.editing = false;
    this.errorMessage = null;
    this.intl = undefined;
    this.isCopied = undefined;
    this._loading = false;
    bind(this, 'handleDelete', 'handleEdit', 'handleCopyLink', 'handleCopyTooltipBeforeOpen', 'handleCopyTooltipClose', 'handleActionsPopoverBeforeOpenClose', 'handleToggleVisibility', 'handleViewThread', 'handleReply', 'handleViewReplies', 'handleLinkClicked', 'renderDeleted', 'renderHidden', 'renderPost', 'renderReply', 'renderEditor', 'renderSkeleton', 'handleViewPost', 'handleSetComponentRef', 'handleAnimationEnd', 'renderReplyOutOfContext', 'handleViewAllReplies', 'handleReplyOutOfContextReadMore');
  }
  /**
   * Connected callback lifecycle hook
   */
  connectedCallback() {
    connectContext(this);
    this.addAnimationEventListeners(this.renderedEl);
  }
  /**
   * Component will load lifecycle hook
   */
  componentWillLoad() {
    this.initialize();
  }
  /**
   * Disconnected callback lifecycle hook
   */
  disconnectedCallback() {
    this.removeAnimationEventListeners(this.renderedEl);
    this.disconnectContext();
  }
  /**
   * Handles arcgisHubDiscussionsPostViewAllGeography events from parent posts, emits arcgisHubDiscussionsPostSelect
   * to load the full thread view
   */
  handlePostViewAllGeography() {
    const { postId, post, postCreator, postCreatorOrg, channel, channelGroups, channelId } = this;
    this.arcgisHubDiscussionsPostSelect.emit({
      parent: post,
      parentId: postId,
      parentCreator: postCreator,
      parentCreatorOrg: postCreatorOrg,
      channelId,
      channel,
      channelGroups,
    });
  }
  /**
   * Handles clicks to the Read More action in the multiline-ellipsis component
   * @param evt
   */
  handleMultilineEllipsisExpanded(evt) {
    if (!this.isReply) {
      evt.preventDefault();
      evt.stopPropagation();
      this.handleViewThread();
    }
  }
  /**
   * Handles calcitePopoverOpen events, ensures proper focus is set
   */
  handleCalcitePopoverOpen(evt) {
    var _a;
    const { open } = evt.target;
    if (evt.target !== this.menuPopoverElement && ((_a = this.menuPopoverElement) === null || _a === void 0 ? void 0 : _a.open)) {
      this.menuPopoverElement.setFocus();
    }
    else if (evt.target === this.menuPopoverElement && open) {
      this.emitHubTelemetry(Object.assign(Object.assign({}, dictionary.category.interaction.action.open.label.popover.details.options), { position: this.index }));
    }
  }
  /**
   * Handles arcgisHubDiscussionsPostReactionChange event when a reaction
   * is created or removed
   */
  handleReactionChanged(evt) {
    evt.stopPropagation();
    const target = evt.target;
    this.post = target.post;
    this.arcgisHubDiscussionsPostEdit.emit(target.post);
  }
  /**
   * Emits hub telemetry events, adding common properties
   */
  emitHubTelemetry(telemetry) {
    const { postId, parentId, channel, channelId } = this;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { postId,
      parentId, channelId: channelId, channelAccess: channel === null || channel === void 0 ? void 0 : channel.access }));
  }
  /**
   * Fetches dependencies and emits arcgisHubDiscussionsPostReady when complete
   */
  async loadDependencies() {
    this._loading = true;
    return this.fetchDependencies().then(dependencies => {
      Object.assign(this, dependencies);
      this._loading = false;
      this.arcgisHubDiscussionsPostReady.emit();
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
   * Fetches all dependencies
   */
  async _fetchDependencies() {
    const { postId, postCreator, postCreatorOrg, parent, parentId, parentCreator, post, postMentionedUsers, channel, channelId, _context, discussion, entityId, entity, entityType, displayFieldKey, displayFieldValid, displayFieldValue, isHub, locationId, channelGroups, } = this;
    const [postDetails, environmentDetails] = await Promise.all([
      fetchPostDetails({ postId, post }, _context.hubRequestOptions),
      fetchEnvironmentDetails({ isHub }, _context.hubRequestOptions),
    ]);
    const [postUserDetails, parentDetails] = await Promise.all([
      fetchPostUserDetails(Object.assign({ postCreator, postCreatorOrg }, postDetails), _context.hubRequestOptions),
      fetchParentDetails(Object.assign({ parentId, parent }, postDetails), _context.hubRequestOptions),
    ]);
    const [entityDetails, channelDetails, parentUserDetails, postMentionedUsersDetails] = await Promise.all([
      fetchEntityDetails(Object.assign(Object.assign({ discussion, entityId, entityType, entity, displayFieldKey, displayFieldValid, displayFieldValue, locationId }, postDetails), parentDetails), _context.hubRequestOptions),
      fetchChannelDetails(Object.assign(Object.assign({ channelId, channel: channel, channelGroups }, postDetails), parentDetails), _context.hubRequestOptions),
      fetchParentUserDetails(Object.assign({ parentCreator }, parentDetails), _context.hubRequestOptions),
      fetchPostMentionedUsers(Object.assign({ postMentionedUsers }, postDetails), _context.hubRequestOptions),
    ]);
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, postDetails), postUserDetails), parentDetails), parentUserDetails), channelDetails), entityDetails), environmentDetails), postMentionedUsersDetails);
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
   * Sanitizes body text and renders urls as links. Caches post body so operation is only performed as needed.
   * @returns string: body text of a post with urls rendered as calcite-links
   */
  get postBody() {
    return this.post.body;
  }
  get postTitle() {
    return this.post.title;
  }
  /**
   * Handles clicks to the Delete action
   */
  handleDelete() {
    const { _context, postId, post, menuPopoverElement, isReply } = this;
    this.errorMessage = null;
    if (menuPopoverElement) {
      menuPopoverElement.open = false;
    }
    return removePost(Object.assign({ postId }, _context.hubRequestOptions))
      .then(() => {
      this.deletedDuringSession = true;
      this.emitHubTelemetry(Object.assign(Object.assign({}, dictionary.category.content.action.delete), { response: telemetryConstants.response.SUCCESS }));
      this.arcgisHubDiscussionsPostDelete.emit(post);
    })
      .catch(e => {
      this.errorMessage = isReply ? 'deleteFailureReply' : 'deleteFailure';
      this.emitHubTelemetry(Object.assign(Object.assign({}, dictionary.category.content.action.delete), { response: telemetryConstants.response.FAILURE }));
      console.error(`Could not delete post:`, e.message);
    });
  }
  /**
   * Handles clicks to the Edit action
   */
  handleEdit() {
    if (this.menuPopoverElement) {
      this.menuPopoverElement.open = false;
    }
    setTimeout(() => this.transitionEditorView(true), 100);
    this.emitHubTelemetry(Object.assign(Object.assign({}, dictionary.category.interaction.action.open.label.editor), { position: this.index }));
  }
  /**
   * Handles clicks to the Copy Link action is clicked
   */
  handleCopyLink() {
    copyLinkToPost(this.channelId, this.postId, this.parentId);
    this.isCopied = true;
    this.copyTooltipRef.open = true;
  }
  /**
   * Handles alciteTooltipBeforeOpen events from the Copy Link tooltip
   */
  handleCopyTooltipBeforeOpen() {
    if (!this.isCopied) {
      this.copyTooltipRef.open = false;
    }
  }
  /**
   * Handles calciteTooltipClose events from the Copy Link tooltip
   */
  handleCopyTooltipClose() {
    this.isCopied = false;
  }
  /**
   * Handles calcitePopoverBeforeClose and calcitePopoverBeforeOpen
   * events emitted from the actions menu popover
   */
  handleActionsPopoverBeforeOpenClose() {
    this.isCopied = false;
    if (this.copyTooltipRef) {
      this.copyTooltipRef.open = false;
    }
  }
  /**
   * Toggle the visibility (status) of a post
   * @returns IPost: Returns the modified post object
   */
  handleToggleVisibility() {
    const { _context, post, menuPopoverElement } = this;
    this.errorMessage = null;
    if (menuPopoverElement) {
      menuPopoverElement.open = false;
    }
    let status;
    let details;
    if (post.status === PostStatus.HIDDEN || post.status === PostStatus.BLOCKED) {
      status = PostStatus.APPROVED;
      details = 'show';
    }
    else {
      status = PostStatus.HIDDEN;
      details = 'hide';
    }
    return updatePostStatus(Object.assign({ data: {
        status,
      }, postId: post.id }, _context.hubRequestOptions))
      .then(editedPost => fetchPost(Object.assign({ postId: editedPost.id, data: {
        relations: [PostRelation.REACTIONS, PostRelation.REPLIES],
      } }, this._context.hubRequestOptions)))
      .then(editedPost => {
      editedPost.replyCount = editedPost.replies.total;
      delete editedPost.replies;
      this.emitHubTelemetry(Object.assign(Object.assign({}, dictionary.category.content.action.update.label.status.details[details]), { response: telemetryConstants.response.SUCCESS }));
      this.arcgisHubDiscussionsPostEdit.emit(editedPost);
      return editedPost;
    })
      .catch(e => {
      console.error('Could not update post status:', e.message);
      this.emitHubTelemetry(Object.assign(Object.assign({}, dictionary.category.content.action.update.label.status.details[details]), { response: telemetryConstants.response.FAILURE }));
      return null;
    });
  }
  /**
   * Emits arcgisHubDiscussionsPostSelect to traverse to a thread
   */
  handleViewThread() {
    const { index, postId, post, postCreator, postCreatorOrg, channel, channelGroups, channelId } = this;
    this.arcgisHubDiscussionsPostSelect.emit({
      parentId: postId,
      parent: post,
      parentCreator: postCreator,
      parentCreatorOrg: postCreatorOrg,
      channel,
      channelGroups,
      channelId,
    });
    if (index !== undefined) {
      this.emitHubTelemetry(Object.assign(Object.assign({}, dictionary.category.interaction.action.open.label.thread), { position: index }));
    }
  }
  /**
   * Handles clicks to the Reply action
   */
  handleReply() {
    const { postId, post, postCreator, postCreatorOrg, channel, channelGroups, channelId } = this;
    this.arcgisHubDiscussionsPostSelect.emit({
      parentId: postId,
      parent: post,
      parentCreator: postCreator,
      parentCreatorOrg: postCreatorOrg,
      channel,
      channelGroups,
      channelId,
      scrollTarget: 'editor',
    });
    this.emitHubTelemetry(dictionary.category.interaction.action.open.label.editor.details.reply);
  }
  /**
   * Handles clicks to the View N repl(y|ies) action
   */
  handleViewReplies() {
    const { postId, post, postCreator, postCreatorOrg, channel, channelGroups, channelId } = this;
    this.arcgisHubDiscussionsPostSelect.emit({
      parentId: postId,
      parent: post,
      parentCreator: postCreator,
      parentCreatorOrg: postCreatorOrg,
      channel,
      channelGroups,
      channelId,
      scrollTarget: 'list',
    });
    this.emitHubTelemetry(dictionary.category.interaction.action.open.label.thread.details.bodyAction);
  }
  /**
   * Handles clicks to non-mention calcite-links in the post body.
   */
  handleLinkClicked(evt) {
    const el = evt.target;
    if (['CALCITE-LINK'].includes(el.nodeName) && !el.hasAttribute('data-mention')) {
      const { postId, parentId, channel, index } = this;
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.navigation.action.external.label.link), { details: el.href, postId: postId, parentId, channelId: channel.id, channelAccess: channel.access, position: index }));
    }
  }
  /**
   * Emits the hubTelemetry impression for a deep linked thread
   */
  capturePostDeepLinkImpression() {
    this.emitHubTelemetry(Object.assign(Object.assign({}, dictionary.category.interaction.action.viewed.label.post.details.thread), { response: telemetryConstants.response.SUCCESS }));
  }
  /**
   * Emits the hubTelemetry impression for a post rendered within a list
   */
  capturePostListImpression() {
    this.emitHubTelemetry(Object.assign(Object.assign({}, dictionary.category.interaction.action.viewed.label.post.details.postList), { position: this.index }));
  }
  /**
   * Emits the hubTelemetry impression for a deleted post
   */
  capturePostDeletedImpression() {
    this.emitHubTelemetry(Object.assign(Object.assign({}, dictionary.category.interaction.action.viewed.label.post.details.thread), { response: telemetryConstants.response.FAILURE }));
  }
  /**
   * Emits the hubTelemetry impression for a hidden post
   */
  capturePostHiddenImpression() {
    this.emitHubTelemetry(Object.assign(Object.assign({}, dictionary.category.interaction.action.viewed.label.post.details.thread), { response: telemetryConstants.response.FAILURE }));
  }
  /**
   * Watches for changes to the renderedEl (article or editor component) and wires
   * up animationend directly on the element reference as animation events don't bubble
   * up the DOM.
   * @param renderedEl The currently rendered element
   * @param prevRenderedEl The previously rendered element
   */
  handleRenderedElChange(renderedEl, prevRenderedEl) {
    this.removeAnimationEventListeners(prevRenderedEl);
    this.addAnimationEventListeners(renderedEl);
  }
  /**
   * Reloads dependencies when context changes
   */
  handleContextChanged(context, prevContext) {
    var _a, _b;
    if (((_a = context === null || context === void 0 ? void 0 : context.currentUser) === null || _a === void 0 ? void 0 : _a.username) !== ((_b = prevContext === null || prevContext === void 0 ? void 0 : prevContext.currentUser) === null || _b === void 0 ? void 0 : _b.username)) {
      this.loadDependencies();
    }
  }
  /**
   * Adds relevant animation event listeners to the provided element reference
   * @param el An HTMLElement reference
   */
  addAnimationEventListeners(el) {
    if (el) {
      el.addEventListener('animationend', this.handleAnimationEnd);
    }
  }
  /**
   * Removes relevant animation event listeners from the provided element reference
   * @param el An HTMLElement reference
   */
  removeAnimationEventListeners(el) {
    if (el) {
      el.removeEventListener('animationend', this.handleAnimationEnd);
    }
  }
  /**
   * Emits arcgisHubDiscussionsPostSelect when reply is deleted and
   * user clicks View all replies link from calcite-notice
   */
  handleViewAllReplies() {
    const { parent, parentId, parentCreator, parentCreatorOrg, channel, channelId, channelGroups } = this;
    this.arcgisHubDiscussionsPostSelect.emit({
      parent,
      parentId,
      parentCreator,
      parentCreatorOrg,
      channelId,
      channel,
      channelGroups,
    });
  }
  /**
   * Emits arcgisHubDiscussionsPostSelect when Read More is clicked for an out-of-context reply
   */
  handleReplyOutOfContextReadMore() {
    const { parent, parentId, parentCreator, parentCreatorOrg, channel, channelId, channelGroups, postId, post, postCreator, postCreatorOrg } = this;
    this.arcgisHubDiscussionsPostSelect.emit({
      parent,
      parentId,
      parentCreator,
      parentCreatorOrg,
      channelId,
      channel,
      channelGroups,
      postId,
      post,
      postCreator,
      postCreatorOrg,
    });
  }
  /**
   * Emits arcgisHubDiscussionsPostSelect when View Post action is clicked from
   * an out of context reply
   */
  handleViewPost(evt) {
    evt.stopPropagation();
    const { parent, parentId, parentCreator, parentCreatorOrg, channel, channelId, channelGroups, post, postId, postCreator, postCreatorOrg } = this;
    this.arcgisHubDiscussionsPostSelect.emit({
      parent,
      parentId,
      parentCreator,
      parentCreatorOrg,
      channelId,
      channel,
      channelGroups,
      post,
      postId,
      postCreator,
      postCreatorOrg,
    });
  }
  /**
   * Assigns a reference to the article element so we
   * can calculate it's height
   * @param article A reference to the article element
   */
  handleSetComponentRef(renderedEl) {
    if (renderedEl) {
      this.renderedEl = renderedEl;
    }
  }
  /**
   * Handles users clicking the Cancel button
   * from the post editor
   */
  handlePostCanceled(evt) {
    evt.stopPropagation();
    this.transitionEditorView(false);
    this.arcgisHubDiscussionsGeometryDeselect.emit();
    this.arcgisHubDiscussionsGeometryDrawReset.emit();
  }
  /**
   * Refreshes the parent post record when a reply is created for the post,
   * emits arcgisHubDiscussionsPostEdit so upstream references are updated as well.
   */
  async handlePostCreatedOrDeleted(evt) {
    var _a;
    if (evt.detail.parentId === ((_a = this.post) === null || _a === void 0 ? void 0 : _a.id)) {
      const updatedPost = await fetchPost(Object.assign({ postId: this.post.id, data: {
          relations: [PostRelation.REACTIONS, PostRelation.REPLIES],
        } }, this._context.hubRequestOptions));
      updatedPost.replyCount = updatedPost.replies.total;
      delete updatedPost.replies;
      this.arcgisHubDiscussionsPostEdit.emit(updatedPost);
    }
  }
  /**
   * Handles animationend events for the renderedEl. Used to initiate
   * secondary animation when transitioning between post content and editor
   * views. Additionally removes temporarily enforced min height after chained
   * animations complete.
   * @param evt  An AnimationEvent
   */
  handleAnimationEnd(evt) {
    if (evt.animationName === 'out-left') {
      this.editing = true;
      this.editorClass = ANIMATION_CLASSES.IN;
      this.articleClass = ANIMATION_CLASSES.HIDDEN;
    }
    else if (evt.animationName === 'out-right') {
      this.editing = false;
      this.editorClass = ANIMATION_CLASSES.HIDDEN;
      this.articleClass = ANIMATION_CLASSES.IN;
    }
    else {
      this.editorClass = null;
      this.articleClass = null;
      this.minHeight = null;
    }
  }
  /**
   * Handles users successfully editing a post. Listens on body so the post
   * is updated to reflect most recent changes regardless of if it was edited
   * from the post editor rendered by this component
   */
  handlePostEditedBody(evt) {
    var _a;
    if (((_a = this.post) === null || _a === void 0 ? void 0 : _a.id) === evt.detail.id) {
      this.post = evt.detail;
    }
  }
  /**
   * Handles the post being edited, closes the editor
   */
  handlePostEdited(evt) {
    if (evt.target.nodeName.toLowerCase() === 'arcgis-hub-discussions-post-editor') {
      this.transitionEditorView(false);
    }
  }
  /**
   * Handles the arcgisHubDiscussionPopoverBeforeOpen event, updates popoverIsOpen state
   */
  handlePopoverOpen() {
    this.popoverIsOpen = true;
  }
  /**
   * Handles the arcgisHubDiscussionPopoverClose event, updates popoverIsOpen state
   */
  handlePopoverClose() {
    this.popoverIsOpen = false;
  }
  /**
   * Initiates the animations related to showing and hiding
   * the post editor
   * @param showEditor  Whether to show or hide the post editor
   */
  transitionEditorView(showEditor) {
    var _a, _b;
    this.minHeight = (_b = (_a = this.renderedEl) === null || _a === void 0 ? void 0 : _a.offsetHeight) !== null && _b !== void 0 ? _b : null;
    this.editorClass = showEditor ? ANIMATION_CLASSES.HIDDEN : ANIMATION_CLASSES.OUT;
    this.articleClass = showEditor ? ANIMATION_CLASSES.OUT : ANIMATION_CLASSES.HIDDEN;
  }
  /**
   * Computes true when context is not provided, intl is not yet loaded, or dependencies are being fetched
   */
  get isLoading() {
    return !this._context || this._loading || !this.intl || this.loading;
  }
  /**
   * Computes when the location list should be disabled from interaction
   */
  get locationListIsDisabled() {
    let disabled = false;
    if (this.locationDescriptionText && !this.isMobile) {
      disabled = false;
    }
    else if (this.showLocations) {
      disabled = false;
    }
    else if (!this.hasMap || (this.isMobile)) {
      disabled = true;
    }
    return disabled;
  }
  /**
   * Computes map of views to render methods
   */
  get views() {
    const { renderEditor, renderDeleted, renderHidden, renderPost, renderReply, renderSkeleton, renderReplyOutOfContext } = this;
    return {
      [PostView.Skeleton]: {
        render: renderSkeleton,
      },
      [PostView.Post]: {
        render: renderPost,
      },
      [PostView.Reply]: {
        render: renderReply,
      },
      [PostView.OutOfContext]: {
        render: renderReplyOutOfContext,
      },
      [PostView.Editor]: {
        render: renderEditor,
      },
      [PostView.Deleted]: {
        render: renderDeleted,
      },
      [PostView.Hidden]: {
        render: renderHidden,
      },
    };
  }
  /**
   * Computes the correct view to render
   */
  get view() {
    const { views, post, postError, editing, isLoading, outOfContext, isReply } = this;
    const postErrorStatus = postError === null || postError === void 0 ? void 0 : postError.status;
    let target;
    if (isLoading) {
      target = PostView.Skeleton;
    }
    else if (postErrorStatus === 404) {
      target = PostView.Deleted;
    }
    else if (postErrorStatus === 422) {
      target = PostView.Hidden;
    }
    else if (!post) {
      // Default error state (needs enhancement)
      target = PostView.Deleted;
    }
    else if (editing) {
      target = PostView.Editor;
    }
    else if (outOfContext) {
      target = PostView.OutOfContext;
    }
    else if (isReply) {
      target = PostView.Reply;
    }
    else {
      target = PostView.Post;
    }
    return views[target];
  }
  /**
   * Computes the appropriate action menu actions for a post or reply
   */
  get actionMenuActions() {
    const { isReply, post, channel, _context, intl, isHub } = this;
    const actions = [];
    if (!isReply && isHub) {
      actions.push({
        icon: 'link',
        text: intl.t('link'),
        fn: this.handleCopyLink,
        ref: (element) => {
          this.copyActionRef = element;
        },
      });
    }
    if (_context.currentUser) {
      if (canModifyPostStatus(channel, _context.currentUser)) {
        actions.push((post.status === PostStatus.HIDDEN || post.status === PostStatus.BLOCKED)
          ? {
            icon: 'view-visible',
            text: intl.t('show'),
            fn: this.handleToggleVisibility,
          }
          : {
            icon: 'view-hide',
            text: intl.t('hide'),
            fn: this.handleToggleVisibility,
          });
      }
      if (!isReply) {
        if (post.creator === _context.currentUser.username || canModifyPost(post, _context.currentUser, channel)) {
          actions.push({
            icon: 'pencil',
            text: intl.t('edit'),
            fn: this.handleEdit,
          });
        }
        if (canDeletePost(post, channel, _context.currentUser)) {
          actions.push({
            icon: 'trash',
            text: intl.t('delete'),
            fn: this.handleDelete,
          });
        }
      }
    }
    return actions;
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
  /**
   * If this component is rendered out of context of parent post (post-list vs thread)
   */
  get outOfContext() {
    const { index, lead, isReply } = this;
    return isReply && !lead && index !== undefined;
  }
  /**
   * Computes inline styles to be temporarily applied to the host element to prevent
   * jankiness when transitioning between post/reply content & editor views.
   */
  get styles() {
    const { minHeight } = this;
    const styles = {};
    if (minHeight) {
      styles.minHeight = `${minHeight}px`;
    }
    return styles;
  }
  /**
   * Computes true when the post is a reply
   */
  get isReply() {
    var _a;
    return Boolean(this.parent || this.parentId || ((_a = this.post) === null || _a === void 0 ? void 0 : _a.parentId));
  }
  /**
   * Renders the post editor when editing a post
   */
  renderEditor() {
    const { hasMap, index, isHub, unsavedFeatures, unsavedRelatedFeatures, unsavedExistingFeatures, post, postCreator, postCreatorOrg, displayFieldKey, displayFieldValue, displayFieldValid, entity, discussion, entityId, entityType, isMobile, channelId, channel, channelGroups, locationId, postId, isReply, lead, lastIndex, editorClass, parent, parentId, parentCreator, showLocations, disableSelectExistingLocation } = this;
    return (h("div", { class: {
        'arcgis-hub-discussions-post-lead': isReply && lead,
        'arcgis-hub-discussions-post-last': isReply && index === lastIndex,
        [editorClass]: Boolean(editorClass),
        'arcgis-hub-discussions-post-editor-container': true,
      }, ref: this.handleSetComponentRef }, h("slot", { name: "editor" }, h("arcgis-hub-discussions-post-editor", { channel: channel, channelGroups: channelGroups, channelId: channelId, disableSelectExistingLocation: disableSelectExistingLocation, discussion: discussion, displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, displayFieldValue: displayFieldValue, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, index: index, isHub: isHub, isMobile: isMobile, locationId: locationId, parent: parent, parentCreator: parentCreator, parentId: parentId, post: post, postCreator: postCreator, postCreatorOrg: postCreatorOrg, postId: postId, showLocations: showLocations, unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures }))));
  }
  /**
   * Renders the reactions component
   */
  renderReactions() {
    const { post, channel } = this;
    if (channel.allowReaction) {
      return h("arcgis-hub-discussions-post-reactions", { channel: channel, post: post });
    }
  }
  /**
   * Renders the post metadata, i.e. the post-header component
   */
  renderMetadata(metadataOrientation, showChannelAccessIcon, showChannelAvatar, showChannelName, showCreatorAvatar, showPopover, showReplyingTo, showViewPostAction, showTimestamp) {
    const { isHub, post, postCreator, postCreatorOrg, parentCreator, channel, channelGroups, index, parent, handleViewPost } = this;
    return (h("slot", { name: "metadata" }, h("arcgis-hub-discussions-post-header", { channel: channel, channelGroups: channelGroups, iconScale: "l", index: index, isHub: isHub, metadataOrientation: metadataOrientation, onArcgisHubDiscussionsPostSelect: handleViewPost, parent: parent, parentCreator: parentCreator, post: post, postCreator: postCreator, postCreatorOrg: postCreatorOrg, showChannelAccessIcon: showChannelAccessIcon, showChannelAvatar: showChannelAvatar, showChannelName: showChannelName, showCreatorAvatar: showCreatorAvatar, showPopover: showPopover, showReplyingTo: showReplyingTo, showTimestamp: showTimestamp, showViewPostAction: showViewPostAction })));
  }
  /**
   * Renders the parent post view
   */
  renderPost() {
    const { intl, errorMessage, preview, post, channel, index, articleClass, showChannelAvatar, showChannelName } = this;
    index === undefined ? this.capturePostDeepLinkImpression() : this.capturePostListImpression();
    return (h("article", { class: { [articleClass]: Boolean(articleClass) }, ref: this.handleSetComponentRef }, h("arcgis-hub-discussions-post-chips", { channel: channel, index: index, post: post }), this.renderMetadata('block', true, showChannelAvatar, showChannelName, true, true, false, false, true), h("header", { innerHTML: this.postTitle }), h("arcgis-multiline-ellipsis", { "expand-enabled": preview, "expand-icon": intl.direction === 'rtl' ? 'arrow-left' : 'arrow-right', innerHTML: this.postBody, lines: preview ? 4 : 0, onClick: this.handleLinkClicked }), this.renderGeography(false, true), h("footer", null, this.renderReactions(), h("div", { class: "actions" }, this.renderTextActions(), this.renderActionMenu())), errorMessage && (h("calcite-notice", { closable: true, kind: "danger", open: true, scale: "s" }, h("div", { slot: "title" }, intl.t('error')), h("div", { slot: "message" }, intl.t(errorMessage))))));
  }
  /**
   * Renders the inline actions for a parent post
   */
  renderTextActions() {
    const { intl, post, preview } = this;
    let replyCountString;
    if (preview) {
      replyCountString = post.replyCount > 1 ? 'actions.viewMany' : 'actions.viewOne';
    }
    else {
      replyCountString = post.replyCount > 1 ? 'actions.replies' : 'actions.oneReply';
    }
    return (h("calcite-action-group", { id: "text-actions", layout: "horizontal" }, preview && h("calcite-action", { class: "text-action-reply", onClick: this.handleReply, scale: "s", text: intl.t('actions.reply'), textEnabled: true }), post.replyCount !== 0 && (h("calcite-action", { class: "text-action-view-reply", disabled: !preview, onClick: this.handleViewReplies, scale: "s", text: intl.t(replyCountString, { count: post.replyCount }), textEnabled: true }))));
  }
  /**
   * Renders ths post actions menu dropdown
   */
  renderActionMenu() {
    const { intl, isReply, actionMenuActions } = this;
    if (actionMenuActions.length) {
      return (h(Fragment, null, h("calcite-action", { alignment: "center", class: "discussions-post-action-menu", ref: (menuActionElement) => {
          this.menuActionElement = menuActionElement;
        }, scale: "s", text: intl.t('options') }, h("calcite-icon", { class: "discussions-post-action-menu-icon", icon: "ellipsis", scale: "s" })), h("calcite-popover", { autoClose: true, flipPlacements: isReply ? ['top', 'bottom'] : ['top-end', 'bottom-end'], label: intl.t('options'), offsetDistance: 0, onCalcitePopoverBeforeClose: this.handleActionsPopoverBeforeOpenClose, onCalcitePopoverBeforeOpen: this.handleActionsPopoverBeforeOpenClose, overlayPositioning: "absolute", placement: "bottom-end", pointerDisabled: true, ref: (menuPopoverElement) => {
          this.menuPopoverElement = menuPopoverElement;
        }, referenceElement: this.menuActionElement }, h("calcite-action-group", { layout: "vertical" }, actionMenuActions.map(({ text, fn, icon, ref }) => (h("calcite-action", { class: "discussions-post-action-menu-options", "data-action": text.toLowerCase(), id: 'discussions-post-action-menu-option-' + icon, key: icon, onClick: fn, ref: ref, scale: "m", text: text, "text-enabled": "true" }, h("calcite-icon", { class: "discussions-post-action-menu-options-icon", icon: icon, scale: "s" })))))), actionMenuActions.some(({ icon }) => icon === 'link') && (h("calcite-tooltip", { onCalciteTooltipBeforeOpen: this.handleCopyTooltipBeforeOpen, onCalciteTooltipClose: this.handleCopyTooltipClose, open: false, placement: "top", ref: el => {
          this.copyTooltipRef = el;
        }, referenceElement: this.copyActionRef }, h("span", null, intl.t('copied'))))));
    }
  }
  /**
   * Renders the post deleted notice
   */
  renderDeleted() {
    const { intl, deletedDuringSession, isReply, handleViewAllReplies } = this;
    if (!deletedDuringSession) {
      this.capturePostDeletedImpression();
    }
    return (h("calcite-notice", { kind: "danger", open: true, scale: "m" }, h("div", { slot: "title" }, intl.t(isReply ? 'deleted.title.reply' : 'deleted.title')), h("div", { slot: "message" }, intl.t(isReply ? 'deleted.message.reply' : 'deleted.message')), isReply && (h("calcite-link", { onClick: handleViewAllReplies, slot: "link" }, intl.t('delete.action')))));
  }
  /**
   * Renders the post hidden notice
   */
  renderHidden() {
    const { intl, isReply } = this;
    this.capturePostHiddenImpression();
    return (h("calcite-notice", { kind: "warning", open: true, scale: "m" }, h("div", { slot: "title" }, intl.t(isReply ? 'hidden.title.reply' : 'hidden.title')), h("div", { slot: "message" }, intl.t('hidden.message'))));
  }
  /**
   * Renders the skeleton loader
   */
  renderSkeleton() {
    return h("arcgis-hub-discussions-post-skeleton", null);
  }
  /**
   * Primary render method
   */
  render() {
    return (h(Host, { class: { loading: this._loading }, "data-element": "discussions-post", "data-view": this.view.render.name, style: this.styles }, this.view.render()));
  }
  /**
   * Renders the reply creator avatar and optionally the channel avatar
   */
  renderAvatars() {
    var _a;
    const { _context, isHub, parent, parentCreator, post, postCreator, postCreatorOrg, channel, channelGroups, intl, index, outOfContext } = this;
    const user = !postCreator && post ? { username: post.creator } : postCreator;
    const scale = outOfContext ? 'l' : 'm';
    let el = [
      h("calcite-avatar", { "full-name": user === null || user === void 0 ? void 0 : user.fullName, key: "creator", scale: scale, thumbnail: (user === null || user === void 0 ? void 0 : user.thumbnail) && getUserThumbnailUrl(_context.hubRequestOptions.portal, user, (_a = _context.hubRequestOptions.authentication) === null || _a === void 0 ? void 0 : _a.token), "user-id": user === null || user === void 0 ? void 0 : user.id, username: user === null || user === void 0 ? void 0 : user.username }),
    ];
    if (outOfContext) {
      el.push(h("calcite-avatar", { "full-name": getChannelName(channel, channelGroups, intl.t('unnamedChannel')), scale: "m" }));
    }
    if (parentCreator) {
      el = (h("arcgis-hub-discussions-popover", { channel: channel, channelGroups: channelGroups, index: index, isHub: isHub, parent: parent, parentCreator: parentCreator, post: post, postCreator: postCreator, postCreatorOrg: postCreatorOrg }, el));
    }
    return el;
  }
  /**
   * Renders the inline actions for a reply
   */
  renderActions() {
    const { intl, _context, channel, post, isHub } = this;
    const actions = [];
    if (isHub) {
      actions.push({
        text: intl.t('link'),
        onClick: this.handleCopyLink,
        ref: (element) => {
          this.copyActionRef = element;
        },
      });
    }
    if (_context.currentUser) {
      if (post.creator === _context.currentUser.username || canModifyPost(post, _context.currentUser, channel)) {
        actions.push({
          text: intl.t('edit'),
          onClick: this.handleEdit,
        });
      }
      if (canDeletePost(post, channel, _context.currentUser)) {
        actions.push({
          text: intl.t('delete'),
          onClick: this.handleDelete,
        });
      }
    }
    if (actions.length) {
      return (h("calcite-action-group", { layout: "horizontal" }, actions.map(action => (h("calcite-action", { appearance: action.appearance, "data-action": action.text.toLowerCase(), icon: action.icon, key: action.text || action.pin, onClick: action.onClick, onMouseOver: action.onMouseOver, ref: action.ref, scale: "s", text: action.text, "text-enabled": Boolean(action.text) }))), isHub && (h("calcite-tooltip", { onCalciteTooltipBeforeOpen: this.handleCopyTooltipBeforeOpen, onCalciteTooltipClose: this.handleCopyTooltipClose, open: false, placement: "top", ref: element => {
          this.copyTooltipRef = element;
        }, referenceElement: this.copyActionRef }, h("span", null, intl.t('copied'))))));
    }
  }
  /**
   * Render the reply out of context view
   */
  renderReplyOutOfContext() {
    const { intl, errorMessage, index, lead, lastIndex, articleClass, handleReplyOutOfContextReadMore } = this;
    index === undefined ? this.capturePostDeepLinkImpression() : this.capturePostListImpression();
    return (h("article", { class: {
        'out-of-context': true,
        'arcgis-hub-discussions-post-last': lead && index === lastIndex,
        [articleClass]: Boolean(articleClass),
      }, ref: this.handleSetComponentRef }, this.renderMetadata('block', false, true, false, true, true, true, true, false), h("div", { class: "reply-body" }, h("arcgis-multiline-ellipsis", { "collapse-enabled": true, "expand-enabled": true, "expand-icon": intl.direction === 'rtl' ? 'arrow-left' : 'arrow-right', innerHTML: this.postBody, lines: 4, onClick: handleReplyOutOfContextReadMore }), this.renderGeography(true, false), this.renderReactions(), h("footer", null, this.renderActions()), errorMessage && (h("calcite-notice", { closable: true, kind: "danger", open: true, scale: "s" }, h("div", { slot: "title" }, intl.t('error')), h("div", { slot: "message" }, intl.t(errorMessage)))))));
  }
  /**
   * Renders the post geography
   * @param toggleable Component `toggleable` property value
   * @param expandable Component `expandable` property value
   */
  renderGeography(toggleable, expandable) {
    const { hasMap, channel, channelId, parentId, displayFieldKey, displayFieldValid, entity, isMobile, locationDescriptionText, locationListIsDisabled, post, postId, showLocations } = this;
    if (showLocations) {
      return (h("arcgis-hub-discussions-post-geography", { channel: channel, channelId: channelId, disabled: locationListIsDisabled, displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, expandable: expandable, hasMap: hasMap, isMobile: isMobile, locationDescriptionText: locationDescriptionText, parentId: parentId, post: post, postId: postId, showLocationDescriptionText: !isMobile, toggleable: toggleable, url: entity === null || entity === void 0 ? void 0 : entity.url }));
    }
  }
  /**
   * Renders the reply view
   */
  renderReply() {
    const { intl, errorMessage, channel, post, articleClass, lead, index, lastIndex } = this;
    const classes = {
      'arcgis-hub-discussions-post-lead': lead,
      'arcgis-hub-discussions-post-last': lead && index === lastIndex,
    };
    if (articleClass) {
      classes[articleClass] = true;
    }
    index === undefined ? this.capturePostDeepLinkImpression() : this.capturePostListImpression();
    return (h("article", { class: classes, ref: this.handleSetComponentRef }, h("arcgis-hub-discussions-post-chips", { channel: channel, index: index, post: post }), this.renderAvatars(), h("div", null, this.renderMetadata('inline', false, false, false, false, false, false, false, true), h("arcgis-multiline-ellipsis", { "collapse-enabled": true, "expand-enabled": true, innerHTML: this.postBody, lines: 4 }), this.renderGeography(true, false), h("footer", null, this.renderReactions(), this.renderActions(), this.renderActionMenu()), errorMessage && (h("calcite-notice", { closable: true, kind: "danger", open: true, scale: "s" }, h("div", { slot: "title" }, intl.t('error')), h("div", { slot: "message" }, intl.t(errorMessage)))))));
  }
  static get is() { return "arcgis-hub-discussions-post"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-post.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-post.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
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
          "text": "An optional UUID string of an existing IPost to edit. If `postId`\nis provided but `post` is not, the IPost record will be fetched."
        },
        "attribute": "post-id",
        "reflect": true
      },
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
        "optional": false,
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
        "optional": false,
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
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional reference to an existing IPortal object representing the post author's\norganization. If not provided, the IPortal record will be fetched."
        }
      },
      "postError": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "RemoteServerError",
          "resolved": "RemoteServerError",
          "references": {
            "RemoteServerError": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional reference to a RemoteServerError related to the fetch request for the post"
        }
      },
      "postMentionedUsers": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IMentionedUserDetails[]",
          "resolved": "IMentionedUserDetails[]",
          "references": {
            "IMentionedUserDetails": {
              "location": "import",
              "path": "../../../../utils/discussions/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional reference to an IMentionedUserDetails array representing the mentioned users\nwithin the post body. If not provided, will be fetched."
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
          "text": "An optional UUID string of post's IChannel."
        },
        "attribute": "channel-id",
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
              "path": "@esri/hub-discussions"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional reference to an IChannel representing the channel the post was created within.\nIf not provided, will be fetched."
        }
      },
      "channelGroups": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IGroup[]",
          "resolved": "IGroup[]",
          "references": {
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
          "text": "An optional Array of IGroup objects representing a private IChannel groups. If `channelGroups` is\nnot provided, it will be fetched."
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
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional UUID string of a parent IPost. If `parentId` is provided\nbut `parent` is not, the IPost record for the parent will be fetched."
        },
        "attribute": "parent-id",
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
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional reference to a parent IPost. If `parentId`\nis provided, but `parent` is not, the IPost record will be fetched."
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
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional reference to an IUser representing the parent post author. If not\nprovided, the IUser record will be fetched."
        }
      },
      "parentCreatorOrg": {
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
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional reference to an IPortal representing the parent post author's org. If not\nprovided, the IPortal record will be fetched."
        }
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
          "text": "If this component is embedded in a Hub site"
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
          "text": "A Feature selected from a map"
        }
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
          "text": "A related Feature from a map"
        }
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
      "preview": {
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
          "text": "Truncates the post body text, adds Read More link that links to full thread"
        },
        "attribute": "preview",
        "reflect": false
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
          "text": "A URI string representing the subject entity of the discussion, e.g. `hub://content/1fc` or `hub://group/2fc`.\nWhen `entity`, `entityId`, and `entityType` are not provided, they will be fetched by parsing the URI."
        },
        "attribute": "discussion",
        "reflect": true
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
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional boolean indicating if the display field key configured by the layer is valid when entity is IHubContent"
        },
        "attribute": "display-field-valid",
        "reflect": false
      },
      "displayFieldValue": {
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
          "text": "An optional display field value as configured by the layer when entity is IHubContent. Will be fetched if not\nexplicitly provided."
        },
        "attribute": "display-field-value",
        "reflect": false
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
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional display field key as configured by the layer when entity is IHubContent. Will be fetched if not\nexplicitly provided."
        },
        "attribute": "display-field-key",
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
      "locationId": {
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
          "text": "A UUID string representing a feature ID on the map that is the target of the discussion"
        },
        "attribute": "location-id",
        "reflect": false
      },
      "lead": {
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
          "text": "Render the lead line"
        },
        "attribute": "lead",
        "reflect": false
      },
      "lastIndex": {
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
          "text": "The last index number when the post is rendered within a list"
        },
        "attribute": "last-index",
        "reflect": false
      },
      "loading": {
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
          "text": "Renders skeleton state when true"
        },
        "attribute": "loading",
        "reflect": true
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
          "text": "Controls whether the Add Location button and arcgis-hub-discussions-post-geography component render in the post-editor"
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
      "locationDescriptionText": {
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
          "text": "An alternative location description string"
        },
        "attribute": "location-description-text",
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
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "minHeight": {},
      "popoverIsOpen": {},
      "articleClass": {},
      "editorClass": {},
      "renderedEl": {},
      "editing": {},
      "errorMessage": {},
      "intl": {},
      "isCopied": {},
      "_loading": {}
    };
  }
  static get events() {
    return [{
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
        "method": "arcgisHubDiscussionsPostDelete",
        "name": "arcgisHubDiscussionsPostDelete",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when an orignal post is deleted"
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
        "method": "arcgisHubDiscussionsPostSelect",
        "name": "arcgisHubDiscussionsPostSelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user elects to traverse to the full thread view\nby clicking Read More link or the num replies action"
        },
        "complexType": {
          "original": "IPostSelectDetails",
          "resolved": "IPostSelectDetails",
          "references": {
            "IPostSelectDetails": {
              "location": "import",
              "path": "../../../../utils/discussions/types"
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
          "text": "Emitted when the arcgisHubDiscussionsPostCancel event is handled"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
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
          "text": "Emitted when the arcgisHubDiscussionsPostCancel event is handled"
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
      }, {
        "method": "arcgisHubDiscussionsPostReady",
        "name": "arcgisHubDiscussionsPostReady",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the post's dependencies have been fetched"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "renderedEl",
        "methodName": "handleRenderedElChange"
      }, {
        "propName": "_context",
        "methodName": "handleContextChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisHubDiscussionsPostViewAllGeography",
        "method": "handlePostViewAllGeography",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisMultilineEllipsisExpand",
        "method": "handleMultilineEllipsisExpanded",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "calcitePopoverOpen",
        "method": "handleCalcitePopoverOpen",
        "target": "body",
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsPostReactionChange",
        "method": "handleReactionChanged",
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
        "method": "handlePostCreatedOrDeleted",
        "target": "body",
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsPostDelete",
        "method": "handlePostCreatedOrDeleted",
        "target": "body",
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsPostEdit",
        "method": "handlePostEditedBody",
        "target": "body",
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionsPostEdit",
        "method": "handlePostEdited",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionPopoverBeforeOpen",
        "method": "handlePopoverOpen",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubDiscussionPopoverClose",
        "method": "handlePopoverClose",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  MinPromiseDelay({ delay: 300 })
], ArcgisHubDiscussionsPost.prototype, "fetchDependencies", null);
__decorate([
  Memoize('post.body', 'post.status'),
  AutoLink({
    ignoreTags: ['calcite-link'],
    replaceExisting: true,
    tagName: 'calcite-link',
  }),
  MentionPopoverTransform(),
  HighlightBlockedWords('postBody', 'sc-arcgis-hub-discussions-post blocked'),
  Sanitize({
    filterOptions: {
      whiteList: {
        'calcite-link': ['href', 'data-mention'],
      },
    },
    extendDefaults: true,
  })
], ArcgisHubDiscussionsPost.prototype, "postBody", null);
__decorate([
  Memoize('post.title', 'post.status'),
  HighlightBlockedWords('postTitle', 'sc-arcgis-hub-discussions-post blocked'),
  Sanitize()
], ArcgisHubDiscussionsPost.prototype, "postTitle", null);
__decorate([
  CallOnce()
], ArcgisHubDiscussionsPost.prototype, "capturePostDeepLinkImpression", null);
__decorate([
  CallOnce()
], ArcgisHubDiscussionsPost.prototype, "capturePostListImpression", null);
__decorate([
  CallOnce()
], ArcgisHubDiscussionsPost.prototype, "capturePostDeletedImpression", null);
__decorate([
  CallOnce()
], ArcgisHubDiscussionsPost.prototype, "capturePostHiddenImpression", null);
