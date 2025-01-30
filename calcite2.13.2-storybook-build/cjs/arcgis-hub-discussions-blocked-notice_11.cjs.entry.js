'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const index$1 = require('./index-6f16fe65.js');
const fetchParentUserDetails = require('./fetch-parent-user-details-712bd20a.js');
const discussions = require('./discussions-09889d00.js');
const state = require('./state-6637df8c.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const utils = require('./utils-7f390376.js');
const string = require('./string-df2d8a2a.js');
const sanitize = require('./sanitize-3071ecd6.js');
const callOnce = require('./call-once-9214659c.js');
const fetchChannelDetails = require('./fetch-channel-details-c2fee138.js');
const fetchEntityDetails = require('./fetch-entity-details-07098f5a.js');
const portal = require('./portal-4f46908f.js');
const minPromiseDelay = require('./min-promise-delay-d4270b44.js');
const memoize = require('./memoize-1f967971.js');
const channelPermission = require('./channel-permission-d8b16f02.js');
const dateTime = require('./date-time-7a41551c.js');
const teams = require('./teams-d12190bc.js');
const callWhen = require('./call-when-7ec85145.js');
const channels = require('./channels-bf478342.js');
const util = require('./util-38e73510.js');
const channels$1 = require('./channels-b4910298.js');
const discussionsApiRequest = require('./discussions-api-request-e9e6e346.js');
const resizeObserver = require('./resize-observer-4169a5e0.js');
const debounce = require('./debounce-bd990e9f.js');
const calcite = require('./calcite-fbbfefaf.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./cache-4d33af79.js');
require('./get-user-5eecc1c4.js');
require('./tslib.es6-e7faa7f3.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./request-67da3c71.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./get-prop-4bd8fc1a.js');
require('./helpers-64227739.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./download-list-00ce3845.js');
require('./index-77618030.js');
require('./store-2a385ca0.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./fetchContent-963f3885.js');
require('./tslib.es6-b6cfa7d7.js');
require('./_enrichments-a40a3850.js');
require('./get-with-default-d1b1754d.js');
require('./get-0368c931.js');
require('./append-custom-params-0f5d0fe2.js');
require('./OperationError-902f34ae.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./slugs-8f743e2c.js');
require('./is-guid-b5c2b74c.js');
require('./request-79b61e92.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');
require('./tslib.es6-846f687c.js');
require('./update-b8977041.js');
require('./get-52661c13.js');
require('./update-7b2b2d9d.js');
require('./slugs-9d179f70.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./generate-random-string-8807d629.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./Metrics-b8657153.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');

/**
 * create reaction to post
 *
 * @export
 * @param {ICreateReactionOptions} options
 * @return {*}  {Promise<IReaction>}
 */
function createReaction(options) {
    options.httpMethod = "POST";
    return discussionsApiRequest.discussionsApiRequest(`/reactions`, options);
}
/**
 * remove reaction
 *
 * @export
 * @param {IRemoveReactionOptions} options
 * @return {*}  {Promise<IRemoveReactionResponse>}
 */
function removeReaction(options) {
    const { reactionId } = options;
    options.httpMethod = "DELETE";
    return discussionsApiRequest.discussionsApiRequest(`/reactions/${reactionId}`, options);
}

const MENTION_ATTRIBUTE$1 = "data-mention";

/**
 * @internal
 * @hidden
 */
function hasOrgAdminUpdateRights(user = {}, orgId) {
    return (channelPermission.isOrgAdminInOrg(user, orgId) ||
        (channelPermission.isUserInOrg(user, orgId) &&
            channelPermission.userHasPrivileges(user, [
                "portal:admin:viewItems",
                "portal:admin:updateItems",
            ])));
}

/**
 * Utility to determine if User has privileges to delete a post
 * @param post
 * @param user
 * @param channel
 * @returns {boolean}
 */
function canDeletePost(post, channel, user = {}) {
    return isPostCreator$1(post, user) || isChannelModerator(channel, user);
}
function isPostCreator$1(post, user) {
    return !!user.username && post.creator === user.username;
}
function isChannelModerator(channel, user) {
    if (hasOrgAdminUpdateRights(user, channel.orgId)) {
        return true;
    }
    if (!channel.channelAcl) {
        return false;
    }
    const channelPermission$1 = new channelPermission.ChannelPermission(channel);
    return channelPermission$1.canModerateChannel(user);
}

const ADMIN_GROUP_ROLES = Object.freeze(["owner", "admin"]);
/**
 * Utility to determine if User has privileges to modify the status of a post
 * @deprecated use `canEditPostStatus` instead
 * @param channel
 * @param user
 * @returns {boolean}
 */
function canModifyPostStatus(channel, user = {}) {
    return canEditPostStatus(channel, user);
}
/**
 * Utility to determine if User has privileges to modify the status of a post
 * @param channel
 * @param user
 * @returns {boolean}
 */
function canEditPostStatus(channel, user = {}) {
    if (hasOrgAdminUpdateRights(user, channel.orgId)) {
        return true;
    }
    if (channel.channelAcl) {
        const channelPermission$1 = new channelPermission.ChannelPermission(channel);
        return channelPermission$1.canModerateChannel(user);
    }
    return isAuthorizedToModifyStatusByLegacyPermissions(user, channel);
}
function isAuthorizedToModifyStatusByLegacyPermissions(user, channel) {
    const { username, groups: userGroups = [] } = user;
    const { access, groups: channelGroups = [], orgs: channelOrgs = [], creator: channelCreator, } = channel;
    if (!username) {
        return false;
    }
    if (channelCreator === username) {
        return true;
    }
    if (access === utils.SharingAccess.PRIVATE) {
        return isAuthorizedToModifyStatusByLegacyGroup(channelGroups, userGroups);
    }
    // public or org access
    return (isAuthorizedToModifyStatusByLegacyGroup(channelGroups, userGroups) ||
        isLegacyChannelOrgAdmin(channelOrgs, user));
}
/**
 * Ensure the user is an owner/admin of one of the channel groups
 */
function isAuthorizedToModifyStatusByLegacyGroup(channelGroups, userGroups) {
    return channelGroups.some((channelGroupId) => {
        return userGroups.some((group) => {
            const { id: userGroupId, userMembership: { memberType: userMemberType }, } = group;
            return (channelGroupId === userGroupId &&
                ADMIN_GROUP_ROLES.includes(userMemberType));
        });
    });
}
function isLegacyChannelOrgAdmin(channelOrgs, user) {
    return channelPermission.isOrgAdmin(user) && channelOrgs.includes(user.orgId);
}

/**
 * Utility to determine if User has privileges to modify a post
 * @deprecated use `canEditPost` instead
 * @param post
 * @param user
 * @param channel
 * @returns {boolean}
 */
function canModifyPost(post, user = {}, channel) {
    return canEditPost(post, user, channel);
}
/**
 * Utility to determine if User has privileges to modify a post
 * @param post
 * @param user
 * @param channel
 * @returns {boolean}
 */
function canEditPost(post, user = {}, channel) {
    const { access, groups, orgs, allowAnonymous } = channel;
    if (channel.channelAcl) {
        const canReplyOrPost = post.parentId
            ? channel.allowReply
            : channel.allowPost;
        const channelPermission$1 = new channelPermission.ChannelPermission(channel);
        return (isPostCreator(post, user) &&
            canReplyOrPost &&
            channelPermission$1.canPostToChannel(user));
    }
    return (isPostCreator(post, user) &&
        isAuthorizedToModifyByLegacyPermissions(user, {
            access,
            groups,
            orgs,
            allowAnonymous,
        }));
}
function isPostCreator(post, user) {
    return !!user.username && post.creator === user.username;
}
function isAuthorizedToModifyByLegacyPermissions(user, channelParams) {
    const { groups: userGroups = [], orgId: userOrgId } = user;
    const { access, groups: channelGroups = [], orgs = [] } = channelParams;
    if (access === utils.SharingAccess.PUBLIC) {
        return true;
    }
    if (access === utils.SharingAccess.ORG) {
        return (isAuthorizedToModifyPostByLegacyGroup(channelGroups, userGroups) ||
            orgs.includes(userOrgId));
    }
    // private
    return isAuthorizedToModifyPostByLegacyGroup(channelGroups, userGroups);
}
/**
 * Ensure the user is a member of one of the channel groups
 * and the group is not marked as non-discussable
 */
function isAuthorizedToModifyPostByLegacyGroup(channelGroups, userGroups) {
    return channelGroups.some((channelGroupId) => {
        return userGroups.some((group) => {
            const { id: userGroupId, typeKeywords = [] } = group;
            return (channelGroupId === userGroupId && !typeKeywords.includes(utils.CANNOT_DISCUSS));
        });
    });
}

const MENTION_ATTRIBUTE_AND_VALUE_PATTERN = new RegExp(`${MENTION_ATTRIBUTE$1}=('|")[\\w@\\.-]+('|")`, "g");
const MENTION_ATTRIBUTE_PATTERN = new RegExp(`${MENTION_ATTRIBUTE$1}=`, "g");
const NON_WORDS_PATTERN = new RegExp("[^\\w@\\.-]", "g");
/**
 * Parses mentioned users
 * @param text A string to parse mentioned users from
 * @returns A unique collection of usernames parsed from the provided text
 */
function parseMentionedUsers(text = "") {
    const toReplaced = (input, pattern) => input.replace(pattern, "");
    const toMentionedUsers = (acc, match) => {
        const username = [MENTION_ATTRIBUTE_PATTERN, NON_WORDS_PATTERN].reduce(toReplaced, match);
        return acc.indexOf(username) < 0 ? [...acc, username] : acc;
    };
    const matches = text.match(MENTION_ATTRIBUTE_AND_VALUE_PATTERN) || [];
    return matches.reduce(toMentionedUsers, []);
}

const arcgisHubDiscussionsBlockedNoticeCss = ":host{display:block}";

const ArcgisHubDiscussionsBlockedNotice = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.variant = undefined;
    this.scale = 'm';
    context.bind(this, 'handleImpression');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.el);
  }
  get variantConfig() {
    return fetchParentUserDetails.ArcgisHubDiscussionsBlockedNoticeConfigs[this.variant];
  }
  handleImpression() {
    this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.alert.label.warning.details.discussionsBlocked);
  }
  render() {
    return (index.h(index.Host, { "data-element": "discussions-blocked-notice" }, index.h("calcite-notice", { kind: "warning", open: true, ref: this.handleImpression, scale: this.scale }, index.h("div", { slot: "title" }, this.intl.t(this.variantConfig.title)), index.h("div", { slot: "message" }, this.intl.t(this.variantConfig.message)))));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return index.getElement(this); }
};
ArcgisHubDiscussionsBlockedNotice.style = arcgisHubDiscussionsBlockedNoticeCss;

const arcgisHubDiscussionsPopoverCss = ":host{position:relative;display:block}calcite-popover{width:20rem}calcite-popover[data-popper-placement][data-popper-reference-hidden]{pointer-events:auto;opacity:1}button{grid-row:span 2 / span 2;cursor:pointer;border-style:none;background-color:transparent;padding:0px}address{margin:0px;margin-bottom:1.5rem;display:grid;column-gap:0.75rem;row-gap:0px;font-style:normal;grid-template-columns:44px auto}address:last-child{margin:0px}calcite-avatar{grid-row:span 2 / span 2;height:2.75rem;width:2.75rem}address calcite-icon{grid-row:span 2 / span 2;height:2.75rem;width:2.75rem}address b{font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}address:not(:has(span)) b{grid-row:span 2 / span 2;align-self:center}address span{font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}address span:before{content:'@'}calcite-icon{margin-top:1px;margin-bottom:1px}.popover-body{margin:0px;padding:0.75rem}.popover-body div{margin-bottom:0.5rem;display:flex;align-items:flex-start;gap:0.5rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-color-text-2)}.popover-body div+div{margin-bottom:1rem}.popover-body div+div:last-child{margin:0px}footer{padding:0.75rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-color-text-1);background-color:var(--calcite-color-background)}footer div{margin:0px;margin-bottom:0.5rem;display:flex;align-items:flex-start;gap:0.5rem}footer div:nth-of-type(3){margin-bottom:1rem}footer div:last-child{margin:0px}";

const ArcgisHubDiscussionsPopover = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.arcgisHubDiscussionPopoverBeforeOpen = index.createEvent(this, "arcgisHubDiscussionPopoverBeforeOpen", 7);
    this.arcgisHubDiscussionPopoverClose = index.createEvent(this, "arcgisHubDiscussionPopoverClose", 7);
    this.buttonEl = undefined;
    this.post = undefined;
    this.postCreator = undefined;
    this.postCreatorOrg = undefined;
    this.channel = undefined;
    this.channelGroups = undefined;
    this.parent = undefined;
    this.parentCreator = undefined;
    this.index = undefined;
    this.isHub = undefined;
    context.bind(this, 'handlePopoverOpened', 'handleGoToProfile', 'emitHubTelemetry');
  }
  get _context() {
    return state.getGlobalContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  emitHubTelemetry(telemetry) {
    const { post, parent, channel, index } = this;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { postId: post === null || post === void 0 ? void 0 : post.id, parentId: parent === null || parent === void 0 ? void 0 : parent.id, channelId: channel === null || channel === void 0 ? void 0 : channel.id, channelAccess: channel === null || channel === void 0 ? void 0 : channel.access, position: index }));
  }
  handlePopoverOpened() {
    this.emitHubTelemetry(index$1.dist.dictionary.category.interaction.action.open.label.popover.details.details);
  }
  handleCalcitePopoverBeforeOpened() {
    this.arcgisHubDiscussionPopoverBeforeOpen.emit();
  }
  handlePopoverClosed() {
    this.arcgisHubDiscussionPopoverClose.emit();
  }
  handleGoToProfile() {
    this.emitHubTelemetry(index$1.dist.dictionary.category.navigation.action.view.label.users.details.profile);
  }
  renderCreatorAvatar() {
    var _a;
    const { post, postCreator: creator, _context, intl } = this;
    const user = (!creator && post)
      ? { username: post.creator }
      : creator;
    return (user === null || user === void 0 ? void 0 : user.username) ? (index.h("calcite-avatar", { "full-name": user === null || user === void 0 ? void 0 : user.fullName, scale: "l", thumbnail: (user === null || user === void 0 ? void 0 : user.thumbnail) && HubInitiatives.getUserThumbnailUrl(_context.hubRequestOptions.portal, user, (_a = _context.hubRequestOptions.authentication) === null || _a === void 0 ? void 0 : _a.token), "user-id": user === null || user === void 0 ? void 0 : user.id, username: user === null || user === void 0 ? void 0 : user.username })) : (index.h("calcite-avatar", { "full-name": intl.t('anonymous'), scale: "l", thumbnail: index.getAssetPath('./assets/no-user-thumb.jpeg') }));
  }
  renderCreatorDetails() {
    const { intl, post: { creator: creatorUsername }, postCreator: creator, } = this;
    let fullName = intl.t('anonymous');
    let username;
    if (creator || creatorUsername) {
      fullName = (creator === null || creator === void 0 ? void 0 : creator.fullName) || intl.t('privateUser');
      username = creatorUsername;
    }
    return (index.h(index.Fragment, null, index.h("b", null, fullName), username && (index.h("span", null, username))));
  }
  renderCreatorExpandedDetails() {
    const { intl, postCreator: creator, postCreatorOrg: organization, isHub } = this;
    /// 'region' acts as a stand-in for whether or not the user is viewable from an access standpoint.
    /// If we don't have a region property, we also don't have access to portal or the other needed information.
    if (creator === null || creator === void 0 ? void 0 : creator.region) {
      const region = intl.formatDisplayName(creator.region.toLocaleUpperCase(), { type: 'region' });
      return (index.h(index.Fragment, null, organization && index.h("div", null, index.h("calcite-icon", { icon: "organization", scale: "s", "text-label": intl.t('orgLabel') }), (organization === null || organization === void 0 ? void 0 : organization.name) || intl.t('privateOrg')), index.h("div", null, index.h("calcite-icon", { icon: "pin", scale: "s", "text-label": intl.t('location') }), region), isHub && (index.h("calcite-button", { appearance: "outline-fill", href: "/people/" + creator.username, kind: "neutral", label: intl.t('profile'), onClick: this.handleGoToProfile, round: true, scale: "l", width: "full" }, intl.t('profile')))));
    }
  }
  renderPostDetails() {
    const { intl, post, parentCreator, channel, channelGroups } = this;
    const postedTo = parentCreator ?
      index.h("div", null, index.h("calcite-icon", { icon: "right", scale: "s" }), intl.t('replyingTo', { username: parentCreator.username })) :
      index.h("div", null, index.h("calcite-icon", { icon: "speech-bubble", scale: "s" }), index.h("span", null, intl.t('postedIn', { groupName: discussions.getChannelName(channel, channelGroups, intl.t('unnamedChannel')) })));
    let visibilityIcon;
    let visibilityText;
    if (channel.access === utils.SharingAccess.PRIVATE) {
      visibilityIcon = "lock";
      visibilityText = intl.t('visiblePrivate');
    }
    else if (channel.access === utils.SharingAccess.ORG) {
      visibilityIcon = "organization";
      visibilityText = intl.t('visibleOrg');
    }
    else if (channel.access === utils.SharingAccess.PUBLIC) {
      visibilityIcon = "globe";
      visibilityText = intl.t('visibleAll');
    }
    const timestamp = new Date(post.createdAt).toLocaleString(intl.locale, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
    return (index.h("footer", null, postedTo, index.h("div", null, index.h("calcite-icon", { icon: visibilityIcon, scale: "s" }), visibilityText), index.h("div", null, index.h("calcite-icon", { icon: "clock", scale: "s" }), timestamp)));
  }
  render() {
    const { intl } = this;
    return (index.h(index.Host, { "data-element": "discussions-popover" }, this.buttonEl &&
      index.h("calcite-popover", { autoClose: true, label: intl.t('information'), overlayPositioning: "fixed", placement: "top", referenceElement: this.buttonEl }, index.h("div", { class: "popover-body" }, index.h("address", null, this.renderCreatorAvatar(), this.renderCreatorDetails()), this.renderCreatorExpandedDetails()), this.renderPostDetails()), index.h("button", { "aria-label": intl.t('buttonLabel'), ref: (el) => { this.buttonEl = el; }, type: "button" }, index.h("slot", null))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubDiscussionsPopover.style = arcgisHubDiscussionsPopoverCss;

/**
 * A decorator factory function that accepts the auto link decorator configuration params
 *
 * @returns The cache decorator function
 */
function AutoLinkDecoratorFactory(options) {
  /**
   * A decorator function that augments a class method with an auto link transformation that converts
   * URLs in plain text to either an anchor or calcite-link
   *
   * @param _target A reference to the class prototype
   * @param _propertyKey The name of the method being decorated
   * @param descriptor A PropertyDescriptor for the method being decorated
   * @returns A new PropertyDescriptor that aguments the decorated method with auto linking behavior
   */
  function AutoLinkDecorator(_target, _propertyKey, descriptor) {
    const { get: original } = descriptor;
    const get = function AutoLink() {
      const result = original.call(this);
      return string.autoLink(result, options);
    };
    return Object.assign(Object.assign({}, descriptor), { get });
  }
  return AutoLinkDecorator;
}

const MENTION_ATTRIBUTE = "data-mention";
const MENTION_ELEMENTS_PATTERN = new RegExp(`<[a-z-]+( [a-z-]+(=('|")[\\w- ]+('|"))?)*( ${MENTION_ATTRIBUTE}=('|")[\\w@\\.-]+('|"))( [a-z-]+(=('|")[\\w- ]+('|"))?)*>@[\\w@\\.-]+<\/[a-z-]+>`, 'g');
const getMentionedUser = (match, mentionedUsers) => {
  const username = parseMentionedUsers(match)[0];
  return mentionedUsers
    ? mentionedUsers.find(mentionedUser => mentionedUser.userId === username)
    : null;
};
function mentionPopoverTransform(text, post, postCreator, postMentionedUsers, channel) {
  const context = state.getGlobalContext();
  const transform = (input = '') => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const matches = input.match(MENTION_ELEMENTS_PATTERN);
    if (!matches) {
      return input;
    }
    else {
      const [match] = matches;
      const startIdx = input.indexOf(match);
      const endIdx = startIdx + match.length;
      const before = startIdx > 0 ? input.substring(0, startIdx) : '';
      const toReplace = input.substring(startIdx, startIdx + match.length);
      const mentionedUser = getMentionedUser(toReplace, postMentionedUsers);
      const replaced = toReplace.replace(match, `<arcgis-hub-discussions-mention-popover
          access="${(_b = (_a = mentionedUser === null || mentionedUser === void 0 ? void 0 : mentionedUser.user) === null || _a === void 0 ? void 0 : _a.access) !== null && _b !== void 0 ? _b : ''}"
          channel-access="${channel.access}"
          channel-id="${channel.id}"
          creator-username="${(postCreator === null || postCreator === void 0 ? void 0 : postCreator.username) || post.creator}"
          full-name="${(_d = (_c = mentionedUser.user) === null || _c === void 0 ? void 0 : _c.fullName) !== null && _d !== void 0 ? _d : ''}"
          organization="${(_f = (_e = mentionedUser.org) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : ''}"
          region="${((_g = mentionedUser.user) === null || _g === void 0 ? void 0 : _g.region) || ''}"
          thumbnail="${((_h = mentionedUser.user) === null || _h === void 0 ? void 0 : _h.thumbnail) || ''}"
          token="${(_j = context.hubRequestOptions.authentication) === null || _j === void 0 ? void 0 : _j.token}"
          user-id="${(_l = (_k = mentionedUser.user) === null || _k === void 0 ? void 0 : _k.id) !== null && _l !== void 0 ? _l : ''}"
          username="${mentionedUser.userId}"
        >${match}</arcgis-hub-discussions-mention-popover>`);
      return before + replaced + transform(input.substring(endIdx));
    }
  };
  return transform(text);
}

function MentionPopoverTransformDecoratorFactory() {
  function MentionPopoverTransformDecorator(_target, _propertyKey, descriptor) {
    const { get: original } = descriptor;
    const get = function MentionPopoverTransform() {
      const result = original.call(this);
      return mentionPopoverTransform(result, this.post, this.postCreator, this.postMentionedUsers, this.channel);
    };
    return Object.assign(Object.assign({}, descriptor), { get });
  }
  return MentionPopoverTransformDecorator;
}

function copyLinkToPost(channelId, postId, parentId) {
  const params = { channelId, postId, discussions: true };
  if (parentId) {
    params.replyId = postId;
    params.postId = parentId;
  }
  const url = new URL(globalThis.location.href);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value.toString());
  });
  navigator.clipboard.writeText(url.toString());
}

