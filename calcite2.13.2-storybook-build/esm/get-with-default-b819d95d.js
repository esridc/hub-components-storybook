import { g as getProp } from './get-prop-ec5be510.js';

/**
 * Gets the value of a property from an object with a
 * default if that prop is undefined
 * @param obj
 * @param prop
 * @param def
 */
function getWithDefault(obj, prop, def) {
    const res = getProp(obj, prop);
    return res !== undefined ? res : def;
}

export { getWithDefault as g };
