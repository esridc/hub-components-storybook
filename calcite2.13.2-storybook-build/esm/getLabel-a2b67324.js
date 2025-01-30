import { g as getProp } from './get-prop-ec5be510.js';

const getValue = (uiSchemaElement, t, valueProp, keyProp, propertyPath) => {
  const { [valueProp]: val, [keyProp]: valKey } = (propertyPath ? getProp(uiSchemaElement, propertyPath) : uiSchemaElement) || {};
  let result = val;
  if (valKey) {
    result = t(valKey);
  }
  return result;
};

/**
 * function to return the translated value of uiSchema element.
 * If a translation function or labelKey are not provided, we fall
 * back to the provided label
 */
const getLabel = (uiSchemaElement, t, propertyPath) => {
  return getValue(uiSchemaElement, t, 'label', 'labelKey', propertyPath);
};

export { getValue as a, getLabel as g };