async function fetchPostMentionedUsers(options, hubRequestOptions) {
  const { post } = options;
  let { postMentionedUsers } = options;
  if (post) {
    const userIds = parseMentionedUsers(post.body);
    postMentionedUsers = (postMentionedUsers !== null && postMentionedUsers !== void 0 ? postMentionedUsers : []).filter(postMentionedUser => userIds.includes(postMentionedUser.userId));
    const newUserIds = userIds.filter(userId => !postMentionedUsers.find(postMentionedUser => userId === postMentionedUser.userId));
    const newMentionedUsers = await Promise.all(newUserIds.map(async (userId) => {
      let user;
      let userError;
      let org;
      let orgError;
      try {
        user = await fetchParentUserDetails.fetchMemberFromCache(userId, hubRequestOptions);
        userError = null;
      }
      catch (e) {
        userError = e;
        user = null;
      }
      try {
        org = (user === null || user === void 0 ? void 0 : user.orgId) ? await portal.fetchPortalFromCache(user.orgId, hubRequestOptions) : null;
        orgError = null;
      }
      catch (e) {
        orgError = e;
        org = null;
      }
      return {
        userId,
        user,
        userError,
        org,
        orgError,
      };
    }));
    postMentionedUsers = [...postMentionedUsers, ...newMentionedUsers];
  }
  else {
    postMentionedUsers = null;
  }
  return { postMentionedUsers };
}

function HighlightBlockedWordsDecoratorFactory(idPrefix, componentClassName) {
  function HighlightBlockedWordsDecorator(_target, _propertyKey, descriptor) {
    const { get: original } = descriptor;
    const get = function HighlightBlockedWords(...args) {
      var _a;
      const result = original.apply(this, args);
      return (result && this.post.status !== utils.PostStatus.APPROVED)
        ? string.highlightWords(result, (_a = this.channel.blockWords) !== null && _a !== void 0 ? _a : [], idPrefix, componentClassName, this.intl, {
          labelKey: 'blockedWordTooltipLabel',
          textKey: 'blockedWordTooltipText'
        })
        : result;
    };
    return Object.assign(Object.assign({}, descriptor), { get });
  }
  return HighlightBlockedWordsDecorator;
}

