import { ComponentIntl } from "../../../../utils/stencil-intl";
import { IFacet } from "../../../../utils/types";
import { IQuery } from '@esri/hub-common';
/**
 * Enum defining a key for each tab. This is also
 * the value that will be emitted as the label on
 * navigation telemetry
 */
export declare enum EntityViewTabs {
  OVERVIEW = "overview",
  PROJECTS = "projects",
  METRICS = "metrics",
  CONTENT = "content"
}
/**
 * max number of associated projects to render on the initiative view
 * before revealing the overflow pattern ("Explore associations" button
 * + "Projects" tab with full gallery of associated projects)
 */
export declare const FEATURED_ASSOCIATED_PROJECTS_MAX = 4;
/**
 * Return the facets for the Project associations gallery
 * (on the Projects tab)
 * @param intl - component intl
 * @returns {IFacet[]}
 */
export declare const getAssociatedProjectsFacets: (intl: ComponentIntl) => IFacet[];
/**
 * Return the combined query for associated projects and
 * the initiative
 * @param initiativeId - initiative id
 * @param associatedProjectsQuery - query for associated projects
 * @param context - arcgis context
 */
export declare const combineInitiativeAndAssociatedProjectsQuery: (initiativeId: string, associatedProjectsQuery: IQuery) => IQuery;
