/**
 * sort orders
 *
 * @export
 * @enum {string}
 */
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (SortOrder = {}));
/**
 * reactions to posts
 *
 * @export
 * @enum {string}
 */
var PostReaction;
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
})(PostReaction || (PostReaction = {}));
/**
 * platform sharing access values
 *
 * @export
 * @enum {string}
 */
var SharingAccess;
(function (SharingAccess) {
    SharingAccess["PUBLIC"] = "public";
    SharingAccess["ORG"] = "org";
    SharingAccess["PRIVATE"] = "private";
})(SharingAccess || (SharingAccess = {}));
/**
 * possible statuses of a post
 *
 * @export
 * @enum {string}
 */
var PostStatus;
(function (PostStatus) {
    PostStatus["PENDING"] = "pending";
    PostStatus["APPROVED"] = "approved";
    PostStatus["REJECTED"] = "rejected";
    PostStatus["DELETED"] = "deleted";
    PostStatus["HIDDEN"] = "hidden";
    PostStatus["BLOCKED"] = "blocked";
})(PostStatus || (PostStatus = {}));
/**
 * possible discussion content types, i.e. a post can be about an item, dataset, or group
 *
 * @export
 * @enum {string}
 */
var DiscussionType;
(function (DiscussionType) {
    DiscussionType["GROUP"] = "group";
    DiscussionType["CONTENT"] = "content";
    DiscussionType["BOARD"] = "board";
})(DiscussionType || (DiscussionType = {}));
/**
 * source of a post, i.e. app context
 *
 * @export
 * @enum {string}
 */
var DiscussionSource;
(function (DiscussionSource) {
    DiscussionSource["HUB"] = "hub";
    DiscussionSource["AGO"] = "ago";
    DiscussionSource["URBAN"] = "urban";
})(DiscussionSource || (DiscussionSource = {}));
/**
 * relations of post entity
 *
 * @export
 * @enum {string}
 */
var PostRelation;
(function (PostRelation) {
    PostRelation["REPLIES"] = "replies";
    PostRelation["REACTIONS"] = "reactions";
    PostRelation["PARENT"] = "parent";
    PostRelation["CHANNEL"] = "channel";
    PostRelation["CHANNEL_ACL"] = "channelAcl";
})(PostRelation || (PostRelation = {}));
/**
 * relations of reaction entity
 *
 * @export
 * @enum {string}
 */
var ReactionRelation;
(function (ReactionRelation) {
    ReactionRelation["POST"] = "post";
})(ReactionRelation || (ReactionRelation = {}));
/**
 * filters of channel entity
 *
 * @export
 * @enum {string}
 */
var ChannelFilter;
(function (ChannelFilter) {
    ChannelFilter["HAS_USER_POSTS"] = "has_user_posts";
})(ChannelFilter || (ChannelFilter = {}));
/**
 * @export
 * @enum {string}
 */
var CommonSort;
(function (CommonSort) {
    CommonSort["CREATED_AT"] = "createdAt";
    CommonSort["CREATOR"] = "creator";
    CommonSort["EDITOR"] = "editor";
    CommonSort["ID"] = "id";
    CommonSort["UPDATED_AT"] = "updatedAt";
})(CommonSort || (CommonSort = {}));
/**
 * @export
 * @enum {string}
 */
var SearchPostsFormat;
(function (SearchPostsFormat) {
    SearchPostsFormat["CSV"] = "csv";
    SearchPostsFormat["JSON"] = "json";
})(SearchPostsFormat || (SearchPostsFormat = {}));
/**
 * Role types
 *
 * @export
 * @enum {string}
 */
var Role;
(function (Role) {
    Role["READ"] = "read";
    Role["WRITE"] = "write";
    Role["READWRITE"] = "readWrite";
    Role["MODERATE"] = "moderate";
    Role["MANAGE"] = "manage";
    Role["OWNER"] = "owner";
})(Role || (Role = {}));
/**
 * Post sorting fields
 *
 * @export
 * @enum {string}
 */