const arcgisHubDiscussionsPostCss = ".sc-arcgis-hub-discussions-post-h{display:block;background-color:var(--calcite-color-foreground-1)}arcgis-hub-discussions-post-header.sc-arcgis-hub-discussions-post,.sc-arcgis-hub-discussions-post-s>[slot='metadata']{margin-left:1rem;margin-right:1rem;margin-bottom:0.5rem}[parent-id].sc-arcgis-hub-discussions-post-h arcgis-hub-discussions-post-header.sc-arcgis-hub-discussions-post,.sc-arcgis-hub-discussions-post-h[parent-id] .sc-arcgis-hub-discussions-post-s>[slot='metadata']{margin-left:0px;margin-right:0px}.sc-arcgis-hub-discussions-post-s>[slot='metadata'],.sc-arcgis-hub-discussions-post-s>[slot='editor']{display:none}.sc-arcgis-hub-discussions-post-h:has(slot-fb[name='metadata']) .sc-arcgis-hub-discussions-post-s>[slot='metadata'],.sc-arcgis-hub-discussions-post-h:has(slot-fb[name='editor']) .sc-arcgis-hub-discussions-post-s>[slot='editor']{display:block}arcgis-hub-discussions-post-chips.sc-arcgis-hub-discussions-post{padding-left:1rem;padding-right:1rem;padding-bottom:0.75rem}header.sc-arcgis-hub-discussions-post{margin-left:1rem;margin-right:1rem;margin-bottom:0.25rem;overflow-wrap:break-word;font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}arcgis-multiline-ellipsis.sc-arcgis-hub-discussions-post{margin:0px;margin-left:1rem;margin-right:1rem;font-size:var(--calcite-font-size-0);line-height:1.375rem;color:var(--calcite-color-text-1)}footer.sc-arcgis-hub-discussions-post{display:flex;flex-direction:column}article.sc-arcgis-hub-discussions-post:has(arcgis-hub-discussions-post-geography[data-count='0']) footer.sc-arcgis-hub-discussions-post:not(:has(arcgis-hub-discussions-post-reactions)){margin-top:0.5rem}footer.sc-arcgis-hub-discussions-post .actions.sc-arcgis-hub-discussions-post{margin-left:0.5rem;margin-right:0.5rem;display:flex;justify-content:space-between}footer.sc-arcgis-hub-discussions-post arcgis-hub-discussions-post-reactions.sc-arcgis-hub-discussions-post{margin-left:1rem;margin-right:1rem;margin-top:0.75rem;margin-bottom:0.75rem}[parent-id].sc-arcgis-hub-discussions-post-h footer.sc-arcgis-hub-discussions-post arcgis-hub-discussions-post-reactions.sc-arcgis-hub-discussions-post{margin-left:0px;margin-right:0px}arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post{margin-top:0px;margin-bottom:0px;margin-left:0.75rem;margin-right:0.75rem}calcite-notice.sc-arcgis-hub-discussions-post{margin-left:1rem;margin-right:1rem;margin-bottom:1.5rem}footer.sc-arcgis-hub-discussions-post+calcite-notice.sc-arcgis-hub-discussions-post{margin-top:1rem}arcgis-hub-discussions-post-geography[loading].sc-arcgis-hub-discussions-post{margin-left:1rem;margin-right:1rem}calcite-popover[data-popper-placement][data-popper-reference-hidden].sc-arcgis-hub-discussions-post{pointer-events:auto;opacity:1}calcite-popover.sc-arcgis-hub-discussions-post{pointer-events:auto !important}.discussions-post-action-menu.sc-arcgis-hub-discussions-post:active .discussions-post-action-menu-icon.sc-arcgis-hub-discussions-post{--tw-text-opacity:1;color:rgb(21 21 21 / var(--tw-text-opacity))}.discussions-post-action-menu-options.sc-arcgis-hub-discussions-post:active{--tw-text-opacity:1;color:rgb(21 21 21 / var(--tw-text-opacity))}.discussions-post-action-menu-options.sc-arcgis-hub-discussions-post:active .discussions-post-action-menu-options-icon.sc-arcgis-hub-discussions-post{--tw-text-opacity:1;color:rgb(21 21 21 / var(--tw-text-opacity))}.discussions-post-replies.sc-arcgis-hub-discussions-post:active{--tw-text-opacity:1;color:rgb(21 21 21 / var(--tw-text-opacity))}.discussions-post-replies.sc-arcgis-hub-discussions-post:active .discussions-post-replies-icon.sc-arcgis-hub-discussions-post{--tw-text-opacity:1;color:rgb(21 21 21 / var(--tw-text-opacity))}.actions.sc-arcgis-hub-discussions-post{display:flex;align-items:center}[parent-id].sc-arcgis-hub-discussions-post-h article.sc-arcgis-hub-discussions-post{position:relative;display:grid;grid-template-rows:repeat(1, minmax(0, 1fr));gap:0.75rem;grid-template-columns:2rem auto}[parent-id].sc-arcgis-hub-discussions-post-h arcgis-hub-discussions-post-chips.sc-arcgis-hub-discussions-post{padding-bottom:0px}[parent-id].sc-arcgis-hub-discussions-post-h:has(arcgis-hub-discussions-post-chips:not([data-count='0'])) div.sc-arcgis-hub-discussions-post{grid-row-start:2;grid-row-end:2}[parent-id].sc-arcgis-hub-discussions-post-h article.arcgis-hub-discussions-post-lead.sc-arcgis-hub-discussions-post,[parent-id].sc-arcgis-hub-discussions-post-h .arcgis-hub-discussions-post-lead.sc-arcgis-hub-discussions-post arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post{padding-bottom:1.25rem}[parent-id].sc-arcgis-hub-discussions-post-h arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post{position:relative;z-index:10}[parent-id].sc-arcgis-hub-discussions-post-h article.arcgis-hub-discussions-post-lead.sc-arcgis-hub-discussions-post::before,[parent-id].sc-arcgis-hub-discussions-post-h .arcgis-hub-discussions-post-lead.sc-arcgis-hub-discussions-post arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post::before{position:absolute;top:0px;display:block;height:100%;width:0.125rem;background-color:var(--calcite-color-foreground-2);left:15px;content:''}[parent-id][index='0'].sc-arcgis-hub-discussions-post-h article.arcgis-hub-discussions-post-lead.sc-arcgis-hub-discussions-post::before,[parent-id][index='0'].sc-arcgis-hub-discussions-post-h .arcgis-hub-discussions-post-lead.sc-arcgis-hub-discussions-post arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post::before{top:2.25rem;height:calc(100% - 2.25rem)}[parent-id][index='0'].sc-arcgis-hub-discussions-post-h article.arcgis-hub-discussions-post-lead.arcgis-hub-discussions-post-last.sc-arcgis-hub-discussions-post::before,[parent-id][index='0'].sc-arcgis-hub-discussions-post-h .arcgis-hub-discussions-post-lead.arcgis-hub-discussions-post-last.sc-arcgis-hub-discussions-post arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post::before{height:0px}[parent-id][index='0'].sc-arcgis-hub-discussions-post-h:has(arcgis-hub-discussions-post-chips[data-count]) article.arcgis-hub-discussions-post-lead.sc-arcgis-hub-discussions-post::before,[parent-id][index='0'].sc-arcgis-hub-discussions-post-h:has(arcgis-hub-discussions-post-chips[data-count]) .arcgis-hub-discussions-post-lead.sc-arcgis-hub-discussions-post arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post::before{top:2.75rem;height:calc(100% - 2.75rem)}[parent-id].sc-arcgis-hub-discussions-post-h:has(arcgis-hub-discussions-post-chips[data-count]) article.arcgis-hub-discussions-post-lead.arcgis-hub-discussions-post-last.sc-arcgis-hub-discussions-post::before,[parent-id].sc-arcgis-hub-discussions-post-h:has(arcgis-hub-discussions-post-chips[data-count]) .arcgis-hub-discussions-post-lead.arcgis-hub-discussions-post-last.sc-arcgis-hub-discussions-post arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post::before{height:2.25rem}[parent-id].sc-arcgis-hub-discussions-post-h:has(arcgis-hub-discussions-post-chips[data-count='0']) .arcgis-hub-discussions-post-lead.sc-arcgis-hub-discussions-post{padding-top:0.25rem}[parent-id].sc-arcgis-hub-discussions-post-h:has(arcgis-hub-discussions-post-chips[data-count='0']) article.arcgis-hub-discussions-post-lead.arcgis-hub-discussions-post-last.sc-arcgis-hub-discussions-post::before,[parent-id].sc-arcgis-hub-discussions-post-h:has(arcgis-hub-discussions-post-chips[data-count='0']) .arcgis-hub-discussions-post-lead.arcgis-hub-discussions-post-last.sc-arcgis-hub-discussions-post arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post::before{height:0px}[parent-id].sc-arcgis-hub-discussions-post-h:has(arcgis-hub-discussions-post-chips) article.arcgis-hub-discussions-post-lead.arcgis-hub-discussions-post-last.sc-arcgis-hub-discussions-post::before,[parent-id].sc-arcgis-hub-discussions-post-h article.arcgis-hub-discussions-post-lead.arcgis-hub-discussions-post-last.sc-arcgis-hub-discussions-post:not(:has(arcgis-hub-discussions-post-chips))::before,[parent-id].sc-arcgis-hub-discussions-post-h:has(arcgis-hub-discussions-post-chips) .arcgis-hub-discussions-post-lead.arcgis-hub-discussions-post-last.sc-arcgis-hub-discussions-post arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post::before,[parent-id].sc-arcgis-hub-discussions-post-h .arcgis-hub-discussions-post-lead.arcgis-hub-discussions-post-last.sc-arcgis-hub-discussions-post:not(:has(arcgis-hub-discussions-post-chips)) arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post::before{height:0px}[parent-id].sc-arcgis-hub-discussions-post-h arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post{margin-left:0px;margin-right:0px}[parent-id].sc-arcgis-hub-discussions-post-h .arcgis-hub-discussions-post-lead.sc-arcgis-hub-discussions-post arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post{padding-bottom:1.5rem}[parent-id].sc-arcgis-hub-discussions-post-h article.arcgis-hub-discussions-post-lead.sc-arcgis-hub-discussions-post arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post::before,[parent-id].sc-arcgis-hub-discussions-post-h .arcgis-hub-discussions-post-lead.sc-arcgis-hub-discussions-post arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post::before{z-index:-10}[parent-id].sc-arcgis-hub-discussions-post-h .arcgis-hub-discussions-post-lead.arcgis-hub-discussions-post-last.sc-arcgis-hub-discussions-post arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post::before,[parent-id][index='0'].sc-arcgis-hub-discussions-post-h:has(arcgis-hub-discussions-post-chips[data-count='0']) article.arcgis-hub-discussions-post-lead.arcgis-hub-discussions-post-last.sc-arcgis-hub-discussions-post::before{height:0px}[parent-id][index='0'].sc-arcgis-hub-discussions-post-h:has(arcgis-hub-discussions-post-chips[data-count='0']) article.arcgis-hub-discussions-post-lead.sc-arcgis-hub-discussions-post::before{top:2.25rem;height:calc(100% - 2.25rem)}[parent-id].sc-arcgis-hub-discussions-post-h arcgis-multiline-ellipsis.sc-arcgis-hub-discussions-post{margin-left:0px;margin-right:0px}[parent-id].sc-arcgis-hub-discussions-post-h calcite-action-group.sc-arcgis-hub-discussions-post{margin-left:-0.5rem}.hidden.sc-arcgis-hub-discussions-post{visibility:hidden}@keyframes in-right{0%{opacity:0;transform:translate3D(-100%, 0, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}article.in.sc-arcgis-hub-discussions-post{animation:in-right 300ms ease-out forwards}@keyframes out-left{0%{opacity:1;transform:translate3D(0, 0, 0)}100%{opacity:0;transform:translate3D(-100%, 0, 0)}}article.out.sc-arcgis-hub-discussions-post{animation:out-left 300ms ease-out forwards}[parent-id].sc-arcgis-hub-discussions-post-h arcgis-hub-discussions-post-editor.sc-arcgis-hub-discussions-post{padding-bottom:1rem}.arcgis-hub-discussions-post-editor-container.sc-arcgis-hub-discussions-post{overflow:visible}@keyframes in-left{0%{opacity:0;transform:translate3D(100%, 0, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}.arcgis-hub-discussions-post-editor-container.in.sc-arcgis-hub-discussions-post{animation:in-left 300ms ease-out forwards}@keyframes out-right{0%{opacity:1;transform:translate3D(0, 0, 0)}100%{opacity:0;transform:translate3D(100%, 0, 0)}}.arcgis-hub-discussions-post-editor-container.out.sc-arcgis-hub-discussions-post{animation:out-right 300ms ease-out forwards}[parent-id].sc-arcgis-hub-discussions-post-h arcgis-hub-discussions-post-editor[post-id][parent-id].sc-arcgis-hub-discussions-post{padding-left:0px;padding-right:0px}[parent-id].sc-arcgis-hub-discussions-post-h arcgis-multiline-ellipsis.sc-arcgis-hub-discussions-post+calcite-notice.sc-arcgis-hub-discussions-post{margin-top:1rem}[parent-id].sc-arcgis-hub-discussions-post-h article.sc-arcgis-hub-discussions-post{padding-top:0.75rem;padding-bottom:0.75rem}[parent-id].sc-arcgis-hub-discussions-post-h article.out-of-context.sc-arcgis-hub-discussions-post{margin-left:1rem;margin-right:1rem;display:grid;gap:0.5rem;font-style:normal;grid-template-columns:1fr}[parent-id].sc-arcgis-hub-discussions-post-h article.out-of-context.sc-arcgis-hub-discussions-post>div.reply-body.sc-arcgis-hub-discussions-post{display:grid;gap:0.25rem}[parent-id].sc-arcgis-hub-discussions-post-h article.out-of-context.sc-arcgis-hub-discussions-post>div.reply-body.sc-arcgis-hub-discussions-post>arcgis-hub-discussions-post-geography.sc-arcgis-hub-discussions-post{margin-left:-1rem}[parent-id].sc-arcgis-hub-discussions-post-h article.out-of-context.sc-arcgis-hub-discussions-post>div.reply-body.sc-arcgis-hub-discussions-post>arcgis-hub-discussions-post-reactions.sc-arcgis-hub-discussions-post{grid-column:span 1 / span 1}[parent-id].sc-arcgis-hub-discussions-post-h arcgis-hub-discussions-popover.sc-arcgis-hub-discussions-post{grid-row:span 2 / span 2;grid-row-start:1;grid-row-end:1}[parent-id].sc-arcgis-hub-discussions-post-h:has(arcgis-hub-discussions-post-chips:not([data-count='0'])) arcgis-hub-discussions-popover.sc-arcgis-hub-discussions-post{grid-row-start:2;grid-row-end:2}[parent-id].sc-arcgis-hub-discussions-post-h arcgis-hub-discussions-post-chips.sc-arcgis-hub-discussions-post{grid-column-start:2;grid-row-start:1;grid-row-end:1;height:1.5rem}[parent-id].sc-arcgis-hub-discussions-post-h calcite-avatar.sc-arcgis-hub-discussions-post{position:relative;margin-top:-0.25rem;padding-top:0.25rem;padding-bottom:0.25rem;background-color:var(--calcite-color-foreground-1);box-sizing:initial}[parent-id].sc-arcgis-hub-discussions-post-h footer.sc-arcgis-hub-discussions-post{display:grid;grid-template-columns:auto 48px}[parent-id].sc-arcgis-hub-discussions-post-h footer.sc-arcgis-hub-discussions-post calcite-action.sc-arcgis-hub-discussions-post{grid-column-start:2}[parent-id].sc-arcgis-hub-discussions-post-h arcgis-hub-discussions-post-reactions.sc-arcgis-hub-discussions-post{grid-column:span 2 / span 2;margin-top:0.75rem;margin-bottom:0.75rem}[parent-id].sc-arcgis-hub-discussions-post-h calcite-notice.sc-arcgis-hub-discussions-post{margin:0px}.blocked.sc-arcgis-hub-discussions-post{-webkit-text-decoration-line:underline;text-decoration-line:underline;-webkit-text-decoration-color:var(--calcite-color-status-danger);text-decoration-color:var(--calcite-color-status-danger);-webkit-text-decoration-style:dashed;text-decoration-style:dashed;color:var(--calcite-color-status-danger)}";

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const ArcgisHubDiscussionsPost = class {
  /**
   * Constructor method, pre-bind context to methods that are passed by reference
   */
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubDiscussionsPostEdit = index.createEvent(this, "arcgisHubDiscussionsPostEdit", 7);
    this.arcgisHubDiscussionsPostDelete = index.createEvent(this, "arcgisHubDiscussionsPostDelete", 7);
    this.arcgisHubDiscussionsPostSelect = index.createEvent(this, "arcgisHubDiscussionsPostSelect", 7);
    this.arcgisHubDiscussionsGeometryDrawReset = index.createEvent(this, "arcgisHubDiscussionsGeometryDrawReset", 7);
    this.arcgisHubDiscussionsGeometryDeselect = index.createEvent(this, "arcgisHubDiscussionsGeometryDeselect", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.arcgisHubDiscussionsPostReady = index.createEvent(this, "arcgisHubDiscussionsPostReady", 7);
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
    this._context = state.getGlobalContext();
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
    context.bind(this, 'handleDelete', 'handleEdit', 'handleCopyLink', 'handleCopyTooltipBeforeOpen', 'handleCopyTooltipClose', 'handleActionsPopoverBeforeOpenClose', 'handleToggleVisibility', 'handleViewThread', 'handleReply', 'handleViewReplies', 'handleLinkClicked', 'renderDeleted', 'renderHidden', 'renderPost', 'renderReply', 'renderEditor', 'renderSkeleton', 'handleViewPost', 'handleSetComponentRef', 'handleAnimationEnd', 'renderReplyOutOfContext', 'handleViewAllReplies', 'handleReplyOutOfContextReadMore');
  }
  /**
   * Connected callback lifecycle hook
   */
  connectedCallback() {
    state.connectContext(this);
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
      this.emitHubTelemetry(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.open.label.popover.details.options), { position: this.index }));
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
      fetchParentUserDetails.fetchPostDetails({ postId, post }, _context.hubRequestOptions),
      fetchEntityDetails.fetchEnvironmentDetails({ isHub }, _context.hubRequestOptions),
    ]);
    const [postUserDetails, parentDetails] = await Promise.all([
      fetchParentUserDetails.fetchPostUserDetails(Object.assign({ postCreator, postCreatorOrg }, postDetails), _context.hubRequestOptions),
      fetchParentUserDetails.fetchParentDetails(Object.assign({ parentId, parent }, postDetails), _context.hubRequestOptions),
    ]);
    const [entityDetails, channelDetails, parentUserDetails, postMentionedUsersDetails] = await Promise.all([
      fetchEntityDetails.fetchEntityDetails(Object.assign(Object.assign({ discussion, entityId, entityType, entity, displayFieldKey, displayFieldValid, displayFieldValue, locationId }, postDetails), parentDetails), _context.hubRequestOptions),
      fetchChannelDetails.fetchChannelDetails(Object.assign(Object.assign({ channelId, channel: channel, channelGroups }, postDetails), parentDetails), _context.hubRequestOptions),
      fetchParentUserDetails.fetchParentUserDetails(Object.assign({ parentCreator }, parentDetails), _context.hubRequestOptions),
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
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
    return discussions.removePost(Object.assign({ postId }, _context.hubRequestOptions))
      .then(() => {
      this.deletedDuringSession = true;
      this.emitHubTelemetry(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.delete), { response: index$1.dist.constants.response.SUCCESS }));
      this.arcgisHubDiscussionsPostDelete.emit(post);
    })
      .catch(e => {
      this.errorMessage = isReply ? 'deleteFailureReply' : 'deleteFailure';
      this.emitHubTelemetry(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.delete), { response: index$1.dist.constants.response.FAILURE }));
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
    this.emitHubTelemetry(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.open.label.editor), { position: this.index }));
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
    if (post.status === utils.PostStatus.HIDDEN || post.status === utils.PostStatus.BLOCKED) {
      status = utils.PostStatus.APPROVED;
      details = 'show';
    }
    else {
      status = utils.PostStatus.HIDDEN;
      details = 'hide';
    }
    return discussions.updatePostStatus(Object.assign({ data: {
        status,
      }, postId: post.id }, _context.hubRequestOptions))
      .then(editedPost => discussions.fetchPost(Object.assign({ postId: editedPost.id, data: {
        relations: [utils.PostRelation.REACTIONS, utils.PostRelation.REPLIES],
      } }, this._context.hubRequestOptions)))
      .then(editedPost => {
      editedPost.replyCount = editedPost.replies.total;
      delete editedPost.replies;
      this.emitHubTelemetry(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.status.details[details]), { response: index$1.dist.constants.response.SUCCESS }));
      this.arcgisHubDiscussionsPostEdit.emit(editedPost);
      return editedPost;
    })
      .catch(e => {
      console.error('Could not update post status:', e.message);
      this.emitHubTelemetry(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.status.details[details]), { response: index$1.dist.constants.response.FAILURE }));
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
      this.emitHubTelemetry(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.open.label.thread), { position: index }));
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
    this.emitHubTelemetry(index$1.dist.dictionary.category.interaction.action.open.label.editor.details.reply);
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
    this.emitHubTelemetry(index$1.dist.dictionary.category.interaction.action.open.label.thread.details.bodyAction);
  }
  /**
   * Handles clicks to non-mention calcite-links in the post body.
   */
  handleLinkClicked(evt) {
    const el = evt.target;
    if (['CALCITE-LINK'].includes(el.nodeName) && !el.hasAttribute('data-mention')) {
      const { postId, parentId, channel, index } = this;
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.navigation.action.external.label.link), { details: el.href, postId: postId, parentId, channelId: channel.id, channelAccess: channel.access, position: index }));
    }
  }
  /**
   * Emits the hubTelemetry impression for a deep linked thread
   */
  capturePostDeepLinkImpression() {
    this.emitHubTelemetry(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.viewed.label.post.details.thread), { response: index$1.dist.constants.response.SUCCESS }));
  }
  /**
   * Emits the hubTelemetry impression for a post rendered within a list
   */
  capturePostListImpression() {
    this.emitHubTelemetry(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.viewed.label.post.details.postList), { position: this.index }));
  }
  /**
   * Emits the hubTelemetry impression for a deleted post
   */
  capturePostDeletedImpression() {
    this.emitHubTelemetry(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.viewed.label.post.details.thread), { response: index$1.dist.constants.response.FAILURE }));
  }
  /**
   * Emits the hubTelemetry impression for a hidden post
   */
  capturePostHiddenImpression() {
    this.emitHubTelemetry(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.viewed.label.post.details.thread), { response: index$1.dist.constants.response.FAILURE }));
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
      const updatedPost = await discussions.fetchPost(Object.assign({ postId: this.post.id, data: {
          relations: [utils.PostRelation.REACTIONS, utils.PostRelation.REPLIES],
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
        actions.push((post.status === utils.PostStatus.HIDDEN || post.status === utils.PostStatus.BLOCKED)
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
    const { hasMap, index: index$1, isHub, unsavedFeatures, unsavedRelatedFeatures, unsavedExistingFeatures, post, postCreator, postCreatorOrg, displayFieldKey, displayFieldValue, displayFieldValid, entity, discussion, entityId, entityType, isMobile, channelId, channel, channelGroups, locationId, postId, isReply, lead, lastIndex, editorClass, parent, parentId, parentCreator, showLocations, disableSelectExistingLocation } = this;
    return (index.h("div", { class: {
        'arcgis-hub-discussions-post-lead': isReply && lead,
        'arcgis-hub-discussions-post-last': isReply && index$1 === lastIndex,
        [editorClass]: Boolean(editorClass),
        'arcgis-hub-discussions-post-editor-container': true,
      }, ref: this.handleSetComponentRef }, index.h("slot", { name: "editor" }, index.h("arcgis-hub-discussions-post-editor", { channel: channel, channelGroups: channelGroups, channelId: channelId, disableSelectExistingLocation: disableSelectExistingLocation, discussion: discussion, displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, displayFieldValue: displayFieldValue, entity: entity, entityId: entityId, entityType: entityType, hasMap: hasMap, index: index$1, isHub: isHub, isMobile: isMobile, locationId: locationId, parent: parent, parentCreator: parentCreator, parentId: parentId, post: post, postCreator: postCreator, postCreatorOrg: postCreatorOrg, postId: postId, showLocations: showLocations, unsavedExistingFeatures: unsavedExistingFeatures, unsavedFeatures: unsavedFeatures, unsavedRelatedFeatures: unsavedRelatedFeatures }))));
  }
  /**
   * Renders the reactions component
   */
  renderReactions() {
    const { post, channel } = this;
    if (channel.allowReaction) {
      return index.h("arcgis-hub-discussions-post-reactions", { channel: channel, post: post });
    }
  }
  /**
   * Renders the post metadata, i.e. the post-header component
   */
  renderMetadata(metadataOrientation, showChannelAccessIcon, showChannelAvatar, showChannelName, showCreatorAvatar, showPopover, showReplyingTo, showViewPostAction, showTimestamp) {
    const { isHub, post, postCreator, postCreatorOrg, parentCreator, channel, channelGroups, index: index$1, parent, handleViewPost } = this;
    return (index.h("slot", { name: "metadata" }, index.h("arcgis-hub-discussions-post-header", { channel: channel, channelGroups: channelGroups, iconScale: "l", index: index$1, isHub: isHub, metadataOrientation: metadataOrientation, onArcgisHubDiscussionsPostSelect: handleViewPost, parent: parent, parentCreator: parentCreator, post: post, postCreator: postCreator, postCreatorOrg: postCreatorOrg, showChannelAccessIcon: showChannelAccessIcon, showChannelAvatar: showChannelAvatar, showChannelName: showChannelName, showCreatorAvatar: showCreatorAvatar, showPopover: showPopover, showReplyingTo: showReplyingTo, showTimestamp: showTimestamp, showViewPostAction: showViewPostAction })));
  }
  /**
   * Renders the parent post view
   */
  renderPost() {
    const { intl, errorMessage, preview, post, channel, index: index$1, articleClass, showChannelAvatar, showChannelName } = this;
    index$1 === undefined ? this.capturePostDeepLinkImpression() : this.capturePostListImpression();
    return (index.h("article", { class: { [articleClass]: Boolean(articleClass) }, ref: this.handleSetComponentRef }, index.h("arcgis-hub-discussions-post-chips", { channel: channel, index: index$1, post: post }), this.renderMetadata('block', true, showChannelAvatar, showChannelName, true, true, false, false, true), index.h("header", { innerHTML: this.postTitle }), index.h("arcgis-multiline-ellipsis", { "expand-enabled": preview, "expand-icon": intl.direction === 'rtl' ? 'arrow-left' : 'arrow-right', innerHTML: this.postBody, lines: preview ? 4 : 0, onClick: this.handleLinkClicked }), this.renderGeography(false, true), index.h("footer", null, this.renderReactions(), index.h("div", { class: "actions" }, this.renderTextActions(), this.renderActionMenu())), errorMessage && (index.h("calcite-notice", { closable: true, kind: "danger", open: true, scale: "s" }, index.h("div", { slot: "title" }, intl.t('error')), index.h("div", { slot: "message" }, intl.t(errorMessage))))));
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
    return (index.h("calcite-action-group", { id: "text-actions", layout: "horizontal" }, preview && index.h("calcite-action", { class: "text-action-reply", onClick: this.handleReply, scale: "s", text: intl.t('actions.reply'), textEnabled: true }), post.replyCount !== 0 && (index.h("calcite-action", { class: "text-action-view-reply", disabled: !preview, onClick: this.handleViewReplies, scale: "s", text: intl.t(replyCountString, { count: post.replyCount }), textEnabled: true }))));
  }
  /**
   * Renders ths post actions menu dropdown
   */
  renderActionMenu() {
    const { intl, isReply, actionMenuActions } = this;
    if (actionMenuActions.length) {
      return (index.h(index.Fragment, null, index.h("calcite-action", { alignment: "center", class: "discussions-post-action-menu", ref: (menuActionElement) => {
          this.menuActionElement = menuActionElement;
        }, scale: "s", text: intl.t('options') }, index.h("calcite-icon", { class: "discussions-post-action-menu-icon", icon: "ellipsis", scale: "s" })), index.h("calcite-popover", { autoClose: true, flipPlacements: isReply ? ['top', 'bottom'] : ['top-end', 'bottom-end'], label: intl.t('options'), offsetDistance: 0, onCalcitePopoverBeforeClose: this.handleActionsPopoverBeforeOpenClose, onCalcitePopoverBeforeOpen: this.handleActionsPopoverBeforeOpenClose, overlayPositioning: "absolute", placement: "bottom-end", pointerDisabled: true, ref: (menuPopoverElement) => {
          this.menuPopoverElement = menuPopoverElement;
        }, referenceElement: this.menuActionElement }, index.h("calcite-action-group", { layout: "vertical" }, actionMenuActions.map(({ text, fn, icon, ref }) => (index.h("calcite-action", { class: "discussions-post-action-menu-options", "data-action": text.toLowerCase(), id: 'discussions-post-action-menu-option-' + icon, key: icon, onClick: fn, ref: ref, scale: "m", text: text, "text-enabled": "true" }, index.h("calcite-icon", { class: "discussions-post-action-menu-options-icon", icon: icon, scale: "s" })))))), actionMenuActions.some(({ icon }) => icon === 'link') && (index.h("calcite-tooltip", { onCalciteTooltipBeforeOpen: this.handleCopyTooltipBeforeOpen, onCalciteTooltipClose: this.handleCopyTooltipClose, open: false, placement: "top", ref: el => {
          this.copyTooltipRef = el;
        }, referenceElement: this.copyActionRef }, index.h("span", null, intl.t('copied'))))));
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
    return (index.h("calcite-notice", { kind: "danger", open: true, scale: "m" }, index.h("div", { slot: "title" }, intl.t(isReply ? 'deleted.title.reply' : 'deleted.title')), index.h("div", { slot: "message" }, intl.t(isReply ? 'deleted.message.reply' : 'deleted.message')), isReply && (index.h("calcite-link", { onClick: handleViewAllReplies, slot: "link" }, intl.t('delete.action')))));
  }
  /**
   * Renders the post hidden notice
   */
  renderHidden() {
    const { intl, isReply } = this;
    this.capturePostHiddenImpression();
    return (index.h("calcite-notice", { kind: "warning", open: true, scale: "m" }, index.h("div", { slot: "title" }, intl.t(isReply ? 'hidden.title.reply' : 'hidden.title')), index.h("div", { slot: "message" }, intl.t('hidden.message'))));
  }
  /**
   * Renders the skeleton loader
   */
  renderSkeleton() {
    return index.h("arcgis-hub-discussions-post-skeleton", null);
  }
  /**
   * Primary render method
   */
  render() {
    return (index.h(index.Host, { class: { loading: this._loading }, "data-element": "discussions-post", "data-view": this.view.render.name, style: this.styles }, this.view.render()));
  }
  /**
   * Renders the reply creator avatar and optionally the channel avatar
   */
  renderAvatars() {
    var _a;
    const { _context, isHub, parent, parentCreator, post, postCreator, postCreatorOrg, channel, channelGroups, intl, index: index$1, outOfContext } = this;
    const user = !postCreator && post ? { username: post.creator } : postCreator;
    const scale = outOfContext ? 'l' : 'm';
    let el = [
      index.h("calcite-avatar", { "full-name": user === null || user === void 0 ? void 0 : user.fullName, key: "creator", scale: scale, thumbnail: (user === null || user === void 0 ? void 0 : user.thumbnail) && HubInitiatives.getUserThumbnailUrl(_context.hubRequestOptions.portal, user, (_a = _context.hubRequestOptions.authentication) === null || _a === void 0 ? void 0 : _a.token), "user-id": user === null || user === void 0 ? void 0 : user.id, username: user === null || user === void 0 ? void 0 : user.username }),
    ];
    if (outOfContext) {
      el.push(index.h("calcite-avatar", { "full-name": discussions.getChannelName(channel, channelGroups, intl.t('unnamedChannel')), scale: "m" }));
    }
    if (parentCreator) {
      el = (index.h("arcgis-hub-discussions-popover", { channel: channel, channelGroups: channelGroups, index: index$1, isHub: isHub, parent: parent, parentCreator: parentCreator, post: post, postCreator: postCreator, postCreatorOrg: postCreatorOrg }, el));
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
      return (index.h("calcite-action-group", { layout: "horizontal" }, actions.map(action => (index.h("calcite-action", { appearance: action.appearance, "data-action": action.text.toLowerCase(), icon: action.icon, key: action.text || action.pin, onClick: action.onClick, onMouseOver: action.onMouseOver, ref: action.ref, scale: "s", text: action.text, "text-enabled": Boolean(action.text) }))), isHub && (index.h("calcite-tooltip", { onCalciteTooltipBeforeOpen: this.handleCopyTooltipBeforeOpen, onCalciteTooltipClose: this.handleCopyTooltipClose, open: false, placement: "top", ref: element => {
          this.copyTooltipRef = element;
        }, referenceElement: this.copyActionRef }, index.h("span", null, intl.t('copied'))))));
    }
  }
  /**
   * Render the reply out of context view
   */
  renderReplyOutOfContext() {
    const { intl, errorMessage, index: index$1, lead, lastIndex, articleClass, handleReplyOutOfContextReadMore } = this;
    index$1 === undefined ? this.capturePostDeepLinkImpression() : this.capturePostListImpression();
    return (index.h("article", { class: {
        'out-of-context': true,
        'arcgis-hub-discussions-post-last': lead && index$1 === lastIndex,
        [articleClass]: Boolean(articleClass),
      }, ref: this.handleSetComponentRef }, this.renderMetadata('block', false, true, false, true, true, true, true, false), index.h("div", { class: "reply-body" }, index.h("arcgis-multiline-ellipsis", { "collapse-enabled": true, "expand-enabled": true, "expand-icon": intl.direction === 'rtl' ? 'arrow-left' : 'arrow-right', innerHTML: this.postBody, lines: 4, onClick: handleReplyOutOfContextReadMore }), this.renderGeography(true, false), this.renderReactions(), index.h("footer", null, this.renderActions()), errorMessage && (index.h("calcite-notice", { closable: true, kind: "danger", open: true, scale: "s" }, index.h("div", { slot: "title" }, intl.t('error')), index.h("div", { slot: "message" }, intl.t(errorMessage)))))));
  }
  /**
   * Renders the post geography
   * @param toggleable Component `toggleable` property value
   * @param expandable Component `expandable` property value
   */
  renderGeography(toggleable, expandable) {
    const { hasMap, channel, channelId, parentId, displayFieldKey, displayFieldValid, entity, isMobile, locationDescriptionText, locationListIsDisabled, post, postId, showLocations } = this;
    if (showLocations) {
      return (index.h("arcgis-hub-discussions-post-geography", { channel: channel, channelId: channelId, disabled: locationListIsDisabled, displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, expandable: expandable, hasMap: hasMap, isMobile: isMobile, locationDescriptionText: locationDescriptionText, parentId: parentId, post: post, postId: postId, showLocationDescriptionText: !isMobile, toggleable: toggleable, url: entity === null || entity === void 0 ? void 0 : entity.url }));
    }
  }
  /**
   * Renders the reply view
   */
  renderReply() {
    const { intl, errorMessage, channel, post, articleClass, lead, index: index$1, lastIndex } = this;
    const classes = {
      'arcgis-hub-discussions-post-lead': lead,
      'arcgis-hub-discussions-post-last': lead && index$1 === lastIndex,
    };
    if (articleClass) {
      classes[articleClass] = true;
    }
    index$1 === undefined ? this.capturePostDeepLinkImpression() : this.capturePostListImpression();
    return (index.h("article", { class: classes, ref: this.handleSetComponentRef }, index.h("arcgis-hub-discussions-post-chips", { channel: channel, index: index$1, post: post }), this.renderAvatars(), index.h("div", null, this.renderMetadata('inline', false, false, false, false, false, false, false, true), index.h("arcgis-multiline-ellipsis", { "collapse-enabled": true, "expand-enabled": true, innerHTML: this.postBody, lines: 4 }), this.renderGeography(true, false), index.h("footer", null, this.renderReactions(), this.renderActions(), this.renderActionMenu()), errorMessage && (index.h("calcite-notice", { closable: true, kind: "danger", open: true, scale: "s" }, index.h("div", { slot: "title" }, intl.t('error')), index.h("div", { slot: "message" }, intl.t(errorMessage)))))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "renderedEl": ["handleRenderedElChange"],
    "_context": ["handleContextChanged"]
  }; }
};
__decorate$4([
  minPromiseDelay.minPromiseDelayFactory({ delay: 300 })
], ArcgisHubDiscussionsPost.prototype, "fetchDependencies", null);
__decorate$4([
  memoize.MemoizeDecoratorFactory('post.body', 'post.status'),
  AutoLinkDecoratorFactory({
    ignoreTags: ['calcite-link'],
    replaceExisting: true,
    tagName: 'calcite-link',
  }),
  MentionPopoverTransformDecoratorFactory(),
  HighlightBlockedWordsDecoratorFactory('postBody', 'sc-arcgis-hub-discussions-post blocked'),
  sanitize.SanitizeDecoratorFactory({
    filterOptions: {
      whiteList: {
        'calcite-link': ['href', 'data-mention'],
      },
    },
    extendDefaults: true,
  })
], ArcgisHubDiscussionsPost.prototype, "postBody", null);
__decorate$4([
  memoize.MemoizeDecoratorFactory('post.title', 'post.status'),
  HighlightBlockedWordsDecoratorFactory('postTitle', 'sc-arcgis-hub-discussions-post blocked'),
  sanitize.SanitizeDecoratorFactory()
], ArcgisHubDiscussionsPost.prototype, "postTitle", null);
__decorate$4([
  callOnce.callOnceFactory()
], ArcgisHubDiscussionsPost.prototype, "capturePostDeepLinkImpression", null);
__decorate$4([
  callOnce.callOnceFactory()
], ArcgisHubDiscussionsPost.prototype, "capturePostListImpression", null);
__decorate$4([
  callOnce.callOnceFactory()
], ArcgisHubDiscussionsPost.prototype, "capturePostDeletedImpression", null);
__decorate$4([
  callOnce.callOnceFactory()
], ArcgisHubDiscussionsPost.prototype, "capturePostHiddenImpression", null);
ArcgisHubDiscussionsPost.style = arcgisHubDiscussionsPostCss;

const arcgisHubDiscussionsPostChipsCss = ":host{display:block}calcite-chip-group{display:flex;flex-direction:row;justify-content:flex-start;gap:0.25rem}:host([data-count=\"0\"]){display:none}.end{margin-left:auto}";

const ArcgisHubDiscussionsPostChips = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.post = undefined;
    this.index = undefined;
    this.channel = undefined;
    this.activeTooltip = null;
    context.bind(this, 'handleTooltipOpen', 'renderChip', 'handleChipMouseEnter', 'handleChipMouseOut');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  handleTooltipOpen(evt) {
    const { post, channel, chipsToRender, index } = this;
    const { tooltip: { telemetry } } = chipsToRender.find(chip => chip.type === evt.target.dataset.type);
    this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { postId: post.id, parentId: post.parentId, channelId: channel.id, channelAccess: channel.access, position: index }));
  }
  handleChipMouseEnter(evt) {
    this.activeTooltip = evt.target.dataset.type;
  }
  handleChipMouseOut() {
    this.activeTooltip = null;
  }
  get chipsToRender() {
    const { post, intl } = this;
    const chips = [];
    if (post.status === utils.PostStatus.HIDDEN || post.status === utils.PostStatus.BLOCKED) {
      chips.push({
        appearance: 'outline',
        icon: 'view-hide',
        kind: 'neutral',
        tooltip: {
          telemetry: index$1.dist.dictionary.category.interaction.action.open.label.tooltip.details.chipComponentWithStringHidden,
          text: post.status === utils.PostStatus.BLOCKED ? intl.t('chip.hidden.label.blocked') : intl.t('chip.hidden.label.moderator'),
        },
        type: 'hidden',
        value: intl.t('chip.hidden.text'),
      });
    }
    return chips;
  }
  renderChip(chip) {
    const { activeTooltip, handleTooltipOpen } = this;
    return (index.h(index.Fragment, null, index.h("calcite-chip", { appearance: chip.appearance, class: chip.type === 'hidden' && 'end', "data-type": chip.type, icon: chip.icon, id: chip.type, key: chip.type, kind: chip.kind, onMouseEnter: this.handleChipMouseEnter, onMouseOut: this.handleChipMouseOut, scale: "s", value: chip.value }, chip.value), chip.tooltip && (index.h("calcite-tooltip", { "data-type": chip.type, label: chip.tooltip.text, onCalciteTooltipOpen: handleTooltipOpen, open: activeTooltip === chip.type, overlayPositioning: 'fixed', placement: 'bottom', referenceElement: chip.type }, index.h("div", { class: "tooltip-body" }, chip.tooltip.text)))));
  }
  render() {
    const { chipsToRender, index: index$1, intl } = this;
    return (index.h(index.Host, { "data-count": chipsToRender.length, "data-element": "post-chips", "data-index": index$1 }, index.h("calcite-chip-group", { label: intl.t('label'), scale: "s" }, chipsToRender.map(this.renderChip))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubDiscussionsPostChips.style = arcgisHubDiscussionsPostChipsCss;

/**
 * Steps of original post authoring
 */
var STEP;
(function (STEP) {
  STEP["AUDIENCE"] = "audience";
  STEP["CONTENT"] = "content";
})(STEP || (STEP = {}));

var __rest$1 = (undefined && undefined.__rest) || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
async function searchChannelsWithRecentUserActivity(userId, hubRequestOptions) {
  const _a = await channels.searchChannels(Object.assign({ data: {
      num: 4,
      filterBy: utils.ChannelFilter.HAS_USER_POSTS,
      sortBy: utils.ChannelSort.LAST_ACTIVITY,
      sortOrder: utils.SortOrder.DESC,
    } }, hubRequestOptions)), { items: channels$1 } = _a, results = __rest$1(_a, ["items"]);
  const items = await Promise.all(channels$1.map(async (channel) => {
    const channelGroupsPromises = Promise.all(channel.groups.map(async (groupId) => {
      let group;
      try {
        group = await teams.fetchTeamFromCache(groupId, hubRequestOptions);
      }
      catch (e) {
        group = null;
      }
      return group;
    }));
    const searchPostsPromise = discussions.searchPosts(Object.assign({ data: {
        start: 1,
        num: 1,
        sortBy: utils.PostSort.CREATED_AT,
        sortOrder: utils.SortOrder.DESC,
        channels: [channel.id],
        creator: userId,
        relations: [utils.PostRelation.REACTIONS],
      } }, hubRequestOptions));
    const [channelGroups, { items: [post], },] = await Promise.all([channelGroupsPromises, searchPostsPromise]);
    return {
      channel,
      channelError: null,
      channelGroups,
      channelId: channel.id,
      post,
    };
  }));
  const hasDiscussableGroups = channelDetails => {
    var _a;
    return ((_a = channelDetails.channelGroups) === null || _a === void 0 ? void 0 : _a.length)
      ? channelDetails.channelGroups.every(group => !group || utils.isDiscussable(group))
      : true;
  };
  return Object.assign(Object.assign({}, results), { items: items.filter(hasDiscussableGroups) });
}

const arcgisHubDiscussionsPostEditorCss = "arcgis-hub-discussions-post-editor:not([parent-id]){display:block;border-radius:0.25rem;background-color:var(--calcite-color-foreground-1);padding:0.75rem;--tw-shadow:0 2px 8px 0 rgba(0, 0, 0, 0.12);--tw-shadow-colored:0 2px 8px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.hub-discussions-post-editor-header{margin-bottom:1.5rem;display:grid;grid-template-rows:repeat(1, minmax(0, 1fr));align-items:center;column-gap:0.75rem;grid-template-columns:44px auto 44px}.hub-discussions-post-editor-header__title{margin:0px;text-align:center;font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}.hub-discussions-post-editor-header__popover{padding:1rem;margin-top:revert;margin-bottom:revert}.hub-discussions-post-editor-recent__header{margin-top:1.5rem;margin-bottom:0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}.hub-discussions-post-editor-groups__action{margin-top:0.75rem}.hub-discussions-post-editor-recent__list{margin-top:0px;margin-bottom:0px;list-style-type:none;padding:0px}.hub-discussions-post-editor-recent__item{margin-bottom:0.75rem;margin-top:0px;display:grid;grid-auto-flow:column;grid-template-rows:repeat(2, minmax(0, 1fr));column-gap:0.75rem;grid-template-columns:44px auto 44px}.hub-discussions-post-editor-recent__item:last-child{margin-bottom:0px}.hub-discussions-post-editor-recent__avatar{grid-row:span 2 / span 2}.hub-discussions-post-editor-recent__title{font-weight:var(--calcite-font-weight-bold);overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.hub-discussions-post-editor-recent__last-activity{font-size:var(--calcite-font-size--1);line-height:1rem;font-style:normal;color:var(--calcite-color-text-2)}.hub-discussions-post-editor-recent__action{grid-row:span 2 / span 2}.hub-discussions-post-editor-post-actions,.hub-discussions-post-editor-geometry-actions{margin-top:1rem;display:flex;justify-content:flex-end}.hub-discussions-post-editor-post-actions>calcite-action{margin-right:auto}.hub-discussions-post-editor-geometry-actions__feature,.hub-discussions-post-editor-geometry-actions__related,.hub-discussions-post-editor-post-actions__primary,.hub-discussions-post-editor-post-actions__secondary{margin-left:0.75rem}arcgis-hub-discussions-post-editor.rtl .hub-discussions-post-editor-geometry-actions__feature,arcgis-hub-discussions-post-editor.rtl .hub-discussions-post-editor-geometry-actions__related,arcgis-hub-discussions-post-editor.rtl .hub-discussions-post-editor-post-actions__primary,arcgis-hub-discussions-post-editor.rtl .hub-discussions-post-editor-post-actions__secondary{margin-left:0px;margin-right:0.75rem}.hub-discussions-post-editor__title{margin:0px;margin-top:1rem;height:auto;width:100%;resize:none;border-style:none;background-color:var(--calcite-color-foreground-1);padding:0px;font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1);--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.hub-discussions-post-editor__title:focus{--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);outline:2px solid transparent;outline-offset:2px}.hub-discussions-post-editor__title::placeholder{color:var(--calcite-color-text-3);opacity:1}.hub-discussions-post-editor__body{margin-top:0.5rem}.hub-discussions-post-editor__body[scale=m] .ck.ck-editor__editable{border-style:none;background-color:var(--calcite-color-foreground-1);padding:0px;font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-color-text-1);outline:2px solid transparent;outline-offset:2px;min-height:6rem}.hub-discussions-post-editor__body .ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable){border-style:none;outline:2px solid transparent;outline-offset:2px}.hub-discussions-post-editor__body[scale=m] .ck.ck-editor__editable .ck-placeholder:before{color:var(--calcite-color-text-3)}.hub-discussions-post-editor__body .ck.ck-editor__editable_inline>:first-child{margin-top:0px}.hub-discussions-post-editor__body .ck.ck-editor__editable_inline>:last-child{margin-bottom:0px}.hub-discussions-post-editor__message{margin-top:0.5rem}.hub-discussions-post-editor__empty,.hub-discussions-post-editor__load-error{margin-top:1rem}.hub-discussions-post-editor__crud-error,.hub-discussions-post-editor__not-discussable-notice{margin-top:1rem}.hub-discussions-post-editor-cancel-confirm__header{margin-left:0px;margin-right:0px;margin-top:0.5rem;margin-bottom:0px;display:block;font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold)}.hub-discussions-post-editor-cancel-confirm__message{margin-top:0.5rem;margin-bottom:0px}.hub-discussions-post-editor-cancel-confirm__footer{margin-top:1.5rem;display:flex;justify-content:flex-end;column-gap:0.75rem}.hub-discussions-post-editor-recent__skeleton{margin-bottom:0.75rem;margin-top:0px}.hub-discussions-post-editor-recent__skeleton arcgis-skeleton-loader{display:flex}@keyframes shimmer{0%{background-size:200% 100%;background-position:100% 0}100%{background-size:200% 100%;background-position:-100% 0}}.hub-discussions-post-editor-recent__skeleton arcgis-skeleton-loader>div:nth-of-type(1),.hub-discussions-post-editor-recent__skeleton arcgis-skeleton-loader>div:nth-of-type(2) div{animation:shimmer 2s cubic-bezier(0.4, 0, 0.2, 0.8) infinite;background-image:linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0) 100%);background-color:var(--calcite-color-foreground-3)}.hub-discussions-post-editor-recent__skeleton arcgis-skeleton-loader>div:nth-of-type(1){height:2.75rem;width:2.75rem;border-radius:50%}.hub-discussions-post-editor-recent__skeleton arcgis-skeleton-loader>div:nth-of-type(2){margin-left:1rem;display:flex;flex-grow:1;flex-direction:column;justify-content:center}.hub-discussions-post-editor-recent__skeleton arcgis-skeleton-loader>div:nth-of-type(2) div:nth-of-type(1){margin-bottom:0.5rem;height:0.75rem;border-radius:0.375rem}.hub-discussions-post-editor-recent__skeleton arcgis-skeleton-loader>div:nth-of-type(2) div:nth-of-type(2){height:0.5rem;border-radius:0.25rem}.location-popover>div.popover,.popover{max-width:20rem;padding-top:0.75rem;padding-bottom:0.75rem;padding-left:1.25rem;padding-right:1.25rem}.add-location-post:active .add-location-icon{--tw-text-opacity:1;color:rgb(21 21 21 / var(--tw-text-opacity))}.add-location-post[active] .add-location-icon{--tw-text-opacity:1;color:rgb(21 21 21 / var(--tw-text-opacity))}arcgis-hub-discussions-post-editor[parent-id]{display:block}.hub-discussions-reply-editor__form{border-radius:0.25rem;background-color:var(--calcite-color-foreground-1);padding:0.75rem;--tw-shadow:0 2px 8px 0 rgba(0, 0, 0, 0.12);--tw-shadow-colored:0 2px 8px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.hub-discussions-reply-editor-user-details{margin:0px;display:grid;align-items:center;column-gap:0.75rem;grid-template-columns:32px auto}.hub-discussions-reply-editor-user-details__name{font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-bold);font-style:normal}.hub-discussions-reply-editor__notice,.hub-discussions-reply-editor__not-discussable-notice{margin-left:0px;margin-right:0px;margin-top:1rem}.hub-discussions-post-editor-cancel-confirm{display:block}.hub-discussions-post-editor-cancel-confirm__button{margin:0px}.hub-discussions-reply-editor__body{margin-top:0.75rem}.hub-discussions-reply-editor__body[scale=m] .ck.ck-editor__editable{border-style:none;background-color:var(--calcite-color-foreground-1);padding:0px;font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-color-text-1);outline:2px solid transparent;outline-offset:2px;min-height:6rem}.hub-discussions-reply-editor__body .ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable){border-style:none;outline:2px solid transparent;outline-offset:2px}.hub-discussions-reply-editor__body[scale=m] .ck.ck-editor__editable .ck-placeholder:before{color:var(--calcite-color-text-3)}.hub-discussions-reply-editor__body .ck.ck-editor__editable_inline>:first-child{margin-top:0px}.hub-discussions-reply-editor__body .ck.ck-editor__editable_inline>:last-child{margin-bottom:0px}.hub-discussions-reply-editor__message{margin-top:0.5rem}.hub-discussions-reply-editor__location-popover>div.hub-discussions-reply-editor__location-popover__content,.hub-discussions-reply-editor__location-popover__content{max-width:20rem;padding-top:0.75rem;padding-bottom:0.75rem;padding-left:1.25rem;padding-right:1.25rem}.add-location-post:active .add-location-icon{--tw-text-opacity:1;color:rgb(21 21 21 / var(--tw-text-opacity))}.add-location-post[active] .add-location-icon{--tw-text-opacity:1;color:rgb(21 21 21 / var(--tw-text-opacity))}arcgis-hub-discussions-post-editor>form>header{padding-top:0.25rem;padding-bottom:1rem;text-align:center;font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold);text-transform:capitalize;color:var(--calcite-color-text-1)}.anon-toggle{margin-bottom:0.75rem;display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;border-radius:0.75rem;background-color:var(--calcite-color-background);padding:1rem}.anon-toggle p:first-of-type{margin:0px;color:var(--calcite-color-text-1)}.anon-toggle p:nth-of-type(2){margin:0px;flex-basis:100%;font-size:var(--calcite-font-size--2);line-height:1rem;color:var(--calcite-color-text-2)}";

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
const ArcgisHubDiscussionsPostEditor = class {
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubDiscussionsPostEditorReady = index.createEvent(this, "arcgisHubDiscussionsPostEditorReady", 7);
    this.arcgisHubDiscussionsPostCancel = index.createEvent(this, "arcgisHubDiscussionsPostCancel", 7);
    this.arcgisHubDiscussionsPostCreate = index.createEvent(this, "arcgisHubDiscussionsPostCreate", 7);
    this.arcgisHubDiscussionsPostEdit = index.createEvent(this, "arcgisHubDiscussionsPostEdit", 7);
    this.arcgisHubDiscussionsPostChanged = index.createEvent(this, "arcgisHubDiscussionsPostChanged", 7);
    this.arcgisHubDiscussionsGeometryDrawCreate = index.createEvent(this, "arcgisHubDiscussionsGeometryDrawCreate", 7);
    this.arcgisHubDiscussionsGeometryDrawTypeSelect = index.createEvent(this, "arcgisHubDiscussionsGeometryDrawTypeSelect", 7);
    this.arcgisHubDiscussionsGeometryDrawEdit = index.createEvent(this, "arcgisHubDiscussionsGeometryDrawEdit", 7);
    this.arcgisHubDiscussionsGeometryDrawReset = index.createEvent(this, "arcgisHubDiscussionsGeometryDrawReset", 7);
    this.arcgisHubDiscussionsGeometrySelect = index.createEvent(this, "arcgisHubDiscussionsGeometrySelect", 7);
    this.arcgisHubDiscussionsGeometryDeselect = index.createEvent(this, "arcgisHubDiscussionsGeometryDeselect", 7);
    this.arcgisHubDiscussionsGeometryClearAll = index.createEvent(this, "arcgisHubDiscussionsGeometryClearAll", 7);
    this.arcgisHubDiscussionsPostClose = index.createEvent(this, "arcgisHubDiscussionsPostClose", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
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
    this._context = state.getGlobalContext();
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
    context.bind(this, 'handleSubmit', 'handleCancel', 'handleCancelOrConfirm', 'handleConfirmBackButtonClicked', 'updateTitleValue', 'handleSelectRecentChannel', 'handleChannelSelectedFromCombobox', 'handleBack', 'focusInput', 'handleGroupSearchOpened', 'proceedToContentCreation', 'setActiveGeometryDrawType', 'handleReplySubmit', 'handleHelpPopoverOpen', 'handleLocationPopoverOpen', 'handleHelpPopoverClose', 'handleLocationPopoverClose', 'handleBodyElementRef', 'handleTitleElementRef', 'getMentionQuery', 'handleAnonToggle');
  }
  /**
   * Component will load lifecycle method, fetches translations and data
   * needed to render the UI
   */
  async componentWillLoad() {
    const [intl] = await Promise.all([intlManager.intlManager.loadIntlForComponent(this.element), this.initialize(this._context)]);
    this.intl = intl;
    this.initializeValues();
  }
  connectedCallback() {
    state.connectContext(this);
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
      _post = util.cloneObject(post);
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
      fetchParentUserDetails.fetchPostDetails({ postId, post }, _context.hubRequestOptions),
      fetchEntityDetails.fetchEnvironmentDetails({ isHub }, _context.hubRequestOptions),
    ]);
    const [postUserDetails, parentDetails] = await Promise.all([
      fetchParentUserDetails.fetchPostUserDetails(Object.assign({ postCreator, postCreatorOrg }, postDetails), _context.hubRequestOptions),
      fetchParentUserDetails.fetchParentDetails(Object.assign({ parentId, parent }, postDetails), _context.hubRequestOptions),
    ]);
    const [entityDetails, channelDetails, parentUserDetails] = await Promise.all([
      fetchEntityDetails.fetchEntityDetails(Object.assign(Object.assign({ discussion, entityId, entityType, entity, displayFieldKey, displayFieldValid, displayFieldValue, locationId }, postDetails), parentDetails), _context.hubRequestOptions),
      fetchChannelDetails.fetchChannelDetails(Object.assign(Object.assign({ channelId, channel: channel, channelGroups, channelGroupIds, channelAccess }, postDetails), parentDetails), _context.hubRequestOptions),
      fetchParentUserDetails.fetchParentUserDetails(Object.assign({ parentCreator }, parentDetails), _context.hubRequestOptions),
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
        const geometryClone = util.cloneObject(geometry);
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
        this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.viewed.label.empty);
      }
      else {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.viewed.label.recents), { response: index$1.dist.constants.response.SUCCESS }));
      }
      return items;
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.viewed.label.recents), { response: index$1.dist.constants.response.FAILURE }));
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
    const days = Math.floor(delta / dateTime.TIME_INTERVAL.DAY);
    const timeStr = this.intl.formatRelativeTime(-days, dateTime.TIME_UNIT.DAY);
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
    this.emitHubTelemetry(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.select.label.groups.details.recents), { position: index }));
    this.proceedToContentCreation();
  }
  /**
   * Handles users clicking the Select Group button after having selected
   * a group from the combobox
   */
  handleChannelSelectedFromCombobox() {
    this.emitHubTelemetry(index$1.dist.dictionary.category.interaction.action.select.label.groups);
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
        teams.fetchTeamFromCache(groupId, _context.hubRequestOptions),
        channels.searchChannels(Object.assign({ data: {
            num: 1,
            groups: [groupId],
            access: [utils.SharingAccess.PRIVATE],
          } }, _context.hubRequestOptions)),
      ]);
      if (channel) {
        this.channel = channel;
        this.channelGroups = [group];
        this.channelId = channel.id;
      }
      else {
        this.channel = {
          access: utils.SharingAccess.PRIVATE,
          groups: [group.id],
          orgs: [_context.currentUser.orgId],
        };
        this.channelGroups = [group];
        this.channelId = null;
      }
      this.emitHubTelemetry(index$1.dist.dictionary.category.interaction.action.select.label.groups);
    }
    else {
      this.emitHubTelemetry(index$1.dist.dictionary.category.interaction.action.deselect.label.groups);
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
      uri = discussions.augmentDiscussionURIWithFeature(uri, layerId, Array.from(objectIds));
    }
    let geometry = null;
    if (_unsavedFeatures.length) {
      geometry = _unsavedFeatures.length > 1 ? discussions.featuresToGeometryCollection(_unsavedFeatures) : _unsavedFeatures[0].geometry;
    }
    this.errorMessage = null;
    let post;
    const channelProps = (channel === null || channel === void 0 ? void 0 : channel.id)
      ? { channelId: channel.id }
      : {
        access: (channel === null || channel === void 0 ? void 0 : channel.access) || utils.SharingAccess.PRIVATE,
        groups: (channel === null || channel === void 0 ? void 0 : channel.groups) || [],
      };
    try {
      const { id } = await discussions.createPost(Object.assign({ data: Object.assign(Object.assign({}, channelProps), { discussion: uri, title: titleValue.trim() || undefined, body: bodyValue.trim(), geometry,
          asAnonymous }), mentionUrl: window.location.href }, _context.hubRequestOptions));
      post = await discussions.fetchPost(Object.assign({ postId: id, data: {
          relations: [utils.PostRelation.REACTIONS],
        } }, this._context.hubRequestOptions));
      post.replyCount = 0;
      channel = await channels$1.fetchChannel(Object.assign({ channelId: post.channelId }, _context.hubRequestOptions));
      const updatedChannelOwner = discussions.determineChannelOwner(channel, channelGroups);
      if (channel.creator === _context.currentUser.username && channel.creator !== updatedChannelOwner) {
        await channels$1.updateChannel(Object.assign({ channelId: post.channelId, data: { creator: updatedChannelOwner } }, _context.hubRequestOptions));
      }
      this.titleValue = '';
      this.bodyValue = '';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.create.label.post), { response: index$1.dist.constants.response.SUCCESS, details: (_a = post.title) !== null && _a !== void 0 ? _a : null, groupId: channel.groups.join(', '), postId: post.id, channelId: channel.id, channelAccess: channel.access }));
      arcgisHubDiscussionsPostCreate.emit(post);
      this.focusInput();
      return post;
    }
    catch (e) {
      this.errorMessage = 'error.create';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.create.label.post), { response: index$1.dist.constants.response.FAILURE, groupId: channel === null || channel === void 0 ? void 0 : channel.groups.join(', '), channelId, channelAccess: channel === null || channel === void 0 ? void 0 : channel.access }));
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
      uri = discussions.augmentDiscussionURIWithFeature(uri, layerId, objectIds);
    }
    const originalPostFeatures = this.geometryValue && Object.keys(this.geometryValue).length ? discussions.postToFeatures(Object.assign(Object.assign({}, post), { geometry: this.geometryValue })) : [];
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
          ? discussions.featuresToGeometryCollection(combinedFeatures)
          : combinedFeatures[0].geometry.coordinates.length
            ? combinedFeatures[0].geometry
            : null;
    }
    return discussions.updatePost(Object.assign({ postId: post.id, data: {
        title: titleValue.trim() || null,
        body: bodyValue.trim(),
        discussion: uri,
        geometry,
      }, mentionUrl: window.location.href }, _context.hubRequestOptions))
      .then(editedPost => discussions.fetchPost(Object.assign({ postId: editedPost.id, data: {
        relations: [utils.PostRelation.REACTIONS, utils.PostRelation.REPLIES],
      } }, this._context.hubRequestOptions)))
      .then(editedPost => {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.post), { response: index$1.dist.constants.response.SUCCESS, postId: post.id, channelId, channelAccess: channel.access }));
      editedPost.replyCount = editedPost.replies.total;
      delete editedPost.replies;
      arcgisHubDiscussionsPostEdit.emit(editedPost);
      return editedPost;
    })
      .catch(e => {
      this.errorMessage = 'error.edit';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.post), { response: index$1.dist.constants.response.FAILURE, postId: post.id, channelId, channelAccess: channel.access }));
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.close.label.editor), { groupId: (_b = (_a = channelGroups === null || channelGroups === void 0 ? void 0 : channelGroups[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null, groupAccess: (_c = channelGroups === null || channelGroups === void 0 ? void 0 : channelGroups[0].access) !== null && _c !== void 0 ? _c : null, parentId: (_d = parent === null || parent === void 0 ? void 0 : parent.id) !== null && _d !== void 0 ? _d : null, postId: (_e = post === null || post === void 0 ? void 0 : post.id) !== null && _e !== void 0 ? _e : null, channelId: (_f = channel === null || channel === void 0 ? void 0 : channel.id) !== null && _f !== void 0 ? _f : null, channelAccess: (_g = channel === null || channel === void 0 ? void 0 : channel.access) !== null && _g !== void 0 ? _g : null }));
    const event = this.arcgisHubDiscussionsPostCancel.emit();
    this.collapse();
    this.confirmCancel = false;
    const geometryClone = util.cloneObject(post === null || post === void 0 ? void 0 : post.geometry);
    this.geometryValue = Object.keys(geometryClone || {}).length ? geometryClone : null;
    this.titleValue = (_h = post === null || post === void 0 ? void 0 : post.title) !== null && _h !== void 0 ? _h : '';
    this.bodyValue = (_j = post === null || post === void 0 ? void 0 : post.body) !== null && _j !== void 0 ? _j : '';
    this._unsavedExistingFeatures = (_k = this.unsavedExistingFeatures) !== null && _k !== void 0 ? _k : [];
    this._unsavedFeatures = (_l = this.unsavedFeatures) !== null && _l !== void 0 ? _l : [];
    this._unsavedRelatedFeatures = (_m = this.unsavedRelatedFeatures) !== null && _m !== void 0 ? _m : [];
    if (event.defaultPrevented) {
      return;
    }
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
      this.emitHubTelemetry(Object.assign({}, index$1.dist.dictionary.category.interaction.action.close.label.editor.details.addPost));
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
    this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.open.label.popover.details.help);
  }
  /**
   * Emit telemetry when help popover is closed
   */
  handleHelpPopoverClose() {
    this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.close.label.popover.details.help);
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
    this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.open.label.search);
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
        const { features } = discussions.parseDiscussionURI(this.discussionValue);
        const layerId = this.entity.url.split('/').pop();
        features.splice(features.indexOf(relatedFeatureId), 1);
        this.discussionValue = discussions.augmentDiscussionURIWithFeature(this.discussionValue.split('?')[0], layerId, features);
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
    return titleValue.length <= discussions.MAX_TITLE_LENGTH;
  }
  /**
   * Computes if the body value is valid
   */
  get isBodyValid() {
    const { bodyValue } = this;
    const trimmed = bodyValue.trim();
    return trimmed.length > 0 && trimmed.length <= discussions.MAX_BODY_LENGTH;
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
    if (length >= discussions.MAX_TITLE_LENGTH - 5) {
      return isTitleValid
        ? {
          status: 'idle',
          text: intl.t('post.title.validation.warning'),
        }
        : {
          icon: 'exclamation-mark-circle',
          status: 'invalid',
          text: intl.t('post.title.validation.error', { characters: length - discussions.MAX_TITLE_LENGTH }),
        };
    }
  }
  /**
   * Computes body warning/error messages
   */
  get bodyMessage() {
    const { bodyValue, isBodyValid, intl } = this;
    const { length } = bodyValue;
    if (length >= discussions.WARNING_BODY_LENGTH) {
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
      const areGroupsDiscussable = (channelGroups === null || channelGroups === void 0 ? void 0 : channelGroups.length) ? channelGroups.every(group => !group || utils.isDiscussable(group)) : true;
      const isSubjectDiscussable = utils.isDiscussable(entity);
      if (!areGroupsDiscussable && !isSubjectDiscussable) {
        variant = isReply ? fetchParentUserDetails.ArcgisHubDiscussionsBlockedNoticeVariant.EditReply : fetchParentUserDetails.ArcgisHubDiscussionsBlockedNoticeVariant.EditPost;
      }
      else if (!areGroupsDiscussable) {
        variant = isReply ? fetchParentUserDetails.ArcgisHubDiscussionsBlockedNoticeVariant.EditReplyGroup : fetchParentUserDetails.ArcgisHubDiscussionsBlockedNoticeVariant.EditPostGroup;
      }
      else if (!isSubjectDiscussable) {
        if (entityType === 'group') {
          variant = isReply ? fetchParentUserDetails.ArcgisHubDiscussionsBlockedNoticeVariant.EditReplyGroup : fetchParentUserDetails.ArcgisHubDiscussionsBlockedNoticeVariant.EditPostGroup;
        }
        else {
          variant = isReply ? fetchParentUserDetails.ArcgisHubDiscussionsBlockedNoticeVariant.EditReplyItem : fetchParentUserDetails.ArcgisHubDiscussionsBlockedNoticeVariant.EditPostItem;
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
    const query = utils.getChannelUsersQuery([input], channel, (_a = _context.currentUser) === null || _a === void 0 ? void 0 : _a.username);
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
    return (index.h("calcite-button", { appearance: "solid", class: "hub-discussions-post-editor-post-actions__primary", disabled: disabled || pending, key: "primary", kind: "brand", label: text, loading: pending, round: true, scale: "l", type: "submit" }, text));
  }
  /**
   * Renders the editor's secondary action button, currently the cancel
   * edit/create post button
   */
  renderSecondaryActionButton() {
    const { post, isReply, intl, handleCancelOrConfirm } = this;
    const text = intl.t('cancel');
    if (!isReply || (isReply && post)) {
      return (index.h("calcite-button", { appearance: "transparent", class: "hub-discussions-post-editor-post-actions__secondary", kind: "neutral", label: text, onClick: handleCancelOrConfirm, round: true, scale: "l", type: "reset" }, text));
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
        return (index.h("calcite-action", { active: addLocationsActiveGeometryType === type, "data-type": type, icon: icon, key: type, onClick: this.setActiveGeometryDrawType, text: intl.t(`location.action.${type}`), textEnabled: true }));
      });
      return (index.h(index.Fragment, null, index.h("calcite-action", { active: addLocationsPopoverOpen, appearance: "solid", class: "add-location-post", disabled: !hasMap || Boolean(blockedNotice), ref: (locationActionElement) => {
          this.locationActionElement = locationActionElement;
        }, text: intl.t('location.heading') }, index.h("calcite-icon", { class: "add-location-icon", icon: "pin-plus", scale: "s" })), index.h("calcite-tooltip", { closeOnClick: true, label: intl.t('location.tooltip'), referenceElement: this.locationActionElement }, index.h("span", null, intl.t('location.tooltip'))), hasMap && !blockedNotice && (index.h("calcite-popover", { autoClose: true, label: intl.t('location.heading'), onCalcitePopoverClose: handleLocationPopoverClose, onCalcitePopoverOpen: handleLocationPopoverOpen, overlayPositioning: "fixed", pointerDisabled: true, ref: (locationPopoverElement) => {
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
      return (index.h(index.Fragment, null, index.h("input", { "aria-label": intl.t('post.title.label'), class: "hub-discussions-post-editor__title", disabled: Boolean(blockedNotice), onInput: updateTitleValue, placeholder: intl.t('post.title.placeholder'), ref: this.handleTitleElementRef, type: "text", value: titleValue }), titleMessage && (index.h("calcite-input-message", { class: "hub-discussions-post-editor__message", icon: titleMessage.icon, scale: "l", status: titleMessage.status }, titleMessage.text))));
    }
  }
  /**
   * Renders the body field
   */
  renderBodyField() {
    const { createParentBodyPlaceholderText, intl, bodyValue, bodyMessage, pending, getMentionQuery, blockedNotice, asAnonymous } = this;
    return (index.h(index.Fragment, null, index.h("arcgis-hub-rich-text", { class: "hub-discussions-post-editor__body", disabled: Boolean(blockedNotice) || pending, getMentionQuery: getMentionQuery, label: intl.t('post.body.label'), mention: !asAnonymous, mentionCount: 100, placeholder: createParentBodyPlaceholderText || intl.t('post.body.placeholder'), ref: this.handleBodyElementRef, "text-transform": true, toolbar: "", value: bodyValue }), bodyMessage && (index.h("calcite-input-message", { class: "hub-discussions-post-editor__message", icon: bodyMessage.icon, scale: "l", status: bodyMessage.status }, bodyMessage.text))));
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
    const { postId, post, postCreator, postCreatorOrg, channel, channelGroups, index: index$1, isHub, asAnonymous } = this;
    return (index.h("arcgis-hub-discussions-post-header", { channel: channel, channelGroups: channelGroups, class: "hub-discussions-post-editor__header", displayAnon: asAnonymous, iconScale: iconScale, index: index$1, isHub: isHub, post: postId && channel && post, postCreator: postId && channel && postCreator, postCreatorOrg: postId && channel && postCreatorOrg, showChannelAccessIcon: showChannelAccessIcon, showChannelAvatar: showChannelAvatar, showChannelName: showChannelName, showCreatorAvatar: showCreatorAvatar, showCreatorUsername: showCreatorUsername, showPopover: showPostPopover, showTimestamp: showTimestamp }));
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
    return channel.allowAsAnonymous && !postId && (index.h("div", { class: "anon-toggle" }, index.h("calcite-switch", { disabled: hasMentionedUsers, label: intl.t('anonymous.label'), onCalciteSwitchChange: this.handleAnonToggle, ref: (anonToggleRef) => {
        this.anonToggleRef = anonToggleRef;
      } }), index.h("p", null, intl.t("anonymous.label")), asAnonymous &&
      index.h("p", null, intl.t("anonymous.desc")), hasMentionedUsers &&
      index.h("calcite-tooltip", { referenceElement: this.anonToggleRef }, index.h("span", null, intl.t("anonymous.tooltip")))));
  }
  /**
   * Renders the UI for creating/editing post content step
   */
  renderContentStep() {
    const { intl, post, errorMessage, blockedNotice, isCollapsed, showHeader } = this;
    return this.confirmCancel ? (this.renderConfirmCancel()) : (index.h("form", { onSubmit: this.handleSubmit }, Boolean(showHeader && post) && index.h("header", null, intl.t('editPost')), this.renderAnonToggle(), isCollapsed ? this.renderPostHeader('m', true) : this.renderPostHeader('l', true, true, true, true, true, false, true), this.renderTitleField(), this.renderBodyField(), this.renderGeographies(), index.h("div", { class: "hub-discussions-post-editor-post-actions" }, this.renderAddLocationsButton(), !isCollapsed && this.renderSecondaryActionButton(), this.renderPrimaryActionButton()), blockedNotice && index.h("arcgis-hub-discussions-blocked-notice", { class: "hub-discussions-post-editor__not-discussable-notice", scale: "s", variant: blockedNotice }), errorMessage && (index.h("calcite-notice", { class: "hub-discussions-post-editor__crud-error", kind: "danger", open: true, scale: "s" }, index.h("div", { slot: "title" }, intl.t('error.title')), index.h("div", { slot: "message" }, errorMessage && intl.t(errorMessage))))));
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
      return (index.h("header", { class: "hub-discussions-post-editor-header" }, Boolean(config) && (index.h("calcite-button", { appearance: "outline-fill", disabled: confirmCancel, "icon-start": config.icon, kind: "neutral", label: intl.t(`header.${step}.back`), onClick: config.action, round: true, scale: "l", type: "button" })), index.h("p", { class: "hub-discussions-post-editor-header__title" }, intl.t(`header.${step}.title`)), index.h("calcite-button", { appearance: "transparent", disabled: confirmCancel, "icon-start": "lightbulb", kind: "neutral", label: intl.t('header.help'), ref: (helpButtonRef) => {
          this.helpButtonRef = helpButtonRef;
        }, round: true, scale: "l", type: "button" }), index.h("calcite-popover", { closable: true, label: intl.t('header.help'), onCalcitePopoverClose: handleHelpPopoverClose, onCalcitePopoverOpen: handleHelpPopoverOpen, placement: "bottom-end", referenceElement: this.helpButtonRef }, index.h("p", { class: "hub-discussions-post-editor-header__popover" }, intl.t(`header.${step}.help`)))));
    }
  }
  /**
   * Renders the UI for cancel confirmation
   */
  renderConfirmCancel() {
    const { intl, handleConfirmBackButtonClicked, handleCancel, isReply } = this;
    return (index.h("div", { class: "hub-discussions-post-editor-cancel-confirm" }, index.h("header", { class: "hub-discussions-post-editor-cancel-confirm__header" }, intl.t('confirm.header')), index.h("p", { class: "hub-discussions-post-editor-cancel-confirm__message" }, intl.t(isReply ? 'confirm' : 'confirm.body')), index.h("footer", { class: "hub-discussions-post-editor-cancel-confirm__footer" }, index.h("calcite-button", { appearance: "transparent", class: "hub-discussions-post-editor-cancel-confirm__button", kind: "neutral", onClick: handleConfirmBackButtonClicked, round: true, scale: "l" }, intl.t('confirm.back')), index.h("calcite-button", { class: "hub-discussions-post-editor-cancel-confirm__button", kind: "danger", onClick: handleCancel, round: true, scale: "l" }, intl.t('confirm.discard')))));
  }
  /**
   * Renders the UI for the group selection step
   */
  renderGroupSelectionStep() {
    const { intl, channelGroups, handleChannelSelectedFromCombobox, _context } = this;
    return (index.h(index.Fragment, null, index.h("calcite-combobox", { "clear-disabled": true, label: intl.t('groups.label'), placeholder: intl.t('groups.placeholder'), scale: "l", "selection-mode": "single", value: channelGroups ? channelGroups[0].id : null }, _context.currentUser.groups.map(group => {
      const canDiscuss = utils.isDiscussable(group);
      return index.h("calcite-combobox-item", { disabled: !canDiscuss, heading: group.title, icon: canDiscuss ? undefined : 'circle-disallowed', key: group.id, label: group.title,
        // textLabel is deprecated, but also required by calcite in v2.12.1
        textLabel: group.title, value: group.id });
    })), (channelGroups === null || channelGroups === void 0 ? void 0 : channelGroups.length) && (index.h("calcite-button", { class: "hub-discussions-post-editor-groups__action", onClick: handleChannelSelectedFromCombobox, round: true, scale: "l", type: "button", width: "full" }, intl.t('groups.label'))), this.renderRecentChannels()));
  }
  /**
   * Renders a channel details
   * @param channelDetails An IChannelDetails object
   * @param index The index to build the data-channel-index value
   * @returns
   */
  renderRecentChannelDetails(channelDetails, index$1) {
    const { intl, handleSelectRecentChannel } = this;
    const { post, channel, channelGroups } = channelDetails;
    const timeStr = post
      ? intl.t('groups.posted', { timeStr: this.formatTimeString(post.createdAt) })
      : intl.t('groups.created', { timeStr: this.formatTimeString(channel.createdAt) });
    return (index.h("li", { class: "hub-discussions-post-editor-recent__item", key: channel.id }, index.h("calcite-avatar", { class: "hub-discussions-post-editor-recent__avatar", "full-name": discussions.getChannelName(channel, channelGroups, intl.t('unnamedChannel')), scale: "l" }), index.h("b", { class: "hub-discussions-post-editor-recent__title" }, discussions.getChannelName(channel, channelGroups, intl.t('unnamedChannel'))), index.h("i", { class: "hub-discussions-post-editor-recent__last-activity" }, timeStr), index.h("calcite-button", { appearance: "outline-fill", class: "hub-discussions-post-editor-recent__action", "data-channel-index": index$1, "icon-start": "chevron-right", kind: "neutral", onClick: handleSelectRecentChannel, round: true, scale: "l", type: "button" })));
  }
  /**
   * Renders a recent channel skeleton loader
   * @param index The index to build the key
   */
  renderRecentChannelSkeleton(index$1) {
    return (index.h("li", { class: "hub-discussions-post-editor-recent__skeleton", key: `skeleton-${index$1}` }, index.h("arcgis-skeleton-loader", { active: true, rows: 0, showFooter: false, showHeading: false, showThumbnail: false }, index.h("div", null), index.h("div", null, index.h("div", null), index.h("div", null)))));
  }
  /**
   * Renders the empty state when no recent channels exist yet
   */
  renderRecentChannelsEmpty() {
    const { intl } = this;
    return (index.h("calcite-notice", { class: "hub-discussions-post-editor__empty", open: true, scale: "m" }, index.h("div", { slot: "title" }, intl.t('empty.title')), index.h("div", { slot: "message" }, intl.t('empty.message')), index.h("calcite-link", { href: "https://doc.arcgis.com/en/hub/team/how-discussions-work.htm", iconEnd: "launch", slot: "link" }, intl.t('empty.link'))));
  }
  /**
   * Renders the error when recent channels fail to load
   */
  renderRecentChannelsError() {
    const { errorMessage, intl } = this;
    return (index.h("calcite-notice", { class: "hub-discussions-post-editor__load-error", kind: "danger", open: true }, index.h("div", { slot: "title" }, intl.t('error.load.title')), index.h("div", { slot: "message" }, errorMessage && intl.t(errorMessage))));
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
      rendered = (index.h("ul", { class: "hub-discussions-post-editor-recent__list" }, recentChannelsResults.map((recentChannelResult, index) => recentChannelResult ? this.renderRecentChannelDetails(recentChannelResult, index) : this.renderRecentChannelSkeleton(index))));
    }
    else {
      rendered = this.renderRecentChannelsEmpty();
    }
    return (index.h(index.Fragment, null, index.h("header", { class: "hub-discussions-post-editor-recent__header" }, intl.t('recentChannels')), rendered));
  }
  /**
   * Renders the UI for creating net new posts
   */
  renderCreate() {
    return (index.h(index.Fragment, null, this.renderHeader(), this.step === STEP.AUDIENCE ? this.renderGroupSelectionStep() : this.renderContentStep()));
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
    return (index.h(index.Host, { class: { rtl: isRtl }, "data-element": "discussions-post-editor" }, Boolean(_context) && !loading && (isReply ? this.renderReplyEditor() : this.renderPostEditor())));
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
    if (bodyValue.trim().length >= discussions.WARNING_BODY_LENGTH) {
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
      uri = discussions.augmentDiscussionURIWithFeature(uri, layerId, Array.from(objectIds));
    }
    let geometry = null;
    if (_unsavedFeatures.length) {
      geometry = _unsavedFeatures.length > 1 ? discussions.featuresToGeometryCollection(_unsavedFeatures) : _unsavedFeatures[0].geometry;
    }
    this.errorMessage = null;
    return discussions.createReply(Object.assign({ postId: parent.id, data: {
        discussion: uri,
        body: bodyValue.trim(),
        geometry,
        asAnonymous
      }, mentionUrl: window.location.href }, _context.hubRequestOptions))
      .then(reply => {
      this.bodyValue = '';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.create.label.reply), { response: index$1.dist.constants.response.SUCCESS, postId: reply.id, parentId: parent.id, channelId: channel.id, channelAccess: channel.access }));
      return discussions.fetchPost(Object.assign({ postId: reply.id, data: {
          relations: [utils.PostRelation.REACTIONS],
        } }, _context.hubRequestOptions));
    })
      .then(reply => {
      reply.replyCount = 0;
      arcgisHubDiscussionsPostCreate.emit(reply);
      return reply;
    })
      .catch(e => {
      this.errorMessage = 'createFailure';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.create.label.reply), { response: index$1.dist.constants.response.FAILURE, parentId: parent.id, channelId: channel.id, channelAccess: channel.access }));
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
      uri = discussions.augmentDiscussionURIWithFeature(uri, layerId, objectIds);
    }
    const originalPostFeatures = this.geometryValue && Object.keys(this.geometryValue).length ? discussions.postToFeatures(Object.assign(Object.assign({}, post), { geometry: this.geometryValue })) : [];
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
        geometry = discussions.featuresToGeometryCollection(combinedFeatures);
      }
      else {
        geometry = combinedFeatures[0].geometry.coordinates.length ? combinedFeatures[0].geometry : null;
      }
    }
    return discussions.updatePost(Object.assign({ postId: post.id, data: {
        body: bodyValue.trim(),
        discussion: uri,
        geometry,
      }, mentionUrl: window.location.href }, _context.hubRequestOptions))
      .then(updatedReply => discussions.fetchPost(Object.assign({ postId: updatedReply.id, data: {
        relations: [utils.PostRelation.REACTIONS],
      } }, _context.hubRequestOptions)))
      .then(updatedReply => {
      updatedReply.replyCount = 0;
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.reply), { response: index$1.dist.constants.response.SUCCESS, postId: post.id, parentId, channelId: channel.id, channelAccess: channel.access }));
      arcgisHubDiscussionsPostEdit.emit(updatedReply);
      return updatedReply;
    })
      .catch(e => {
      this.errorMessage = 'editFailure';
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.reply), { response: index$1.dist.constants.response.FAILURE, postId: post.id, parentId, channelId: channel.id, channelAccess: channel.access }));
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
    return (index.h(index.Fragment, null, index.h("arcgis-hub-rich-text", { class: "hub-discussions-reply-editor__body", disabled: Boolean(blockedNotice) || pending, getMentionQuery: getMentionQuery, label: intl.t('inputLabel'), mention: !asAnonymous, mentionCount: 100, placeholder: placeholder, ref: this.handleBodyElementRef, "text-transform": true, toolbar: "", value: bodyValue }), inputMessage && (index.h("calcite-input-message", { class: "hub-discussions-reply-editor__message", icon: inputMessage.icon, scale: "l", status: inputMessage.status }, inputMessage.text))));
  }
  /**
   * Renders the post geographies
   */
  renderGeographies() {
    const { channelId, channel, hasMap, postWithLocationEdits, _unsavedFeatures, _unsavedRelatedFeatures, _unsavedExistingFeatures, displayFieldValid, displayFieldKey, blockedNotice, isMobile, parentId, entity, showLocations, } = this;
    if (showLocations) {
      return (index.h("arcgis-hub-discussions-post-geography", { channel: channel, channelId: channelId, disabled: !hasMap, disabledActions: Boolean(blockedNotice), displayFieldKey: displayFieldKey, displayFieldValid: displayFieldValid, hasMap: hasMap, isMobile: isMobile, parentId: parentId, post: postWithLocationEdits, postId: postWithLocationEdits === null || postWithLocationEdits === void 0 ? void 0 : postWithLocationEdits.id, renderedInEditor: true, showLocationDescriptionText: !isMobile, unsavedExistingFeatures: _unsavedExistingFeatures, unsavedFeatures: _unsavedFeatures, unsavedRelatedFeatures: _unsavedRelatedFeatures, url: entity === null || entity === void 0 ? void 0 : entity.url }));
    }
  }
  /**
   * Renders the editor form controls
   */
  renderEditor() {
    const { intl, errorMessage, blockedNotice } = this;
    return (index.h(index.Fragment, null, this.renderInput(), this.renderGeographies(), index.h("div", { class: "hub-discussions-post-editor-post-actions" }, this.renderAddLocationsButton(), this.renderSecondaryActionButton(), this.renderPrimaryActionButton()), blockedNotice && index.h("arcgis-hub-discussions-blocked-notice", { class: "hub-discussions-reply-editor__not-discussable-notice", scale: "s", variant: blockedNotice }), errorMessage && (index.h("calcite-notice", { class: "hub-discussions-reply-editor__notice", kind: "danger", open: true, scale: "s" }, index.h("div", { slot: "title" }, intl.t('error')), index.h("div", { slot: "message" }, intl.t(errorMessage))))));
  }
  /**
   * Renders the reply editor
   */
  renderReplyEditor() {
    const { confirmCancel } = this;
    return (index.h("form", { class: "hub-discussions-reply-editor__form", onSubmit: this.handleReplySubmit }, this.renderAnonToggle(), this.renderPostHeader('m', true), confirmCancel ? this.renderConfirmCancel() : this.renderEditor()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "_context": ["initialize"],
    "titleValue": ["handleTitleBodyValueUpdate"],
    "bodyValue": ["handleTitleBodyValueUpdate"],
    "geometryValue": ["handleGeometryValueUpdated"],
    "unsavedFeatures": ["mapFeaturePropToState"],
    "unsavedExistingFeatures": ["mapExistingFeaturePropToState"],
    "unsavedRelatedFeatures": ["mapRelatedFeaturePropToState"],
    "addLocationsActiveGeometryType": ["handleAddLocationsActiveGeometryTypeChanged"],
    "step": ["handleStepChanged"]
  }; }
};
__decorate$3([
  memoize.MemoizeDecoratorFactory('bodyValue')
], ArcgisHubDiscussionsPostEditor.prototype, "hasMentionedUsers", null);
__decorate$3([
  minPromiseDelay.minPromiseDelayFactory({ delay: 300 })
], ArcgisHubDiscussionsPostEditor.prototype, "_fetchRecentChannelDetails", null);
__decorate$3([
  callWhen.CallWhenFactory({
    when() {
      return (!this.isMobile || this.showLocations) && this.hasMap;
    },
  })
], ArcgisHubDiscussionsPostEditor.prototype, "renderAddLocationsButton", null);
ArcgisHubDiscussionsPostEditor.style = arcgisHubDiscussionsPostEditorCss;

