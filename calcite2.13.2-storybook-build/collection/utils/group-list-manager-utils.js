import { getProp, hubSearch } from "@esri/hub-common";
import { buildQueryFromGallerySelection } from "./build-query-from-gallery-selection";
export function getGallerySelection(groupIds) {
  return {
    channel: [],
    item: [],
    user: [],
    groupMember: [],
    event: [],
    group: groupIds
  };
}
/**
 * TODO: move this to more general utils, this can be used in places that
 * consume arcgis-hub-gallery-picker for groups
 * Fetch for the groups with IGallerySelection
 */
export async function fetchGroupsWithGallerySelection(opts) {
  let groups = [];
  const { selection, context, include } = opts;
  if (getProp(selection, 'group.length')) {
    const query = buildQueryFromGallerySelection(selection, 'group');
    const hubSearchOptions = {
      requestOptions: context === null || context === void 0 ? void 0 : context.hubRequestOptions,
      include: include || []
    };
    try {
      const { results } = await hubSearch(query, hubSearchOptions);
      // sort the groups according to the way the selection is sorted
      // but if it is not in the array, put it at the end
      const sortByIds = selection.group;
      groups = results.slice().sort((a, b) => {
        const aIdx = sortByIds.includes(a.id) ? sortByIds.indexOf(a.id) : Infinity;
        const bIdx = sortByIds.includes(b.id) ? sortByIds.indexOf(b.id) : Infinity;
        return aIdx - bIdx;
      });
    }
    catch (err) {
      console.error(`Unable to fetch selected entities: ${err}`);
    }
  }
  return groups;
}
