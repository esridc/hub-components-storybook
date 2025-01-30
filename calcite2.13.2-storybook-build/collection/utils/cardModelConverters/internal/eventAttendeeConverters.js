import { maybeAdd } from "@esri/hub-common";
import { getCardModelTitleUrl } from "./utils";
export const eventAttendeeResultToCardModel = (searchResult, _layout, context, _intl, opts) => {
  var _a;
  const { actionLinks = [], baseUrl = '', target = 'self' } = opts || {};
  let viewModel = {
    access: searchResult.access,
    actionLinks,
    additionalInfo: [],
    badges: [],
    family: searchResult.family,
    id: searchResult.id,
    index: searchResult.index,
    summary: searchResult.summary,
    source: searchResult.name ? `@${searchResult.owner}` : undefined,
    title: searchResult.name || `@${searchResult.owner}`,
    type: searchResult.type,
  };
  viewModel = maybeAdd('titleUrl', getCardModelTitleUrl(searchResult, context, target, baseUrl), viewModel);
  viewModel = maybeAdd('thumbnailUrl', (_a = searchResult.links) === null || _a === void 0 ? void 0 : _a.thumbnail, viewModel);
  return viewModel;
};
