'use strict';

const remove = require('./remove-921f5dc7.js');
const get = require('./get-0368c931.js');
const mergeObjects = require('./merge-objects-b31af1a3.js');
const objectToJsonBlob = require('./object-to-json-blob-5c0a267d.js');
const update = require('./update-b8977041.js');

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
    return remove.removeItemResource(Object.assign(Object.assign({}, requestOptions), { id,
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
    return get.getItemResource(id, Object.assign(Object.assign({}, requestOptions), { fileName: getResourceNameFromVersionId(versionId), readAs: "json" }));
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
    const resources = await get.getItemResources(id, Object.assign(Object.assign({}, requestOptions), { params: { sortField: "created", sortOrder: "desc" } }));
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
    const properties = mergeObjects.mergeObjects(versionMetadata, {}, VERSION_RESOURCE_PROPERTIES);
    // fetch the whole version so we can update it
    const version = await getVersion(id, versionMetadata.id, requestOptions);
    // apply the metadata to the version
    mergeObjects.mergeObjects(versionMetadata, version, VERSION_RESOURCE_PROPERTIES);
    const versionBlob = objectToJsonBlob.objectToJsonBlob(version);
    await update.updateItemResource(Object.assign(Object.assign({}, requestOptions), { id, name: VERSION_RESOURCE_NAME, owner, params: { properties }, prefix, resource: versionBlob }));
    return versionMetadata;
}

exports.VERSION_RESOURCE_NAME = VERSION_RESOURCE_NAME;
exports.VERSION_RESOURCE_PROPERTIES = VERSION_RESOURCE_PROPERTIES;
exports.deleteVersion = deleteVersion;
exports.getPrefix = getPrefix;
exports.getVersion = getVersion;
exports.searchVersions = searchVersions;
exports.updateVersionMetadata = updateVersionMetadata;
