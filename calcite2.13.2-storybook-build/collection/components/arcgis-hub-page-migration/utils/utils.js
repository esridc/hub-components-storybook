import { getCatalogGroups } from "@esri/hub-common";
/**
 * Get the configuration for a gallery of groups the user can choose to share to
 * @param context
 * @param options
 * @returns
 */
export function getGroupsGalleryConfig(context, catalog, options) {
  const groupsByMembership = getCatalogGroups(catalog, context);
  const groupIds = [...groupsByMembership['admin'], ...groupsByMembership['member'], ...groupsByMembership['owner']];
  const query = {
    targetEntity: "group",
    filters: [
      {
        predicates: [
          {
            searchUserAccess: 'groupMember',
            searchUserName: context.currentUser.username,
            id: groupIds
          },
        ]
      }
    ]
  };
  const result = {
    corners: 'round',
    gallerySelection: { group: options.selectedGroupIds },
    layout: 'grid',
    limit: 8,
    linkTarget: 'siteRelative',
    newTab: true,
    query,
    selectionMode: 'multiple',
    showLayoutSwitcher: true,
    showMoreResultsBtn: true,
    showResultsCount: true,
    showSearch: true,
    showSelection: true,
    showSort: true,
    state: Object.assign({}, options === null || options === void 0 ? void 0 : options.state)
  };
  return result;
}
