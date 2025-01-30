import { getValue } from './getValue';
/**
 * function to return the translated value of uiSchema element.
 * If a translation function or labelKey are not provided, we fall
 * back to the provided label
 */
export const getLabel = (uiSchemaElement, t, propertyPath) => {
  return getValue(uiSchemaElement, t, 'label', 'labelKey', propertyPath);
};
