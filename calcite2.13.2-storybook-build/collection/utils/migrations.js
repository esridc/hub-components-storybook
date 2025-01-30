/**
 * TODO: consider hoisting these to Hub.js
 */
/**
 * A general purpose migration utility used to transform an object from one schemaVersion to another that supports strict typings
 * @param schema The original schema to be transformed
 * @param transforms A map of supported transforms where the key is the schemaVersion and the value is the transform fn
 * @returns A transformed schema reflecting the latest supported schema version
 */
export function migrateSchema(schema, transforms) {
  const versions = Object.keys(transforms) // get an array of schemaVersion keys defined on the map
    .map(key => Number.parseFloat(key)) // coerce the schemaVersions from string to number, supporting decimals
    .sort(); // sort the schema versions ascending
  // loop over the schema versions and conditionally apply their related transform based on schemaVersion value of the input
  return versions.reduce((acc, version) => { var _a; return ((_a = acc.schemaVersion) !== null && _a !== void 0 ? _a : 1) < version ? transforms[version](acc) : acc; }, schema);
}
