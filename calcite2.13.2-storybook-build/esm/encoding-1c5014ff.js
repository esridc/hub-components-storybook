import { a as abab } from './index-0a8fd06b.js';

// these were copied from:
// https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
function base64ToBytes(base64) {
    const binString = abab.atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
}
function bytesToBase64(bytes) {
    const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join("");
    return abab.btoa(binString);
}
/**
 * Base 64 encoding for strings that may include unicode characters
 * @param data
 * @returns base
 */
function unicodeToBase64(data) {
    return bytesToBase64(new TextEncoder().encode(data));
}
/**
 * Base 64 decoding for strings that may include unicode characters
 * @param data
 * @returns
 */
function base64ToUnicode(data) {
    return new TextDecoder().decode(base64ToBytes(data));
}

export { base64ToUnicode as b, unicodeToBase64 as u };
