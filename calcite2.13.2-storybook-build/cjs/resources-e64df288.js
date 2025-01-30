'use strict';

const getSchema = (properties) => {
  return {
    required: [],
    type: 'object',
    properties: Object.assign({}, properties)
  };
};
const getUiSchema = (elements = []) => {
  return {
    type: "Layout",
    // elements: options.elements,
    elements: [
      ...elements,
    ]
  };
};
exports.ExpressionRelationships = void 0;
(function (ExpressionRelationships) {
  ExpressionRelationships["BETWEEN"] = "between";
  ExpressionRelationships["IS_EXACTLY"] = "isExactly";
  // deprecated and not currently allowed for new use, only used for migrating older stat cards
  ExpressionRelationships["LIKE"] = "like";
})(exports.ExpressionRelationships || (exports.ExpressionRelationships = {}));
const DEFAULT_FIELD_TO_RELATIONSHIP = {
  "esriFieldTypeDate": exports.ExpressionRelationships.BETWEEN,
  "esriFieldTypeBlob": exports.ExpressionRelationships.BETWEEN,
  "esriFieldTypeDouble": exports.ExpressionRelationships.BETWEEN,
  "esriFieldTypeGUID": exports.ExpressionRelationships.BETWEEN,
  "esriFieldTypeGeometry": exports.ExpressionRelationships.BETWEEN,
  "esriFieldTypeGlobalID": exports.ExpressionRelationships.BETWEEN,
  "esriFieldTypeOID": exports.ExpressionRelationships.BETWEEN,
  "esriFieldTypeRaster": exports.ExpressionRelationships.BETWEEN,
  "esriFieldTypeSingle": exports.ExpressionRelationships.BETWEEN,
  "esriFieldTypeSmallInteger": exports.ExpressionRelationships.BETWEEN,
  "esriFieldTypeString": exports.ExpressionRelationships.IS_EXACTLY,
  "esriFieldTypeXML": exports.ExpressionRelationships.BETWEEN,
  "esriFieldTypeInteger": exports.ExpressionRelationships.BETWEEN,
};

exports.DEFAULT_FIELD_TO_RELATIONSHIP = DEFAULT_FIELD_TO_RELATIONSHIP;
exports.getSchema = getSchema;
exports.getUiSchema = getUiSchema;
