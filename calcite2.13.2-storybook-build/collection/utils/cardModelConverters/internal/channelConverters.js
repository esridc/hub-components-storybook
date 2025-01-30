import { maybeAdd } from "@esri/hub-common";
import { getChannelName } from "../../../components/arcgis-hub-discussions/utils/discussions";
import { getCardModelTitleUrl } from "./utils";
export const channelResultToCardModel = (result, _layout, context, _intl, opts) => {
  var _a, _b;
  const { actionLinks = [], baseUrl = '', target = 'self' } = opts || {};
  const additionalInfo = [
    {
      i18nKey: "access",
      value: result.access,
    },
    {
      i18nKey: "created",
      value: result.createdAt,
    }
  ];
  const groups = (_a = result.includes) === null || _a === void 0 ? void 0 : _a.groups;
  if (groups === null || groups === void 0 ? void 0 : groups.length) {
    additionalInfo.push({
      i18nKey: 'groups',
      value: groups.map(group => (group === null || group === void 0 ? void 0 : group.title) || 'groupNotFound').join(", ")
    });
  }
  let viewModel = Object.assign({ access: result.access, actionLinks: actionLinks, badges: [], id: result.id, family: "channel", source: result.owner, title: getChannelName(result, [], 'unnamed'), type: result.type, additionalInfo }, (!isNaN(result.index) && { index: result.index }));
  viewModel = maybeAdd('titleUrl', getCardModelTitleUrl(result, context, target, baseUrl), viewModel);
  viewModel = maybeAdd('thumbnailUrl', (_b = result.links) === null || _b === void 0 ? void 0 : _b.thumbnail, viewModel);
  return viewModel;
};
