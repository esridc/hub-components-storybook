'use strict';

const getProp = require('./get-prop-4bd8fc1a.js');
const deepSet = require('./deep-set-49b373be.js');

/**
 * Apply a specified set properties from a source object to a target object
 *
 * @param {Object} source The source object
 * @param {Object} target The target object
 * @param {Array} allowList Array of property paths (if not provided, source returned)
 */
function mergeObjects(source, target, allowList) {
    if (Array.isArray(allowList) && allowList.length) {
        // we iterate the allowList, applying changes to the target from source
        allowList.forEach(prop => {
            if (getProp.getProp(source, prop) !== undefined) {
                deepSet.deepSet(target, prop, getProp.getProp(source, prop));
            }
        });
        // return the modified target object
        return target;
    }
    else {
        // if no property paths were passed in, return the source
        return source;
    }
}

exports.mergeObjects = mergeObjects;
