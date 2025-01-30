import { d as deepSet } from './deep-set-67281c6f.js';

/**
 * Sets a deep object property, constructing the property path as necessary
 *
 * @param path - the path to the property we want to set
 * @param val - the value we want to set it to
 * @param obj - the target object
 * @param replace - if true, replace the value at the path with the new value instead of merging
 */
function setProp(path, val, obj, replace = false) {
    if (Array.isArray(path)) {
        path = path.join(".");
    }
    deepSet(obj, path, val, replace);
}

export { setProp as s };
