import { fetchMemberFromCache } from '../users';
import { fetchPortalFromCache } from '../portal';
export async function fetchPostUserDetails(options, hubRequestOptions) {
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
      postCreatorOrg = await fetchPortalFromCache(postCreator.orgId, hubRequestOptions);
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
