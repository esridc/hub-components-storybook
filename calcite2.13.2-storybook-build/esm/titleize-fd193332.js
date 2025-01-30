import { b as capitalize } from './util-3e6872d9.js';

/**
 * Capitalize every word in a sentence
 * @param {string} value
 * @returns {string} a sentence with every word being capitalized
 */
function titleize(value) {
    return value
        .split(" ")
        .map((k) => capitalize(k))
        .join(" ");
}

export { titleize as t };
