import { fetchPostUserDetails } from './fetch-post-user-details';
export async function fetchParentUserDetails(options, hubRequestOptions) {
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
