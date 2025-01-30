import { getEntityThumbnailUrl, getFamily, maybeAdd, } from '@esri/hub-common';
import { getCardModelTitleUrl, getSource, getStandardAdditionalInfo, } from './utils';
/**
 * Default Converter for any HubEntity into a IHubCardViewModel
 * Unless an entity has more specific conversion logic, this function
 * will be used to convert it to a card model.
 * @param entity
 * @param _context
 * @param opts
 * @returns
 */
export const defaultEntityToCardModel = (entity, _layout, context, _intl, opts) => {
  const { actionLinks = [], baseUrl = '', locale = 'en-US', target = 'self' } = opts || {};
  let viewModel = {
    access: entity.access,
    actionLinks,
    additionalInfo: [],
    badges: [],
    family: getFamily(entity.type),
    source: entity.owner,
    id: entity.id,
    summary: entity.summary,
    title: entity.name,
    type: entity.type,
  };
  viewModel = maybeAdd('titleUrl', getCardModelTitleUrl(entity, context, target, baseUrl), viewModel);
  viewModel = maybeAdd('thumbnailUrl', getEntityThumbnailUrl(entity), viewModel);
  viewModel.additionalInfo = [
    ...viewModel.additionalInfo,
    ...getStandardAdditionalInfo(entity, locale),
  ];
  return viewModel;
};
/**
 * Default function to convert an IHubSearchResult into
 * an IHubCardViewModel
 *
 * @param result hub search result
 * @param opts view model options
 */
export const defaultResultToCardModel = (result, _layout, context, _intl, opts) => {
  var _a;
  const { actionLinks = [], baseUrl = '', locale = 'en-US', target = 'self' } = opts || {};
  let viewModel = {
    access: result.access,
    actionLinks,
    additionalInfo: [],
    badges: [],
    family: result.family,
    id: result.id,
    index: result.index,
    summary: result.summary,
    title: result.name,
    type: result.type,
  };
  viewModel = maybeAdd('titleUrl', getCardModelTitleUrl(result, context, target, baseUrl), viewModel);
  viewModel = maybeAdd('thumbnailUrl', (_a = result.links) === null || _a === void 0 ? void 0 : _a.thumbnail, viewModel);
  viewModel = maybeAdd('source', getSource(result), viewModel);
  viewModel.additionalInfo = [
    ...viewModel.additionalInfo,
    ...getStandardAdditionalInfo(result, locale),
  ];
  return viewModel;
};
