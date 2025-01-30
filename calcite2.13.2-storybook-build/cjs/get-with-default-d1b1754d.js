'use strict';

const getProp = require('./get-prop-4bd8fc1a.js');

/**
 * Gets the value of a property from an object with a
 * default if that prop is undefined
 * @param obj
 * @param prop
 * @param def
 */
function getWithDefault(obj, prop, def) {
    const res = getProp.getProp(obj, prop);
    return res !== undefined ? res : def;
}

exports.getWithDefault = getWithDefault;
