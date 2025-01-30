'use strict';

const util = require('./util-38e73510.js');

/**
 * Capitalize every word in a sentence
 * @param {string} value
 * @returns {string} a sentence with every word being capitalized
 */
function titleize(value) {
    return value
        .split(" ")
        .map((k) => util.capitalize(k))
        .join(" ");
}

exports.titleize = titleize;
