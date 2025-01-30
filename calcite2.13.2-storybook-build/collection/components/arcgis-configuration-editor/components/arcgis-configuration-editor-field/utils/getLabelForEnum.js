export const getLabelForEnum = (uiSchema, enumVal, t, opts) => {
  var _a;
  const { i18nScope } = ((_a = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.options) === null || _a === void 0 ? void 0 : _a.enum) || {};
  const { fallback, path } = opts || {};
  let result = fallback;
  if (t && i18nScope) {
    let labelKey = `${i18nScope}.${enumVal}`;
    if (path) {
      labelKey = `${labelKey}.${path}`;
    }
    result = t(labelKey, undefined, { fallback });
  }
  return result;
};
