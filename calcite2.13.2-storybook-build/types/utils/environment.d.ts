export declare type EnvironmentName = 'dev' | 'qa' | 'prod';
export interface EnvironmentIds {
  esriTemplateOrgIds: string[];
  alphaOrgs: string[];
  betaOrgs: string[];
  hubHomeItemId: string;
  templateItems: {
    experience: string;
  };
}
/**
 * Get the well known item and group ids for a given environment
 * @param envName
 * @returns well known item and group ids for the given environment
 */
export declare const getEnvironmentIds: (envName: EnvironmentName) => EnvironmentIds;
/**
 * Get the suffix to append to subdomains for a given environment urls
 * @param envName
 * @returns the suffix to append to subdomains for the given environment urls
 * @example '' for prod (hub.arcgis.com), 'qa' for qa (hubqa.arcgis.com), 'dev' for dev (hubdev.arcgis.com)
 */
export declare const getEnvSuffix: (envName: EnvironmentName) => string;
/**
 * Get the ArcGIS Online subdomain for a given environment
 * @param envName
 * @returns the ArcGIS Online subdomain for the given environment
 * @example www, qaext, or devext
 */
export declare const getAgoEnvSubdomain: (envName: EnvironmentName) => string;
