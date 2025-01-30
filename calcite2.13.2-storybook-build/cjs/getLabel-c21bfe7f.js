'use strict';

const getProp = require('./get-prop-4bd8fc1a.js');

const getValue = (uiSchemaElement, t, valueProp, keyProp, propertyPath) => {
  const { [valueProp]: val, [keyProp]: valKey } = (propertyPath ? getProp.getProp(uiSchemaElement, propertyPath) : uiSchemaElement) || {};
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

exports.getLabel = getLabel;
exports.getValue = getValue;
