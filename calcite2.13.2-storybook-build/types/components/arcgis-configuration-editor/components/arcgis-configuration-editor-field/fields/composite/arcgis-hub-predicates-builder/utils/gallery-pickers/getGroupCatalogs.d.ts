import { IArcGISContext, IHubCatalog, WellKnownCatalog } from "@esri/hub-common";
/**
 * returns the requested group catalogs to be used
 * in various group picker predicate experiences
 *
 * @param context contextual portal & auth info
 * @param i18nScope intl scope for translations
 * @param catalogNames optional catalog names
 */
export declare const getGroupCatalogs: (context: IArcGISContext, i18nScope: string, catalogNames?: WellKnownCatalog[]) => IHubCatalog[];
