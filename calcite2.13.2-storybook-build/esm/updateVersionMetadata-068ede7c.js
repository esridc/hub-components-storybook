import { a as removeItemResource } from './remove-7361a90a.js';
import { e as getItemResource, b as getItemResources } from './get-f0caeb52.js';
import { m as mergeObjects } from './merge-objects-5b123ab3.js';
import { o as objectToJsonBlob } from './object-to-json-blob-583ae5c3.js';
import { u as updateItemResource } from './update-6a7d5697.js';

/**
 * Returns the prefix (the "folder" name)
 * @param versionId
 * @private
 */
function getPrefix(versionId) {
    return `hubVersion_${versionId}`;
}

const VERSION_RESOURCE_NAME = "version.json";
const VERSION_RESOURCE_PROPERTIES = [
    "created",
    "creator",
    "description",
    "id",
    "name",
    "parent",
    "updated",
];

/**
 * Returns the resource name
 * @param versionId
 * @private
 */
function getResourceNameFromVersionId(versionId) {
    return getPrefix(`${versionId}/${VERSION_RESOURCE_NAME}`);
}

/**
 * Deletes the version specified by the entity id and versionId
 * @param id
 * @param versionId
 * @param owner
 * @param requestOptions
 * @returns
 */
async function deleteVersion(id, versionId, owner, requestOptions) {
    return removeItemResource(Object.assign(Object.assign({}, requestOptions), { id,
        owner, resource: getResourceNameFromVersionId(versionId) }));
}

/**
 * Returns an IVersion object for the specified entity id and versionId
 * @param id
 * @param versionId
 * @param requestOptions
 * @returns
 */
async function getVersion(id, versionId, requestOptions) {
    return getItemResource(id, Object.assign(Object.assign({}, requestOptions), { fileName: getResourceNameFromVersionId(versionId), readAs: "json" }));
}

/**
 * Returns an IVersionMetadata from the resource search result item
 * @param resource
 * @private
 */
function versionMetadataFromResource(resource) {
    // we get access, path, and size from the resource itself
    const { access, resource: path, size } = resource;
    // the rest is on properties as a json string
    let properties;
    const propertiesJson = resource.properties || "{}";
    try {
        properties = JSON.parse(propertiesJson);
    }
    catch (e) {
        properties = {};
    }
    return Object.assign(Object.assign({}, properties), { access,
        path,
        size });
}

/**
 * Returns an array containing the versions of the specified item
 * @param id
 * @param requestOptions
 * @returns
 */
async function searchVersions(id, requestOptions) {
    const resources = await getItemResources(id, Object.assign(Object.assign({}, requestOptions), { params: { sortField: "created", sortOrder: "desc" } }));
    // the resources api does not support q - so we fetch all of them and do the filtering here
    return (resources.resources
        // filter out any that do not look like hubVersion_<id>/version.json
        .filter((resource) => resource.resource.match(/^hubVersion_[a-zA-Z0-9_\s]*\/version.json/))
        // transform the resouce into a version metadata object
        .map(versionMetadataFromResource));
}

/**
 * Updates the specified version's metadata
 * @param id
 * @param versionMetadata
 * @param owner
 * @param requestOptions
 * @returns
 */
async function updateVersionMetadata(id, versionMetadata, owner, requestOptions) {
    const prefix = getPrefix(versionMetadata.id);
    const properties = mergeObjects(versionMetadata, {}, VERSION_RESOURCE_PROPERTIES);
    // fetch the whole version so we can update it
    const version = await getVersion(id, versionMetadata.id, requestOptions);
    // apply the metadata to the version
    mergeObjects(versionMetadata, version, VERSION_RESOURCE_PROPERTIES);
    const versionBlob = objectToJsonBlob(version);
    await updateItemResource(Object.assign(Object.assign({}, requestOptions), { id, name: VERSION_RESOURCE_NAME, owner, params: { properties }, prefix, resource: versionBlob }));
    return versionMetadata;
}

export { VERSION_RESOURCE_NAME as V, VERSION_RESOURCE_PROPERTIES as a, getVersion as b, deleteVersion as d, getPrefix as g, searchVersions as s, updateVersionMetadata as u };
