import { C as CANNOT_DISCUSS, i as isDiscussable } from './utils-6bf1b713.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { s as setProp } from './set-prop-9a4aa9a9.js';
import { d as deepSet } from './deep-set-67281c6f.js';

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
        if (getProp(store, "item")) {
            const itm = getProp(store, "item");
            // use setProp to side-step typechecking
            setProp("canEdit", ["admin", "update"].includes(itm.itemControl), obj);
            setProp("canDelete", itm.itemControl === "admin", obj);
            setProp("canRecycle", itm.canRecycle || false, obj);
            setProp("protected", itm.protected, obj);
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
    if (getProp(store, "item")) {
        const item = getProp(store, "item");
        if (item.typeKeywords) {
            item.typeKeywords = getProp(entity, "isDiscussable")
                ? item.typeKeywords.filter((typeKeyword) => typeKeyword !== CANNOT_DISCUSS)
                : [...item.typeKeywords, CANNOT_DISCUSS];
            setProp("item.typeKeywords", item.typeKeywords, store);
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
    if (getProp(store, "item")) {
        const item = getProp(store, "item");
        setProp("isDiscussable", isDiscussable(item), entity);
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
    const clone = cloneObject(target);
    // walk the property map array
    mappings.forEach((entry) => {
        // Verbose b/c typescript hates the use of property indexing with generics
        // i.e. entry<T>[sourceKey] makes typescript angry
        const sourcePath = getProp(entry, sourceKey);
        const targetPath = getProp(entry, targetKey);
        // get the value from the source
        const sourceVal = getProp(source, sourcePath);
        // if it's not null or undefined
        if (sourceVal !== null && sourceVal !== undefined) {
            // set it
            deepSet(clone, targetPath, sourceVal, true);
        }
    });
    return clone;
}

export { PropertyMapper as P, mapEntityToStore as a, mapStoreToEntity as m };
