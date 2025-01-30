import { getProp } from "@esri/hub-common";
export const getValue = (uiSchemaElement, t, valueProp, keyProp, propertyPath) => {
  const { [valueProp]: val, [keyProp]: valKey } = (propertyPath ? getProp(uiSchemaElement, propertyPath) : uiSchemaElement) || {};
  let result = val;
  if (valKey) {
    result = t(valKey);
  }
  return result;
};
