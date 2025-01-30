'use strict';

/**
 * sort orders
 *
 * @export
 * @enum {string}
 */
exports.SortOrder = void 0;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(exports.SortOrder || (exports.SortOrder = {}));
/**
 * reactions to posts
 *
 * @export
 * @enum {string}
 */
exports.PostReaction = void 0;
(function (PostReaction) {
    PostReaction["CLAPPING_HANDS"] = "clapping_hands";
    PostReaction["CONFUSED"] = "confused";
    PostReaction["DOWN_ARROW"] = "down_arrow";
    PostReaction["EYES"] = "eyes";
    PostReaction["FACE_WITH_TEARS_OF_JOY"] = "face_with_tears_of_joy";
    PostReaction["FIRE"] = "fire";
    PostReaction["GRINNING"] = "grinning";
    PostReaction["HEART"] = "heart";
    PostReaction["LAUGH"] = "laugh";
    PostReaction["ONE_HUNDRED"] = "one_hundred";
    PostReaction["PARTYING"] = "partying";
    PostReaction["PARTY_POPPER"] = "party_popper";
    PostReaction["RAISING_HANDS"] = "raising_hands";
    PostReaction["ROCKET"] = "rocket";
    PostReaction["SAD"] = "sad";
    PostReaction["SLIGHTLY_SMILING"] = "slightly_smiling";
    PostReaction["SURPRISED"] = "surprised";
    PostReaction["THINKING"] = "thinking";
    PostReaction["THUMBS_UP"] = "thumbs_up";
    PostReaction["THUMBS_DOWN"] = "thumbs_down";
    PostReaction["TROPHY"] = "trophy";
    PostReaction["UP_ARROW"] = "up_arrow";
    PostReaction["WAVING_HAND"] = "waving_hand";
    PostReaction["WINKING"] = "winking";
    PostReaction["WORLD_MAP"] = "world_map";
})(exports.PostReaction || (exports.PostReaction = {}));
/**
 * platform sharing access values
 *
 * @export
 * @enum {string}
 */
exports.SharingAccess = void 0;
(function (SharingAccess) {
    SharingAccess["PUBLIC"] = "public";
    SharingAccess["ORG"] = "org";
    SharingAccess["PRIVATE"] = "private";
})(exports.SharingAccess || (exports.SharingAccess = {}));
/**
 * possible statuses of a post
 *
 * @export
 * @enum {string}
 */
exports.PostStatus = void 0;
(function (PostStatus) {
    PostStatus["PENDING"] = "pending";
    PostStatus["APPROVED"] = "approved";
    PostStatus["REJECTED"] = "rejected";
    PostStatus["DELETED"] = "deleted";
    PostStatus["HIDDEN"] = "hidden";
    PostStatus["BLOCKED"] = "blocked";
})(exports.PostStatus || (exports.PostStatus = {}));
/**
 * possible discussion content types, i.e. a post can be about an item, dataset, or group
 *
 * @export
 * @enum {string}
 */
exports.DiscussionType = void 0;
(function (DiscussionType) {
    DiscussionType["GROUP"] = "group";
    DiscussionType["CONTENT"] = "content";
    DiscussionType["BOARD"] = "board";
})(exports.DiscussionType || (exports.DiscussionType = {}));
/**
 * source of a post, i.e. app context
 *
 * @export
 * @enum {string}
 */
exports.DiscussionSource = void 0;
(function (DiscussionSource) {
    DiscussionSource["HUB"] = "hub";
    DiscussionSource["AGO"] = "ago";
    DiscussionSource["URBAN"] = "urban";
})(exports.DiscussionSource || (exports.DiscussionSource = {}));
/**
 * relations of post entity
 *
 * @export
 * @enum {string}
 */
exports.PostRelation = void 0;
(function (PostRelation) {
    PostRelation["REPLIES"] = "replies";
    PostRelation["REACTIONS"] = "reactions";
    PostRelation["PARENT"] = "parent";
    PostRelation["CHANNEL"] = "channel";
    PostRelation["CHANNEL_ACL"] = "channelAcl";
})(exports.PostRelation || (exports.PostRelation = {}));
/**
 * relations of reaction entity
 *
 * @export
 * @enum {string}
 */
