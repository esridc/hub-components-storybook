import { fetchPostDetails } from './fetch-post-details';
export async function fetchParentDetails(options, hubRequestOptions) {
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
