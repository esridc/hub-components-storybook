import { deleteProp } from "@esri/hub-common";
import { getPropertyPathFromId } from "./getPropertyFrom";
/**
 * Utility function to clear a value from the current configuration values object.
 * Acts differently depending on if the property is top-level or nested.
 * If setProp allows for setting a value to undefined, this function would not be needed and
 * could be replaced by setProp.
 * @param property
 * @param values
 */
export function clearValue(property, values) {
  // if top-level, we have to manually set it to undefined so that an overwrite will work as expected
  // TODO: a better solution here is a setProp util that allows us to set a property to undefined
  if (Object.keys(values).includes(property)) {
    values[property] = undefined;
  }
  else {
    deleteProp(values, property);
  }
}
/**
 * Util to clear values from fields that have just been hidden according to the uiSchema whitelist.
 * Only clears values that have the clearOnHidden option enabled on the uiSchemaElement.
 * @param whiteList
 * @param previousWhiteList
 * @param clearOnHidden
 * @param values
 */
export function clearValuesFromHiddenFields(whiteList, previousWhiteList, clearOnHidden, values) {
  // for each element that was hidden, clear its value, if the uiSchema rule dictates it
  clearOnHidden.forEach((id) => {
    const propertyPath = getPropertyPathFromId(id);
    const isElementHidden = !whiteList.includes(id) && previousWhiteList.includes(id);
    if (isElementHidden) {
      clearValue(propertyPath, values);
    }
  });
}
