import { getWellKnownCatalog } from "@esri/hub-common";
/**
 * returns the requested group catalogs to be used
 * in various group picker predicate experiences
 *
 * @param context contextual portal & auth info
 * @param i18nScope intl scope for translations
 * @param catalogNames optional catalog names
 */
export const getGroupCatalogs = (context, i18nScope, catalogNames) => {
  const _catalogNames = catalogNames || [
    "editGroups",
    "viewGroups"
  ];
  const catalogs = _catalogNames.map((name) => {
    const opts = {
      user: context.currentUser,
    };
    const catalog = getWellKnownCatalog(i18nScope, name, "group", opts);
    return catalog;
  });
  return catalogs;
};