const arcgisHubDiscussionsPostGeographyCss = ":host{display:block}:host([data-count=\"0\"]){display:none}.overflow{padding-left:1rem}calcite-icon{padding:1rem}arcgis-skeleton-loader:first-of-type{margin-top:0px}arcgis-skeleton-loader{margin-top:1rem;margin-bottom:1rem;display:grid;column-gap:1rem;grid-template-columns:1.75rem auto}arcgis-skeleton-loader:last-of-type{margin-bottom:0px}@keyframes shimmer{0%{background-size:200% 100%;background-position:100% 0}100%{background-size:200% 100%;background-position:-100% 0}}arcgis-skeleton-loader>div:nth-of-type(1),arcgis-skeleton-loader>div:nth-of-type(2)>div{animation:shimmer 2s cubic-bezier(0.4, 0, 0.2, 0.8) infinite;background-image:linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0) 100%);background-color:var(--calcite-color-foreground-3)}arcgis-skeleton-loader>div:nth-of-type(1){height:1.75rem;width:1.75rem;border-radius:9999px}arcgis-skeleton-loader>div:nth-of-type(2){display:grid;align-items:center;row-gap:0.5rem}arcgis-skeleton-loader>div:nth-of-type(2)>div:nth-of-type(1){height:0.75rem;border-radius:0.375rem}arcgis-skeleton-loader>div:nth-of-type(2)>div:nth-of-type(2){height:0.5rem;border-radius:0.25rem}.discussions-post-geography-edit-icon,.discussions-post-geography-delete-icon{padding:0px}.discussions-post-geography-edit:active .discussions-post-geography-edit-icon{--tw-text-opacity:1;color:rgb(21 21 21 / var(--tw-text-opacity))}.discussions-post-geography-edit[active] .discussions-post-geography-edit-icon{--tw-text-opacity:1;color:rgb(21 21 21 / var(--tw-text-opacity))}.discussions-post-geography-delete:active .discussions-post-geography-delete-icon{--tw-text-opacity:1;color:rgb(21 21 21 / var(--tw-text-opacity))}calcite-list[disabled]{opacity:100%}calcite-list-item{--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}";

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
const ArcgisHubDiscussionsPostGeography = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubDiscussionsPostGeographySelect = index.createEvent(this, "arcgisHubDiscussionsPostGeographySelect", 7);
    this.arcgisHubDiscussionsPostGeographyHover = index.createEvent(this, "arcgisHubDiscussionsPostGeographyHover", 7);
    this.arcgisHubDiscussionsPostViewAllGeography = index.createEvent(this, "arcgisHubDiscussionsPostViewAllGeography", 7);
    this.arcgisHubDiscussionsPostEdit = index.createEvent(this, "arcgisHubDiscussionsPostEdit", 7);
    this.arcgisHubDiscussionsGeometryDrawEdit = index.createEvent(this, "arcgisHubDiscussionsGeometryDrawEdit", 7);
    this.arcgisHubDiscussionsGeometryDrawEditCancel = index.createEvent(this, "arcgisHubDiscussionsGeometryDrawEditCancel", 7);
    this.arcgisHubDiscussionsFeatureRemove = index.createEvent(this, "arcgisHubDiscussionsFeatureRemove", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    /**
     * Default value for maxEntryCount
     */
    this.defaultMaxEntryCount = 4;
    this.intl = undefined;
    this.maxEntryCount = this.defaultMaxEntryCount;
    this.relatedFeatures = undefined;
    this.relatedFeatureIds = [];
    this.activeEditIndex = -1;
    this.loading = true;
    this.postId = undefined;
    this.post = undefined;
    this.parentId = undefined;
    this.channel = undefined;
    this.channelId = undefined;
    this.disabled = undefined;
    this.disabledActions = undefined;
    this.displayFieldValid = undefined;
    this.displayFieldKey = undefined;
    this.unsavedFeatures = undefined;
    this.unsavedRelatedFeatures = undefined;
    this.unsavedExistingFeatures = [];
    this.hasMap = undefined;
    this.expandable = undefined;
    this.toggleable = undefined;
    this.url = undefined;
    this.renderedInEditor = undefined;
    this.isMobile = undefined;
    this.showLocationDescriptionText = undefined;
    this.locationDescriptionText = undefined;
    context.bind(this, 'handleGeometrySelected', 'handleToggleAllGeography', 'handleViewAllGeography', 'handleGeometryHovered', 'renderButton', 'renderGeographyItem', 'renderGeographies', 'handleDelete', 'handleEdit');
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  get _context() {
    return state.getGlobalContext();
  }
  get featuresLoaded() {
    var _a;
    return this.relatedFeatureIds.length
      ? this.relatedFeatureIds.length === ((_a = this.relatedFeatures) === null || _a === void 0 ? void 0 : _a.length)
      : true;
  }
  componentWillLoad() {
    this.initialize();
  }
  async initialize() {
    this.fetchRelatedFeatures();
    this.updateFeatures();
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  updateFeatures() {
    var _a;
    const ids = discussions.pluckDiscussionFeatureIds((_a = this === null || this === void 0 ? void 0 : this.post) === null || _a === void 0 ? void 0 : _a.discussion);
    if (JSON.stringify(ids) !== JSON.stringify(this.relatedFeatureIds)) {
      this.relatedFeatureIds = ids || [];
    }
  }
  handleRelatedFeatureIdsChange() {
    this.relatedFeatures = [];
    this.fetchRelatedFeatures();
  }
  updateLoading() {
    const { intl, featuresLoaded } = this;
    this.loading = !Boolean(intl && featuresLoaded);
  }
  handleFeatureUpdated() {
    this.activeEditIndex = -1;
  }
  async fetchRelatedFeatures() {
    const { url, relatedFeatureIds } = this;
    this.relatedFeatures = relatedFeatureIds.length
      ? (await discussions.fetchRelatedFeatures(url, relatedFeatureIds))
      : [];
  }
  emitHubTelemetry(telemetry) {
    const { postId, parentId, channelId, channel } = this;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { postId,
      parentId,
      channelId, channelAccess: channel === null || channel === void 0 ? void 0 : channel.access }));
  }
  /**
   * Get specific details related to geography list item in the list
   * @param evt Mouse Event
   * @returns IFeaturePositionDetails object
   */
  findGeometryFromClickEvent(evt) {
    var _a;
    const { relatedFeatures, unsavedFeatures, unsavedRelatedFeatures, geometries, post } = this;
    const { dataset: { index: _index, related, unsaved } } = evt.target;
    const index = Number(_index);
    const isRelatedFeature = related !== undefined;
    const isStaged = unsaved !== undefined;
    let featureGeometry, relatedFeatureId, featureIndex;
    if (isStaged) {
      featureGeometry = isRelatedFeature
        ? unsavedRelatedFeatures[index - relatedFeatures.length - geometries.length].feature.geometry
        : unsavedFeatures[index - relatedFeatures.length - geometries.length - unsavedRelatedFeatures.length].geometry;
      relatedFeatureId = isRelatedFeature
        ? unsavedRelatedFeatures[index - relatedFeatures.length - geometries.length].objectId
        : null;
      featureIndex = (!isRelatedFeature)
        ? index - unsavedRelatedFeatures.length - geometries.length - relatedFeatures.length
        : null;
    }
    else {
      featureGeometry = isRelatedFeature
        ? relatedFeatures[index].geometry
        : post === null || post === void 0 ? void 0 : post.geometry;
      relatedFeatureId = isRelatedFeature
        ? relatedFeatures[index].id
        : null;
      featureIndex = (!isRelatedFeature && ((_a = post === null || post === void 0 ? void 0 : post.geometry) === null || _a === void 0 ? void 0 : _a.type) === 'GeometryCollection')
        ? index - relatedFeatures.length
        : null;
    }
    return {
      featureGeometry,
      relatedFeatureId,
      featureIndex,
      isStaged,
      originalIndex: index,
      isRelatedFeature
    };
  }
  handleGeometrySelected(evt) {
    const { post } = this;
    const { featureGeometry, relatedFeatureId, featureIndex, isStaged } = this.findGeometryFromClickEvent(evt);
    this.emitHubTelemetry(index$1.dist.dictionary.category.interaction.action.zoom.label.in);
    this.arcgisHubDiscussionsPostGeographySelect.emit({
      type: 'Feature',
      geometry: featureGeometry,
      properties: {
        id: post === null || post === void 0 ? void 0 : post.id,
        relatedFeatureId,
        index: featureIndex,
        unsaved: isStaged,
      }
    });
  }
  /**
   * Emits event when geometry is hovered over
   * @param evt MouseEvent
   */
  handleGeometryHovered(evt) {
    const { post } = this;
    const { featureGeometry, relatedFeatureId, featureIndex, isStaged } = this.findGeometryFromClickEvent(evt);
    this.arcgisHubDiscussionsPostGeographyHover.emit({
      type: 'Feature',
      geometry: featureGeometry,
      properties: {
        id: post === null || post === void 0 ? void 0 : post.id,
        relatedFeatureId,
        index: featureIndex,
        unsaved: isStaged,
      }
    });
  }
  /**
   * Emits event when geometry is removed
   * @param evt MouseEvent
   */
  handleDelete(evt) {
    evt.stopPropagation();
    const { post } = this;
    const { featureGeometry, relatedFeatureId, featureIndex, isStaged } = this.findGeometryFromClickEvent(evt);
    this.arcgisHubDiscussionsFeatureRemove.emit({
      type: 'Feature',
      geometry: featureGeometry,
      properties: {
        id: post === null || post === void 0 ? void 0 : post.id,
        relatedFeatureId,
        index: featureIndex,
        unsaved: isStaged,
      }
    });
    if (relatedFeatureId) {
      this.emitHubTelemetry(index$1.dist.dictionary.category.interaction.action.deselect.label.content);
    }
    else {
      const type = discussions.convertGeometryTypeToTelemetryString(featureGeometry);
      this.emitHubTelemetry(index$1.dist.dictionary.category.content.action.delete.label.location.details[type]);
    }
  }
  handleEdit(evt) {
    evt.stopPropagation();
    const { post } = this;
    const { featureGeometry, relatedFeatureId, featureIndex, isStaged, originalIndex: index } = this.findGeometryFromClickEvent(evt);
    const el = evt.target;
    this.activeEditIndex = !el.active ? index : -1;
    if (this.activeEditIndex > -1) {
      this.arcgisHubDiscussionsGeometryDrawEdit.emit({
        type: 'Feature',
        geometry: featureGeometry,
        properties: {
          id: post === null || post === void 0 ? void 0 : post.id,
          relatedFeatureId,
          index: featureIndex,
          unsaved: isStaged,
        }
      });
    }
    else {
      this.arcgisHubDiscussionsGeometryDrawEditCancel.emit();
    }
  }
  handleViewAllGeography() {
    this.emitHubTelemetry(index$1.dist.dictionary.category.interaction.action.open.label.thread);
    this.arcgisHubDiscussionsPostViewAllGeography.emit();
  }
  handleToggleAllGeography() {
    const { relatedFeatures, maxEntryCount, defaultMaxEntryCount, geometries } = this;
    if (maxEntryCount === defaultMaxEntryCount) {
      this.emitHubTelemetry(index$1.dist.dictionary.category.interaction.action.open.label.locations);
      this.maxEntryCount = relatedFeatures.length + geometries.length;
    }
    else {
      this.emitHubTelemetry(index$1.dist.dictionary.category.interaction.action.close.label.locations);
      this.maxEntryCount = defaultMaxEntryCount;
    }
  }
  get geometries() {
    const { post } = this;
    const geometries = [];
    if (post === null || post === void 0 ? void 0 : post.geometry) {
      post.geometry.type === 'GeometryCollection'
        ? geometries.push(...post.geometry.geometries)
        : geometries.push(post.geometry);
    }
    return geometries;
  }
  renderActions(index$1, isRelatedFeature, isStaged) {
    const { intl, activeEditIndex, hasMap, isMobile, disabledActions } = this;
    const isActive = index$1 === activeEditIndex;
    const actions = [
      index.h("calcite-action", { active: isActive, class: "discussions-post-geography-edit", "data-index": index$1, "data-related": isRelatedFeature, "data-unsaved": isStaged, disabled: disabledActions, key: "pencil", onClick: this.handleEdit, scale: "m", slot: "actions-end", text: intl.t('action.update') }, index.h("calcite-icon", { class: "discussions-post-geography-edit-icon", icon: "pencil", scale: "s" })),
      index.h("calcite-action", { class: "discussions-post-geography-delete", "data-index": index$1, "data-related": isRelatedFeature, "data-unsaved": isStaged, disabled: disabledActions, key: "trash", onClick: this.handleDelete, scale: "m", slot: "actions-end", text: intl.t('action.remove') }, index.h("calcite-icon", { class: "discussions-post-geography-delete-icon", icon: "trash", scale: "s" }))
    ];
    if (isRelatedFeature || !hasMap || isMobile) {
      // Edit actions only available on unsaved drawn geometries
      actions.shift();
    }
    return actions;
  }
  renderGeographyItem(feature, index$1, isRelatedFeature = false, isStaged = false) {
    const { intl, displayFieldValid, displayFieldKey, locationDescriptionText, showLocationDescriptionText } = this;
    const { geometry, properties } = feature;
    let desc;
    if (showLocationDescriptionText) {
      desc = (locationDescriptionText)
        ? locationDescriptionText
        : intl.t('description');
    }
    let label;
    let icon;
    let text;
    if (geometry.type === 'Point' || geometry.type === 'MultiPoint') {
      label = isRelatedFeature ? intl.t('displayField.existing') : intl.t('displayField.added');
      icon = 'pin';
      text = intl.t('point');
    }
    else if (geometry.type === 'LineString' || geometry.type === 'MultiLineString') {
      label = isRelatedFeature ? intl.t('displayField.existing') : intl.t('displayField.added');
      icon = 'freehand';
      text = intl.t('line');
    }
    else if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
      label = isRelatedFeature ? intl.t('displayField.existing.area') : intl.t('displayField.added.area');
      icon = 'freehand-area';
      text = intl.t('area');
    }
    if (isRelatedFeature && displayFieldValid) {
      // Use displayField if available to reference location
      label = properties[displayFieldKey];
    }
    return (index.h("calcite-list-item", { "data-index": index$1, "data-related": isRelatedFeature, "data-unsaved": isStaged, description: desc, label: label, onClick: this.handleGeometrySelected, onMouseOver: this.handleGeometryHovered }, index.h("calcite-icon", { icon: icon, scale: "s", slot: "content-start", textLabel: text }), this.renderActions(index$1, isRelatedFeature, isStaged)));
  }
  renderButton(listLength) {
    const { intl, maxEntryCount, defaultMaxEntryCount, expandable, toggleable } = this;
    if (expandable && listLength > maxEntryCount) {
      return index.h("calcite-action", { class: "overflow", onClick: this.handleViewAllGeography, scale: "s", text: intl.t('viewAll'), "text-enabled": true });
    }
    else if (toggleable && listLength > defaultMaxEntryCount) {
      return (index.h("calcite-action", { class: "overflow", onClick: this.handleToggleAllGeography, scale: "s", text: listLength > maxEntryCount ? intl.t('viewAll') : intl.t('viewLess'), "text-enabled": true }));
    }
  }
  get listItems() {
    const { geometries, relatedFeatures, maxEntryCount, expandable, toggleable, unsavedFeatures, unsavedRelatedFeatures, renderedInEditor } = this;
    const toGeographyItem = (acc, feature, isRelatedFeature = false, isStaged = false) => (acc.length < maxEntryCount || (!expandable && !toggleable))
      ? [...acc, this.renderGeographyItem(feature, acc.length, isRelatedFeature, isStaged)]
      : acc;
    // Related Features
    let listItems = relatedFeatures.reduce((acc, feature) => toGeographyItem(acc, feature, true), []);
    // Drawn Geometries
    listItems = geometries.reduce((acc, geometry) => toGeographyItem(acc, { geometry }), listItems);
    if (renderedInEditor) {
      // Unsaved Related Features
      listItems = unsavedRelatedFeatures.reduce((acc, { feature }) => toGeographyItem(acc, feature, true, true), listItems);
      // Unsaved Drawn Geometries
      listItems = unsavedFeatures.reduce((acc, feature) => toGeographyItem(acc, feature, false, true), listItems);
    }
    return listItems;
  }
  renderGeographies() {
    const { geometries, relatedFeatures, listItems, disabled } = this;
    return (index.h(index.Fragment, null, index.h("calcite-list", { disabled: disabled }, listItems), this.renderButton(relatedFeatures.length + geometries.length)));
  }
  renderSkeleton() {
    const { relatedFeatureIds, geometries } = this;
    const entries = relatedFeatureIds.length + geometries.length > 4 ? 4 : relatedFeatureIds.length + geometries.length;
    return Array.from({ length: entries }, (_, idx) => {
      return (index.h("arcgis-skeleton-loader", { active: true, key: idx, rows: 0, showFooter: false, showHeading: false, showThumbnail: false }, index.h("div", null), index.h("div", null, index.h("div", null), index.h("div", null))));
    });
  }
  render() {
    return (index.h(index.Host, { "data-count": this.loading ? 0 : this.listItems.length, "data-element": "discussions-post-geography" }, this.loading
      ? this.renderSkeleton()
      : this.renderGeographies()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "post": ["updateFeatures"],
    "relatedFeatureIds": ["handleRelatedFeatureIdsChange"],
    "intl": ["updateLoading"],
    "relatedFeatures": ["updateLoading"],
    "unsavedFeatures": ["handleFeatureUpdated"],
    "unsavedExistingFeatures": ["handleFeatureUpdated"]
  }; }
};
__decorate$2([
  callWhen.CallWhenFactory({ when() { return this.activeEditIndex > -1; } })
], ArcgisHubDiscussionsPostGeography.prototype, "handleFeatureUpdated", null);
__decorate$2([
  minPromiseDelay.minPromiseDelayFactory({ delay: 300 })
], ArcgisHubDiscussionsPostGeography.prototype, "fetchRelatedFeatures", null);
__decorate$2([
  callWhen.CallWhenFactory({ when() { return !this.disabled; } })
], ArcgisHubDiscussionsPostGeography.prototype, "handleGeometrySelected", null);
__decorate$2([
  callWhen.CallWhenFactory({ when() { return !this.disabled; } })
], ArcgisHubDiscussionsPostGeography.prototype, "handleGeometryHovered", null);
__decorate$2([
  callWhen.CallWhenFactory({ when() {
      const { _context: { currentUser }, channel, renderedInEditor } = this;
      const { post } = this;
      return renderedInEditor && (!post || canModifyPost(post, currentUser, channel));
    } })
], ArcgisHubDiscussionsPostGeography.prototype, "renderActions", null);
__decorate$2([
  callWhen.CallWhenFactory({ when: function ({ geometry }) { return Boolean(geometry); } })
], ArcgisHubDiscussionsPostGeography.prototype, "renderGeographyItem", null);
ArcgisHubDiscussionsPostGeography.style = arcgisHubDiscussionsPostGeographyCss;

