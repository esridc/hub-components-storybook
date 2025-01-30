import { r as resultToCardModel } from './resultToCardModel-4f88e531.js';
import { d as getAssetPath } from './index-57f71b44.js';

const getViewModel = (model, layout, opts, callback, context, intl) => {
  // Convert the entity or result to a card model
  let viewModel = resultToCardModel(model, layout, context, intl, opts);
  // If there is a callback, call it
  if (callback) {
    try {
      viewModel = callback(viewModel, layout, context, model);
    }
    catch (error) {
      // Just log it out but do not throw
      console.error(`getViewModel callback error: ${error}`);
    }
  }
  // return the model
  return viewModel;
};

function addParamToUri(uri, param, value) {
  // check for existing query params
  const separator = uri.includes('?') ? '&' : '?';
  return `${uri}${separator}${param}=${value}`;
}
const getThumbnailUrl = (model, width, context) => {
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
const getFallbackUrl = (model) => {
  const isGroupType = model.type === 'Group';
  const fallbackPath = isGroupType ? './assets/groups-fallback.png' : './assets/content-fallback.png';
  return getAssetPath(fallbackPath);
};

export { getThumbnailUrl as a, getViewModel as b, getFallbackUrl as g };
