import { b as capitalize } from './util-3e6872d9.js';

// For some reason, if this is exported here, random tests
// start failing. Resolved by moving to the root index
// export * from "./getCardModelUrl";
const MAP_OR_FEATURE_SERVER_URL_REGEX = /\/(map|feature)server/i;
/**
 *
 * @param url
 * @returns true if the url is of a map or feature service
 */
const isMapOrFeatureServerUrl = (url) => {
    return MAP_OR_FEATURE_SERVER_URL_REGEX.test(url);
};
/**
 * parses map or feature service type from URL
 * @param url map or feature service URL
 * @returns item type, either "Map Service" or "Feature Service"
 * or undefined for other types of URLs
 */
const getServiceTypeFromUrl = (url) => {
    const match = url.match(MAP_OR_FEATURE_SERVER_URL_REGEX);
    const mapOrFeature = match && match[1];
    return mapOrFeature && `${capitalize(mapOrFeature)} Service`;
};

export { getServiceTypeFromUrl as g, isMapOrFeatureServerUrl as i };
