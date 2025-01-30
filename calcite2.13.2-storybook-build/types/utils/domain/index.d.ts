import { IModel } from "@esri/hub-common";
import { DomainInfo } from "./_internal";
export { DomainInfo } from './_internal';
/**
 * serialize a domain and save it in local storage
 * @param domain omit this to clear any previously stored value
 */
export declare const storeDomain: (domain?: DomainInfo) => void;
/**
 * retrieve site domain info from local storage
 * @returns domain
 */
export declare const retrieveDomain: () => Partial<import("@esri/hub-common").IDomainEntry>;
/**
 * fetch domain by hostname
 * @param hostname
 * @returns
 */
export declare const fetchDomain: (hostname: string, context?: import("@esri/hub-common").IArcGISContext) => Promise<import("@esri/hub-common").IDomainEntry | {
  hostname: string;
  siteId: string;
}>;
/**
 * get the hostname from the window
 * @param win
 */
export declare const getHostname: (win?: Window) => string;
/**
 * Heuristic to determine if the hostname is hub-home-ish
 */
export declare const isHubHomeishHostname: (hostname: string, hubRootDomain: string) => boolean;
/**
 * fetch the domain info from the org given a hostname
 * @param hostname
 * @param portalBaseUrl
 * @param context
 * @returns
 */
export declare const fetchOrgDomainInfo: (baseDomainInfo: DomainInfo, context?: import("@esri/hub-common").IArcGISContext) => Promise<Partial<import("@esri/hub-common").IDomainEntry>>;
export declare const updateDefaultHubHomeSiteModel: (siteModel: IModel, domain: DomainInfo, win?: Window & typeof globalThis) => {
  item: {
    [x: string]: any;
    id: string;
    owner: string;
    tags: string[];
    created: number;
    modified: number;
    numViews: number;
    size: number;
    protected?: boolean;
    title: string;
    type: string;
    typeKeywords?: string[];
    description?: string;
    snippet?: string;
    documentation?: string;
    extent?: number[][];
    categories?: string[];
    spatialReference?: import("@esri/arcgis-rest-types").ISpatialReference;
    culture?: string;
    properties?: any;
    url?: string;
  };
  data: {
    [x: string]: any;
  };
};
/**
 * fetch the default hub home site for the environment
 * and update it with the domain info
 *
 * @param domain
 * @param context
 * @returns
 */
export declare const fetchDefaultHubHomeSite: (domain: DomainInfo, context?: import("@esri/hub-common").IArcGISContext) => Promise<import("@esri/hub-common").IHubSite>;
