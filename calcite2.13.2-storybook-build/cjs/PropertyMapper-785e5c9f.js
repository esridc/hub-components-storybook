'use strict';

const utils = require('./utils-7f390376.js');
const util = require('./util-38e73510.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const setProp = require('./set-prop-3de2437f.js');
const deepSet = require('./deep-set-49b373be.js');

/**
 * @private
 * Manage forward and backward property mappings to
 * streamline conversion between the Hub Entities, and
 * the backing Store objects.
 */
class PropertyMapper {
    /**
     * Pass in the mappings between the Entity and
     * it's backing structure (model or otherwise)
     * @param mappings
     */
    constructor(mappings) {
        this.mappings = mappings;
    }
    /**
     * Map properties from a Store object, on to an Entity object.
     *
     * Used when constructing an Entity from a fetched Store object,
     * in which case the Entity should be an empty object (`{}`).
     *
     * Can also be used to apply changes to an Entity from a Store,
     * in which case an existing Entity can be passed in.
     * @param store
     * @param entity
     * @returns
     */
    storeToEntity(store, entity) {
        const obj = mapStoreToEntity(store, entity, this.mappings);
        // ------------------------------
        // Additional Read-Only Model Level Property Mappings
        // ------------------------------
        // Since they are not in the property map, setting these values on
        // the entity does not attempt to send that back upstream to the store
        if (getProp.getProp(store, "item")) {
            const itm = getProp.getProp(store, "item");
            // use setProp to side-step typechecking
            setProp.setProp("canEdit", ["admin", "update"].includes(itm.itemControl), obj);
            setProp.setProp("canDelete", itm.itemControl === "admin", obj);
            setProp.setProp("canRecycle", itm.canRecycle || false, obj);
            setProp.setProp("protected", itm.protected, obj);
        }
        return obj;
    }
    /**
     * Map properties from an entity object onto a model.
     *
     * Typically the model will already exist, and this
     * method is used to transfer changes to the model
     * prior to storage.
     * @param entity
     * @param store
     * @returns
     */
    entityToStore(entity, store) {
        return mapEntityToStore(entity, store, this.mappings);
    }
}
/**
 * Generic function to apply properties from an Object
 * (i.e. IHubProject) onto a Model that can be persisted to an Item
 * @param entity
 * @param store
 * @param mappings
 * @returns
 */
function mapEntityToStore(entity, store, mappings) {
    if (getProp.getProp(store, "item")) {
        const item = getProp.getProp(store, "item");
        if (item.typeKeywords) {
            item.typeKeywords = getProp.getProp(entity, "isDiscussable")
                ? item.typeKeywords.filter((typeKeyword) => typeKeyword !== utils.CANNOT_DISCUSS)
                : [...item.typeKeywords, utils.CANNOT_DISCUSS];
            setProp.setProp("item.typeKeywords", item.typeKeywords, store);
        }
    }
    return mapProps(entity, "entityKey", store, "storeKey", mappings);
}
/**
 * Generic function to apply properties from a Model
 * onto an Object (i.e. IHubProject etc)
 * @param store
 * @param entity
 * @param mappings
 * @returns
 */
function mapStoreToEntity(store, entity, mappings) {
    // Item specific logic...
    if (getProp.getProp(store, "item")) {
        const item = getProp.getProp(store, "item");
        setProp.setProp("isDiscussable", utils.isDiscussable(item), entity);
    }
    return mapProps(store, "storeKey", entity, "entityKey", mappings);
}
/**
 * Internal function to map between objects
 * @param source
 * @param sourceKey
 * @param target
 * @param targetKey
 * @param mappings
 * @returns
 */
function mapProps(source, sourceKey, target, targetKey, mappings) {
    // clone the target
    const clone = util.cloneObject(target);
    // walk the property map array
    mappings.forEach((entry) => {
        // Verbose b/c typescript hates the use of property indexing with generics
        // i.e. entry<T>[sourceKey] makes typescript angry
        const sourcePath = getProp.getProp(entry, sourceKey);
        const targetPath = getProp.getProp(entry, targetKey);
        // get the value from the source
        const sourceVal = getProp.getProp(source, sourcePath);
        // if it's not null or undefined
        if (sourceVal !== null && sourceVal !== undefined) {
            // set it
            deepSet.deepSet(clone, targetPath, sourceVal, true);
        }
    });
    return clone;
}

exports.PropertyMapper = PropertyMapper;
exports.mapEntityToStore = mapEntityToStore;
exports.mapStoreToEntity = mapStoreToEntity;
