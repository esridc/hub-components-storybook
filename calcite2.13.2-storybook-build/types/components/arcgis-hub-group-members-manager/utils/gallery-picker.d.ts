import { IArcGISContext, IHubCatalog, IHubGroup } from "@esri/hub-common";
import { ComponentIntl } from "../../../utils/stencil-intl";
import { IFacet } from "../../../utils/types";
export declare const pickerCatalogDefinition: IHubCatalog;
export declare function getUserPickerFacets(group: IHubGroup, context: IArcGISContext, intl: ComponentIntl, i18nScope?: string): IFacet[];
