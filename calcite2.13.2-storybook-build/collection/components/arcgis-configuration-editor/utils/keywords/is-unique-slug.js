import { Logger } from "@esri/hub-common";
import { getGlobalContext } from "../../../../utils/state";
/**
 * A custom keyword to determine if the entered domain is already in use
 */
export const isUniqueSlug = {
  keyword: "isUniqueSlug",
  async: true,
  type: "string",
  validate: validateUniqueSlug,
};
// NOTE: this expects the data to be the entity's
// slug _without_ the `${orgUrlKey}|` prefix
// see ./readme.md#arguments for more info on schema and data
async function validateUniqueSlug(schema, data) {
  // NOTE: using dynamic import b/c this keyword
  // is currently added to _all_ validators
  const { findItemsBySlug } = await import("@esri/hub-common");
  const context = getGlobalContext();
  // id is only passed in when editing an existing entity
  const exclude = schema === null || schema === void 0 ? void 0 : schema.id;
  const orgUrlKey = schema === null || schema === void 0 ? void 0 : schema.orgUrlKey;
  const slug = `${orgUrlKey}|${data}`;
  let isValid;
  try {
    const results = await findItemsBySlug({ slug, exclude }, context.requestOptions);
    isValid = results.length === 0;
  }
  catch (e) {
    Logger.error(`Error checking for unique slug: ${slug}`, e);
    isValid = false;
  }
  return isValid;
}
