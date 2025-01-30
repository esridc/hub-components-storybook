import { fetchHubEntity } from "@esri/hub-common";
import { getService, getLayer } from "@esri/arcgis-rest-feature-layer";
/**
 * Fetches the feature service url of an item from its itemId.
 */
export async function getFeatureServiceAsEntity(itemId, context) {
  try {
    return fetchHubEntity("content", itemId, context);
  }
  catch (e) {
    console.error(e);
  }
}
export async function getFeatureService(url, context) {
  var _a;
  try {
    const service = await getService({ url, authentication: (_a = context === null || context === void 0 ? void 0 : context.userRequestOptions) === null || _a === void 0 ? void 0 : _a.authentication });
    return service;
  }
  catch (e) {
    console.error(e);
  }
}
/**
 * Fetches the fields of a layer given the base feature service url and the layer id.
 * @param url Feature service url
 * @param layerId Layer id of the feature service targeted
 * @param context
 * @returns Array of IField
 */
export async function getFieldsFromLayer(url, context, layerId) {
  var _a;
  let fields = [];
  try {
    const layer = await getLayer({ url: `${url}/${layerId}`, authentication: (_a = context === null || context === void 0 ? void 0 : context.userRequestOptions) === null || _a === void 0 ? void 0 : _a.authentication });
    if (layer) {
      fields = layer.fields;
    }
  }
  catch (e) {
  }
  return fields;
}
/**
 * Converts a field type into its respective icon string to display.
 */
export function getIconForFieldType(type) {
  return {
    "esriFieldTypeBlob": "file-text",
    "esriFieldTypeDate": "calendar",
    "esriFieldTypeDouble": "number",
    "esriFieldTypeGeometry": "vertex-check",
    "esriFieldTypeGlobalID": "fingerprint",
    "esriFieldTypeGUID": "fingerprint",
    "esriFieldTypeInteger": "number",
    "esriFieldTypeOID": "fingerprint",
    "esriFieldTypeRaster": "string",
    "esriFieldTypeSingle": "number",
    "esriFieldTypeSmallInteger": "number",
    "esriFieldTypeString": "string",
    "esriFieldTypeXML": "string",
  }[type];
}
export const NUMERIC_FIELD_TYPES = [
  "esriFieldTypeDouble", "esriFieldTypeInteger", "esriFieldTypeSmallInteger", "esriFieldTypeSingle",
];
