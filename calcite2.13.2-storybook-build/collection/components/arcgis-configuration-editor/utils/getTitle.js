import { getValue } from './getValue';
export const getTitle = (uiSchemaElement, t, propertyPath) => {
  return getValue(uiSchemaElement, t, 'title', 'titleKey', propertyPath);
};
