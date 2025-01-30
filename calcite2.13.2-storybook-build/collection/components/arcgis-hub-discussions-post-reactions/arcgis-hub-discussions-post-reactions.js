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
var __rest = (this && this.__rest) || function (s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
import { Host, h, Fragment } from '@stencil/core';
import { getUserThumbnailUrl } from '@esri/hub-common';
import { createReaction, removeReaction, fetchPost, PostRelation } from '@esri/hub-discussions';
import intlManager from '../../utils/intl-manager';
import { DEFAULT_REACTIONS, ALL_REACTIONS, REACTIONS_MAP } from './resources';
import { bind } from '../../utils/context';
import { fetchMemberFromCache } from '../../utils/users';
import MinPromiseDelay from '../../decorators/min-promise-delay';
import { dictionary, constants as telemetryConstants } from '@esri/telemetry-dictionary-hub';
import { connectContext, getGlobalContext } from '../../utils/state';
const byTimestamp = (a, b) => {
  const aDate = new Date(a.createdAt);
  const bDate = new Date(b.createdAt);
  if (aDate > bDate) {
    return -1;
  }
  else if (aDate < bDate) {
    return 1;
  }
  else {
    return 0;
  }
};
const byCount = (reactionRecordGroups) => (a, b) => {
  if (reactionRecordGroups[a.value].length > reactionRecordGroups[b.value].length) {
    return 1;
  }
  else if (reactionRecordGroups[a.value].length < reactionRecordGroups[b.value].length) {
    return -1;
  }
  else {
    return 0;
  }
};
/**
 * A component that allows for adding & removing reactions from a Discussions post or reply.
 *
 * Example 1: Invoking when you already have a `channel` and `post` reference.
 *   <arcgis-hub-discussions-post-reactions
 *     channel={channel}
 *     post={post}
 *   />
 *
 * Example 2: Invoking when you only have a post ID
 *   <arcgis-hub-discussions-post-reactions
 *     post-id="<POST_ID>"
 *   />
 */
export class ArcgisHubDiscussionsPostReactions {
  /**
   * Pre-binds context to methods that get passed as references/callbacks.
   * @constructor
   */
  constructor() {
    /**
     * A map of calcite-button refs for each of the reactions that have been submitted by users
     */
    this.reactionListButtons = {};
    this.postId = undefined;
    this.post = undefined;
    this.channel = undefined;
    this._context = getGlobalContext();
    this.showAllReactions = false;
    this.activePopover = null;
    this.pending = false;
    this.users = {};
    bind(this, 'handleAddReactionClick', 'handleViewAllReactionsClick', 'handleAddReactionPopoverClose', 'handleReactionFocus', 'handleReactionMouseEnter', 'handleReactionPopoverClose', 'handleReactionClicked', 'handleReactionPopoverOpen', 'handleReactionRef', 'deleteUserReaction', 'handleReactionPopoverBeforeOpen');
  }
  /**
   * Fetches updated `post` and `channel` records when the `postId` changes
   */
  async handlePostIdChanged(postId, prevPostId) {
    await this.fetchPostDetails(postId, prevPostId);
  }
  /**
   * Resets the user cache when the context changes
   * @param context An instance of the IArcGISContext class
   * @param prevContext An instance of the IArcGISContext class
   */
  handleContextChanged(context, prevContext) {
    var _a, _b;
    if (((_a = context.currentUser) === null || _a === void 0 ? void 0 : _a.username) !== ((_b = prevContext.currentUser) === null || _b === void 0 ? void 0 : _b.username)) {
      this.users = {};
    }
  }
  /**
   * Listens for `calcitePopoverOpen` events on the `body` element. Closes this component's popovers when any other
   * calcite-popover is opened within the DOM.
   * @param evt A `calcitePopoverOpen` event
   */
  handlePopoverOpen(evt) {
    if (evt.target !== this.element) {
      this.activePopover = null;
    }
  }
  /**
   * Component pre-load setup. Loads translations and post & channel, if necessary
   * @returns Promise that resolves void
   */
  async componentWillLoad() {
    const [intl] = await Promise.all([intlManager.loadIntlForComponent(this.element), this.handlePostIdChanged(this.postId)]);
    this.intl = intl;
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  /**
   * Computes if the component is considered disabled based on user session, channel setting,
   * and pending state
   * @returns boolean
   */
  get isDisabled() {
    const { _context, channel, pending } = this;
    return [!_context.currentUser, !channel.allowReaction, pending].some(val => Boolean(val));
  }
  /**
   * Computes a collection of reaction records to be rendered in the overflow popover
   */
  get overflowReactionRecords() {
    const { listReactions, reactionRecordGroups } = this;
    const toOverflowReactionRecords = (acc, [reaction, reactionRecords]) => listReactions.find(reactionRecord => reactionRecord.value === reaction) ? acc : [...acc, ...reactionRecords];
    return Object.entries(reactionRecordGroups).reduce(toOverflowReactionRecords, []).sort(byTimestamp);
  }
  /**
   * Computes a collection of reaction records submitted by the currently authenticated user, sorted by total reaction count
   */
  get currentUserReactions() {
    const { _context, reactionRecordGroups } = this;
    return Object.values(reactionRecordGroups)
      .reduce((acc, userReactions) => [...acc, ...userReactions.filter(userReaction => { var _a; return userReaction.creator === ((_a = _context.currentUser) === null || _a === void 0 ? void 0 : _a.username); })], [])
      .sort(byCount(reactionRecordGroups));
  }
  /**
   * Computes a collection of reaction records submitted by other users, sorted by total reaction count
   */
  get otherUserReactions() {
    const { reactionRecordGroups, currentUserReactions } = this;
    const allUserReactions = Object.values(reactionRecordGroups).reduce((acc, reactionRecords) => [...acc, ...reactionRecords], []);
    return allUserReactions
      .reduce((acc, userReaction) => {
      const userRecord = currentUserReactions.find(r => r.value === userReaction.value);
      if (userRecord) {
        return acc;
      }
      return acc.find(r => r.value === userReaction.value) ? acc : [...acc, userReaction];
    }, [])
      .sort(byCount(reactionRecordGroups));
  }
  /**
   * Computes a collection of reaction records used to render the submitted reactions list
   */
  get listReactions() {
    const { currentUserReactions, otherUserReactions, reactionRecordGroups } = this;
    const allReactions = [...otherUserReactions, ...currentUserReactions];
    const maxReactions = Object.keys(reactionRecordGroups).length > 4 ? 3 : 4;
    let start;
    let end;
    if (allReactions.length > maxReactions) {
      start = allReactions.length - maxReactions;
      end = allReactions.length;
    }
    else {
      start = 0;
      end = allReactions.length;
    }
    return allReactions.slice(start, end);
  }
  /**
   * Computes a map of reaction/reaction record groups, records sorted by timestamp
   */
  get reactionRecordGroups() {
    const { post: { reactions }, } = this;
    const toReactionRecordGroups = (acc, userReaction) => ALL_REACTIONS.includes(userReaction.value)
      ? Object.assign(Object.assign({}, acc), { [userReaction.value]: [...(acc[userReaction.value] || []), userReaction] }) : acc;
    return [...reactions].sort(byTimestamp).reduce(toReactionRecordGroups, {});
  }
  /**
   * Conditionally fetches the `post` with `reactions` and `channel` when the `postId` is truthy
   * and does not match the `prevPostId`.
   * @param postId A post ID
   * @param prevPostId The previous post ID value
   */
  async fetchPostDetails(postId, prevPostId) {
    const { _context } = this;
    if (postId && postId !== prevPostId) {
      const _a = await fetchPost(Object.assign({ postId, data: { relations: [PostRelation.CHANNEL, PostRelation.REACTIONS, PostRelation.REPLIES] } }, _context.hubRequestOptions)), { channel } = _a, post = __rest(_a, ["channel"]);
      post.channelId = channel.id;
      post.replyCount = post.replies.total;
      delete post.replies;
      this.channel = channel;
      this.post = post;
    }
  }
  /**
   * Handles clicks to the add reaction button. Opens the add reaction picker popover
   * @param evt A MouseEvent
   */
  handleAddReactionClick(evt) {
    const { dataset: { reaction }, } = evt.target;
    const { post, channel } = this;
    this.activePopover = reaction;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.interaction.action.open.label.popover.details.addReaction), { postId: post.id, parentId: post.parentId, channelId: channel.id, channelAccess: channel.access }));
  }
  /**
   * Handles clicks to the view all reactions button inside the add reaction popover.
   * Shows the full collection of available reactions.
   */
  handleViewAllReactionsClick() {
    this.showAllReactions = true;
  }
  /**
   * Handles calcitePopoverClose events emitted from the add reaction popover.
   * Resets state so default reactions render inside the add reaction popover
   * next time vs full collection
   */
  handleAddReactionPopoverClose() {
    this.showAllReactions = false;
    this.activePopover = null;
  }
  /**
   * Handles focus events emitted from the reaction count and overflow buttons,
   * opens the appropriate popover
   * @param evt A FocusEvent
   */
  handleReactionFocus(evt) {
    const { dataset: { reaction }, } = evt.target;
    this.activePopover = reaction;
  }
  /**
   * Handles mouse enter events emitted from the reaction count and overflow buttons,
   * opens the appropriate popover. Filters out events emitted by mousing over elements
   * nested within the button to prevent janky popover behavior.
   * @param evt A MouseEvent
   */
  handleReactionMouseEnter(evt) {
    const target = evt.target;
    const { nodeName, dataset: { reaction }, } = target;
    if (nodeName === 'CALCITE-BUTTON' && this.activePopover !== 'add') {
      this.activePopover = reaction;
    }
  }
  /**
   * Handles calcitePopoverClose events, conditionally resets activePopover state
   * when no other popovers are open so the most recently opened popover can be
   * reopened
   * @param evt
   */
  handleReactionPopoverClose(evt) {
    const { dataset: { reaction }, } = evt.target;
    if (this.activePopover === reaction) {
      this.activePopover = null;
    }
  }
  /**
   * Handles calcitePopoverBeforeOpen events emitted by popovers that contain user
   * details. Fetches only the necessary user records to render the popover, caching
   * the results to avoid duplicate requests for other popovers
   * @param evt A CalcitePopoverCustomEvent<void> event
   */
  async handleReactionPopoverBeforeOpen(evt) {
    const { reaction } = evt.target.dataset;
    const fetchedUsers = await this.fetchUserRecords(reaction);
    this.users = Object.assign(Object.assign({}, this.users), fetchedUsers);
  }
  /**
   * Handles clicks to the reaction count buttons and reaction buttons from the
   * add reactions popover. If the user has not previously created a reaction
   * for the post, a new reaction will be created for the post. If the user has
   * previously created the reaction that was clicked, that reaction will be
   * deleted. If the user created one or more reactions other than what was
   * clicked, the previously existing reactions will be deleted before creating
   * the a the reaction
   * @param evt A MouseEvent
   */
  async handleReactionClicked(evt) {
    const { currentUserReactions, arcgisHubDiscussionsPostReactionChange, activePopover } = this;
    const { dataset: { reaction }, } = evt.currentTarget;
    const existing = currentUserReactions.find(({ value }) => value === reaction);
    this.pending = true;
    try {
      await Promise.all(currentUserReactions.map(this.deleteUserReaction));
      if (!existing) {
        await this.createReaction(reaction);
      }
      if (activePopover === 'add') {
        this.activePopover = null;
      }
      if (this.activePopover) {
        const fetchedUsers = await this.fetchUserRecords(reaction);
        this.users = Object.assign(Object.assign({}, this.users), fetchedUsers);
      }
    }
    catch (e) {
      // suppress, leave popover open if an error occurs
    }
    finally {
      // emit regardless of success/fail b/c some reactions
      // may have been removed
      arcgisHubDiscussionsPostReactionChange.emit();
      this.pending = false;
    }
  }
  /**
   * Handles calcitePopoverOpen events emitted by popovers for reaction count and overflow
   * buttons.
   * @param evt A CalcitePopoverCustomEvent event
   */
  handleReactionPopoverOpen(evt) {
    const { channel, post } = this;
    const { dataset: { reaction }, } = evt.target;
    const payload = reaction === 'overflow'
      ? dictionary.category.interaction.action.open.label.popover.details.reactionOverflow
      : dictionary.category.interaction.action.open.label.popover.details[REACTIONS_MAP[reaction].telemetryKey];
    this.hubTelemetry.emit(Object.assign(Object.assign({}, payload), { postId: post.id, parentId: post.parentId, channelId: channel.id, channelAccess: channel.access }));
  }
  /**
   * Receives a reference to all reaction buttons in the add reaction popover's
   * expanded view of all reactions. Sets initial focus to the first button rendered
   * when the full collection of reactions renders
   * @param button
   */
  async handleReactionRef(button) {
    var _a;
    if (+((_a = button === null || button === void 0 ? void 0 : button.dataset) === null || _a === void 0 ? void 0 : _a.index) === 0) {
      await button.setFocus();
    }
  }
  /**
   * Builds an array of usernames to fetch, then fetches those user records
   * and updates the users cache
   * @returns A promise
   */
  async fetchUserRecords(reaction) {
    const { reactionRecordGroups, overflowReactionRecords, users } = this;
    const userReactions = reaction === 'overflow' ? overflowReactionRecords : reactionRecordGroups[reaction];
    const usersToFetch = userReactions.reduce((acc, userReaction) => (users[userReaction.creator] ? acc : [...acc, userReaction.creator]), []);
    if (usersToFetch.length) {
      const userPromises = usersToFetch.reduce((acc, username) => [...acc, this.fetchUserRecord(username)], []);
      const results = await Promise.all(userPromises);
      return results.reduce((acc, result, idx) => (Object.assign(Object.assign({}, acc), { [usersToFetch[idx]]: result })), {});
    }
  }
  /**
   * Fetches a user record for the given username. Imposes a 300ms artificial delay
   * so skeleton state can be observed
   * @param username The username whose record to fetch
   * @returns A promise that resolves an IUser or null
   */
  async fetchUserRecord(username) {
    return fetchMemberFromCache(username, this._context.hubRequestOptions).catch(_ => null);
  }
  /**
   * Creates a reaction record for the current reaction and logs
   * telemetry
   * @param reaction The reaction to create
   */
  async createReaction(reaction) {
    const { _context, post, channel } = this;
    try {
      const result = await createReaction(Object.assign({ data: {
          postId: post.id,
          value: reaction,
        } }, _context.hubRequestOptions));
      this.post = Object.assign(Object.assign({}, this.post), { reactions: [...this.post.reactions, result] });
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.create.label.reaction.details[REACTIONS_MAP[reaction].telemetryKey]), { postId: post.id, parentId: post.id, channelId: channel.id, channelAccess: channel.access, response: telemetryConstants.response.SUCCESS }));
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.create.label.reaction.details[REACTIONS_MAP[reaction].telemetryKey]), { postId: post.id, parentId: post.id, channelId: channel.id, channelAccess: channel.access, response: telemetryConstants.response.FAILURE }));
      console.error('Failed to create reaction:', reaction, e.message);
      throw e;
    }
  }
  /**
   * Deletes a reaction record for the current reaction and logs
   * telemetry
   * @param reaction The reaction to create
   */
  async deleteUserReaction(userReaction) {
    const { _context, post, channel, currentUserReactions } = this;
    try {
      await removeReaction(Object.assign({ reactionId: userReaction.id }, _context.hubRequestOptions));
      this.post = Object.assign(Object.assign({}, post), { reactions: post.reactions.filter(({ id }) => !currentUserReactions.find(reactionToRemove => reactionToRemove.id === id)) });
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.delete.label.reaction.details[REACTIONS_MAP[userReaction.value].telemetryKey]), { postId: post.id, parentId: post.id, channelId: channel.id, channelAccess: channel.access, response: telemetryConstants.response.SUCCESS }));
    }
    catch (e) {
      console.error('Failed to delete reaction:', userReaction.value, userReaction.id, e.message);
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.delete.label.reaction.details[REACTIONS_MAP[userReaction.value].telemetryKey]), { postId: post.id, parentId: post.id, channelId: channel.id, channelAccess: channel.access, response: telemetryConstants.response.FAILURE }));
      throw e;
    }
  }
  /**
   * Renders a list containing reaction count buttons and popovers
   * @returns a list element
   */
  renderList() {
    const { listReactions, reactionRecordGroups, intl, _context, activePopover, isDisabled, handleReactionPopoverClose, handleReactionPopoverOpen } = this;
    return (h("ul", { class: "submitted_reactions_list" }, listReactions.reduce((acc, reactionRecord) => {
      var _a;
      const isCurrentUserReaction = reactionRecord.creator === ((_a = _context.currentUser) === null || _a === void 0 ? void 0 : _a.username);
      const count = reactionRecordGroups[reactionRecord.value].length > 99 ? intl.t('reaction_count_99_plus') : reactionRecordGroups[reactionRecord.value].length;
      return [
        ...acc,
        h("li", { key: reactionRecord.value }, h("calcite-button", { appearance: "outline", "aria-checked": isCurrentUserReaction ? 'true' : 'false', "data-reaction": reactionRecord.value, disabled: isDisabled, kind: isCurrentUserReaction ? 'brand' : 'neutral', label: intl.t(isCurrentUserReaction ? 'reaction_list_label_remove' : 'reaction_list_label_add', {
            reaction: intl.t(reactionRecord.value),
            count,
          }), onClick: this.handleReactionClicked, onFocus: this.handleReactionFocus, onMouseEnter: this.handleReactionMouseEnter, ref: (reactionButton) => {
            this.reactionListButtons = Object.assign(Object.assign({}, this.reactionListButtons), { [reactionRecord.value]: reactionButton });
          }, role: "radio", round: true, scale: "m" }, REACTIONS_MAP[reactionRecord.value].emoji, h("span", null, count)), h("calcite-popover", { "auto-close": true, class: "user_reactions_popover", "data-reaction": reactionRecord.value, "focus-trap-disabled": true, heading: intl.t(reactionRecord.value), label: intl.t(reactionRecord.value), onCalcitePopoverBeforeOpen: this.handleReactionPopoverBeforeOpen, onCalcitePopoverClose: handleReactionPopoverClose, onCalcitePopoverOpen: handleReactionPopoverOpen, open: activePopover === reactionRecord.value, overlayPositioning: "fixed", placement: "bottom", referenceElement: this.reactionListButtons[reactionRecord.value], "trigger-disabled": true }, this.renderUserReactions(reactionRecordGroups[reactionRecord.value], false))),
      ];
    }, [])));
  }
  /**
   * Renders a user reaction skeleton state
   * @param showEmoji
   * @returns A skeleton loader element
   */
  renderUserSkeleton(showEmoji) {
    return (h("arcgis-skeleton-loader", { active: true, role: "listitem", rows: 0, showFooter: false, showHeading: false, showThumbnail: false }, h("div", null), h("div", null, h("div", null, "\u00A0")), showEmoji && (h("div", null, h("div", null, "\u00A0"))), h("div", null, h("div", null, "\u00A0"))));
  }
  /**
   * Renders a user reaction item
   * @param userReaction An IReaction to render
   * @param showEmoji If the emoji should render
   * @returns a list item
   */
  renderUserReaction(userReaction, showEmoji) {
    var _a;
    const { users, _context, intl } = this;
    const user = users[userReaction.creator];
    const fullName = (user === null || user === void 0 ? void 0 : user.fullName) || intl.t('privateUser');
    return (h("li", { "aria-label": intl.t('reaction_user_label', {
        userFullName: fullName,
        reaction: intl.t(userReaction.value),
      }), class: "user_reaction_item" }, h("calcite-avatar", { "full-name": user === null || user === void 0 ? void 0 : user.fullName, scale: "l", thumbnail: (user === null || user === void 0 ? void 0 : user.thumbnail) &&
        getUserThumbnailUrl(_context.hubRequestOptions.portal, {
          username: user.username,
          access: user.access,
          thumbnail: user.thumbnail,
        }, (_a = _context.hubRequestOptions.authentication) === null || _a === void 0 ? void 0 : _a.token), "user-id": user === null || user === void 0 ? void 0 : user.id, username: user === null || user === void 0 ? void 0 : user.username }), h("div", null, fullName), showEmoji && h("div", null, REACTIONS_MAP[userReaction.value].emoji), h("div", null, (user === null || user === void 0 ? void 0 : user.username) || intl.t('noUser'))));
  }
  /**
   * Renders a list of user reactions
   * @param userReactions The user reactions to render
   * @param showEmoji If the emoji should render
   * @returns a list item
   */
  renderUserReactions(userReactions, showEmoji) {
    const { users } = this;
    return (h("ul", { class: "user_reactions_list" }, userReactions.map(userReaction => (users[userReaction.creator] === undefined ? this.renderUserSkeleton(showEmoji) : this.renderUserReaction(userReaction, showEmoji)))));
  }
  /**
   * Renders the overflow button and popover
   * @returns a fragment
   */
  renderOverflow() {
    const { intl, overflowReactionRecords, handleReactionPopoverClose, handleReactionPopoverOpen, activePopover, isDisabled, overflowButton } = this;
    const count = overflowReactionRecords.length > 99 ? intl.t('reaction_count_99_plus') : intl.formatNumber(overflowReactionRecords.length, { signDisplay: 'always' });
    return (Boolean(overflowReactionRecords.length) && (h(Fragment, null, h("calcite-button", { appearance: "outline", "data-reaction": "overflow", disabled: isDisabled, kind: "neutral", label: intl.t(overflowReactionRecords.length > 1 ? 'n_more_reactions' : 'one_more_reaction', { count }), onFocus: this.handleReactionFocus, onMouseOver: this.handleReactionMouseEnter, ref: (overflowButton) => {
        this.overflowButton = overflowButton;
      }, round: true, scale: "m" }, count), h("calcite-popover", { "auto-close": true, class: "user_reactions_popover", "data-reaction": "overflow", "focus-trap-disabled": true, heading: intl.t('moreReactions'), label: intl.t('moreReactions'), onCalcitePopoverBeforeOpen: this.handleReactionPopoverBeforeOpen, onCalcitePopoverClose: handleReactionPopoverClose, onCalcitePopoverOpen: handleReactionPopoverOpen, open: activePopover === 'overflow', overlayPositioning: "fixed", placement: "bottom", referenceElement: overflowButton, "trigger-disabled": true }, this.renderUserReactions(overflowReactionRecords, true)))));
  }
  /**
   * Renders a list of the "default" reactions that initially render
   * in the add reaction popover
   * @returns a div
   */
  renderDefaultReactions() {
    const { currentUserReactions, intl, isDisabled } = this;
    return (h("div", { class: "default_reactions" }, h("ul", null, DEFAULT_REACTIONS.map(reaction => {
      const isCurrentUserReaction = currentUserReactions.find(currentUserReaction => currentUserReaction.value === reaction);
      return (h("li", { key: reaction }, h("calcite-button", { appearance: isCurrentUserReaction ? 'outline' : 'transparent', "aria-checked": isCurrentUserReaction ? 'true' : 'false', "data-reaction": reaction, disabled: isDisabled, kind: isCurrentUserReaction ? 'brand' : 'neutral', label: intl.t(isCurrentUserReaction ? 'reaction_picker_label_remove' : 'reaction_picker_label_add', { reaction: intl.t(reaction) }), onClick: this.handleReactionClicked, role: "radio", round: true, scale: "m" }, REACTIONS_MAP[reaction].emoji)));
    })), h("calcite-button", { appearance: "transparent", disabled: isDisabled, "icon-start": "plus", kind: "neutral", label: intl.t('viewAllReactions'), onClick: this.handleViewAllReactionsClick, round: true, scale: "m" })));
  }
  /**
   * Renders a list of all available reactions to be displayed in the
   * add reaction popover
   * @returns a list
   */
  renderAllReactions() {
    const { intl, currentUserReactions, isDisabled, handleReactionClicked, handleReactionRef } = this;
    return (h("ul", { class: "all_reactions_list" }, ALL_REACTIONS.map((reaction, idx) => {
      const isCurrentUserReaction = currentUserReactions.find(currentUserReaction => currentUserReaction.value === reaction);
      return (h("li", { key: reaction }, h("calcite-button", { appearance: isCurrentUserReaction ? 'outline' : 'transparent', "aria-checked": isCurrentUserReaction ? 'true' : 'false', "data-index": idx, "data-reaction": reaction, disabled: isDisabled, kind: isCurrentUserReaction ? 'brand' : 'neutral', label: intl.t(isCurrentUserReaction ? 'reaction_picker_label_remove' : 'reaction_picker_label_add', { reaction: intl.t(reaction) }), onClick: handleReactionClicked, ref: handleReactionRef, round: true, scale: "m" }, REACTIONS_MAP[reaction].emoji)));
    })));
  }
  /**
   * Renders the add reaction button and popover
   * @returns a fragment
   */
  renderAddReaction() {
    const { intl, handleAddReactionClick, handleAddReactionPopoverClose, isDisabled, activePopover, showAllReactions, addReactionButton } = this;
    return (h(Fragment, null, h("calcite-button", { appearance: "outline", "data-reaction": "add", disabled: isDisabled, "icon-start": "add-reaction", kind: activePopover === 'add' ? 'brand' : 'neutral', label: intl.t('addReaction'), onClick: handleAddReactionClick, ref: (addReactionButton) => {
        this.addReactionButton = addReactionButton;
      }, round: true, scale: "m" }), h("calcite-popover", { "auto-close": true, "data-reaction": "add", label: intl.t('addReaction'), onCalcitePopoverClose: handleAddReactionPopoverClose, open: activePopover === 'add', overlayPositioning: "fixed", placement: "bottom", referenceElement: addReactionButton, scale: "m" }, showAllReactions ? this.renderAllReactions() : this.renderDefaultReactions())));
  }
  /**
   * Primary render method
   * @returns host element
   */
  render() {
    return (h(Host, { class: { rtl: this.intl.direction === 'rtl' }, "data-element": "arcgis-hub-discussions-post-reactions" }, h("div", null, this.renderList(), this.renderOverflow(), this.renderAddReaction())));
  }
  static get is() { return "arcgis-hub-discussions-post-reactions"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-post-reactions.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-post-reactions.css"]
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
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional post ID string. If not provided, the `post` and `channel` must be provided"
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
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional IPost object. Must be provided if `postId` is not."
        }
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
        "optional": true,
        "docs": {
          "tags": [],
          "text": "An optional IChannel object. Must be provided if `postId` is not."
        }
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "showAllReactions": {},
      "activePopover": {},
      "pending": {},
      "users": {}
    };
  }
  static get events() {
    return [{
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "An event to emit telemetry events"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "arcgisHubDiscussionsPostReactionChange",
        "name": "arcgisHubDiscussionsPostReactionChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when a reaction is created or deleted"
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
        "propName": "postId",
        "methodName": "handlePostIdChanged"
      }, {
        "propName": "_context",
        "methodName": "handleContextChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "calcitePopoverOpen",
        "method": "handlePopoverOpen",
        "target": "body",
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  MinPromiseDelay({ delay: 300 })
], ArcgisHubDiscussionsPostReactions.prototype, "fetchUserRecord", null);