exports.ReactionRelation = void 0;
(function (ReactionRelation) {
    ReactionRelation["POST"] = "post";
})(exports.ReactionRelation || (exports.ReactionRelation = {}));
/**
 * filters of channel entity
 *
 * @export
 * @enum {string}
 */
exports.ChannelFilter = void 0;
(function (ChannelFilter) {
    ChannelFilter["HAS_USER_POSTS"] = "has_user_posts";
})(exports.ChannelFilter || (exports.ChannelFilter = {}));
/**
 * @export
 * @enum {string}
 */
exports.CommonSort = void 0;
(function (CommonSort) {
    CommonSort["CREATED_AT"] = "createdAt";
    CommonSort["CREATOR"] = "creator";
    CommonSort["EDITOR"] = "editor";
    CommonSort["ID"] = "id";
    CommonSort["UPDATED_AT"] = "updatedAt";
})(exports.CommonSort || (exports.CommonSort = {}));
/**
 * @export
 * @enum {string}
 */
exports.SearchPostsFormat = void 0;
(function (SearchPostsFormat) {
    SearchPostsFormat["CSV"] = "csv";
    SearchPostsFormat["JSON"] = "json";
})(exports.SearchPostsFormat || (exports.SearchPostsFormat = {}));
/**
 * Role types
 *
 * @export
 * @enum {string}
 */
exports.Role = void 0;
(function (Role) {
    Role["READ"] = "read";
    Role["WRITE"] = "write";
    Role["READWRITE"] = "readWrite";
    Role["MODERATE"] = "moderate";
    Role["MANAGE"] = "manage";
    Role["OWNER"] = "owner";
})(exports.Role || (exports.Role = {}));
/**
 * Post sorting fields
 *
 * @export
 * @enum {string}
 */
exports.PostSort = void 0;
(function (PostSort) {
    PostSort["BODY"] = "body";
    PostSort["CHANNEL_ID"] = "channelId";
    PostSort["CREATED_AT"] = "createdAt";
    PostSort["CREATOR"] = "creator";
    PostSort["DISCUSSION"] = "discussion";
    PostSort["EDITOR"] = "editor";
    PostSort["ID"] = "id";
    PostSort["PARENT_ID"] = "parentId";
    PostSort["STATUS"] = "status";
    PostSort["TITLE"] = "title";
    PostSort["UPDATED_AT"] = "updatedAt";
})(exports.PostSort || (exports.PostSort = {}));
/**
 * Post types
 *
 * @export
 * @enum{string}
 */
exports.PostType = void 0;
(function (PostType) {
    PostType["Text"] = "text";
    PostType["Announcement"] = "announcement";
    PostType["Poll"] = "poll";
    PostType["Question"] = "question";
})(exports.PostType || (exports.PostType = {}));
/**
 * Channel sorting fields
 *
 * @export
 * @enum {string}
 */
exports.ChannelSort = void 0;
(function (ChannelSort) {
    ChannelSort["ACCESS"] = "access";
    ChannelSort["CREATED_AT"] = "createdAt";
    ChannelSort["CREATOR"] = "creator";
    ChannelSort["EDITOR"] = "editor";
    ChannelSort["ID"] = "id";
    ChannelSort["LAST_ACTIVITY"] = "last_activity";
    ChannelSort["UPDATED_AT"] = "updatedAt";
})(exports.ChannelSort || (exports.ChannelSort = {}));
/**
 * relations of channel entity
 *
 * @export
 * @enum {string}
 */
exports.ChannelRelation = void 0;
(function (ChannelRelation) {
    ChannelRelation["CHANNEL_ACL"] = "channelAcl";
})(exports.ChannelRelation || (exports.ChannelRelation = {}));
/**
 * @export
 * @enum {string}
 */
exports.AclCategory = void 0;
(function (AclCategory) {
    AclCategory["GROUP"] = "group";
    AclCategory["ORG"] = "org";
    AclCategory["USER"] = "user";
    AclCategory["ANONYMOUS_USER"] = "anonymousUser";
    AclCategory["AUTHENTICATED_USER"] = "authenticatedUser";
})(exports.AclCategory || (exports.AclCategory = {}));
/**
 * @export
 * @enum {string}
 */
