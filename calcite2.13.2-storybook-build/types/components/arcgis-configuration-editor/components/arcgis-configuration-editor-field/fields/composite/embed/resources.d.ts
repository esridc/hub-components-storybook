import { IFacet } from "../../../../../../../utils/types";
import { ComponentIntl } from "../../../../../../../utils/stencil-intl";
import { IArcGISContext, IHubCatalog, IHubEmbed, IHubEmbedApp, IHubEmbedExternal, IHubEmbedMap, IHubEmbedSurvey } from "@esri/hub-common";
export declare const deviceViewports: readonly ["viewportMobile", "viewportTablet", "viewportDesktop"];
export declare const configurableViewports: readonly ["viewportAll", "viewportMobile", "viewportTablet", "viewportDesktop"];
export declare type DeviceViewport = typeof deviceViewports[number];
export declare type ConfigurableViewport = typeof configurableViewports[number];
/** internal embed interface */
export declare type _IHubEmbed = Omit<IHubEmbed, 'viewportAll' | 'viewportMobile' | 'viewportTablet' | 'viewportDesktop'> & {
  shouldApplyBreakpoints: boolean;
  viewportAll?: _HubEmbed;
  viewportMobile?: _HubEmbed;
  viewportTablet?: _HubEmbed;
  viewportDesktop?: _HubEmbed;
};
/**
 * internal discriminated union between app, map,
 * survey, external embeds
 */
export declare type _HubEmbed = _HubEmbedMap | _HubEmbedApp | _HubEmbedSurvey | _HubEmbedExternal;
/**
 * internal embed interfaces: we need to re-map
 * the id property to an array of strings for
 * internal editor purposes
 */
export declare type _HubEmbedMap = Omit<IHubEmbedMap, 'id'> & {
  id: string[];
  source: string;
};
export declare type _HubEmbedApp = Omit<IHubEmbedApp, 'id'> & {
  id: string[];
  source: string;
};
export declare type _HubEmbedSurvey = Omit<IHubEmbedSurvey, 'id'> & {
  id: string[];
  source: string;
};
export declare type _HubEmbedExternal = IHubEmbedExternal & {
  source: string;
};
/** embed editor uiSchema options */
export interface IEmbedUiSchemaOpts {
  intl: ComponentIntl;
  catalogs: IHubCatalog[];
  facets: IFacet[];
  pickerTitle: string;
  embed: _IHubEmbed;
}
/**
 * Returns an array of default catalogs for configuring
 * an embed
 * @param context The component's context object
 * @returns IHubCatalog[]
 */
export declare const buildDefaultCatalogs: (context: IArcGISContext) => IHubCatalog[];
/**
 * Returns an array of default facets for configuring
 * an embed
 * @param intl The component's context object
 * @returns IFacet[]
 */
export declare const buildDefaultFacets: (intl: ComponentIntl) => IFacet[];