const arcgisHubDiscussionsPostHeaderCss = ":host{display:block}address{display:grid;align-items:center;row-gap:0.25rem;font-style:normal}address:has(.metadata){grid-template-rows:repeat(2, minmax(0, 1fr));align-items:flex-start}address:has(.metadata.inline){grid-template-rows:repeat(1, minmax(0, 1fr));align-items:center;grid-template-columns:repeat(2, max-content)}address:has(calcite-avatar[scale=\"s\"]){grid-template-columns:32px auto}address:has(.metadata.inline):has(calcite-avatar[scale=\"s\"]){grid-template-columns:32px max-content max-content}address:has(calcite-avatar[scale=\"m\"]){grid-template-columns:40px auto}address:has(.metadata.inline):has(calcite-avatar[scale=\"m\"]){grid-template-columns:40px max-content max-content}address:has(calcite-avatar[scale=\"m\"]):has(calcite-avatar+calcite-avatar){grid-template-columns:50px auto}address:has(.metadata.inline):has(calcite-avatar[scale=\"m\"]):has(calcite-avatar+calcite-avatar){grid-template-columns:50px max-content max-content}address:has(calcite-avatar[scale=\"l\"]){grid-template-columns:52px auto}address:has(.metadata.inline):has(calcite-avatar[scale=\"l\"]){grid-template-columns:52px max-content max-content}address:has(calcite-avatar[scale=\"l\"]):has(calcite-avatar+calcite-avatar){grid-template-columns:62px auto}address:has(.metadata.inline):has(calcite-avatar[scale=\"l\"]):has(calcite-avatar+calcite-avatar){grid-template-columns:62px max-content max-content}arcgis-hub-discussions-popover{display:flex}address:has(.metadata) arcgis-hub-discussions-popover{grid-row:span 2 / span 2}address:has(.metadata.inline) arcgis-hub-discussions-popover{grid-row:span 1 / span 1}button{cursor:pointer;border-style:none;background-color:transparent;padding:0px}header{display:flex;align-items:flex-end;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-bold);text-transform:capitalize;color:var(--calcite-color-text-1)}address:has(.metadata):not(:has(.inline)) header{align-self:flex-end}.avatars{position:relative;display:flex}address:has(.metadata) .avatars{grid-row:span 2 / span 2}address:has(.metadata.inline) .avatars{grid-row:span 1 / span 1}.avatars:has(calcite-avatar[scale=\"s\"]){height:24px}.avatars:has(calcite-avatar[scale=\"s\"]):has(calcite-avatar+calcite-avatar){height:30px}.avatars:has(calcite-avatar[scale=\"m\"]){height:32px}.avatars:has(calcite-avatar[scale=\"m\"]):has(calcite-avatar+calcite-avatar){height:42px}.avatars:has(calcite-avatar[scale=\"l\"]){height:44px}.avatars:has(calcite-avatar[scale=\"l\"]):has(calcite-avatar+calcite-avatar){height:54px}.avatars calcite-avatar+calcite-avatar{position:absolute;z-index:10;border-radius:9999px;border:3px solid var(--calcite-color-foreground-1)}.avatars calcite-avatar+calcite-avatar[scale=\"s\"]{top:0.75rem;left:0.75rem}.avatars calcite-avatar+calcite-avatar[scale=\"m\"]{top:1rem;left:1rem}.metadata{display:flex;flex-wrap:nowrap;align-items:center;font-size:var(--calcite-font-size--1);line-height:1rem}.post-creator-username{font-style:normal;color:var(--calcite-color-text-2)}.post-creator-username::before{font-style:normal;color:var(--calcite-color-text-2);content:'@'}.channel-name{max-height:1rem;word-break:break-all;font-weight:var(--calcite-font-weight-medium);font-style:normal;color:var(--calcite-color-text-2);overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.metadata-separator{display:flex;width:1rem;justify-content:center;font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}.metadata arcgis-relative-date{white-space:nowrap}.access-icon{margin-top:-0.125rem}.replying-to calcite-icon{position:relative;top:3px;margin-right:0.25rem;transform:scaleY(-1)}";