var PostSort;
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
})(PostSort || (PostSort = {}));
/**
 * Post types
 *
 * @export
 * @enum{string}
 */
var PostType;
(function (PostType) {
    PostType["Text"] = "text";
    PostType["Announcement"] = "announcement";
    PostType["Poll"] = "poll";
    PostType["Question"] = "question";
})(PostType || (PostType = {}));
/**
 * Channel sorting fields
 *
 * @export
 * @enum {string}
 */
var ChannelSort;
(function (ChannelSort) {
    ChannelSort["ACCESS"] = "access";
    ChannelSort["CREATED_AT"] = "createdAt";
    ChannelSort["CREATOR"] = "creator";
    ChannelSort["EDITOR"] = "editor";
    ChannelSort["ID"] = "id";
    ChannelSort["LAST_ACTIVITY"] = "last_activity";
    ChannelSort["UPDATED_AT"] = "updatedAt";
})(ChannelSort || (ChannelSort = {}));
/**
 * relations of channel entity
 *
 * @export
 * @enum {string}
 */
var ChannelRelation;
(function (ChannelRelation) {
    ChannelRelation["CHANNEL_ACL"] = "channelAcl";
})(ChannelRelation || (ChannelRelation = {}));
/**
 * @export
 * @enum {string}
 */
var AclCategory;
(function (AclCategory) {
    AclCategory["GROUP"] = "group";
    AclCategory["ORG"] = "org";
    AclCategory["USER"] = "user";
    AclCategory["ANONYMOUS_USER"] = "anonymousUser";
    AclCategory["AUTHENTICATED_USER"] = "authenticatedUser";
})(AclCategory || (AclCategory = {}));
/**
 * @export
 * @enum {string}
 */
var AclSubCategory;
(function (AclSubCategory) {
    AclSubCategory["ADMIN"] = "admin";
    AclSubCategory["MEMBER"] = "member";
})(AclSubCategory || (AclSubCategory = {}));
/**
 * @export
 * @enum {string}
 */
var EntitySettingType;
(function (EntitySettingType) {
    EntitySettingType["CONTENT"] = "content";
})(EntitySettingType || (EntitySettingType = {}));

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
        ? channel.channelAcl.some(({ category }) => category === AclCategory.AUTHENTICATED_USER)
        : channel.access === SharingAccess.PUBLIC;
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
            channel.channelAcl.some(({ category, subCategory }) => category === AclCategory.ORG &&
                subCategory === AclSubCategory.MEMBER)
        : channel.access === SharingAccess.ORG;
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
    let access = SharingAccess.PRIVATE;
    if (isPublicChannel(channel)) {
        access = SharingAccess.PUBLIC;
    }
    else if (isOrgChannel(channel)) {
        access = SharingAccess.ORG;
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
        ? channel.channelAcl.reduce((acc, permission) => permission.category === AclCategory.ORG &&
            permission.subCategory === AclSubCategory.MEMBER
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
        ? channel.channelAcl.reduce((acc, permission) => permission.category === AclCategory.GROUP &&
            permission.subCategory === AclSubCategory.MEMBER
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

export { AclCategory as A, CANNOT_DISCUSS as C, DiscussionType as D, EntitySettingType as E, PostSort as P, Role as R, SearchPostsFormat as S, SharingAccess as a, ChannelRelation as b, channelToSearchResult as c, SortOrder as d, AclSubCategory as e, PostRelation as f, getPostCSVFileName as g, PostStatus as h, isDiscussable as i, ChannelFilter as j, ChannelSort as k, getChannelUsersQuery as l, PostReaction as m, isPublicChannel as n, isOrgChannel as o, isPrivateChannel as p, getChannelAccess as q, getChannelOrgIds as r, setDiscussableKeyword as s, getChannelGroupIds as t, DiscussionSource as u, ReactionRelation as v, CommonSort as w, PostType as x };