exports.AclSubCategory = void 0;
(function (AclSubCategory) {
    AclSubCategory["ADMIN"] = "admin";
    AclSubCategory["MEMBER"] = "member";
})(exports.AclSubCategory || (exports.AclSubCategory = {}));
/**
 * @export
 * @enum {string}
 */
exports.EntitySettingType = void 0;
(function (EntitySettingType) {
    EntitySettingType["CONTENT"] = "content";
})(exports.EntitySettingType || (exports.EntitySettingType = {}));

const CANNOT_DISCUSS = "cannotDiscuss";

/**
 * Utility to determine if a given IGroup, IItem, IHubContent, or IHubItemEntity
 * is discussable.
 * @param {IGroup|IItem|IHubContent|IHubItemEntity} subject
 * @return {boolean}
 */
function isDiscussable(subject) {
    let result = false;
    if (subject) {
        const typeKeywords = subject.typeKeywords || [];
        result = !typeKeywords.includes(CANNOT_DISCUSS);
    }
    return result;
}
/**
 * Adds or removes CANNOT_DISCUSS type keyword and returns the updated list
 * @param {IGroup|IHubContent|IHubItemEntity} subject
 * @param {boolean} discussable
 * @returns {string[]} updated list of type keywords
 */
function setDiscussableKeyword(typeKeywords, discussable) {
    const updatedTypeKeywords = (typeKeywords || []).filter((typeKeyword) => typeKeyword !== CANNOT_DISCUSS);
    if (!discussable) {
        updatedTypeKeywords.push(CANNOT_DISCUSS);
    }
    return updatedTypeKeywords;
}
/**
 * Determines if the given channel is considered to be a `public` channel, supporting both
 * legacy permissions and V2 ACL model.
 * @param channel An IChannel record
 * @returns true if the channel is considered `public`
 */
function isPublicChannel(channel) {
    return channel.channelAcl
        ? channel.channelAcl.some(({ category }) => category === exports.AclCategory.AUTHENTICATED_USER)
        : channel.access === exports.SharingAccess.PUBLIC;
}
/**
 * Determines if the given channel is considered to be an `org` channel, supporting both
 * legacy permissions and V2 ACL model.
 * @param channel An IChannel record
 * @returns true if the channel is considered `org`
 */
function isOrgChannel(channel) {
    return channel.channelAcl
        ? !isPublicChannel(channel) &&
            channel.channelAcl.some(({ category, subCategory }) => category === exports.AclCategory.ORG &&
                subCategory === exports.AclSubCategory.MEMBER)
        : channel.access === exports.SharingAccess.ORG;
}
/**
 * Determines if the given channel is considered to be a `private` channel, supporting both
 * legacy permissions and V2 ACL model.
 * @param channel An IChannel record
 * @returns true if the channel is considered `private`
 */
function isPrivateChannel(channel) {
    return !isPublicChannel(channel) && !isOrgChannel(channel);
}
/**
 * Determines the given channel's access, supporting both legacy permissions and V2 ACL
 * model.
 * @param channel An IChannel record
 * @returns `public`, `org` or `private`
 */
function getChannelAccess(channel) {
    let access = exports.SharingAccess.PRIVATE;
    if (isPublicChannel(channel)) {
        access = exports.SharingAccess.PUBLIC;
    }
    else if (isOrgChannel(channel)) {
        access = exports.SharingAccess.ORG;
    }
    return access;
}
/**
 * Returns an array of org ids configured for the channel, supporting both legacy permissions
 * and V2 ACL model.
 * @param channel An IChannel record
 * @returns an array of org ids for the given channel
 */
function getChannelOrgIds(channel) {
    return channel.channelAcl
        ? channel.channelAcl.reduce((acc, permission) => permission.category === exports.AclCategory.ORG &&
            permission.subCategory === exports.AclSubCategory.MEMBER
            ? [...acc, permission.key]
            : acc, [])
        : channel.orgs;
}
/**
 * Returns an array of group ids configured for the channel, supporting both legacy permissions
 * and V2 ACL model.
 * @param channel An IChannel record
 * @returns an array of group ids for the given channel
 */
