import { cloneObject, getWellKnownCatalog } from "@esri/hub-common";
/**
 * Returns an array of default catalogs for the map configuration settings.
 * @param intl The component's intl object
 * @param context The component's context object
 * @returns IHubCatalog[]
 */
export const buildDefaultCatalogs = (context) => {
  const currentUser = context.currentUser;
  const catalogNames = [
    ...(currentUser
      ? ["myContent", "organization"]
      : []),
    "world",
  ];
  const catalogs = catalogNames.map((name) => {
    const opts = {
      user: currentUser,
      collectionNames: []
    };
    const catalog = cloneObject(getWellKnownCatalog("", name, "item", opts));
    catalog.collections = [
      {
        label: "Maps",
        key: "maps",
        targetEntity: "item",
        include: [],
        scope: {
          targetEntity: "item",
          filters: [
            {
              predicates: [{ type: ["Web Map", "Web Scene"] }],
            },
          ],
        },
      },
    ];
    return catalog;
  });
  return catalogs;
};
/**
 * Returns an array of default facets for the map configuration settings.
 * @param intl The component's intl object
 * @returns IFacet[]
 */
export const buildDefaultFacets = (intl) => {
  return [
    {
      label: intl.t('facets.type'),
      key: "type",
      display: "multi-select",
      field: "type",
      options: [],
      operation: "OR",
      aggLimit: 100,
    },
    {
      label: intl.t('facets.sharing'),
      key: "access",
      display: "multi-select",
      field: "access",
      options: [],
      operation: "OR",
    }
  ];
};
