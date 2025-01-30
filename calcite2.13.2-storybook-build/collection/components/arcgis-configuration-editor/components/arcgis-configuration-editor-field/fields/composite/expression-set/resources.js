export const getSchema = (properties) => {
  return {
    required: [],
    type: 'object',
    properties: Object.assign({}, properties)
  };
};
export const getUiSchema = (elements = []) => {
  return {
    type: "Layout",
    // elements: options.elements,
    elements: [
      ...elements,
    ]
  };
};
export var ExpressionRelationships;
(function (ExpressionRelationships) {
  ExpressionRelationships["BETWEEN"] = "between";
  ExpressionRelationships["IS_EXACTLY"] = "isExactly";
  // deprecated and not currently allowed for new use, only used for migrating older stat cards
  ExpressionRelationships["LIKE"] = "like";
})(ExpressionRelationships || (ExpressionRelationships = {}));
export const DEFAULT_FIELD_TO_RELATIONSHIP = {
  "esriFieldTypeDate": ExpressionRelationships.BETWEEN,
  "esriFieldTypeBlob": ExpressionRelationships.BETWEEN,
  "esriFieldTypeDouble": ExpressionRelationships.BETWEEN,
  "esriFieldTypeGUID": ExpressionRelationships.BETWEEN,
  "esriFieldTypeGeometry": ExpressionRelationships.BETWEEN,
  "esriFieldTypeGlobalID": ExpressionRelationships.BETWEEN,
  "esriFieldTypeOID": ExpressionRelationships.BETWEEN,
  "esriFieldTypeRaster": ExpressionRelationships.BETWEEN,
  "esriFieldTypeSingle": ExpressionRelationships.BETWEEN,
  "esriFieldTypeSmallInteger": ExpressionRelationships.BETWEEN,
  "esriFieldTypeString": ExpressionRelationships.IS_EXACTLY,
  "esriFieldTypeXML": ExpressionRelationships.BETWEEN,
  "esriFieldTypeInteger": ExpressionRelationships.BETWEEN,
};