function getChannelGroupIds(channel) {
    return channel.channelAcl
        ? channel.channelAcl.reduce((acc, permission) => permission.category === exports.AclCategory.GROUP &&
            permission.subCategory === exports.AclSubCategory.MEMBER
            ? [...acc, permission.key]
            : acc, [])
        : channel.groups;
}
/**
 * A utility method used to build an IQuery to search for users that are permitted to be at-mentioned for the given channel.
 * @param input An array of strings to search for. Each string is mapped to `username` and `fullname`, filters as an OR condition
 * @param channel An IChannel record
 * @param currentUsername The currently authenticated user's username
 * @param options An IHubSearchOptions object
 * @returns a promise that resolves an IHubSearchResponse<IHubSearchResult>
 */
function getChannelUsersQuery(inputs, channel, currentUsername) {
    const groupIds = getChannelGroupIds(channel);
    const orgIds = getChannelOrgIds(channel);
    const groupsPredicate = { group: groupIds };
    let filters;
    if (isPublicChannel(channel)) {
        filters = [
            {
                operation: "OR",
                predicates: [{ orgid: { from: "0", to: "{" } }],
            },
        ];
    }
    else if (isOrgChannel(channel)) {
        const additional = groupIds.length ? [groupsPredicate] : [];
        filters = [
            {
                operation: "OR",
                predicates: [{ orgid: orgIds }, ...additional],
            },
        ];
    }
    else {
        filters = [
            {
                operation: "AND",
                predicates: [groupsPredicate],
            },
        ];
    }
    if (currentUsername) {
        filters.push({
            operation: "AND",
            predicates: [{ username: { not: currentUsername } }],
        });
    }
    const query = {
        targetEntity: "communityUser",
        filters: [
            {
                operation: "OR",
                predicates: inputs.reduce((acc, input) => [...acc, { username: input }, { fullname: input }], []),
            },
            ...filters,
        ],
    };
    return query;
}
/**
 * Transforms a given channel and optional channel groups array into a IHubSearchResult
 * @param channel
 * @param groups
 * @returns
 */
const channelToSearchResult = (channel, groups) => {
    return Object.assign(Object.assign({}, channel), { id: channel.id, name: channel.name, createdDate: new Date(channel.createdAt), createdDateSource: "channel", updatedDate: new Date(channel.updatedAt), updatedDateSource: "channel", type: "channel", access: channel.access, family: "channel", owner: channel.creator, links: {
            // TODO: add links?
            thumbnail: null,
            self: null,
            siteRelative: null,
        }, includes: { groups }, rawResult: channel });
};
/**
 * Constructs file name for exported csvs
 * @param entityTitle
 * @returns string
 */
function getPostCSVFileName(entityTitle) {
    const et = entityTitle;
    const suffix = `_${new Date(Date.now())
        .toISOString()
        .replace(/[^a-z0-9]/gi, "-")}.csv`;
    const prefix = et
        // coerce to lower case
        .toLowerCase()
        // replace non-alpha-numeric chars with hyphens
        .replace(/[^a-z0-9]/g, "-")
        // replace consecutive hyphens with single hyphen
        .replace(/-{2,}/g, "-")
        // replace leading hyphens with empty string
        .replace(/^-/, "")
        // truncate filename so it doesn't exceed 250 chars to avoid OS filename length limitations
        .substring(0, 250 - suffix.length)
        // replace trailing hyphens
        .replace(/-$/, "");
    return [prefix, suffix].join("");
}

exports.CANNOT_DISCUSS = CANNOT_DISCUSS;
exports.channelToSearchResult = channelToSearchResult;
exports.getChannelAccess = getChannelAccess;
exports.getChannelGroupIds = getChannelGroupIds;
exports.getChannelOrgIds = getChannelOrgIds;
exports.getChannelUsersQuery = getChannelUsersQuery;
exports.getPostCSVFileName = getPostCSVFileName;
exports.isDiscussable = isDiscussable;
exports.isOrgChannel = isOrgChannel;
exports.isPrivateChannel = isPrivateChannel;
exports.isPublicChannel = isPublicChannel;
exports.setDiscussableKeyword = setDiscussableKeyword;