const ArcgisHubDiscussionsPostHeader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubDiscussionsPostSelect = index.createEvent(this, "arcgisHubDiscussionsPostSelect", 7);
    this.postId = undefined;
    this.post = undefined;
    this.parent = undefined;
    this.postCreator = undefined;
    this.parentCreator = undefined;
    this.postCreatorOrg = undefined;
    this.channel = undefined;
    this.channelGroups = undefined;
    this.index = undefined;
    this.isHub = undefined;
    this.showCreatorAvatar = undefined;
    this.showCreatorUsername = undefined;
    this.showChannelAvatar = undefined;
    this.showPopover = undefined;
    this.showChannelName = undefined;
    this.showTimestamp = undefined;
    this.showChannelAccessIcon = undefined;
    this.showReplyingTo = undefined;
    this.showViewPostAction = undefined;
    this.displayAnon = undefined;
    this.iconScale = 'm';
    this.metadataOrientation = 'block';
    context.bind(this, 'handleViewPostClicked');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get _context() {
    return state.getGlobalContext();
  }
  get creator() {
    const { _context, post, postCreator, displayAnon } = this;
    if (post) {
      return postCreator;
    }
    else {
      return displayAnon ? null : _context.currentUser;
    }
  }
  get creatorFullName() {
    const { intl, post, creator } = this;
    let fullName = intl.t('anonymous');
    if (creator || (post === null || post === void 0 ? void 0 : post.creator)) {
      fullName = (creator === null || creator === void 0 ? void 0 : creator.fullName) || intl.t('privateUser');
    }
    return fullName;
  }
  get accessIcon() {
    const { intl, channel } = this;
    let icon;
    let label;
    if (channel.access === utils.SharingAccess.PRIVATE) {
      icon = 'lock';
      label = intl.t('visiblePrivate');
    }
    else if (channel.access === utils.SharingAccess.ORG) {
      icon = 'organization';
      label = intl.t('visibleOrg');
    }
    else {
      icon = 'globe';
      label = intl.t('visibleAll');
    }
    return { icon, label };
  }
  handleViewPostClicked() {
    this.arcgisHubDiscussionsPostSelect.emit();
  }
  renderAccessIcon() {
    const { accessIcon, showChannelAccessIcon } = this;
    if (showChannelAccessIcon) {
      return index.h("calcite-icon", { class: "access-icon", icon: accessIcon.icon, scale: "s", "text-label": accessIcon.label });
    }
  }
  renderPopover(avatars) {
    const { post, showPopover, postCreator, postCreatorOrg, channel, index: index$1, isHub, parent, parentCreator } = this;
    return post && showPopover ? (index.h("arcgis-hub-discussions-popover", { channel: channel, channelGroups: this.channelGroups, index: index$1, isHub: isHub, parent: parent, parentCreator: parentCreator, post: post, postCreator: postCreator, postCreatorOrg: postCreatorOrg }, avatars)) : (avatars);
  }
  renderAvatars() {
    const avatars = [this.renderCreatorAvatar(), this.renderChannelAvatar()].filter(Boolean);
    if (avatars.length) {
      const avatarContainer = index.h("div", { class: "avatars" }, avatars);
      return this.renderPopover(avatarContainer);
    }
  }
  renderCreatorAvatar() {
    var _a;
    const { post, creator, _context, showCreatorAvatar, iconScale, intl } = this;
    if (showCreatorAvatar) {
      const user = !creator && post ? { username: post === null || post === void 0 ? void 0 : post.creator } : creator;
      return (user === null || user === void 0 ? void 0 : user.username) ? (index.h("calcite-avatar", { "full-name": user === null || user === void 0 ? void 0 : user.fullName, scale: iconScale, thumbnail: (user === null || user === void 0 ? void 0 : user.thumbnail) && HubInitiatives.getUserThumbnailUrl(_context.hubRequestOptions.portal, user, (_a = _context.hubRequestOptions.authentication) === null || _a === void 0 ? void 0 : _a.token), "user-id": user === null || user === void 0 ? void 0 : user.id, username: user === null || user === void 0 ? void 0 : user.username })) : (index.h("calcite-avatar", { "full-name": intl.t('anonymous'), scale: iconScale, thumbnail: index.getAssetPath('./assets/no-user-thumb.jpeg') }));
    }
  }
  renderChannelAvatar() {
    const { channel, channelGroups, showChannelAvatar, iconScale, showCreatorAvatar, intl } = this;
    if (showChannelAvatar) {
      let scale;
      if (showCreatorAvatar) {
        if (iconScale === 'l') {
          scale = 'm';
        }
        else if (iconScale === 'm') {
          scale = 's';
        }
      }
      else {
        scale = iconScale;
      }
      if (scale) {
        return index.h("calcite-avatar", { "full-name": discussions.getChannelName(channel, channelGroups, intl.t('unnamedChannel')), scale: scale });
      }
    }
  }
  renderPostTimestamp() {
    const { showTimestamp, post } = this;
    if (showTimestamp && post) {
      return index.h("arcgis-relative-date", { dateTime: post.createdAt, formatStyle: "short" });
    }
  }
  renderHeader() {
    return index.h("header", null, this.creatorFullName);
  }
  renderChannelName() {
    const { showChannelName, channel, channelGroups, intl } = this;
    if (showChannelName) {
      return index.h("span", { class: "channel-name" }, discussions.getChannelName(channel, channelGroups, intl.t('unnamedChannel')));
    }
  }
  renderCreatorUsername() {
    const { post, showCreatorUsername } = this;
    if (showCreatorUsername && (post === null || post === void 0 ? void 0 : post.creator)) {
      return index.h("span", { class: "post-creator-username" }, post.creator);
    }
  }
  renderReplyingTo() {
    const { showReplyingTo, parentCreator, intl } = this;
    if (showReplyingTo && parentCreator) {
      return index.h("span", { class: "replying-to" }, index.h("calcite-icon", { icon: "right", scale: "s" }), intl.t('replyingTo', { fullName: parentCreator.fullName }));
    }
  }
  renderViewPostAction() {
    const { showViewPostAction, intl } = this;
    if (showViewPostAction) {
      return index.h("calcite-link", { onClick: this.handleViewPostClicked }, intl.t('viewPost'));
    }
  }
  get isMetadataInline() {
    return this.metadataOrientation === 'inline';
  }
  renderMetadata() {
    const children = [this.renderCreatorUsername(), this.renderChannelName(), this.renderReplyingTo(), this.renderViewPostAction(), this.renderPostTimestamp(), this.renderAccessIcon()].filter(Boolean).reduce((acc, child, idx) => this.isMetadataInline || idx > 0
      ? [
        ...acc,
        index.h("span", { class: "metadata-separator", key: `separator:${idx}` }, "\u00B7"),
        child,
      ]
      : [...acc, child], []);
    if (children.length) {
      return index.h("div", { class: { metadata: true, inline: this.isMetadataInline } }, children);
    }
  }
  render() {
    return (index.h(index.Host, null, index.h("address", null, this.renderAvatars(), this.renderHeader(), this.renderMetadata())));
  }
  static get assetsDirs() { return ["locales", "assets"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubDiscussionsPostHeader.style = arcgisHubDiscussionsPostHeaderCss;

/**
 * A collection of reactions to render in the "default reactions" popover
 */
const DEFAULT_REACTIONS = [
  utils.PostReaction.THUMBS_UP,
  utils.PostReaction.THINKING,
  utils.PostReaction.GRINNING,
  utils.PostReaction.PARTY_POPPER,
];
/**
 * The full collection of supported reactions.
 */
const ALL_REACTIONS = [
  ...DEFAULT_REACTIONS,
  utils.PostReaction.SLIGHTLY_SMILING,
  utils.PostReaction.CONFUSED,
  utils.PostReaction.LAUGH,
  utils.PostReaction.FACE_WITH_TEARS_OF_JOY,
  utils.PostReaction.WINKING,
  utils.PostReaction.PARTYING,
  utils.PostReaction.SAD,
  utils.PostReaction.SURPRISED,
  utils.PostReaction.THUMBS_DOWN,
  utils.PostReaction.CLAPPING_HANDS,
  utils.PostReaction.RAISING_HANDS,
  utils.PostReaction.WAVING_HAND,
  utils.PostReaction.HEART,
  utils.PostReaction.ONE_HUNDRED,
  utils.PostReaction.FIRE,
  utils.PostReaction.ROCKET,
  utils.PostReaction.UP_ARROW,
  utils.PostReaction.DOWN_ARROW,
  utils.PostReaction.EYES,
  utils.PostReaction.TROPHY,
  utils.PostReaction.WORLD_MAP,
];
/**
 * A map of reaction to emoji character and telemetry key values
 * See https://unicode.org/emoji/charts/full-emoji-list.html
 */
const REACTIONS_MAP = {
  [utils.PostReaction.SLIGHTLY_SMILING]: {
    emoji: '🙂',
    telemetryKey: 'smilingFace',
  },
  [utils.PostReaction.CONFUSED]: {
    emoji: '😕',
    telemetryKey: 'confusedFace',
  },
  [utils.PostReaction.LAUGH]: {
    emoji: '😀',
    telemetryKey: 'laughingFace',
  },
  [utils.PostReaction.GRINNING]: {
    emoji: '😆',
    telemetryKey: 'grinningFace',
  },
  [utils.PostReaction.FACE_WITH_TEARS_OF_JOY]: {
    emoji: '😂',
    telemetryKey: 'faceWithTearsOfJoy',
  },
  [utils.PostReaction.THINKING]: {
    emoji: '🤔',
    telemetryKey: 'thinkingFace',
  },
  [utils.PostReaction.WINKING]: {
    emoji: '😉',
    telemetryKey: 'winkingFace',
  },
  [utils.PostReaction.PARTYING]: {
    emoji: '🥳',
    telemetryKey: 'partyingFace',
  },
  [utils.PostReaction.SAD]: {
    emoji: '😥',
    telemetryKey: 'sadFace',
  },
  [utils.PostReaction.SURPRISED]: {
    emoji: '😲',
    telemetryKey: 'shockedFace',
  },
  [utils.PostReaction.THUMBS_UP]: {
    emoji: '👍',
    telemetryKey: 'thumbsUp',
  },
  [utils.PostReaction.THUMBS_DOWN]: {
    emoji: '👎',
    telemetryKey: 'thumbsDown',
  },
  [utils.PostReaction.CLAPPING_HANDS]: {
    emoji: '👏',
    telemetryKey: 'clappingHands',
  },
  [utils.PostReaction.RAISING_HANDS]: {
    emoji: '🙌',
    telemetryKey: 'raisingHands',
  },
  [utils.PostReaction.WAVING_HAND]: {
    emoji: '👋',
    telemetryKey: 'wavingHand',
  },
  [utils.PostReaction.HEART]: {
    emoji: '❤️',
    telemetryKey: 'redHeart',
  },
  [utils.PostReaction.ONE_HUNDRED]: {
    emoji: '💯',
    telemetryKey: 'hundredPoints',
  },
  [utils.PostReaction.FIRE]: {
    emoji: '🔥',
    telemetryKey: 'fire',
  },
  [utils.PostReaction.PARTY_POPPER]: {
    emoji: '🎉',
    telemetryKey: 'partyPopper',
  },
  [utils.PostReaction.ROCKET]: {
    emoji: '🚀',
    telemetryKey: 'rocket',
  },
  [utils.PostReaction.UP_ARROW]: {
    emoji: '⬆',
    telemetryKey: 'upArrow',
  },
  [utils.PostReaction.DOWN_ARROW]: {
    emoji: '⬇',
    telemetryKey: 'downArrow',
  },
  [utils.PostReaction.EYES]: {
    emoji: '👀',
    telemetryKey: 'eyes',
  },
  [utils.PostReaction.TROPHY]: {
    emoji: '🏆',
    telemetryKey: 'trophy',
  },
  [utils.PostReaction.WORLD_MAP]: {
    emoji: '🗺',
    telemetryKey: 'worldMap',
  },
};

const arcgisHubDiscussionsPostReactionsCss = ":host{display:inline-block}:host>div>calcite-button{margin-right:0.125rem;border-width:2px;border-style:solid;border-color:transparent;padding:0.125rem}:host>div>calcite-button:last-of-type{margin-right:0px}.submitted_reactions_list calcite-button{border-width:2px;border-style:solid;border-color:transparent;padding:0.125rem}.submitted_reactions_list calcite-button span{margin-left:0.25rem}calcite-button[aria-checked=\"true\"],calcite-button[data-reaction=\"add\"][aria-expanded=\"true\"]{border-color:var(--calcite-color-brand)}:host(.rtl) calcite-button[data-reaction=\"add\"]{transform:scaleX(-1)}calcite-button[aria-checked=\"true\"] span{font-weight:var(--calcite-font-weight-bold)}:host>div{display:flex}.submitted_reactions_list{margin:0px;display:inline-flex;list-style-type:none;padding:0px}.submitted_reactions_list li{margin-right:0.125rem}.user_reactions_popover{width:20rem}.user_reactions_list{margin:0px;display:grid;max-height:407px;list-style-type:none;grid-auto-flow:row;row-gap:0.75rem;overflow:auto;padding:0.75rem}.user_reaction_item{display:grid;grid-template-rows:repeat(2, minmax(0, 1fr));column-gap:0.75rem;row-gap:0.125rem;background-color:var(--calcite-color-foreground-1);grid-template-columns:2.75rem auto}.user_reaction_item:has(div:nth-of-type(3)){grid-template-columns:2.75rem auto minmax(0, 16px)}.user_reaction_item calcite-avatar{grid-row:span 2 / span 2;height:2.75rem;width:2.75rem}.user_reaction_item div:nth-of-type(1){display:flex;flex-grow:1;align-items:center;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-bold);text-transform:capitalize;color:var(--calcite-color-text-1)}.user_reaction_item div:nth-of-type(2){display:flex;align-items:center;font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}.user_reaction_item:has(div:nth-of-type(3)) div:nth-of-type(2){grid-row:span 2 / span 2;justify-content:flex-end}.user_reaction_item div:nth-of-type(2):before{content:'@'}.user_reaction_item:has(div:nth-of-type(3)) div:nth-of-type(2):before{content:''}.user_reaction_item div:nth-of-type(3){display:flex;align-items:center;font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}.user_reaction_item div:nth-of-type(3):before{content:'@'}arcgis-skeleton-loader{display:grid;grid-template-rows:repeat(2, minmax(0, 1fr));column-gap:0.75rem;row-gap:0.125rem;grid-template-columns:2.75rem auto}arcgis-skeleton-loader:has(div:nth-of-type(4)){grid-template-columns:2.75rem auto minmax(0, 16px)}@keyframes shimmer{0%{background-size:200% 100%;background-position:100% 0}100%{background-size:200% 100%;background-position:-100% 0}}arcgis-skeleton-loader>div:nth-of-type(1){animation:shimmer 2s cubic-bezier(0.4, 0, 0.2, 0.8) infinite;background-image:linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0) 100%);background-color:var(--calcite-color-foreground-3);grid-row:span 2 / span 2;height:2.75rem;width:2.75rem;border-radius:50%}arcgis-skeleton-loader>div:nth-of-type(2){display:flex;align-items:center}@keyframes shimmer{0%{background-size:200% 100%;background-position:100% 0}100%{background-size:200% 100%;background-position:-100% 0}}arcgis-skeleton-loader>div:nth-of-type(2) div{animation:shimmer 2s cubic-bezier(0.4, 0, 0.2, 0.8) infinite;background-image:linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0) 100%);background-color:var(--calcite-color-foreground-3);display:flex;flex-grow:1;border-radius:0.375rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}arcgis-skeleton-loader>div:nth-of-type(3){display:flex;align-items:center}@keyframes shimmer{0%{background-size:200% 100%;background-position:100% 0}100%{background-size:200% 100%;background-position:-100% 0}}arcgis-skeleton-loader>div:nth-of-type(3) div{animation:shimmer 2s cubic-bezier(0.4, 0, 0.2, 0.8) infinite;background-image:linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0) 100%);background-color:var(--calcite-color-foreground-3);display:flex;flex-grow:1;border-radius:0.375rem;font-size:var(--calcite-font-size--1);line-height:1rem}arcgis-skeleton-loader:has(div:nth-of-type(4))>div:nth-of-type(3){grid-row:span 2 / span 2;display:flex;align-items:center}@keyframes shimmer{0%{background-size:200% 100%;background-position:100% 0}100%{background-size:200% 100%;background-position:-100% 0}}arcgis-skeleton-loader::has(div:nth-of-type(4))>div:nth-of-type(3) div{animation:shimmer 2s cubic-bezier(0.4, 0, 0.2, 0.8) infinite;background-image:linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0) 100%);background-color:var(--calcite-color-foreground-3);display:flex;height:1rem;flex-grow:1;border-radius:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem}@keyframes shimmer{0%{background-size:200% 100%;background-position:100% 0}100%{background-size:200% 100%;background-position:-100% 0}}arcgis-skeleton-loader>div:nth-of-type(4) div{animation:shimmer 2s cubic-bezier(0.4, 0, 0.2, 0.8) infinite;background-image:linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0) 100%);background-color:var(--calcite-color-foreground-3);display:flex;flex-grow:1;border-radius:0.375rem;font-size:var(--calcite-font-size--1);line-height:1rem}.default_reactions{display:flex;flex-direction:row;padding:0.75rem}.default_reactions ul{margin-top:0px;margin-bottom:0px;margin-left:0px;margin-right:0.5rem;display:inline-flex;list-style-type:none;padding:0px}.default_reactions li{margin-right:0.5rem}.default_reactions li:last-of-type{margin-right:0px}.all_reactions_list{margin:0px;display:grid;list-style-type:none;grid-template-columns:repeat(5, minmax(0, 1fr));gap:0.5rem;padding:0.75rem}";

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
var __rest = (undefined && undefined.__rest) || function (s, e) {
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
const ArcgisHubDiscussionsPostReactions = class {
  /**
   * Pre-binds context to methods that get passed as references/callbacks.
   * @constructor
   */
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.arcgisHubDiscussionsPostReactionChange = index.createEvent(this, "arcgisHubDiscussionsPostReactionChange", 7);
    /**
     * A map of calcite-button refs for each of the reactions that have been submitted by users
     */
    this.reactionListButtons = {};
    this.postId = undefined;
    this.post = undefined;
    this.channel = undefined;
    this._context = state.getGlobalContext();
    this.showAllReactions = false;
    this.activePopover = null;
    this.pending = false;
    this.users = {};
    context.bind(this, 'handleAddReactionClick', 'handleViewAllReactionsClick', 'handleAddReactionPopoverClose', 'handleReactionFocus', 'handleReactionMouseEnter', 'handleReactionPopoverClose', 'handleReactionClicked', 'handleReactionPopoverOpen', 'handleReactionRef', 'deleteUserReaction', 'handleReactionPopoverBeforeOpen');
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
    const [intl] = await Promise.all([intlManager.intlManager.loadIntlForComponent(this.element), this.handlePostIdChanged(this.postId)]);
    this.intl = intl;
  }
  connectedCallback() {
    state.connectContext(this);
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
      const _a = await discussions.fetchPost(Object.assign({ postId, data: { relations: [utils.PostRelation.CHANNEL, utils.PostRelation.REACTIONS, utils.PostRelation.REPLIES] } }, _context.hubRequestOptions)), { channel } = _a, post = __rest(_a, ["channel"]);
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.open.label.popover.details.addReaction), { postId: post.id, parentId: post.parentId, channelId: channel.id, channelAccess: channel.access }));
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
      ? index$1.dist.dictionary.category.interaction.action.open.label.popover.details.reactionOverflow
      : index$1.dist.dictionary.category.interaction.action.open.label.popover.details[REACTIONS_MAP[reaction].telemetryKey];
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
    return fetchParentUserDetails.fetchMemberFromCache(username, this._context.hubRequestOptions).catch(_ => null);
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.create.label.reaction.details[REACTIONS_MAP[reaction].telemetryKey]), { postId: post.id, parentId: post.id, channelId: channel.id, channelAccess: channel.access, response: index$1.dist.constants.response.SUCCESS }));
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.create.label.reaction.details[REACTIONS_MAP[reaction].telemetryKey]), { postId: post.id, parentId: post.id, channelId: channel.id, channelAccess: channel.access, response: index$1.dist.constants.response.FAILURE }));
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.delete.label.reaction.details[REACTIONS_MAP[userReaction.value].telemetryKey]), { postId: post.id, parentId: post.id, channelId: channel.id, channelAccess: channel.access, response: index$1.dist.constants.response.SUCCESS }));
    }
    catch (e) {
      console.error('Failed to delete reaction:', userReaction.value, userReaction.id, e.message);
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.delete.label.reaction.details[REACTIONS_MAP[userReaction.value].telemetryKey]), { postId: post.id, parentId: post.id, channelId: channel.id, channelAccess: channel.access, response: index$1.dist.constants.response.FAILURE }));
      throw e;
    }
  }
  /**
   * Renders a list containing reaction count buttons and popovers
   * @returns a list element
   */
  renderList() {
    const { listReactions, reactionRecordGroups, intl, _context, activePopover, isDisabled, handleReactionPopoverClose, handleReactionPopoverOpen } = this;
    return (index.h("ul", { class: "submitted_reactions_list" }, listReactions.reduce((acc, reactionRecord) => {
      var _a;
      const isCurrentUserReaction = reactionRecord.creator === ((_a = _context.currentUser) === null || _a === void 0 ? void 0 : _a.username);
      const count = reactionRecordGroups[reactionRecord.value].length > 99 ? intl.t('reaction_count_99_plus') : reactionRecordGroups[reactionRecord.value].length;
      return [
        ...acc,
        index.h("li", { key: reactionRecord.value }, index.h("calcite-button", { appearance: "outline", "aria-checked": isCurrentUserReaction ? 'true' : 'false', "data-reaction": reactionRecord.value, disabled: isDisabled, kind: isCurrentUserReaction ? 'brand' : 'neutral', label: intl.t(isCurrentUserReaction ? 'reaction_list_label_remove' : 'reaction_list_label_add', {
            reaction: intl.t(reactionRecord.value),
            count,
          }), onClick: this.handleReactionClicked, onFocus: this.handleReactionFocus, onMouseEnter: this.handleReactionMouseEnter, ref: (reactionButton) => {
            this.reactionListButtons = Object.assign(Object.assign({}, this.reactionListButtons), { [reactionRecord.value]: reactionButton });
          }, role: "radio", round: true, scale: "m" }, REACTIONS_MAP[reactionRecord.value].emoji, index.h("span", null, count)), index.h("calcite-popover", { "auto-close": true, class: "user_reactions_popover", "data-reaction": reactionRecord.value, "focus-trap-disabled": true, heading: intl.t(reactionRecord.value), label: intl.t(reactionRecord.value), onCalcitePopoverBeforeOpen: this.handleReactionPopoverBeforeOpen, onCalcitePopoverClose: handleReactionPopoverClose, onCalcitePopoverOpen: handleReactionPopoverOpen, open: activePopover === reactionRecord.value, overlayPositioning: "fixed", placement: "bottom", referenceElement: this.reactionListButtons[reactionRecord.value], "trigger-disabled": true }, this.renderUserReactions(reactionRecordGroups[reactionRecord.value], false))),
      ];
    }, [])));
  }
  /**
   * Renders a user reaction skeleton state
   * @param showEmoji
   * @returns A skeleton loader element
   */
  renderUserSkeleton(showEmoji) {
    return (index.h("arcgis-skeleton-loader", { active: true, role: "listitem", rows: 0, showFooter: false, showHeading: false, showThumbnail: false }, index.h("div", null), index.h("div", null, index.h("div", null, "\u00A0")), showEmoji && (index.h("div", null, index.h("div", null, "\u00A0"))), index.h("div", null, index.h("div", null, "\u00A0"))));
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
    return (index.h("li", { "aria-label": intl.t('reaction_user_label', {
        userFullName: fullName,
        reaction: intl.t(userReaction.value),
      }), class: "user_reaction_item" }, index.h("calcite-avatar", { "full-name": user === null || user === void 0 ? void 0 : user.fullName, scale: "l", thumbnail: (user === null || user === void 0 ? void 0 : user.thumbnail) &&
        HubInitiatives.getUserThumbnailUrl(_context.hubRequestOptions.portal, {
          username: user.username,
          access: user.access,
          thumbnail: user.thumbnail,
        }, (_a = _context.hubRequestOptions.authentication) === null || _a === void 0 ? void 0 : _a.token), "user-id": user === null || user === void 0 ? void 0 : user.id, username: user === null || user === void 0 ? void 0 : user.username }), index.h("div", null, fullName), showEmoji && index.h("div", null, REACTIONS_MAP[userReaction.value].emoji), index.h("div", null, (user === null || user === void 0 ? void 0 : user.username) || intl.t('noUser'))));
  }
  /**
   * Renders a list of user reactions
   * @param userReactions The user reactions to render
   * @param showEmoji If the emoji should render
   * @returns a list item
   */
  renderUserReactions(userReactions, showEmoji) {
    const { users } = this;
    return (index.h("ul", { class: "user_reactions_list" }, userReactions.map(userReaction => (users[userReaction.creator] === undefined ? this.renderUserSkeleton(showEmoji) : this.renderUserReaction(userReaction, showEmoji)))));
  }
  /**
   * Renders the overflow button and popover
   * @returns a fragment
   */
  renderOverflow() {
    const { intl, overflowReactionRecords, handleReactionPopoverClose, handleReactionPopoverOpen, activePopover, isDisabled, overflowButton } = this;
    const count = overflowReactionRecords.length > 99 ? intl.t('reaction_count_99_plus') : intl.formatNumber(overflowReactionRecords.length, { signDisplay: 'always' });
    return (Boolean(overflowReactionRecords.length) && (index.h(index.Fragment, null, index.h("calcite-button", { appearance: "outline", "data-reaction": "overflow", disabled: isDisabled, kind: "neutral", label: intl.t(overflowReactionRecords.length > 1 ? 'n_more_reactions' : 'one_more_reaction', { count }), onFocus: this.handleReactionFocus, onMouseOver: this.handleReactionMouseEnter, ref: (overflowButton) => {
        this.overflowButton = overflowButton;
      }, round: true, scale: "m" }, count), index.h("calcite-popover", { "auto-close": true, class: "user_reactions_popover", "data-reaction": "overflow", "focus-trap-disabled": true, heading: intl.t('moreReactions'), label: intl.t('moreReactions'), onCalcitePopoverBeforeOpen: this.handleReactionPopoverBeforeOpen, onCalcitePopoverClose: handleReactionPopoverClose, onCalcitePopoverOpen: handleReactionPopoverOpen, open: activePopover === 'overflow', overlayPositioning: "fixed", placement: "bottom", referenceElement: overflowButton, "trigger-disabled": true }, this.renderUserReactions(overflowReactionRecords, true)))));
  }
  /**
   * Renders a list of the "default" reactions that initially render
   * in the add reaction popover
   * @returns a div
   */
  renderDefaultReactions() {
    const { currentUserReactions, intl, isDisabled } = this;
    return (index.h("div", { class: "default_reactions" }, index.h("ul", null, DEFAULT_REACTIONS.map(reaction => {
      const isCurrentUserReaction = currentUserReactions.find(currentUserReaction => currentUserReaction.value === reaction);
      return (index.h("li", { key: reaction }, index.h("calcite-button", { appearance: isCurrentUserReaction ? 'outline' : 'transparent', "aria-checked": isCurrentUserReaction ? 'true' : 'false', "data-reaction": reaction, disabled: isDisabled, kind: isCurrentUserReaction ? 'brand' : 'neutral', label: intl.t(isCurrentUserReaction ? 'reaction_picker_label_remove' : 'reaction_picker_label_add', { reaction: intl.t(reaction) }), onClick: this.handleReactionClicked, role: "radio", round: true, scale: "m" }, REACTIONS_MAP[reaction].emoji)));
    })), index.h("calcite-button", { appearance: "transparent", disabled: isDisabled, "icon-start": "plus", kind: "neutral", label: intl.t('viewAllReactions'), onClick: this.handleViewAllReactionsClick, round: true, scale: "m" })));
  }
  /**
   * Renders a list of all available reactions to be displayed in the
   * add reaction popover
   * @returns a list
   */
  renderAllReactions() {
    const { intl, currentUserReactions, isDisabled, handleReactionClicked, handleReactionRef } = this;
    return (index.h("ul", { class: "all_reactions_list" }, ALL_REACTIONS.map((reaction, idx) => {
      const isCurrentUserReaction = currentUserReactions.find(currentUserReaction => currentUserReaction.value === reaction);
      return (index.h("li", { key: reaction }, index.h("calcite-button", { appearance: isCurrentUserReaction ? 'outline' : 'transparent', "aria-checked": isCurrentUserReaction ? 'true' : 'false', "data-index": idx, "data-reaction": reaction, disabled: isDisabled, kind: isCurrentUserReaction ? 'brand' : 'neutral', label: intl.t(isCurrentUserReaction ? 'reaction_picker_label_remove' : 'reaction_picker_label_add', { reaction: intl.t(reaction) }), onClick: handleReactionClicked, ref: handleReactionRef, round: true, scale: "m" }, REACTIONS_MAP[reaction].emoji)));
    })));
  }
  /**
   * Renders the add reaction button and popover
   * @returns a fragment
   */
  renderAddReaction() {
    const { intl, handleAddReactionClick, handleAddReactionPopoverClose, isDisabled, activePopover, showAllReactions, addReactionButton } = this;
    return (index.h(index.Fragment, null, index.h("calcite-button", { appearance: "outline", "data-reaction": "add", disabled: isDisabled, "icon-start": "add-reaction", kind: activePopover === 'add' ? 'brand' : 'neutral', label: intl.t('addReaction'), onClick: handleAddReactionClick, ref: (addReactionButton) => {
        this.addReactionButton = addReactionButton;
      }, round: true, scale: "m" }), index.h("calcite-popover", { "auto-close": true, "data-reaction": "add", label: intl.t('addReaction'), onCalcitePopoverClose: handleAddReactionPopoverClose, open: activePopover === 'add', overlayPositioning: "fixed", placement: "bottom", referenceElement: addReactionButton, scale: "m" }, showAllReactions ? this.renderAllReactions() : this.renderDefaultReactions())));
  }
  /**
   * Primary render method
   * @returns host element
   */
  render() {
    return (index.h(index.Host, { class: { rtl: this.intl.direction === 'rtl' }, "data-element": "arcgis-hub-discussions-post-reactions" }, index.h("div", null, this.renderList(), this.renderOverflow(), this.renderAddReaction())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "postId": ["handlePostIdChanged"],
    "_context": ["handleContextChanged"]
  }; }
};
__decorate$1([
  minPromiseDelay.minPromiseDelayFactory({ delay: 300 })
], ArcgisHubDiscussionsPostReactions.prototype, "fetchUserRecord", null);
ArcgisHubDiscussionsPostReactions.style = arcgisHubDiscussionsPostReactionsCss;

