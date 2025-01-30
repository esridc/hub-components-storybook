'use strict';

const getProp = require('./get-prop-4bd8fc1a.js');
const request = require('./request-67da3c71.js');

/**
 * Turns an bounding box coordinate array into an extent object
 * @param bBox bounding box coordinate array
 * @returns extent object
 */
const bBoxToExtent = (bBox) => {
    const [[xmin, ymin], [xmax, ymax]] = bBox;
    return createExtent(xmin, ymin, xmax, ymax);
};
/**
 * Given a Bbox, convert it to a string. Some api endpoints expect a string
 *
 * @param {BBox} extent
 * @return {*}  {string}
 */
const bboxToString = (extent) => {
    return extent.map((a) => a.join(", ")).join(", ");
};
function createExtent(xmin, ymin, xmax, ymax, wkid = 4326) {
    return {
        xmin,
        ymin,
        xmax,
        ymax,
        // type: 'extent',
        spatialReference: {
            wkid,
        },
    };
}
/**
 * Turns an extent object into a bounding box coordinate array
 * @param extent extent
 */
function extentToBBox(extent) {
    return [
        [extent.xmin, extent.ymin],
        [extent.xmax, extent.ymax],
    ];
}
const GLOBAL_EXTENT = {
    xmin: -180,
    ymin: -90,
    xmax: 180,
    ymax: 90,
    spatialReference: {
        wkid: 4326,
    },
};
/**
 * Gets the geographic extent for an org
 * @param hubRequestOptions
 */
function orgExtent(hubRequestOptions) {
    const portal = hubRequestOptions.portalSelf;
    const organizationExtent = portal.defaultExtent;
    const geometryServiceUrl = getProp.getProp(portal, "helperServices.geometry.url");
    // Define a default global extent object
    if (!geometryServiceUrl) {
        return Promise.resolve(GLOBAL_EXTENT);
    }
    if (!organizationExtent) {
        return Promise.resolve(GLOBAL_EXTENT);
    }
    const url = `${geometryServiceUrl}/project`;
    // geometry params...
    const geometryParam = {
        geometryType: "esriGeometryEnvelope",
        geometries: [organizationExtent],
    };
    const options = {
        httpMethod: "POST",
        params: {
            geometries: JSON.stringify(geometryParam),
            transformForward: false,
            transformation: "",
            inSR: organizationExtent.spatialReference.wkid,
            outSR: 4326,
            f: "json",
        },
    };
    // add in auth if it's passed
    if (hubRequestOptions.authentication) {
        options.authentication = hubRequestOptions.authentication;
    }
    return request.request(url, options)
        .then((response) => {
        const geom = response.geometries[0];
        return {
            xmin: geom.xmin,
            ymin: geom.ymin,
            xmax: geom.xmax,
            ymax: geom.ymax,
            spatialReference: {
                wkid: 4326,
            },
        };
    })
        .catch((ex) => {
        return GLOBAL_EXTENT;
    });
}
/**
 * Get the default org extent as a bbox for use on item.extent
 * @param {IHubRequestOptions} hubRequestOptions
 */
function getOrgExtentAsBBox(hubRequestOptions) {
    return orgExtent(hubRequestOptions).then((extent) => extentToBBox(extent));
}
/**
 * checks if the extent is a valid BBox (2 element array of coordinate pair arrays)
 * @param extent
 * @returns
 */
const isBBox = (extent) => {
    return (Array.isArray(extent) &&
        Array.isArray(extent[0]) &&
        Array.isArray(extent[1]));
};
function isExtentJSON(extent) {
    return ["xmin", "ymin", "xmax", "ymax"].every((key) => typeof extent[key] === "number");
}
/**
 * Check if the given extent is in a known format
 * @param  {Object} extent extent in any format
 * @return {Boolean}       indicator
 */
function isValidExtent(extent) {
    return !!extent && [isBBox, isExtentJSON].some((test) => test(extent));
}
/**
 * Convert an extent object into a polygon object
 * @param extent
 * @returns
 */
const extentToPolygon = (extent) => {
    const { xmin, ymin, xmax, ymax, spatialReference } = extent;
    const rings = [
        [
            [xmin, ymax],
            [xmax, ymax],
            [xmax, ymin],
            [xmin, ymin],
            [xmin, ymax],
        ],
    ];
    return {
        rings,
        spatialReference,
    };
};
/**
 * Get the center of an extent as a point
 * @param extent
 * @returns
 */
const getExtentCenter = (extent) => {
    const { xmin, ymin, xmax, ymax, spatialReference } = extent;
    const x = (xmax - xmin) / 2 + xmin;
    const y = (ymax - ymin) / 2 + ymin;
    return { x, y, spatialReference };
};
/**
 * Checks coordinate or coordinate array to determine if all coordinates are
 * possibly WGS84.  This is a best effert attempt, not a guarantee.
 * @param bboxOrCoordinates
 * @returns
 */
const allCoordinatesPossiblyWGS84 = (bboxOrCoordinates) => {
    const flattenCoordinates = [].concat(...bboxOrCoordinates);
    for (let i = 0; i < flattenCoordinates.length; i += 2) {
        const [lon, lat] = [flattenCoordinates[i], flattenCoordinates[i + 1]];
        if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
            return false;
        }
    }
    return true;
};
/**
 * Turns a geojson polygon in to a bounding box coordinate array
 * @param polygon
 * @returns BBox
 */
const GeoJSONPolygonToBBox = (polygon) => {
    let xmin = Infinity;
    let ymin = Infinity;
    let xmax = -Infinity;
    let ymax = -Infinity;
    for (const coordinate of polygon.coordinates) {
        for (const [x, y] of coordinate) {
            xmin = Math.min(xmin, x);
            ymin = Math.min(ymin, y);
            xmax = Math.max(xmax, x);
            ymax = Math.max(ymax, y);
        }
    }
    return [
        [xmin, ymin],
        [xmax, ymax],
    ];
};

exports.GLOBAL_EXTENT = GLOBAL_EXTENT;
exports.GeoJSONPolygonToBBox = GeoJSONPolygonToBBox;
exports.allCoordinatesPossiblyWGS84 = allCoordinatesPossiblyWGS84;
exports.bBoxToExtent = bBoxToExtent;
exports.bboxToString = bboxToString;
exports.createExtent = createExtent;
exports.extentToBBox = extentToBBox;
exports.extentToPolygon = extentToPolygon;
exports.getExtentCenter = getExtentCenter;
exports.getOrgExtentAsBBox = getOrgExtentAsBBox;
exports.isBBox = isBBox;
exports.isValidExtent = isValidExtent;
exports.orgExtent = orgExtent;
