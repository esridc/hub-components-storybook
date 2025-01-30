'use strict';

const cache = require('./cache-4d33af79.js');
const discussions = require('./discussions-09889d00.js');
const utils = require('./utils-7f390376.js');
const getUser = require('./get-user-5eecc1c4.js');
const portal = require('./portal-4f46908f.js');

exports.ArcgisHubDiscussionsBlockedNoticeVariant = void 0;
(function (ArcgisHubDiscussionsBlockedNoticeVariant) {
  ArcgisHubDiscussionsBlockedNoticeVariant["Item"] = "item";
  ArcgisHubDiscussionsBlockedNoticeVariant["EditPost"] = "edit.post";
  ArcgisHubDiscussionsBlockedNoticeVariant["EditPostGroup"] = "edit.post.group";
  ArcgisHubDiscussionsBlockedNoticeVariant["EditPostItem"] = "edit.post.item";
  ArcgisHubDiscussionsBlockedNoticeVariant["EditReply"] = "reply.post";
  ArcgisHubDiscussionsBlockedNoticeVariant["EditReplyGroup"] = "edit.reply.group";
  ArcgisHubDiscussionsBlockedNoticeVariant["EditReplyItem"] = "edit.reply.item";
  ArcgisHubDiscussionsBlockedNoticeVariant["Group"] = "group";
  ArcgisHubDiscussionsBlockedNoticeVariant["Reply"] = "reply";
})(exports.ArcgisHubDiscussionsBlockedNoticeVariant || (exports.ArcgisHubDiscussionsBlockedNoticeVariant = {}));
const ArcgisHubDiscussionsBlockedNoticeConfigs = {
  [exports.ArcgisHubDiscussionsBlockedNoticeVariant.Item]: {
    title: 'item.title',
    message: 'item.message',
  },
  [exports.ArcgisHubDiscussionsBlockedNoticeVariant.EditPost]: {
    title: 'post.title',
    message: 'post.message',
  },
  [exports.ArcgisHubDiscussionsBlockedNoticeVariant.EditPostGroup]: {
    title: 'post.title',
    message: 'post.message.group',
  },
  [exports.ArcgisHubDiscussionsBlockedNoticeVariant.EditPostItem]: {
    title: 'post.title',
    message: 'post.message.item',
  },
  [exports.ArcgisHubDiscussionsBlockedNoticeVariant.EditReply]: {
    title: 'reply.title',
    message: 'reply.message',
  },
  [exports.ArcgisHubDiscussionsBlockedNoticeVariant.EditReplyGroup]: {
    title: 'reply.title',
    message: 'reply.message.group',
  },
  [exports.ArcgisHubDiscussionsBlockedNoticeVariant.EditReplyItem]: {
    title: 'reply.title',
    message: 'reply.message.item',
  },
  [exports.ArcgisHubDiscussionsBlockedNoticeVariant.Group]: {
    title: 'group.title',
    message: 'group.message',
  },
  [exports.ArcgisHubDiscussionsBlockedNoticeVariant.Reply]: {
    title: 'reply.title.generic',
    message: 'reply.message.generic',
  },
};

const fetchPostFromCache = cache.cache((postId, hubRequestOptions) => discussions.fetchPost(Object.assign({ postId, data: {
    relations: [
      utils.PostRelation.REACTIONS,
      utils.PostRelation.REPLIES,
    ],
  } }, hubRequestOptions)).then(post => {
  post.replyCount = post.replies.total;
  delete post.replies;
  return post;
}), {
  scope: 'channels',
  getKey(channelId) { return channelId; },
  ttl: 3 * 1000,
});
async function fetchPostDetails(options, hubRequestOptions) {
  let { postId, post } = options;
  let postError;
  if (post) {
    postId = post.id;
    postError = null;
  }
  else if (postId) {
    try {
      post = await fetchPostFromCache(postId, hubRequestOptions);
      postError = null;
    }
    catch (e) {
      postError = e;
      post = null;
    }
  }
  else {
    postId = null;
    post = null;
    postError = null;
  }
  return {
    postId,
    post,
    postError,
  };
}

