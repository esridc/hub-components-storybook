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
var ExpressionRelationships;
(function (ExpressionRelationships) {
  ExpressionRelationships["BETWEEN"] = "between";
  ExpressionRelationships["IS_EXACTLY"] = "isExactly";
  // deprecated and not currently allowed for new use, only used for migrating older stat cards
  ExpressionRelationships["LIKE"] = "like";
})(ExpressionRelationships || (ExpressionRelationships = {}));
const DEFAULT_FIELD_TO_RELATIONSHIP = {
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

export { DEFAULT_FIELD_TO_RELATIONSHIP as D, ExpressionRelationships as E, getSchema as a, getUiSchema as g };
