/**
 * Build a list of type strings from rawTypesFromAGO
 * e.g. ["Application", "Web Map", "Web Scene"... ]
 * @returns
 */
export function getAgoTypes(rawAgoTypes) {
  const types = rawAgoTypes.map(rawType => rawType.split(':')[0].split('#')[0]);
  // remove duplicates and sort alphabetically
  return [...new Set(types)].sort();
}
;
