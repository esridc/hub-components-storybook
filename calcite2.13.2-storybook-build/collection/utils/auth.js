import { request } from "@esri/arcgis-rest-request";
// TODO: move this to hub.js and add tests there
// it could then be used in torii-provider-arcgis
/**
 * copy of exchangeToken() from @esri/arcgis-rest-auth
 * that exposes the whole response instead of just the token
 *
 * @param token
 * @param clientId
 * @param portal
 * @returns
 */
/* istanbul ignore next */
export const exchangeToken = (token, clientId, portal = "https://www.arcgis.com/sharing/rest") => {
  const url = `${portal}/oauth2/exchangeToken`;
  const ro = {
    method: "POST",
    params: {
      f: "json",
      client_id: clientId,
      token,
    },
  };
  // make the request and return the token
  return request(url, ro); //.then((response) => response.token);
};
