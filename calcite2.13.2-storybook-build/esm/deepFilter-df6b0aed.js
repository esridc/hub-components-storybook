import { _ as _isObject, b as _isDate, c as _isRegExp, d as _isFunction } from './_deep-map-values-53f8dbd1.js';

function isFindable(object) {
    let result = false;
    if (object &&
        _isObject(object) &&
        !_isDate(object) &&
        !_isRegExp(object) &&
        !_isFunction(object)) {
        result = true;
    }
    return result;
}

/**
 * Traverse a graph filtering out entries that do
 * not pass the predicate
 *
 * Note: this util uses cloning behind the scenes
 * so will only work for POJOs and not class instances
 *
 * example:
 * const predicate = (link: any) => link.key !== "00a"
 * const obj = [
 *   {
 *     key: "001",
 *     label: "Stop the Spotted Lanternfly",
 *   },
 *   {
 *     key: "002",
 *     label: "Create a Map",
 *     children: [
 *       {
 *         key: "00a",
 *         label: "ArcGIS Map Viewer",
 *       },
 *       {
 *         key: "00b",
 *         label: "ArcGIS Map Viewer Classic",
 *       },
 *     ],
 *   },
 * ];
 * const res = deepFilter(obj, predicate)
 * res = [
 *   {
 *     key: "001",
 *     label: "Stop the Spotted Lanternfly",
 *   },
 *   {
 *     key: "002",
 *     label: "Create a Map",
 *     children: [
 *       {
 *         key: "00b",
 *         label: "ArcGIS Map Viewer Classic",
 *       },
 *     ],
 *   },
 * ];
 *
 * @param object
 * @param predicate
 */
function deepFilter(object, predicate) {
    if (Array.isArray(object)) {
        return object.reduce((acc, entry) => {
            if (predicate(entry)) {
                if (isFindable(entry)) {
                    const filteredEntry = deepFilter(entry, predicate);
                    acc = [...acc, filteredEntry];
                }
                else {
                    acc = [...acc, entry];
                }
            }
            return acc;
        }, []);
    }
    else if (isFindable(object)) {
        return Object.keys(object).reduce((acc, entry) => {
            if (predicate(object[entry])) {
                if (isFindable(object[entry])) {
                    // Explicilty checking for Blob here, and copying the reference forward so it is maintained
                    if (typeof Blob !== "undefined" && object[entry] instanceof Blob) {
                        acc[entry] = object[entry];
                    }
                    else {
                        const filteredEntry = deepFilter(object[entry], predicate);
                        acc[entry] = filteredEntry;
                    }
                }
                else {
                    acc[entry] = object[entry];
                }
            }
            return acc;
        }, {});
    }
    else {
        return undefined;
    }
}

export { deepFilter as d, isFindable as i };
