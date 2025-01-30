/**
 * Map over an array returning the specified property for each entry
 * @param {String} prop Property to extracct
 * @param {Array} arr array of objects
 */
function mapBy(prop, arr = []) {
    return arr.map((e) => e[prop]);
}

export { mapBy as m };
