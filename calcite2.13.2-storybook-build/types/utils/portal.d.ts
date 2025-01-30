import { IRequestOptions } from '@esri/arcgis-rest-request';
import { HubEntity } from '@esri/hub-common';
/**
 * A function to fetch a cached organization record. If no hits
 * in the cache, it will request the organization via XHR
 * @param orgId An organization ID
 * @returns a promise that resolves an organization
 */
export declare const fetchPortalFromCache: (...args: any[]) => Promise<import("@esri/arcgis-rest-portal").IPortal>;
/**
 * Get the home app URL for a given entity
 *
 * @param entity
 * @param portalOrRequestOptions
 * @returns
 */
export declare const getEntityHomeUrl: (entity: HubEntity, portalOrRequestOptions: string | IRequestOptions) => string;
