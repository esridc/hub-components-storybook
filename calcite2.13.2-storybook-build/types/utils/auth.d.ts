/**
 * copy of exchangeToken() from @esri/arcgis-rest-auth
 * that exposes the whole response instead of just the token
 *
 * @param token
 * @param clientId
 * @param portal
 * @returns
 */
export declare const exchangeToken: (token: string, clientId: string, portal?: string) => Promise<any>;
