import { getAssetPath } from "@stencil/core";
function addParamToUri(uri, param, value) {
  // check for existing query params
  const separator = uri.includes('?') ? '&' : '?';
  return `${uri}${separator}${param}=${value}`;
}
export const getThumbnailUrl = (model, width, context) => {
  var _a;
  let thumbnailUrl;
  // only run this if we have a thumbnail to convert
  if (model.thumbnailUrl) {
    // if the model has a thumbnailUrl AND there has not been an error loading it, use it
    thumbnailUrl = model.thumbnailUrl;
    const token = (_a = context === null || context === void 0 ? void 0 : context.session) === null || _a === void 0 ? void 0 : _a.token;
    if (token && model.access !== 'public') {
      thumbnailUrl = addParamToUri(thumbnailUrl, 'token', token);
    }
    thumbnailUrl = addParamToUri(thumbnailUrl, 'w', `${width}`);
  }
  return thumbnailUrl;
};
export const getFallbackUrl = (model) => {
  const isGroupType = model.type === 'Group';
  const fallbackPath = isGroupType ? './assets/groups-fallback.png' : './assets/content-fallback.png';
  return getAssetPath(fallbackPath);
};
