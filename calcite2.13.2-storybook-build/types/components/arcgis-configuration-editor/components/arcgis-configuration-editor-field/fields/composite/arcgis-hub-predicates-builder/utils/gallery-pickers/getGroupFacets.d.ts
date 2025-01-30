import { IArcGISContext } from "@esri/hub-common";
import { IFacet } from "../../../../../../../../../utils/types";
/**
 * returns default group facets to be used in various
 * group picker predicate experiences
 *
 * @param context contextual portal and auth info
 * @param i18nScope intl scope for translations
 */
export declare const getGroupFacets: (context: IArcGISContext, i18nScope: string) => IFacet[];