const arcgisHubDiscussionsPostSkeletonCss = ":host{display:block}arcgis-skeleton-loader{display:grid;column-gap:1rem;row-gap:0.5rem;padding:0.25rem;grid-template-rows:repeat(3, minmax(0, auto));grid-template-columns:2.75rem auto}@keyframes shimmer{0%{background-size:200% 100%;background-position:100% 0}100%{background-size:200% 100%;background-position:-100% 0}}arcgis-skeleton-loader>div:nth-of-type(1),arcgis-skeleton-loader>div:nth-of-type(2)>div,arcgis-skeleton-loader>div:nth-of-type(3)>div,arcgis-skeleton-loader>div:nth-of-type(4){animation:shimmer 2s cubic-bezier(0.4, 0, 0.2, 0.8) infinite;background-image:linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0) 100%);background-color:var(--calcite-color-foreground-3);height:0.75rem;border-radius:0.375rem}arcgis-skeleton-loader>div:nth-of-type(1){grid-row:span 3 / span 3;height:2.75rem;width:2.75rem;border-radius:50%}arcgis-skeleton-loader>div:nth-of-type(3){display:grid;grid-template-rows:repeat(1, minmax(0, 1fr));column-gap:0.75rem;grid-template-columns:calc((100% - .75rem) * .6) calc((100% - .75rem) * .4)}arcgis-skeleton-loader>div:nth-of-type(2)>div{margin-bottom:0.5rem}";

