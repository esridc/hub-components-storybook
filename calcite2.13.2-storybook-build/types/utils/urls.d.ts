import { Level } from '@esri/hub-common';
import { HubEntity, IArcGISContext } from '@esri/hub-common';
/**
 * Get link to layout editor for a given entity
 * @param entity
 * @returns
 */
export declare const getEntityLayoutUrl: (entity: HubEntity) => string;
export declare const getEntityWorkspaceUrl: (entity: HubEntity, context: IArcGISContext) => string;
export declare const getProfileUrl: (context?: IArcGISContext) => string;
export declare const getOverviewUrl: (context?: IArcGISContext) => string;
/**
 * Get the URL to the workspace home page
 * @param context
 * @returns
 */
export declare const getWorkspaceHomeUrl: (context?: IArcGISContext) => string;
export declare const getRelativeEntityViewUrl: (entity: HubEntity) => string;
/**
 * returns the absolute URL to the view for a given entity
 * @param entity
 * @param location
 * @returns
 */
export declare const getAbsoluteEntityViewUrl: (entity: HubEntity, location?: Location) => string;
/**
 * Get a workspace url for an entity that is based at the given hostname
 * @param hostname
 * @param type
 * @param id
 * @param pane
 * @returns
 */
export declare const getAbsoluteEntityWorkspaceUrl: (hostname: string, type: string, id: string | undefined, pane: string | undefined) => string;
/**
 * returns URL to the view that shows all entities of the same type
 * by stripping everything after the identifier
 *
 * @param entityUrl URL (relative or absolute) to an entity view
 * @param identifier entitiy identifier
 * @returns URL to the view that shows all entities of the same type
 */
export declare const getEntityTypeViewUrl: (entityUrl: string, identifier: string) => string;
/**
 * Returns the level enumeration for the corresponding level name.
 * If level does not exist, defaults to Level.off
 */
export declare function parseLogLevel(levelString: string): Level;
/**
 * redirects to an external URL
 * using this makes it easier to mock in tests
 * @param url
 */
export declare const redirectToExternalUrl: (url: string) => void;
export declare const injectPort: (url: string, port: string) => string;
/**
 * Returns true if the href is an external link
 * @param href
 * @returns
 */
export declare const isExternalLink: (href: string) => boolean;
/**
 * Return the home url for a site. For ArcGIS Online, this is just the origin, for Enterprise it's the origin + the app path + the site hash.
 * @param href window.location.href
 * @param origin window.location.origin
 * @param context IArcGISContext
 * @returns
 */
export declare const getSiteHomeUrl: (href: string, origin: string, context: IArcGISContext) => string;
/**
 * get the URL the portal's signout endpoint
 *
 * @param portalBaseUrl Portal base URL
 * @param redirectUrl URL to redirect to after signout
 * @param clientId App's client ID
 * @returns
 */
export declare const getSignOutUrl: (portalBaseUrl: string, redirectUrl: string, clientId?: string) => string;
/**
 * parse the base hostname and it's parts out of a hub url
 * @param url
 * @returns
 */
export declare const parseHubUrl: (url: string) => {
  /**
   * the Hub portion of the hostname
   * (i.e. excluding any prefixes for site or org)
   * in the following format: <hub|opendata><env?>.arcgis.com
   */
  hubDomain?: string;
  /** whether the second level domain is 'opendata' (or `opendataqa`, etc) */
  isOpenData?: boolean;
  /** either '' (prod), 'qa', or 'dev' */
  envSuffix?: string;
};
