/**
 * Decodes a Base64 encoded string into a JSON object. Used for decoding complex web props that
 * are passed in as Base64 encoded strings.
 * See more: https://developer.mozilla.org/en-US/docs/Web/API/atob
 * @param encoded
 * @returns JSON object | undefined
 */
export declare function decodeProp(encoded: any): any;
