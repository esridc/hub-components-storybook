import { ComponentIntl } from "../../../utils/stencil-intl";
import { IFacet } from "../../../utils/types";
/** type of entity being associated with */
export declare const ASSOCIATION_TYPE = "project";
/**
 * Enum defining a key for each tab. This is also
 * the value that will be emitted as the label on
 * navigation telemetry
 */
export declare enum ProjectsPaneTabs {
  PROJECTS = "projects",
  MEMBERS = "members",
  SETTINGS = "settings"
}
/**
 * Return the facets for the main associations gallery
 * @param intl - component intl
 * @returns {IFacet[]}
 */
export declare const getAssociationsGalleryFacets: (intl: ComponentIntl) => IFacet[];
/**
 * Return the facets for the association group's members gallery
 * @param intl - component intl
 * @returns {IFacet[]}
 */
export declare const getMembersGalleryFacets: (intl: ComponentIntl) => IFacet[];
/**
 * Return the facets for the request association(s)
 * gallery picker
 * @param intl - component intl
 * @returns {IFacet[]}
 */
export declare const getRequestAssociationFacets: (intl: ComponentIntl) => IFacet[];
