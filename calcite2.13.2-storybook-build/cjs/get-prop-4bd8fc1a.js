'use strict';

/**
 * Get a property out of a deeply nested object. Supports array indexing
 * and property matching.
 *
 * Examples:
 * ```js
 * getProp({a: {b: {c: 1}}}, "a.b.c") => 1
 * getProp({a: {b: {c: 1}}}, "a.b.d") => undefined
 * getProp({a: {b: {c: 1}}}, "a.b") => {c: 1}
 * getProp({a: {b: [1,2]}}, "a.b[0]") => 1
 * getProp({a: {b: {c: 1}, b2: { $use: "a.b"}}, "a.b2") => {c: 1}
 * getProp({a: [{key: "x", val:1}, {key: "y", val:3}]}, "a[1]") => {key: "y", val:3}
 * getProp({a: [{key: "x", val:1}, {key: "y", val:3}]}, "a[1].val") => 3
 * getProp({a: [{key: "x", val:1}, {key: "y", val:3}]}, "a[findBy(key,y)].val") => 3
 * getProp({a: [{key: "x", val:1}, {key: "y", val:3}]}, "a[findBy(val,1)].key") => "x"
 * ```
 */
const getProp = (obj, path) => {
    return path.split(".").reduce(function (prev, curr) {
        const match = curr.match(/\[(.*?)\]$/);
        if (match) {
            const indexOrFnName = match[1];
            const propName = curr.replace(match[0], "");
            if (parseInt(indexOrFnName, 10) > -1) {
                const idx = parseInt(indexOrFnName, 10);
                // check that the array exists and that the index is valid
                if (Array.isArray(prev[propName]) && prev[propName][idx]) {
                    return prev[propName][idx];
                }
                else {
                    return undefined;
                }
            }
            else {
                // we have an operation that we want to apply to the array
                return applyOperation(prev[propName], indexOrFnName);
            }
        }
        else {
            if (prev && prev[curr] !== undefined) {
                if (prev[curr] !== null && prev[curr].$use) {
                    return getProp(obj, prev[curr].$use);
                }
                else {
                    return prev[curr];
                }
            }
            else {
                return undefined;
            }
        }
    }, obj);
};
function applyOperation(arr, operation) {
    // split up the operation into the operationName and the arguments
    // e.g. "findBy(key,'projects')" => ["findBy", "key, 'projects'"]
    const parts = operation.split("(");
    // lots of guards...
    if (!parts || parts.length !== 2)
        return undefined;
    let result;
    const fnName = parts[0];
    const args = parts[1]
        .replace(")", "")
        .split(",")
        .map((p) => p.trim());
    switch (fnName) {
        case "findBy":
            const prop = args[0];
            let val;
            if (isNumeric(args[1])) {
                val = parseFloat(args[1]);
            }
            else {
                val = args[1].replace(/'/g, "");
            }
            result = arr.find((p) => p[prop] === val);
            break;
        default:
            result = undefined;
    }
    return result;
}
function isNumeric(n) {
    return !isNaN(parseFloat(n));
}

exports.getProp = getProp;
