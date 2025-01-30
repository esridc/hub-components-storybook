import { ComponentIntl } from "../../../utils/stencil-intl";
/**
 * Function to get the list of location types to be displayed after a user search
 * Currently, we only support point, extent/rectangle, and draw your own.
 * In the future, we look to add polyline and polygon geometries
 */
export declare function getAllLocationTypes(intl: ComponentIntl): __esri.SuggestResult[];
