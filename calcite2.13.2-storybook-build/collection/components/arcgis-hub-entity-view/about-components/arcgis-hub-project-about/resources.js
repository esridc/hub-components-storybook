/**
 * max number of associated initiatives to render on the project view
 * before revealing the overflow pattern ("Explore associations" button
 * + "Initiatives" tab with full gallery of associated initiatives)
 */
export const FEATURED_ASSOCIATED_INITIATIVES_MAX = 5;
/**
 * Callback fn to pass into the associated initiatives gallery
 * to modify the card view models
 *
 * @param model - card view model
 * @param _layout - card layout
 * @param _context - contextual portal & auth information
 * @param _result - raw search result
 * @returns {IHubCardViewModel}
 */
export const associatedInitiativesGalleryCallback = (model, _layout, _context, _result) => {
  // 1. set the summary to undefined so that it doesn't render
  // beneath the title
  model.summary = undefined;
  return model;
};
