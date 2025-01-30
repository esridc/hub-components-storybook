/**
 * mapping of schema types to default values. We need to use these defaults
 * when validating uiSchema rules and setting initial field values
 */
const SCHEMA_TYPE_TO_DEFAULT_FIELD_VALUE = {
  string: '',
  object: {},
  array: [],
  boolean: false,
  number: null,
  integer: null,
  null: null
};
var CONFIGURATION_VARIANTS;
(function (CONFIGURATION_VARIANTS) {
  CONFIGURATION_VARIANTS["workspace"] = "variant-workspace";
  CONFIGURATION_VARIANTS["layoutEditor"] = "variant-layout-editor";
})(CONFIGURATION_VARIANTS || (CONFIGURATION_VARIANTS = {}));

export { CONFIGURATION_VARIANTS as C, SCHEMA_TYPE_TO_DEFAULT_FIELD_VALUE as S };
