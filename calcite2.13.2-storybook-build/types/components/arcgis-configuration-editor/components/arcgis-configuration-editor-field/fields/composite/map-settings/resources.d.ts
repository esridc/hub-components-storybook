import { IArcGISContext, IHubCatalog } from "@esri/hub-common";
import { IFacet } from "../../../../../../../utils/types";
import { ComponentIntl } from "../../../../../../../utils/stencil-intl";
export interface IMapSettingsUiSchemaOpts {
  catalogs?: IHubCatalog[];
  facets?: IFacet[];
  visibleSettings?: string[];
}
/**
 * Returns an array of default catalogs for the map configuration settings.
 * @param intl The component's intl object
 * @param context The component's context object
 * @returns IHubCatalog[]
 */
export declare const buildDefaultCatalogs: (context: IArcGISContext) => IHubCatalog[];
/**
 * Returns an array of default facets for the map configuration settings.
 * @param intl The component's intl object
 * @returns IFacet[]
 */
export declare const buildDefaultFacets: (intl: ComponentIntl) => IFacet[];
