import { g as getProp } from './get-prop-ec5be510.js';
import { p as pathToCatalogInfo, d as deepContains } from './deepContains-ff859c50.js';

const isOpenDataGroup = (group) => !!group.isOpenData;

/**
 * Check that a specific entity is contained within a hierarchy of catalogs
 * @param identifier id or slug of the entity to check
 * @param hubEntityType Entity type of the identifier
 * @param path definition of the containment hierarchy /site/00c/projects/cc1 etc
 * @param context
 * @param rootCatalog Optional, root level catalog to start checking from (typically the site)
 * @returns
 */
async function deepCatalogContains(identifier, hubEntityType, path, context, rootCatalog) {
    // convert to catalog infos
    let infos = [];
    try {
        infos = pathToCatalogInfo(path);
    }
    catch (e) {
        return {
            identifier,
            isContained: false,
            catalogInfo: {},
            duration: 0,
            reason: getProp(e, "message") || "An error occurred while parsing path.",
        };
    }
    // add the root catalog to the end of the infos as it's the last one to check
    if (rootCatalog) {
        infos = [
            ...infos,
            {
                id: "root",
                hubEntityType: "site",
                catalog: rootCatalog,
            },
        ];
    }
    return deepContains(identifier, hubEntityType, infos, context);
}

export { deepCatalogContains as d, isOpenDataGroup as i };
