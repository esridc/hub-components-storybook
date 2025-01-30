import { base64ToUnicode } from "@esri/hub-common";
/**
 * Decodes a Base64 encoded string into a JSON object. Used for decoding complex web props that
 * are passed in as Base64 encoded strings.
 * See more: https://developer.mozilla.org/en-US/docs/Web/API/atob
 * @param encoded
 * @returns JSON object | undefined
 */
export function decodeProp(encoded) {
  try {
    return JSON.parse(base64ToUnicode(encoded));
  }
  catch (e) {
    console.error('could not parse prop JSON', e);
  }
}
