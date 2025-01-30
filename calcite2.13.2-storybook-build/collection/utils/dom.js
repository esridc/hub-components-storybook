/**
 * escapes an unsafe string for use in html
*/
export function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
/**
 * Returns the assigned elements on a slot element from the onSlotchange event.
 */
export function slotChangeGetAssignedElements(event) {
  return event.target.assignedElements({
    flatten: true
  });
}
/**
 * Transforms a textarea value to html by replacing newlines with <br>
 * @param value
 * @returns html
 */
export const textareaToHtml = (value = '') => {
  return value.replace(/\n/g, '<br>');
};
