import { PostRelation, fetchPost } from '@esri/hub-discussions';
import { cache } from '../cache';
export const fetchPostFromCache = cache((postId, hubRequestOptions) => fetchPost(Object.assign({ postId, data: {
    relations: [
      PostRelation.REACTIONS,
      PostRelation.REPLIES,
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
export async function fetchPostDetails(options, hubRequestOptions) {
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
