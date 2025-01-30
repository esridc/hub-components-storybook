import { UserSession } from "@esri/arcgis-rest-auth";
/**
 * Add the embedded auth params to the url if the user is authenticated
 * and the url is in the list of allowed origins.
 * @param iframeUrl
 * @param portalUrl
 * @param currentOrigin
 * @param userSession
 * @returns
 */
export declare function maybeAddEmbeddedAuth(iframeUrl: string, portalUrl: string, currentOrigin: string, userSession: UserSession): string;
