/**
 * escapes an unsafe string for use in html
*/
/**
 * Returns the assigned elements on a slot element from the onSlotchange event.
 */
function slotChangeGetAssignedElements(event) {
  return event.target.assignedElements({
    flatten: true
  });
}
/**
 * Transforms a textarea value to html by replacing newlines with <br>
 * @param value
 * @returns html
 */
const textareaToHtml = (value = '') => {
  return value.replace(/\n/g, '<br>');
};

export { slotChangeGetAssignedElements as s, textareaToHtml as t };
