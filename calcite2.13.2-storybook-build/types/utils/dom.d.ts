/**
 * escapes an unsafe string for use in html
*/
export declare function escapeHtml(unsafe: string): string;
/**
 * Returns the assigned elements on a slot element from the onSlotchange event.
 */
export declare function slotChangeGetAssignedElements(event: Event): Element[];
/**
 * Transforms a textarea value to html by replacing newlines with <br>
 * @param value
 * @returns html
 */
export declare const textareaToHtml: (value?: string) => string;
