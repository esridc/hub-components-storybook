'use strict';

const index = require('./index-058372c1.js');
const util = require('./util-38e73510.js');
const types = require('./types-2810dd27.js');
const search = require('./search-2db68ef4.js');

const WGS84_WKID = "4326";
/**
 * Puts a spatial reference into a serialized format that can be used
 * for item typeKeywords.
 *
 * **Note**: discards "latestWkid"
 *
 * In the past we used `JSON.stringify`, but that causes problems because
 * it can include commas which are interpreted by the portal [update item call](https://developers.arcgis.com/rest/users-groups-and-items/update-item.htm)
 * as being separate typekeywords. With `JSON.stringify`, equality was also
 * dependent on the order of the properties in the spatial reference.
 *
 * Check https://developers.arcgis.com/web-map-specification/objects/spatialReference/
 * for more details on what this object looks like.
 */
function serializeSpatialReference(spatialReference) {
    if (typeof spatialReference === "object") {
        const { wkid, wkt } = spatialReference;
        return wkid ? wkid + "" : index.abab.btoa(wkt);
    }
    else {
        return spatialReference;
    }
}
/**
 * spatialRefId can currently take the form of either a WKID string or a
 * serialized ISpatialReference object.
 *
 * TODO - we shouldn't need this function. Instead, spatialRefId should
 * always be consistent, maybe by using serializeSpatialReference
 *
 * @private
 */
function parseSpatialRefId(spatialRefId) {
    let _spatialRefId;
    try {
        _spatialRefId = JSON.parse(spatialRefId);
    }
    catch (_a) {
        _spatialRefId = spatialRefId;
    }
    return _spatialRefId;
}
/**
 * Builds the Portal API query string to search for exports from a given dataset
 *
 * @param itemId - The dataset ID
 * @param options - A set of options including item types, layerId, and spatialRefId
 * @returns
 */
function buildExistingExportsPortalQuery(itemId, options) {
    const { onlyTypes, layerId, spatialRefId } = maybeExtractOptions(options);
    const formatInfos = Object.keys(types.PORTAL_EXPORT_TYPES).map((key) => types.PORTAL_EXPORT_TYPES[key]);
    const noProjectionItemTypes = new Set(util.flattenArray(formatInfos
        .filter((info) => !info.supportsProjection)
        .map((info) => info.itemTypes)));
    let types$1;
    if (!onlyTypes) {
        types$1 = util.flattenArray(formatInfos.map((info) => info.itemTypes));
    }
    else {
        types$1 = onlyTypes;
    }
    const queryBuilder = new search.SearchQueryBuilder()
        .startGroup()
        .match(getExportItemTypeKeyword(itemId))
        .in("typekeywords")
        .and()
        .match(getExportLayerTypeKeyword(layerId))
        .in("typekeywords")
        .endGroup()
        .and()
        .startGroup();
    buildExportTypesClause(queryBuilder, {
        types: types$1,
        spatialRefId,
        noProjectionItemTypes,
    });
    queryBuilder.endGroup();
    return queryBuilder.toParam();
}
function maybeExtractOptions(options) {
    if (options) {
        return {
            onlyTypes: options.onlyTypes,
            layerId: options.layerId,
            spatialRefId: options.spatialRefId,
        };
    }
    return {};
}
function buildExportTypesClause(builder, options) {
    const { types, noProjectionItemTypes, spatialRefId } = options;
    const getSpatialRefIdWithDefaults = (_spatialRefId, itemType) => {
        let ret = WGS84_WKID;
        if (_spatialRefId && !noProjectionItemTypes.has(itemType)) {
            ret = _spatialRefId;
        }
        return ret;
    };
    const buildQueryForType = (type, _builder) => {
        _builder
            .startGroup()
            .match(/\s/g.test(type) ? type : `"${type}"`) // temporary logic until https://github.com/Esri/arcgis-rest-js/issues/916 is resolved
            .in("type")
            .and()
            .match(getSpatialRefTypeKeyword(getSpatialRefIdWithDefaults(spatialRefId, type)))
            .in("typekeywords")
            .endGroup();
    };
    types.forEach((type, i) => {
        buildQueryForType(type, builder);
        if (i < types.length - 1) {
            builder.or();
        }
    });
}
/**
 * Generates typekeyword for identifying which spatialRefId an export is
 * @param spatialRefId - either a WKID, WKT, or stringified ISpatialReference
 * @private
 */
function getSpatialRefTypeKeyword(spatialRefId) {
    const parsedSpatialReference = parseSpatialRefId(spatialRefId);
    const serializedSpatialReference = serializeSpatialReference(parsedSpatialReference);
    return `spatialRefId:${serializedSpatialReference}`;
}
/**
 * Returns the keyword identifying exports by the item they originate from
 * @param itemId - ID for the item from which the export originated
 * @private
 */
function getExportItemTypeKeyword(itemId) {
    return `exportItem:${itemId}`;
}
/**
 * Returns the keyword identifying exports by the layer they originate from
 * @param layerId - ID for the layer from which the export originated
 * @private
 */
function getExportLayerTypeKeyword(layerId) {
    // NOTE - Layer Id's need to be padded with "0" so that /search results are predictable. Searches for typeKeywords:"exportLayer:1" don't work.
    // See https://github.com/Esri/hub.js/pull/472 for more information.
    // TODO - use `filter` when Enterprise Sites adds support.
    return layerId ? `exportLayer:0${layerId}` : `exportLayer:null`;
}

exports.WGS84_WKID = WGS84_WKID;
exports.buildExistingExportsPortalQuery = buildExistingExportsPortalQuery;
exports.getExportItemTypeKeyword = getExportItemTypeKeyword;
exports.getExportLayerTypeKeyword = getExportLayerTypeKeyword;
exports.getSpatialRefTypeKeyword = getSpatialRefTypeKeyword;
exports.serializeSpatialReference = serializeSpatialReference;
