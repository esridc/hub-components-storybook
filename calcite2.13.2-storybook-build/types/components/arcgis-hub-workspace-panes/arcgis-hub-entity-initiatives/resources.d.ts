import { IArcGISContext, IHubCardViewModel } from "@esri/hub-common";
import { ComponentIntl } from "../../../utils/stencil-intl";
import { IFacet } from "../../../utils/types";
/** type of entity being associated with */
export declare const ASSOCIATION_TYPE = "initiative";
/**
 * Return the facets for the main associations gallery
 * @param intl - component intl
 * @returns {IFacet[]}
 */
export declare const getAssociationsGalleryFacets: (intl: ComponentIntl) => IFacet[];
/**
 * Return the facets for the request association(s)
 * gallery picker
 * @param intl - component intl
 * @returns {IFacet[]}
 */
export declare const getRequestAssociationFacets: (intl: ComponentIntl) => IFacet[];
/**
 * Callback fn to pass into the main associations gallery
 * to modify the card view models
 *
 * @param model - card view model
 * @param _layout - card layout
 * @param _context - contextual portal & auth information
 * @param _result - raw search result
 * @returns {IHubCardViewModel}
 */
export declare const associationsGalleryCallback: (model: IHubCardViewModel, _layout: string, _context: IArcGISContext, _result: IHubCardViewModel) => IHubCardViewModel;
