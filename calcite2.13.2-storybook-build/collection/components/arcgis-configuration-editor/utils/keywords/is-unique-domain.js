import { getGlobalContext } from "../../../../utils/state";
/**
 * A custom keyword to determine if the entered domain is already in use
 */
export const isUniqueDomain = {
  keyword: "isUniqueDomain",
  async: true,
  type: "object",
  validate: validateUniqueDomain,
};
// see ./readme.md#arguments for more info on schema and data
async function validateUniqueDomain(schema, data) {
  // NOTE: using dynamic import b/c this keyword
  // is currently added to _all_ validators
  const { lookupDomain } = await import("@esri/hub-sites");
  const context = getGlobalContext();
  const hostname = data.defaultHostname;
  // siteId is only passed in when editing an existing site
  const siteId = schema === null || schema === void 0 ? void 0 : schema.siteId;
  let isValid;
  try {
    const domain = await lookupDomain(hostname, context.hubRequestOptions);
    // if lookupDomain does NOT throw, we found a domain record
    // which is only valid if it is associated with the site we are editing
    isValid = domain.siteId === siteId;
  }
  catch (_) {
    // no domain found, so it's available
    isValid = true;
  }
  return isValid;
}
