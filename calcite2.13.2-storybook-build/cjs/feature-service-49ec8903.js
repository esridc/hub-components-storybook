'use strict';

const fetchHubEntity = require('./fetchHubEntity-88467d55.js');
const getService = require('./getService-b27eda44.js');
const getLayer = require('./getLayer-0c83b4c1.js');

/**
 * Fetches the feature service url of an item from its itemId.
 */
async function getFeatureServiceAsEntity(itemId, context) {
  try {
    return fetchHubEntity.fetchHubEntity("content", itemId, context);
  }
  catch (e) {
    console.error(e);
  }
}
async function getFeatureService(url, context) {
  var _a;
  try {
    const service = await getService.getService({ url, authentication: (_a = context === null || context === void 0 ? void 0 : context.userRequestOptions) === null || _a === void 0 ? void 0 : _a.authentication });
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
async function getFieldsFromLayer(url, context, layerId) {
  var _a;
  let fields = [];
  try {
    const layer = await getLayer.getLayer({ url: `${url}/${layerId}`, authentication: (_a = context === null || context === void 0 ? void 0 : context.userRequestOptions) === null || _a === void 0 ? void 0 : _a.authentication });
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
function getIconForFieldType(type) {
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
const NUMERIC_FIELD_TYPES = [
  "esriFieldTypeDouble", "esriFieldTypeInteger", "esriFieldTypeSmallInteger", "esriFieldTypeSingle",
];

exports.NUMERIC_FIELD_TYPES = NUMERIC_FIELD_TYPES;
exports.getFeatureService = getFeatureService;
exports.getFeatureServiceAsEntity = getFeatureServiceAsEntity;
exports.getFieldsFromLayer = getFieldsFromLayer;
exports.getIconForFieldType = getIconForFieldType;