const ArcgisHubDiscussionsPostSkeleton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h(index.Host, null, index.h("arcgis-skeleton-loader", { active: true, rows: 0, showFooter: false, showHeading: false, showThumbnail: false }, index.h("div", null), index.h("div", null, index.h("div", null)), index.h("div", null, index.h("div", null), index.h("div", null)), index.h("div", null))));
  }
};
ArcgisHubDiscussionsPostSkeleton.style = arcgisHubDiscussionsPostSkeletonCss;

const arcgisLayoutListCss = ":host{display:block}ol{margin:0px;display:grid;padding:0px;gap:var(--arcgis-hub-layout-list-gap, 1rem)}.map{grid-template-columns:1fr}.list{grid-template-columns:1fr}.grid{grid-template-columns:repeat(auto-fill, minmax(var(--arcgis-hub-layout-list-min-column-width, 20rem), 1fr))}.actions{display:grid;align-items:center;gap:var(--arcgis-hub-layout-list-actions-gap, 0.25rem);grid-template-columns:1fr;grid-template-rows:1fr;margin-bottom:var(--arcgis-hub-layout-list-actions-margin, 1rem)}.actions:has(.layout-actions){grid-template-columns:auto max-content}.actions:not(.hasActions){display:none}:host(.rtl) .layout-actions calcite-action{transform:scaleX(-1)}";

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
const ArcgisLayoutList = class {
  /**
   * Binds context to methods that are passed by reference
   */
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisLayoutListLayoutSelected = index.createEvent(this, "arcgisLayoutListLayoutSelected", 7);
    this.layout = 'list';
    this.disabled = false;
    this.showMapControl = undefined;
    this.scale = 's';
    this.listStyleDeclaration = undefined;
    this.hasSlottedActions = false;
    context.bind(this, 'handleResized', 'handleLayoutSelected', 'handleSlotChanged');
  }
  /**
   * Assigns resize observer handles on the host element when it's connected to the DOM
   */
  connectedCallback() {
    resizeObserver.ResizeObserverManager.addHandler(this.element, this.handleResized);
  }
  /**
   * Component will load lifecycle method, loads translations
   */
  async componentWillLoad() {
    await this.loadTranslations();
  }
  /**
   * Removes resize observer handles from the host element when it's removed from the DOM
   */
  disconnectedCallback() {
    resizeObserver.ResizeObserverManager.unobserve(this.element);
  }
  /**
   * Loads translations
   */
  async loadTranslations() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  /**
   * A debounced method that's invoked when the host element is resized. Retrieves the
   * list element's CSSStyleDeclaration so CSS variables can be retrieved
   */
  handleResized() {
    if (this.listRef) {
      // This is not ideal. `getComputedStyle` triggers a re-render itself. Feedback
      // garnered suggested we should lean on CSS as much as possible vs properties.
      // Though CSS supports using calc inside media/container query expressions, CSS
      // varaibles are not supported, so we have to compute the values of the CSS vars
      // to programmatically determine if the layout controls should be visible or hidden
      this.listStyleDeclaration = globalThis.getComputedStyle(this.listRef);
    }
  }
  /**
   * Computes true when the actions container should render
   */
  get showActions() {
    return this.hasLayoutActions || this.hasSlottedActions;
  }
  /**
   * Handles `slotchange` events from the `actions` slot and sets hasSlottedActions
   * to true when slotted actions exist
   */
  handleSlotChanged() {
    this.hasSlottedActions = Boolean(this.element.querySelector('[slot="actions"]'));
  }
  /**
   * Computes true when the layout actions should render, specifically, when there are
   * multiple grid columns rendered, or when enough screen real estate exists to render
   * multiple columns, but only a single column is rendered due to `layout` being `list`
   */
  get hasLayoutActions() {
    const { listStyleDeclaration } = this;
    let show = false;
    if (listStyleDeclaration) {
      const gap = parseInt(listStyleDeclaration.getPropertyValue('gap'), 10);
      const gridTemplateColumns = listStyleDeclaration.getPropertyValue('grid-template-columns').split(' ');
      const columnWidth = parseFloat(gridTemplateColumns[0]);
      const minColumnWidthWithUnit = listStyleDeclaration.getPropertyValue('--arcgis-hub-layout-list-min-column-width');
      const minColumnWidth = parseFloat(minColumnWidthWithUnit) * (minColumnWidthWithUnit.endsWith('rem') ? 16 : 1);
      show = gridTemplateColumns.length > 1 || minColumnWidth * 2 + gap < columnWidth;
    }
    return Boolean(show);
  }
  /**
   * Handles clicks to the layout control actions and sets `layout` to the selected layout
   * @param evt A MouseEvent triggered by clicking a layout control action
   */
  handleLayoutSelected(evt) {
    this.layout = evt.target.icon;
    this.arcgisLayoutListLayoutSelected.emit(this.layout);
  }
  /**
   * Renders the list
   */
  renderList() {
    return (index.h("ol", { class: { [this.layout]: true }, ref: (listRef) => {
        this.listRef = listRef;
      } }, index.h("slot", null)));
  }
  /**
   * Renders the layout actions
   */
  renderLayoutActions() {
    const { hasLayoutActions, showMapControl } = this;
    if (hasLayoutActions || showMapControl) {
      const { layout: desiredLayout, intl, disabled, handleLayoutSelected, scale } = this;
      const layouts = [...(showMapControl ? ['map'] : []), ...(hasLayoutActions ? ['grid'] : []), 'list'];
      const isActive = (layout) => {
        let active = layout === desiredLayout;
        if (!hasLayoutActions && desiredLayout == 'grid' && layout === 'list') {
          active = true;
        }
        return active;
      };
      return (index.h("div", { class: "layout-actions" }, index.h("calcite-action-bar", { "expand-disabled": true, layout: "horizontal" }, layouts.map(layout => (index.h("calcite-action", { active: isActive(layout), disabled: disabled, icon: layout, key: layout, label: intl.t(`${layout}.label`), onClick: handleLayoutSelected, scale: scale, text: intl.t(`${layout}.text`) }))))));
    }
  }
  /**
   * Renders the actions container
   */
  renderActions() {
    return (index.h("div", { class: { actions: true, hasActions: this.showActions } }, index.h("div", null, index.h("slot", { name: "actions", onSlotchange: this.handleSlotChanged })), this.renderLayoutActions()));
  }
  /**
   * Primary render method
   */
  render() {
    return (index.h(index.Host, { class: { rtl: this.intl.direction === 'rtl' } }, this.renderActions(), this.renderList()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
__decorate([
  debounce.DebounceDecoratorFactory({ timeout: 250 })
], ArcgisLayoutList.prototype, "handleResized", null);
ArcgisLayoutList.style = arcgisLayoutListCss;

const arcgisLoadMoreButtonCss = ":host{display:block}";

const ArcgisLoadMoreButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisLoadMoreChange = index.createEvent(this, "arcgisLoadMoreChange", 7);
    this.nextStart = undefined;
    this.color = "neutral";
    this.appearance = "transparent";
    this.scale = "l";
    this.width = "full";
    this.round = true;
    this.loading = false;
    context.bind(this, 'handleLoadMore');
  }
  get hasMoreResults() {
    const { nextStart } = this;
    return nextStart !== -1;
  }
  get disabled() {
    const { loading, hasMoreResults } = this;
    return loading || !hasMoreResults;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.el);
  }
  handleLoadMore() {
    const { nextStart } = this;
    this.arcgisLoadMoreChange.emit(nextStart);
  }
  render() {
    const { loading, handleLoadMore, round, scale, width, intl, hasMoreResults, disabled, color, appearance } = this;
    const text = intl.t('loadMore');
    return (index.h(index.Host, null, hasMoreResults &&
      index.h("calcite-button", { appearance: appearance, disabled: disabled || loading, kind: calcite.buttonColorToKind(color), label: text, loading: loading, onClick: handleLoadMore, round: round, scale: scale, width: width }, text)));
  }
  static get assetsDirs() { return ["locales"]; }
  get el() { return index.getElement(this); }
};
ArcgisLoadMoreButton.style = arcgisLoadMoreButtonCss;

exports.arcgis_hub_discussions_blocked_notice = ArcgisHubDiscussionsBlockedNotice;
exports.arcgis_hub_discussions_popover = ArcgisHubDiscussionsPopover;
exports.arcgis_hub_discussions_post = ArcgisHubDiscussionsPost;
exports.arcgis_hub_discussions_post_chips = ArcgisHubDiscussionsPostChips;
exports.arcgis_hub_discussions_post_editor = ArcgisHubDiscussionsPostEditor;
exports.arcgis_hub_discussions_post_geography = ArcgisHubDiscussionsPostGeography;
exports.arcgis_hub_discussions_post_header = ArcgisHubDiscussionsPostHeader;
exports.arcgis_hub_discussions_post_reactions = ArcgisHubDiscussionsPostReactions;
exports.arcgis_hub_discussions_post_skeleton = ArcgisHubDiscussionsPostSkeleton;
exports.arcgis_layout_list = ArcgisLayoutList;
exports.arcgis_load_more_button = ArcgisLoadMoreButton;