/**
 * A function to fetch a cached user record. If no hits
 * in the cache, it will request the user via XHR
 * @param username A username
 * @returns a promise that resolves a user
 */
const fetchMemberFromCache = cache.cache((username, hubRequestOptions) => 
// note: it's considered bad practice to call from the REST API directly, but getMembers() is insufficient for our needs.
getUser.getUser(Object.assign({ username }, hubRequestOptions)), { scope: 'users' });

async function fetchPostUserDetails(options, hubRequestOptions) {
  const { post } = options;
  let { postCreator, postCreatorId, postCreatorOrg } = options;
  let postCreatorError = null;
  let postCreatorOrgError = null;
  if (post) {
    postCreatorId = post.creator;
    try {
      postCreator = await fetchMemberFromCache(post.creator, hubRequestOptions);
      postCreatorError = null;
    }
    catch (e) {
      postCreatorError = e;
      postCreator = null;
    }
    try {
      postCreatorOrg = await portal.fetchPortalFromCache(postCreator.orgId, hubRequestOptions);
      postCreatorOrgError = null;
    }
    catch (e) {
      postCreatorOrgError = e;
      postCreatorOrg = null;
    }
  }
  else {
    postCreatorId = null;
    postCreatorOrg = null;
    postCreatorError = null;
    postCreator = null;
    postCreatorOrgError = null;
  }
  return {
    postCreator,
    postCreatorError,
    postCreatorId,
    postCreatorOrg,
    postCreatorOrgError,
  };
}

async function fetchParentDetails(options, hubRequestOptions) {
  const { post } = options;
  let { parent, parentId } = options;
  let parentError = null;
  const _fetchParentDetails = async (postId) => {
    try {
      ({ post: parent, postId: parentId, postError: parentError } = await fetchPostDetails({ postId }, hubRequestOptions));
    }
    catch (e) {
      parentId = postId;
      parent = null;
      parentError = e;
    }
    return {
      parentError,
      parentId,
      parent,
    };
  };
  if (post) {
    if (post.parentId) {
      if (parent !== null && post.parentId !== (parent === null || parent === void 0 ? void 0 : parent.id)) {
        ({ parent, parentId, parentError } = await _fetchParentDetails(post.parentId));
      }
    }
    else {
      parent = null;
      parentId = post.parentId;
      parentError = null;
    }
  }
  else if (parent) {
    parentId = parent.id;
    parentError = null;
  }
  else if (parentId) {
    ({ parent, parentId, parentError } = await _fetchParentDetails(parentId));
  }
  else {
    parent = null;
    parentError = null;
    parentId = null;
  }
  return {
    parent,
    parentError,
    parentId,
  };
}

async function fetchParentUserDetails(options, hubRequestOptions) {
  let { parent, parentCreatorId, parentCreator, parentCreatorOrg } = options;
  let parentCreatorError = null;
  let parentCreatorOrgError = null;
  if (parent) {
    ({
      postCreator: parentCreator,
      postCreatorError: parentCreatorError,
      postCreatorId: parentCreatorId,
      postCreatorOrg: parentCreatorOrg,
      postCreatorOrgError: parentCreatorOrgError,
    } = await fetchPostUserDetails({
      post: parent,
      postCreator: parentCreator,
      postCreatorOrg: parentCreatorOrg,
    }, hubRequestOptions));
  }
  else {
    parent = null;
    parentCreator = null;
    parentCreatorError = null;
    parentCreatorId = null;
    parentCreatorOrg = null;
    parentCreatorOrgError = null;
  }
  return {
    parentCreatorId,
    parentCreator,
    parentCreatorError,
    parentCreatorOrg,
    parentCreatorOrgError,
  };
}

exports.ArcgisHubDiscussionsBlockedNoticeConfigs = ArcgisHubDiscussionsBlockedNoticeConfigs;
exports.fetchMemberFromCache = fetchMemberFromCache;
exports.fetchParentDetails = fetchParentDetails;
exports.fetchParentUserDetails = fetchParentUserDetails;
exports.fetchPostDetails = fetchPostDetails;
exports.fetchPostUserDetails = fetchPostUserDetails;
