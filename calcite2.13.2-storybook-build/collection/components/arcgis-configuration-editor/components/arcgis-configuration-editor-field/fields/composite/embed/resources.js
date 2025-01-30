import { cloneObject, getWellKnownCatalog, getWellknownCollection } from "@esri/hub-common";
export const deviceViewports = ["viewportMobile", "viewportTablet", "viewportDesktop"];
export const configurableViewports = ["viewportAll", ...deviceViewports];
/**
 * Returns an array of default catalogs for configuring
 * an embed
 * @param context The component's context object
 * @returns IHubCatalog[]
 */
export const buildDefaultCatalogs = (context) => {
  const currentUser = context.currentUser;
  const catalogNames = [
    ...(currentUser
      ? ["myContent", "organization", "livingAtlas"]
      : []),
    "world",
  ];
  const catalogs = catalogNames.map((name) => {
    const opts = {
      user: currentUser,
      collectionNames: []
    };
    const catalog = cloneObject(getWellKnownCatalog("", name, "item", opts));
    // filter out draft surveys
    const feedbackCollection = getWellknownCollection("", "item", "feedback");
    feedbackCollection.scope.filters[0].predicates.push({ typekeywords: { not: "Draft" } });
    catalog.collections = [
      getWellknownCollection("", "item", "appAndMap"),
      feedbackCollection
    ];
    return catalog;
  });
  return catalogs;
};
/**
 * Returns an array of default facets for configuring
 * an embed
 * @param intl The component's context object
 * @returns IFacet[]
 */
export const buildDefaultFacets = (intl) => {
  return [
    {
      label: intl.t("facets.type"),
      key: "type",
      display: "multi-select",
      field: "type",
      options: [],
      operation: "OR",
      aggLimit: 100,
    },
    {
      label: intl.t("facets.tags"),
      key: "tags",
      field: "tags",
      aggLimit: 15,
      operation: "OR",
      display: "multi-select",
      options: [],
    },
    {
      label: intl.t("facets.categories"),
      key: "categories",
      field: "categories",
      aggLimit: 15,
      operation: "OR",
      display: "tree",
      options: [],
    },
    {
      label: intl.t("facets.modified"),
      key: "modified",
      display: "date-range",
      state: "open",
      field: "modified",
      max: new Date().toString(),
    },
  ];
};
