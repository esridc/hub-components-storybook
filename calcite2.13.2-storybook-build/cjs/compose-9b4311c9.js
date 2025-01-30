'use strict';

const getPortalApiUrl = require('./get-portal-api-url-9ba1158a.js');
const getFamily = require('./get-family-cafa88bb.js');
const getStructuredLicense = require('./get-structured-license-4e9f994b.js');
const getItemHomeUrl = require('./get-item-home-url-b1e3ff74.js');
const util = require('./util-38e73510.js');
const extent = require('./extent-715f7c8d.js');
const helpers = require('./helpers-64227739.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const getPortalUrl = require('./get-portal-url-68b1f527.js');

exports.PublisherSource = void 0;
(function (PublisherSource) {
    PublisherSource["CitationContact"] = "metadata.resource.citation.contact";
    PublisherSource["ResourceContact"] = "metadata.resource.contact";
    PublisherSource["MetadataContact"] = "metadata.contact";
    PublisherSource["ItemOwner"] = "item.owner";
    PublisherSource["None"] = "none";
})(exports.PublisherSource || (exports.PublisherSource = {}));

/**
 * Checks whether a value exists in the given array
 * @param array The array
 * @param val The value
 */
function includes(array, val) {
    return array.indexOf(val) !== -1;
}

/**
 * Parse the portal url, and if it matches one of the AGO
 * Url patterns, return the correct Hub Url
 * If portalUrl does not match an AGO pattern, this will
 * return `undefined`
 * @param portalUrl
 * @private
 */
function _getHubUrlFromPortalHostname(portalUrl) {
    let result;
    if (portalUrl.match(/(qaext|\.mapsqa)\.arcgis.com/)) {
        result = "https://hubqa.arcgis.com";
    }
    else if (portalUrl.match(/(devext|\.mapsdevext)\.arcgis.com/)) {
        result = "https://hubdev.arcgis.com";
    }
    else if (portalUrl.match(/(www|\.maps)\.arcgis.com/)) {
        result = "https://hub.arcgis.com";
    }
    return result;
}

// NOTE: this fn is tested via getItemDataUrl tests
/**
 * Get the fully qualified URL to the REST end point for an item.
 * @param item w/ id and access
 * @param portalUrlOrObject a portal base or API URL, a portal object, or request options containing either of those
 * @param token token for the current user's session; will only be appended as a query parameter if the item's access is **not** `public`
 * @returns URL to the item's REST end point, defaults to `https://www.arcgis.com/sharing/rest/content/items/{item.id}?f=json`
 */
const getItemApiUrl = (item, portalUrlOrObject, token) => {
    const { id, access } = item;
    const url = `${getPortalApiUrl.getPortalApiUrl(portalUrlOrObject)}/content/items/${id}`;
    const params = new URLSearchParams({ f: "json" });
    if (access !== "public" && token) {
        params.append("token", token);
    }
    return `${url}?${params.toString()}`;
};

/**
 * Get the fully qualified URL to the data REST end point for an item
 * @param item w/ id and access
 * @param portalUrlOrObject a portal base or API URL, a portal object, or request options containing either of those
 * @param token token for the current user's session; will only be appended as a query parameter if the item's access is **not** `public`
 * @returns URL to the item's data REST end point, defaults to `https://www.arcgis.com/sharing/rest/content/items/{item.id}/data`
 */
const getItemDataUrl = (item, portalUrlOrObject, token) => {
    const url = getItemApiUrl(item, portalUrlOrObject, token);
    const pattern = `\\/${item.id}\\?f=json`;
    const regExp = new RegExp(pattern);
    // TODO: re-append f param based on item.type?
    return (url && url.replace(regExp, `/${item.id}/data`).replace(/\&token/, "?token"));
};

/**
 * ```js
 * import { getHubApiUrl() } from "@esri/hub-common";
 * //
 * getHubApiUrl({ portal: "https://custom.maps.arcgis.com/sharing/rest" })
 * >> "https://hub.arcgis.com"
 * ```
 * Retrieves the Hub API Url associated with a specific ArcGIS Online organization.
 * @param urlOrObject a Portal URL, Portal API URL, request options object, or Portal self object
 * @returns the associated Hub API Url as a string.
 */
function getHubApiUrl(urlOrObject) {
    const hubApiUrl = urlOrObject && urlOrObject.hubApiUrl;
    if (hubApiUrl) {
        // this is request options w/ hubApiUrl already defined
        return hubApiUrl;
    }
    return _getHubUrlFromPortalHostname(getPortalApiUrl.getPortalApiUrl(urlOrObject));
}

const { app, dataset, document, event, feedback, initiative, map, other, site, } = getFamily.collections;
const downloadableTypes = [
    "360 VR Experience",
    "Application",
    "CityEngine Web Scene",
    "Code Sample",
    "CSV Collection",
    "CSV",
    "CAD Drawing",
    "Desktop Application",
    "Desktop Application Template",
    "Desktop Style",
    "File Geodatabase",
    "GeoJson",
    "Geoprocessing Package",
    "Geoprocessing Sample",
    "Image",
    "iWork Keynote",
    "iWork Numbers",
    "KML Collection",
    "KML",
    "Layer",
    "Layer File",
    "Layer Package",
    "Layout",
    "Locator Package",
    "Map Package",
    "Map Service Definition",
    "Map Template",
    "Microsoft Excel",
    "Microsoft Powerpoint",
    "Microsoft Visio",
    "Microsoft Word",
    "Notebook",
    "Operations Dashboard Add In",
    "PDF",
    "Pro Map",
    "Project Package",
    "Project Template",
    "Raster function template",
    "Rule Package",
    "Service Definition",
    "Shapefile",
    "Vector Tile Package",
    "Workflow Manager Package",
];
const downloadableTypeKeywords = ["Data"];
const apiTypes = ["Feature Service", "Map Service", "Image Service"];
// DEPRECATED: remove this at next breaking version
// this is currently used by hub-search and opendata-ui
// (in the dataset-display and content-library-engine)
// TODO: remove this once it is no longer used in those places
const categories = {
    app: app.concat(feedback),
    dataset,
    document,
    event,
    initiative,
    map,
    other,
    site,
    downloadableTypes,
    downloadableTypeKeywords,
    apiTypes,
};
// TODO: move this function and supporting arrays to another module
/**
 * Is the item type downloadable in the Hub app
 * @param item ArcGIS item with type and type keywords
 */
function isDownloadable(item) {
    return (downloadableTypes.indexOf(item.type) !== -1 ||
        (item.typeKeywords &&
            downloadableTypeKeywords.some((downloadableTypeKeyword) => item.typeKeywords.some((typeKeyword) => typeKeyword === downloadableTypeKeyword))));
}

/**
 * Get the fully qualified URL for an item's thumbnail
 * @param item w/ id, thumbnail, and access
 * @param portalUrlOrObject a portal base or API URL, a portal object, or request options containing either of those
 * @param optionsOrToken options including width and/or token for the current user's session; will only be appended as a query parameter if the item's access is **not** `public`
 * @returns URL to the item's thumbnail, defaults to `https://www.arcgis.com/sharing/rest/content/items/{item.id}/info/{item.thumbnail}`. Returns `null` if the item does not have a thumbnail assigned.
 */
function getItemThumbnailUrl(item, portalUrlOrObject, optionsOrToken) {
    if (!item || !item.thumbnail) {
        // TODO: handle image types by returning the image (item data) itself?
        return null;
    }
    // tslint:disable-next-line prefer-const
    let { token, width } = optionsOrToken || {};
    // TODO: at the next breaking change drop support for passing token as string
    if (!token && typeof optionsOrToken === "string") {
        token = optionsOrToken;
    }
    const itemApiUrl = getItemApiUrl(item, portalUrlOrObject, token);
    const [baseUrl, search] = itemApiUrl.split("?");
    const searchParams = new URLSearchParams(search);
    searchParams.delete("f");
    if (width) {
        searchParams.append("w", width + "");
    }
    const newSearch = searchParams.toString();
    const url = `${baseUrl}/info/${item.thumbnail}`;
    return newSearch ? `${url}?${newSearch}` : url;
}

/* @preserve
* @terraformer/arcgis - v2.1.1 - MIT
* Copyright (c) 2012-2022 Environmental Systems Research Institute, Inc.
* Tue Aug 02 2022 14:23:48 GMT-0700 (Pacific Daylight Time)
*/
/* Copyright (c) 2012-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

var edgeIntersectsEdge = function edgeIntersectsEdge(a1, a2, b1, b2) {
  var uaT = (b2[0] - b1[0]) * (a1[1] - b1[1]) - (b2[1] - b1[1]) * (a1[0] - b1[0]);
  var ubT = (a2[0] - a1[0]) * (a1[1] - b1[1]) - (a2[1] - a1[1]) * (a1[0] - b1[0]);
  var uB = (b2[1] - b1[1]) * (a2[0] - a1[0]) - (b2[0] - b1[0]) * (a2[1] - a1[1]);

  if (uB !== 0) {
    var ua = uaT / uB;
    var ub = ubT / uB;

    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      return true;
    }
  }

  return false;
};
var coordinatesContainPoint = function coordinatesContainPoint(coordinates, point) {
  var contains = false;

  for (var i = -1, l = coordinates.length, j = l - 1; ++i < l; j = i) {
    if ((coordinates[i][1] <= point[1] && point[1] < coordinates[j][1] || coordinates[j][1] <= point[1] && point[1] < coordinates[i][1]) && point[0] < (coordinates[j][0] - coordinates[i][0]) * (point[1] - coordinates[i][1]) / (coordinates[j][1] - coordinates[i][1]) + coordinates[i][0]) {
      contains = !contains;
    }
  }

  return contains;
};
var pointsEqual = function pointsEqual(a, b) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};
var arrayIntersectsArray = function arrayIntersectsArray(a, b) {
  for (var i = 0; i < a.length - 1; i++) {
    for (var j = 0; j < b.length - 1; j++) {
      if (edgeIntersectsEdge(a[i], a[i + 1], b[j], b[j + 1])) {
        return true;
      }
    }
  }

  return false;
};

/* Copyright (c) 2012-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

var closeRing = function closeRing(coordinates) {
  if (!pointsEqual(coordinates[0], coordinates[coordinates.length - 1])) {
    coordinates.push(coordinates[0]);
  }

  return coordinates;
}; // determine if polygon ring coordinates are clockwise. clockwise signifies outer ring, counter-clockwise an inner ring
// or hole. this logic was found at http://stackoverflow.com/questions/1165647/how-to-determine-if-a-list-of-polygon-
// points-are-in-clockwise-order

var ringIsClockwise = function ringIsClockwise(ringToTest) {
  var total = 0;
  var i = 0;
  var rLength = ringToTest.length;
  var pt1 = ringToTest[i];
  var pt2;

  for (i; i < rLength - 1; i++) {
    pt2 = ringToTest[i + 1];
    total += (pt2[0] - pt1[0]) * (pt2[1] + pt1[1]);
    pt1 = pt2;
  }

  return total >= 0;
}; // This function ensures that rings are oriented in the right directions
// from http://jsperf.com/cloning-an-object/2

var shallowClone = function shallowClone(obj) {
  var target = {};

  for (var i in obj) {
    // both arcgis attributes and geojson props are just hardcoded keys
    if (obj.hasOwnProperty(i)) {
      // eslint-disable-line no-prototype-builtins
      target[i] = obj[i];
    }
  }

  return target;
};

/* Copyright (c) 2012-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

var coordinatesContainCoordinates = function coordinatesContainCoordinates(outer, inner) {
  var intersects = arrayIntersectsArray(outer, inner);
  var contains = coordinatesContainPoint(outer, inner[0]);

  if (!intersects && contains) {
    return true;
  }

  return false;
}; // do any polygons in this array contain any other polygons in this array?
// used for checking for holes in arcgis rings


var convertRingsToGeoJSON = function convertRingsToGeoJSON(rings) {
  var outerRings = [];
  var holes = [];
  var x; // iterator

  var outerRing; // current outer ring being evaluated

  var hole; // current hole being evaluated
  // for each ring

  for (var r = 0; r < rings.length; r++) {
    var ring = closeRing(rings[r].slice(0));

    if (ring.length < 4) {
      continue;
    } // is this ring an outer ring? is it clockwise?


    if (ringIsClockwise(ring)) {
      var polygon = [ring.slice().reverse()]; // wind outer rings counterclockwise for RFC 7946 compliance

      outerRings.push(polygon); // push to outer rings
    } else {
      holes.push(ring.slice().reverse()); // wind inner rings clockwise for RFC 7946 compliance
    }
  }

  var uncontainedHoles = []; // while there are holes left...

  while (holes.length) {
    // pop a hole off out stack
    hole = holes.pop(); // loop over all outer rings and see if they contain our hole.

    var contained = false;

    for (x = outerRings.length - 1; x >= 0; x--) {
      outerRing = outerRings[x][0];

      if (coordinatesContainCoordinates(outerRing, hole)) {
        // the hole is contained push it into our polygon
        outerRings[x].push(hole);
        contained = true;
        break;
      }
    } // ring is not contained in any outer ring
    // sometimes this happens https://github.com/Esri/esri-leaflet/issues/320


    if (!contained) {
      uncontainedHoles.push(hole);
    }
  } // if we couldn't match any holes using contains we can try intersects...


  while (uncontainedHoles.length) {
    // pop a hole off out stack
    hole = uncontainedHoles.pop(); // loop over all outer rings and see if any intersect our hole.

    var intersects = false;

    for (x = outerRings.length - 1; x >= 0; x--) {
      outerRing = outerRings[x][0];

      if (arrayIntersectsArray(outerRing, hole)) {
        // the hole is contained push it into our polygon
        outerRings[x].push(hole);
        intersects = true;
        break;
      }
    }

    if (!intersects) {
      outerRings.push([hole.reverse()]);
    }
  }

  if (outerRings.length === 1) {
    return {
      type: 'Polygon',
      coordinates: outerRings[0]
    };
  } else {
    return {
      type: 'MultiPolygon',
      coordinates: outerRings
    };
  }
};

var getId = function getId(attributes, idAttribute) {
  var keys = idAttribute ? [idAttribute, 'OBJECTID', 'FID'] : ['OBJECTID', 'FID'];

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (key in attributes && (typeof attributes[key] === 'string' || typeof attributes[key] === 'number')) {
      return attributes[key];
    }
  }

  throw Error('No valid id attribute found');
};

var arcgisToGeoJSON = function arcgisToGeoJSON(arcgis, idAttribute) {
  var geojson = {};

  if (arcgis.features) {
    geojson.type = 'FeatureCollection';
    geojson.features = [];

    for (var i = 0; i < arcgis.features.length; i++) {
      geojson.features.push(arcgisToGeoJSON(arcgis.features[i], idAttribute));
    }
  }

  if (typeof arcgis.x === 'number' && typeof arcgis.y === 'number') {
    geojson.type = 'Point';
    geojson.coordinates = [arcgis.x, arcgis.y];

    if (typeof arcgis.z === 'number') {
      geojson.coordinates.push(arcgis.z);
    }
  }

  if (arcgis.points) {
    geojson.type = 'MultiPoint';
    geojson.coordinates = arcgis.points.slice(0);
  }

  if (arcgis.paths) {
    if (arcgis.paths.length === 1) {
      geojson.type = 'LineString';
      geojson.coordinates = arcgis.paths[0].slice(0);
    } else {
      geojson.type = 'MultiLineString';
      geojson.coordinates = arcgis.paths.slice(0);
    }
  }

  if (arcgis.rings) {
    geojson = convertRingsToGeoJSON(arcgis.rings.slice(0));
  }

  if (typeof arcgis.xmin === 'number' && typeof arcgis.ymin === 'number' && typeof arcgis.xmax === 'number' && typeof arcgis.ymax === 'number') {
    geojson.type = 'Polygon';
    geojson.coordinates = [[[arcgis.xmax, arcgis.ymax], [arcgis.xmin, arcgis.ymax], [arcgis.xmin, arcgis.ymin], [arcgis.xmax, arcgis.ymin], [arcgis.xmax, arcgis.ymax]]];
  }

  if (arcgis.geometry || arcgis.attributes) {
    geojson.type = 'Feature';
    geojson.geometry = arcgis.geometry ? arcgisToGeoJSON(arcgis.geometry) : null;
    geojson.properties = arcgis.attributes ? shallowClone(arcgis.attributes) : null;

    if (arcgis.attributes) {
      try {
        geojson.id = getId(arcgis.attributes, idAttribute);
      } catch (err) {// don't set an id
      }
    }
  } // if no valid geometry was encountered


  if (JSON.stringify(geojson.geometry) === JSON.stringify({})) {
    geojson.geometry = null;
  }

  if (arcgis.spatialReference && arcgis.spatialReference.wkid && arcgis.spatialReference.wkid !== 4326) {
    console.warn('Object converted in non-standard crs - ' + JSON.stringify(arcgis.spatialReference));
  }

  return geojson;
};

/* Copyright (c) 2012-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
// outer rings are clockwise, holes are counterclockwise
// used for converting GeoJSON Polygons to ArcGIS Polygons

var orientRings = function orientRings(poly) {
  var output = [];
  var polygon = poly.slice(0);
  var outerRing = closeRing(polygon.shift().slice(0));

  if (outerRing.length >= 4) {
    if (!ringIsClockwise(outerRing)) {
      outerRing.reverse();
    }

    output.push(outerRing);

    for (var i = 0; i < polygon.length; i++) {
      var hole = closeRing(polygon[i].slice(0));

      if (hole.length >= 4) {
        if (ringIsClockwise(hole)) {
          hole.reverse();
        }

        output.push(hole);
      }
    }
  }

  return output;
}; // This function flattens holes in multipolygons to one array of polygons
// used for converting GeoJSON Polygons to ArcGIS Polygons


var flattenMultiPolygonRings = function flattenMultiPolygonRings(rings) {
  var output = [];

  for (var i = 0; i < rings.length; i++) {
    var polygon = orientRings(rings[i]);

    for (var x = polygon.length - 1; x >= 0; x--) {
      var ring = polygon[x].slice(0);
      output.push(ring);
    }
  }

  return output;
};

var geojsonToArcGIS = function geojsonToArcGIS(geojson, idAttribute) {
  idAttribute = idAttribute || 'OBJECTID';
  var spatialReference = {
    wkid: 4326
  };
  var result = {};
  var i;

  switch (geojson.type) {
    case 'Point':
      result.x = geojson.coordinates[0];
      result.y = geojson.coordinates[1];

      if (geojson.coordinates[2] != null) {
        result.z = geojson.coordinates[2];
      }

      result.spatialReference = spatialReference;
      break;

    case 'MultiPoint':
      result.points = geojson.coordinates.slice(0);

      if (geojson.coordinates[0][2] != null) {
        result.hasZ = true;
      }

      result.spatialReference = spatialReference;
      break;

    case 'LineString':
      result.paths = [geojson.coordinates.slice(0)];

      if (geojson.coordinates[0][2] != null) {
        result.hasZ = true;
      }

      result.spatialReference = spatialReference;
      break;

    case 'MultiLineString':
      result.paths = geojson.coordinates.slice(0);

      if (geojson.coordinates[0][0][2] != null) {
        result.hasZ = true;
      }

      result.spatialReference = spatialReference;
      break;

    case 'Polygon':
      result.rings = orientRings(geojson.coordinates.slice(0));

      if (geojson.coordinates[0][0][2] != null) {
        result.hasZ = true;
      }

      result.spatialReference = spatialReference;
      break;

    case 'MultiPolygon':
      result.rings = flattenMultiPolygonRings(geojson.coordinates.slice(0));

      if (geojson.coordinates[0][0][0][2] != null) {
        result.hasZ = true;
      }

      result.spatialReference = spatialReference;
      break;

    case 'Feature':
      if (geojson.geometry) {
        result.geometry = geojsonToArcGIS(geojson.geometry, idAttribute);
      }

      result.attributes = geojson.properties ? shallowClone(geojson.properties) : {};

      if (geojson.id) {
        result.attributes[idAttribute] = geojson.id;
      }

      break;

    case 'FeatureCollection':
      result = [];

      for (i = 0; i < geojson.features.length; i++) {
        result.push(geojsonToArcGIS(geojson.features[i], idAttribute));
      }

      break;

    case 'GeometryCollection':
      result = [];

      for (i = 0; i < geojson.geometries.length; i++) {
        result.push(geojsonToArcGIS(geojson.geometries[i], idAttribute));
      }

      break;
  }

  return result;
};

/**
 * Use this module for functions that do not need to be used by consumers (yet),
 * but may be shared between hub.js modules, and/or need to be tested
 * to get 100% coverage w/o writing cumbersome tests of higher level functions.
 *
 * Consuming will not be able to import these functions.
 *
 * It's probably a good pattern to add functions here first and then
 * move them to index.ts only when they are needed by a consumer.
 */
/**
 * Hashmap of Hub environment and application url surfix
 */
const envBases = {
    devext: "dev",
    qaext: "qa",
    production: "",
};
/**
 * get a content's boundary based on the item's boundary property
 * @param item
 * @returns
 * @private
 */
const getContentBoundary = (item) => {
    var _a;
    const bBox = item.extent;
    const isValidItemExtent = extent.isBBox(bBox);
    // user specified provenance is stored in item.properties
    const provenance = ((_a = item.properties) === null || _a === void 0 ? void 0 : _a.boundary) ||
        // but we default to item if the item has an extent
        (isValidItemExtent ? "item" : undefined);
    const boundary = {
        geometry: null,
        provenance,
    };
    if (provenance === "item" && isValidItemExtent) {
        const extent$1 = extent.bBoxToExtent(bBox);
        const center = extent.getExtentCenter(extent$1);
        boundary.center = [center.x, center.y];
        boundary.geometry = Object.assign(Object.assign({}, extent.extentToPolygon(extent$1)), { type: "polygon" });
        boundary.spatialReference = boundary.geometry.spatialReference;
    }
    return boundary;
};
/**
 * Constructs IExtent from numeric item extent array
 * @param extent Raw item extent array
 * @returns IExtent
 */
const getExtentObject = (extent$1) => {
    return extent.isBBox(extent$1)
        ? Object.assign(Object.assign({}, extent.bBoxToExtent(extent$1)), { type: "extent" })
        : undefined;
};
/**
 * Derives proper IHubLocation given an ArcGIS Item.  If no
 * location (item.properties.location) is present, one will be
 * constructed from the item's extent.
 * @param item ArcGIS Item
 * @returns IHubLocation
 */
const deriveLocationFromItem = (item) => {
    const { properties, extent: extent$1 } = item;
    const location = properties === null || properties === void 0 ? void 0 : properties.location;
    if (location) {
        // IHubLocation already exists, so return it
        return location;
    }
    if ((properties === null || properties === void 0 ? void 0 : properties.boundary) === "none") {
        // Per https://confluencewikidev.esri.com/display/Hub/Hub+Location+Management
        // bounds = 'none' -> specifies not to show on map.  If this is true and
        // no location is already present, opt to not generate location from item extent
        return { type: "none" };
    }
    // IHubLocation does not exist on item properties, so construct it
    // from item extent
    const geometry = getExtentObject(extent$1);
    if (geometry) {
        // geometry constructed from bbox
        const type = isSiteType(item.type) ? "org" : "custom";
        return {
            type,
            extent: extent$1,
            geometries: [geometry],
            spatialReference: geometry.spatialReference,
        };
    }
    else {
        // Could not construct extent object, attempt to construct from geojson
        try {
            // Item extent is supposed to be in WGS84 per item documentation:
            // https://developers.arcgis.com/rest/users-groups-and-items/item.htm
            // But in many situations, this is not the case.  So we do out best to
            // determine the spatial reference of the extent.
            const bbox = extent.GeoJSONPolygonToBBox(extent$1);
            const defaultSpatialReference = { wkid: 4326 };
            const _geometry = Object.assign(Object.assign({ type: "polygon" }, geojsonToArcGIS(extent$1)), { spatialReference: extent.allCoordinatesPossiblyWGS84(bbox)
                    ? defaultSpatialReference
                    : getItemSpatialReference(item) || defaultSpatialReference });
            return {
                type: "custom",
                extent: bbox,
                geometries: [_geometry],
                spatialReference: _geometry.spatialReference,
            };
        }
        catch (_a) {
            // Finally, exhausted all options and return a location of type none
            return { type: "none" };
        }
    }
};
/**
 * Determine if we are in an enterprise environment
 * NOTE: when no request options are provided, the underlying
 * request functions assume that we are online in production
 * so we only want use enterprise logic if isPortal is explicitly defined
 * @param requestOptions
 * @returns
 * @private
 */
const isPortal = (requestOptions) => {
    return requestOptions && requestOptions.isPortal;
};
/**
 * Determine if we can use the Hub API for an item, i.e.
 * the item is public and we are not in an enterprise environment
 * @param item
 * @param requestOptions
 * @returns
 * @private
 */
const canUseHubApiForItem = (item, requestOptions) => {
    return !!item && item.access === "public" && !isPortal(requestOptions);
};
/**
 * Returns whether or not an item is a proxied csv
 *
 * @param item
 * @param requestOptions Hub Request Options (including whether we're in portal)
 * @returns
 * @private
 */
const isProxiedCSV = (item, requestOptions) => !isPortal(requestOptions) &&
    item.access === "public" &&
    item.type === "CSV" &&
    item.size <= 5000000;
/**
 * Get the relative URL to use for the item in a hub site
 * @param type
 * @param identifier optional, if not pass, will return a URL to the entities,
 * e.g. /initiatives, /projects
 * NOTE: not all entities have the entities route set up, in that case, we will
 * not return an URL, so they will be redirected back to the site home
 * @param typeKeywords
 * @returns
 * @private
 */
const getHubRelativeUrl = (type, identifier, typeKeywords) => {
    // solution types have their own logic
    let contentUrl = getSolutionUrl(type, identifier, typeKeywords) ||
        getInitiativeTemplateUrl(type, identifier, typeKeywords);
    const family = getFamily.getFamily(type);
    if (!contentUrl) {
        const familiesWithPluralizedRoute = [
            "app",
            "dataset",
            "document",
            "map",
            "template",
            "project",
            "initiative",
            "discussion",
            "event",
        ];
        // default to the catchall content route
        let path = "/content";
        // the exception
        if (family === "feedback") {
            path = identifier ? "/feedback/surveys" : "";
        }
        else if (isPageType(type, typeKeywords)) {
            // pages are in the document family,
            // but instead of showing the page's metadata on /documents/about
            // but we render the page on the pages route
            path = "/pages";
        }
        else if (familiesWithPluralizedRoute.indexOf(family) > -1) {
            // the rule: route name is plural of family name
            path = `/${family}s`;
        }
        contentUrl = identifier ? `${path}/${identifier}` : `${path}`;
    }
    // TODO: once an entity has its entities route set up, add it to this list
    const entitiesHaveEntitiesRoute = ["initiative", "project"];
    // if there is no identifier and the entity does not have the entities route
    // set up, do not return an url
    if (!identifier && !entitiesHaveEntitiesRoute.includes(family)) {
        contentUrl = "";
    }
    return contentUrl;
};
/**
 * Is this content type a page?
 * @param type
 * @returns
 * @private
 */
const isPageType = (type, typeKeywords = []) => ["Hub Page", "Site Page"].includes(type) || typeKeywords.includes("hubPage");
const getSolutionUrl = (type, identifier, typeKeywords) => {
    let hubUrl;
    if (type === "Solution") {
        // solution types are now in the Template family
        // we send all except the deployed solution items to the route for initiative templates
        if ((typeKeywords === null || typeKeywords === void 0 ? void 0 : typeKeywords.indexOf("Deployed")) > -1) {
            // deployed solutions go to the generic content route
            hubUrl = `/content/${identifier}/about`;
        }
        else {
            hubUrl = `/templates/${identifier}/about`;
        }
    }
    else if (type === "Web Mapping Application" &&
        (typeKeywords === null || typeKeywords === void 0 ? void 0 : typeKeywords.indexOf("hubSolutionTemplate")) > -1) {
        hubUrl = `/templates/${identifier}/about`;
    }
    return hubUrl;
};
const getInitiativeTemplateUrl = (type, identifier, typeKeywords) => {
    if ((type === "Hub Initiative" &&
        (typeKeywords === null || typeKeywords === void 0 ? void 0 : typeKeywords.indexOf("hubInitiativeTemplate")) > -1) ||
        type === "Hub Initiative Template") {
        return `/initiatives/templates/${identifier}/about`;
    }
};
/**
 * Get the path to a well known metadata value
 * @param identifier identifier for well known metadata value
 * @returns path to be used like get(metadata, path)
 * @private
 */
function getMetadataPath(identifier) {
    // NOTE: i have verified that this will work regardless of the "Metadata Style" set on the org
    const metadataPaths = {
        updateFrequency: "metadata.dataIdInfo.resMaint.maintFreq.MaintFreqCd.@_value",
        reviseDate: "metadata.dataIdInfo.idCitation.date.reviseDate",
        pubDate: "metadata.dataIdInfo.idCitation.date.pubDate",
        createDate: "metadata.dataIdInfo.idCitation.date.createDate",
        metadataUpdateFrequency: "metadata.mdMaint.maintFreq.MaintFreqCd.@_value",
        metadataUpdatedDate: "metadata.mdDateSt",
    };
    return metadataPaths[identifier];
}
/**
 * Get a well known value from metadata
 * @param metadata
 * @param identifier identifier for well known metadata value
 * @returns
 * @private
 */
function getValueFromMetadata(metadata, identifier) {
    const path = getMetadataPath(identifier);
    return path && getProp.getProp(metadata, path);
}
/**
 * Date precisions
 */
var DatePrecision;
(function (DatePrecision) {
    DatePrecision["Year"] = "year";
    DatePrecision["Month"] = "month";
    DatePrecision["Day"] = "day";
    DatePrecision["Time"] = "time";
})(DatePrecision || (DatePrecision = {}));
/**
 * Parses an ISO8601 date string into a date and a precision.
 * This is because a) if somone entered 2018, we want to respect that and not treat it as the same as 2018-01-01
 * and b) you cannot naively call new Date with an ISO 8601 string that does not include time information
 * For example, when I, here in mountain time, do new Date('2018').getFullYear() I get "2017".
 * This is because when you do not provide time or timezone info, UTC is assumed, so new Date('2018') is 2018-01-01T00:00:00 in UTC
 * which is actually 7 hours earlier here in mountain time.
 *
 * @param {string} isoString
 * @return { date: Date, precision: DatePrecision }
 * @private
 */
function parseISODateString(isoString) {
    isoString = `${isoString}`;
    let date;
    let precision;
    if (/^\d{4}$/.test(isoString)) {
        // yyyy
        date = new Date(+isoString, 0, 1);
        precision = DatePrecision.Year;
    }
    else if (/^\d{4}-\d{1,2}$/.test(isoString)) {
        // yyyy-mm
        const parts = isoString.split("-");
        date = new Date(+parts[0], +parts[1] - 1, 1);
        precision = DatePrecision.Month;
    }
    else if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(isoString)) {
        // yyyy-mm-dd
        const parts = isoString.split("-");
        date = new Date(+parts[0], +parts[1] - 1, +parts[2]);
        precision = DatePrecision.Day;
    }
    else if (!Number.isNaN(Date.parse(isoString))) {
        // any other string parsable to a valid date
        date = new Date(isoString);
        precision = isoString.includes("T")
            ? DatePrecision.Time
            : DatePrecision.Day;
    }
    return date && precision && { date, precision };
}
// NOTE: IItem has spatialRefernce: ISpatialReference, but
// the portal REST API returns spatialReference as as string
// that is always either WKID like "102100" or the name of a
// WKT like "NAD_1983_HARN_StatePlane_Hawaii_3_FIPS_5103_Feet".
// We only coerce WKIDs into a ISpatialReference objects since we
// can't easily lookup a complete WKT.
/**
 * Get the spatial reference as an object for an item
 * @param item
 * @returns spatial reference object
 * @private
 */
const getItemSpatialReference = (item) => {
    const spatialReference = item.spatialReference;
    if (!spatialReference || typeof spatialReference === "object") {
        // no need to try and transform this into an ISpatialReference
        return spatialReference;
    }
    // otherwise it _should_ be a string (if coming form the REST API)
    // but we force it in case it was set to a number somewhere outside of TS
    const spatialReferenceString = spatialReference + "";
    const wkid = parseInt(spatialReferenceString, 10);
    return isNaN(wkid)
        ? // It looks like the portal api returns the name of a WKT, but we'd
            // need to perform a lookup to get the full WKT. Return null for now.
            null
        : //
            { wkid };
};
/**
 * Extracts additional resources from the provided metadata
 * and transforms them into a hub-friendly format.
 *
 * Returns null if no resources are available
 *
 * @param item
 * @param metadata formal metadata
 * @returns
 * @private
 */
const getAdditionalResources = (item, metadata, requestOptions) => {
    const rawResources = extractRawResources(metadata);
    return (rawResources &&
        rawResources.map((resource) => ({
            name: resource.orName,
            url: getAdditionalResourceUrl(resource, item, requestOptions),
            isDataSource: isDataSourceOfItem(resource, item),
        })));
};
/**
 * @private
 *
 * Extracts additional resources from formal item metadata.
 * If none are available, null is returned.
 *
 * @param metadata the formal item metadata
 * @returns an array of all additional resources, or null
 */
const extractRawResources = (metadata) => {
    const rawResources = [];
    // The property path to additional resources should be fairly simple.
    // In many cases, it's just `metadata.metadata.distInfo.distTranOps.onLineSrc`.
    // However, since `distInfo`, `distTranOps` and `onLineSrc` can be either
    // Objects OR Arrays, we have to do all this looping.
    castToArray(getProp.getProp(metadata, "metadata.distInfo") || []).forEach((distInfo) => {
        castToArray(distInfo.distTranOps || []).forEach((distTranOps) => {
            castToArray(distTranOps.onLineSrc || []).forEach((onLineSrc) => {
                rawResources.push(onLineSrc);
            });
        });
    });
    return rawResources.length ? rawResources : null;
};
/**
 * @private
 *
 * Arrays are returned as-is.
 * Objects are wrapped into a 1 element array.
 *
 * @param objectOrArray
 * @returns the casted array
 */
const castToArray = (objectOrArray) => {
    return Array.isArray(objectOrArray) ? objectOrArray : [objectOrArray];
};
/**
 * Determines whether a raw additional resource (i.e. extracted out of formal
 * metadata with no transformation) references the underlying service that backs
 * the item.
 *
 * @param resource raw additional resource of an item
 * @param item
 * @returns
 * @private
 */
const isDataSourceOfItem = (resource, item) => {
    const serviceUrl = item.url && helpers.parseServiceUrl(item.url);
    return (serviceUrl && resource.linkage && resource.linkage.includes(serviceUrl));
};
/**
 * Returns the url for an additional resource.
 *
 * Automatically appends auth token if token is available
 * and resource points to the backing service of an item.
 *
 * @param resource raw additional resource of an item
 * @param item
 * @param requestOptions IHubRequestOptions, including authentication
 * @returns
 * @private
 */
const getAdditionalResourceUrl = (resource, item, requestOptions) => {
    let result = resource.linkage;
    const token = getProp.getProp(requestOptions, "authentication.token");
    if (token && isDataSourceOfItem(resource, item)) {
        const resUrl = new URL(resource.linkage);
        const params = new URLSearchParams(resUrl.search);
        params.set("token", token);
        resUrl.search = params.toString();
        result = resUrl.toString();
    }
    return result;
};
/**
 * @private
 *
 * Contains fallback logic for determining a content's extent.
 *
 * The fallback priority is as follows:
 * 1) item's extent (if valid bbox)
 * 2) extent enrichment from the hub api (if coordinates are valid bbox)
 * 3) layer's extent (if spatial reference is 4326)
 *
 * If none of these conditions are met, undefined is returned.
 *
 * @param item
 * @param layer
 * @param extentEnrichment
 * @returns the correct extent in a bbox format, or undefined
 */
const determineExtent = (item, extentEnrichment, layer) => {
    const itemExtent = extent.isBBox(item.extent) ? item.extent : undefined;
    const extentEnrichmentCoordinates = extent.isBBox(extentEnrichment === null || extentEnrichment === void 0 ? void 0 : extentEnrichment.coordinates)
        ? extentEnrichment.coordinates
        : undefined;
    const layerExtent = getProp.getProp(layer, "extent.spatialReference.wkid") === 4326
        ? extent.extentToBBox(layer.extent)
        : undefined;
    return itemExtent || extentEnrichmentCoordinates || layerExtent;
};
/**
 * @private
 *
 * Extracts the first contact from a given formal item metadata path.
 * This is particularly helpful if the contact path is either an object or an array.
 *
 * Note: the raw contact object must have the following properties:
 * - `rpIndName`: name of the individual
 * - `rpOrgName`: name of the individual's organization
 *
 * @param metadata formal item metadata
 * @param path path to the contact object/array
 * @returns
 */
const extractFirstContact = (metadata, path) => {
    const rawContacts = getProp.getProp(metadata, path) || {};
    const { rpIndName, rpOrgName } = Array.isArray(rawContacts)
        ? rawContacts[0]
        : rawContacts;
    return { individualName: rpIndName, organizationName: rpOrgName };
};
/**
 * Determines the correct orgId for an item.
 * Note: it's undocumented, but the portal API will return orgId for items... sometimes.
 *
 * @param item
 * @param ownerUser item owner's hydrated user object
 */
const getItemOrgId = (item, ownerUser) => item.orgId || (ownerUser === null || ownerUser === void 0 ? void 0 : ownerUser.orgId);
/**
 * Calculates the Publisher display info for the given item.
 * Utilizes this fallback pattern:
 * 1) Formal Item Metadata > Resource > Citation > Contact
 * 2) Formal Item Metadata > Resource > Contact
 * 3) Item’s Owner and Org Name
 * 4) Undefined (Item Owner / Org are private and we can't access additional info)
 *
 * @param item
 * @param metadata
 * @param org portal info of the item's organization
 * @param ownerUser the item owner's hydrated user
 * @returns
 */
const getPublisherInfo = (item, metadata, org, ownerUser) => {
    const result = {
        nameSource: exports.PublisherSource.None,
        organizationSource: exports.PublisherSource.None,
    };
    const citationContact = extractFirstContact(metadata, "metadata.dataIdInfo.idCitation.citRespParty");
    const resourceContact = extractFirstContact(metadata, "metadata.dataIdInfo.idPoC");
    const metadataContact = extractFirstContact(metadata, "metadata.mdContact");
    // Determine publisher name properties
    const ownerFullName = getProp.getProp(ownerUser, "fullName");
    if (citationContact.individualName) {
        result.name = citationContact.individualName;
        result.nameSource = exports.PublisherSource.CitationContact;
    }
    else if (resourceContact.individualName) {
        result.name = resourceContact.individualName;
        result.nameSource = exports.PublisherSource.ResourceContact;
    }
    else if (metadataContact.individualName) {
        result.name = metadataContact.individualName;
        result.nameSource = exports.PublisherSource.MetadataContact;
    }
    else if (ownerFullName) {
        result.name = ownerFullName;
        result.username = ownerUser.username;
        result.nameSource = exports.PublisherSource.ItemOwner;
    }
    // Determine publisher org properties
    const orgName = getProp.getProp(org, "name");
    if (citationContact.organizationName) {
        result.organization = citationContact.organizationName;
        result.organizationSource = exports.PublisherSource.CitationContact;
    }
    else if (resourceContact.organizationName) {
        result.organization = resourceContact.organizationName;
        result.organizationSource = exports.PublisherSource.ResourceContact;
    }
    else if (metadataContact.organizationName) {
        result.organization = metadataContact.organizationName;
        result.organizationSource = exports.PublisherSource.MetadataContact;
    }
    else if (orgName) {
        result.organization = orgName;
        result.orgId = getItemOrgId(item, ownerUser);
        result.organizationSource = exports.PublisherSource.ItemOwner;
    }
    // We assume the item belongs to external org if no org info is available and the item is private
    result.isExternal =
        result.organizationSource === exports.PublisherSource.None &&
            item.access !== "public";
    return result;
};
/**
 * returns the last section of each category path.
 * Example: "/categories/parent/child" > "child"
 *
 * @param categories an item's categories
 */
const getShortenedCategories = (categories) => {
    return categories.reduce((acc, category) => {
        const segments = category.split("/");
        const shortenedCategory = segments[segments.length - 1];
        shortenedCategory && acc.push(shortenedCategory);
        return acc;
    }, []);
};
/**
 * Returns URL to edit content of application type
 *
 * TODO: implement logic to compute edit URL for
 * Dataset, project, document, templates
 *
 * Logic copied from getEditUrl()
 * https://github.com/ArcGIS/opendata-ui/blob/9442a7a26ddde117bdaa747f60e2ef61f5163896/packages/ember-arcgis-opendata-components/addon/services/solutions-service.js#L1340
 *
 * @param item
 * @param requestOptions
 */
const getContentEditUrl = (item, requestOptions) => {
    let contentEditUrl;
    // TODO: edit URL for Dataset, project, document, templates
    switch (getNormalizedAppItemType(item)) {
        case "Dashboard":
            contentEditUrl = getDashboardEditUrl(item, requestOptions);
            break;
        case "Insights Workbook":
            contentEditUrl = getInsightsEditUrl(item, requestOptions);
            break;
        case "Experience":
            contentEditUrl = getExperienceBuilderEditUrl(item, requestOptions);
            break;
        case "Web AppBuilder":
            contentEditUrl = getWebAppBuilderEditUrl(item, requestOptions);
            break;
        case "Form":
            contentEditUrl = getSurvey123EditUrl(item, requestOptions);
            break;
        case "StoryMap":
            contentEditUrl = getStoryMapEditUrl(item, requestOptions);
            break;
        case "Urban Model":
            contentEditUrl = getUrbanModelEditUrl(item, requestOptions);
            break;
        default:
            contentEditUrl = getItemHomeUrl.getItemHomeUrl(item.id, requestOptions);
    }
    return contentEditUrl;
};
/**
 * returns normalized application item type
 *
 * Logic copied from
 * https://github.com/ArcGIS/opendata-ui/blob/842685ab715209a4793a7a4cb752bd37225c16ec/packages/ember-arcgis-hub-components/addon/utils/item-urls.js#L132
 *
 * @param item
 */
const getNormalizedAppItemType = (item) => {
    const typeKeywords = item.typeKeywords || [];
    let result = item.type;
    if (item.type === "StoryMap" ||
        (item.type === "Web Mapping Application" &&
            typeKeywords.includes("Story Map"))) {
        result = "StoryMap";
    }
    else if (item.type === "Insights Page") {
        result = "Insights Page";
    }
    else if (item.type === "Insights Workbook") {
        result = "Insights Workbook";
    }
    else if (item.type && item.type.includes("Insights")) {
        result = "Insights";
    }
    else if (item.type === "Web Experience" ||
        (item.type === "Web Mapping Experience" &&
            typeKeywords.includes("EXB Experience"))) {
        result = "Experience";
    }
    else if (typeKeywords.includes("Web AppBuilder")) {
        result = "Web AppBuilder";
    }
    return result;
};
/**
 * returns url to edit Story map application
 *
 * Logic copied from
 * https://github.com/ArcGIS/opendata-ui/blob/842685ab715209a4793a7a4cb752bd37225c16ec/packages/ember-arcgis-opendata-components/addon/services/storymap-service.js#L289
 *
 * @param item
 * @param requestOptions
 */
const getStoryMapEditUrl = (item, requestOptions) => {
    const storyMapsBases = {
        devext: "storymapsdev",
        qaext: "storymapsqa",
        production: "storymaps",
    };
    const portalUrl = getPortalUrl.getPortalUrl(requestOptions);
    const env = getPortalApiUrl.getEnvironmentFromPortalUrl(portalUrl);
    const storyMapUrl = `https://${storyMapsBases[env]}.arcgis.com`;
    return `${storyMapUrl}/stories/${item.id}/edit`;
};
/**
 * returns URL to edit Experience builder application
 *
 * Logic copied from
 * https://github.com/ArcGIS/opendata-ui/blob/842685ab715209a4793a7a4cb752bd37225c16ec/packages/ember-arcgis-opendata-components/addon/services/experience-service.js#L227
 *
 * @param item
 * @param requestOptions
 */
const getExperienceBuilderEditUrl = (item, requestOptions) => {
    const portalUrl = getPortalUrl.getPortalUrl(requestOptions);
    const env = getPortalApiUrl.getEnvironmentFromPortalUrl(portalUrl);
    const experienceBuilderUrl = `https://experience${envBases[env]}.arcgis.com`;
    return `${experienceBuilderUrl}/builder/?id=${item.id}`;
};
/**
 * returns URL to edit Dashboard application
 *
 * Logic copied from
 * https://github.com/ArcGIS/opendata-ui/blob/842685ab715209a4793a7a4cb752bd37225c16ec/packages/ember-arcgis-opendata-components/addon/services/dashboard-service.js#L357
 *
 * @param item
 * @param requestOptions
 */
const getDashboardEditUrl = (item, requestOptions) => {
    const portalUrl = getPortalUrl.getPortalUrl(requestOptions);
    let url = `${portalUrl}/apps/opsdashboard/index.html#/${item.id}?mode=edit`;
    if (item.typeKeywords && item.typeKeywords.includes("ArcGIS Dashboards")) {
        url = `${portalUrl}/apps/dashboards/${item.id}#mode=edit`;
    }
    return url;
};
/**
 * returns URL to edit Web application builder
 *
 * Logic copied from
 * https://github.com/ArcGIS/opendata-ui/blob/842685ab715209a4793a7a4cb752bd37225c16ec/packages/ember-arcgis-opendata-components/addon/services/webapp-service.js#L359
 *
 * @param item
 * @param requestOptions
 */
const getWebAppBuilderEditUrl = (item, requestOptions) => {
    const portalUrl = getPortalUrl.getPortalUrl(requestOptions);
    // TODO: handle special cases for economic-development app and enterprise
    return `${portalUrl}/apps/webappbuilder/index.html?id=${item.id}`;
};
/**
 * returns edit URL for Survey123 application item
 *
 * Logic copied from
 * https://github.com/ArcGIS/opendata-ui/blob/842685ab715209a4793a7a4cb752bd37225c16ec/packages/ember-arcgis-opendata-components/addon/services/survey-service.js#L1014
 *
 * @param item
 * @param requestOptions
 */
const getSurvey123EditUrl = (item, requestOptions) => {
    const portalUrl = getPortalUrl.getPortalUrl(requestOptions);
    const env = getPortalApiUrl.getEnvironmentFromPortalUrl(portalUrl);
    const survey123Url = `https://survey123${envBases[env]}.arcgis.com`;
    let surver123EditUrl;
    // TODO: handle cases for enterprise and Hub feedback relative URL
    if (item.typeKeywords.includes("Survey123 Connect")) {
        surver123EditUrl = getItemHomeUrl.getItemHomeUrl(item.id, portalUrl);
    }
    else {
        surver123EditUrl = `${survey123Url}/surveys/${item.id}/design?portalUrl=${portalUrl}`;
    }
    return surver123EditUrl;
};
/**
 * returns URL to edit Insights application
 *
 * Logic copied from
 * https://github.com/ArcGIS/opendata-ui/blob/9442a7a26ddde117bdaa747f60e2ef61f5163896/packages/ember-arcgis-opendata-components/addon/services/solutions-service.js#L1366-L1369
 *
 * @param item
 * @param requestOptions
 */
const getInsightsEditUrl = (item, requestOptions) => {
    const portalUrl = getPortalUrl.getPortalUrl(requestOptions);
    const env = getPortalApiUrl.getEnvironmentFromPortalUrl(portalUrl);
    const insightsUrl = `https://insights${envBases[env]}.arcgis.com`;
    const itemHomeUrl = getItemHomeUrl.getItemHomeUrl(item.id, portalUrl);
    return isPortalFromUrl(portalUrl)
        ? itemHomeUrl
        : `${insightsUrl}/#/edit/${item.id}`;
};
/**
 * returns URL to edit Urban Model application
 *
 * Logic copied from
 * https://github.com/ArcGIS/opendata-ui/blob/9442a7a26ddde117bdaa747f60e2ef61f5163896/packages/ember-arcgis-opendata-components/addon/services/solutions-service.js#L1370-L1373
 *
 * @param item
 * @param requestOptions
 */
const getUrbanModelEditUrl = (item, requestOptions) => {
    const portalUrl = getPortalUrl.getPortalUrl(requestOptions);
    const env = getPortalApiUrl.getEnvironmentFromPortalUrl(portalUrl);
    const urbanModelUrl = `https://urban${envBases[env]}.arcgis.com`;
    const itemHomeUrl = getItemHomeUrl.getItemHomeUrl(item.id, portalUrl);
    return isPortalFromUrl(portalUrl)
        ? itemHomeUrl
        : `${urbanModelUrl}/?id=${item.id}`;
};
const isPortalFromUrl = (portalUrl) => {
    return portalUrl.indexOf("arcgis.com") === -1;
};
function getSchedulerApiUrl(itemId, requestOptions) {
    const hubApiUrlRoot = getHubApiUrlRoot(requestOptions);
    return `${hubApiUrlRoot}/api/download/v1/items/${itemId}/schedule?token=${requestOptions.authentication.token}`;
}
function getHubApiUrlRoot(requestOptions) {
    // sometimes the url has /api/v3 at the end, so we need to remove it
    const hubApiUrlWithVersion = getHubApiUrl(requestOptions);
    return hubApiUrlWithVersion.replace(/\/api\/v3$/, "");
}
const forceUpdateContent = async (itemId, requestOptions) => {
    const hubApiUrlRoot = getHubApiUrl(requestOptions);
    const url = `${hubApiUrlRoot}/api/v3/jobs/item/${itemId}/forceUpdate`;
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            authorization: requestOptions.authentication.token,
        },
    };
    const response = await fetch(url, options);
    return response.ok;
};

// helper fns - move this to _internal if needed elsewhere
const getOnlyQueryLayer = (layers) => {
    const layer = layers && layers.length === 1 ? layers[0] : undefined;
    return layer && layer.capabilities.includes("Query") ? layer : undefined;
};
const shouldUseLayerInfo = (item, layer, layers, requestOptions) => {
    return (!isProxiedCSV(item, requestOptions) &&
        layer &&
        layers &&
        layers.length > 1 &&
        // we use item info instead of layer info for single layer items
        !getLayerIdFromUrl(item.url));
};
// this logic adapted from hub-indexer's determineName(), see
// https://github.com/ArcGIS/hub-indexer/blob/8f4dd6f928124c1f35dd02bc11bd996191ee1160/packages/duke/compose/common.js#L7-L34
const getContentName = (item, layer, layers, requestOptions) => {
    return ((shouldUseLayerInfo(item, layer, layers, requestOptions)
        ? layer.name
        : item.title || item.name) || "").replace(/_/g, " ");
};
/**
 * The possible values for updateFrequency
 *
 * @enum {string}
 */
exports.UpdateFrequency = void 0;
(function (UpdateFrequency) {
    UpdateFrequency["Continual"] = "continual";
    UpdateFrequency["Daily"] = "daily";
    UpdateFrequency["Weekly"] = "weekly";
    UpdateFrequency["Fortnightly"] = "fortnightly";
    UpdateFrequency["Monthly"] = "monthly";
    UpdateFrequency["Quarterly"] = "quarterly";
    UpdateFrequency["Biannually"] = "biannually";
    UpdateFrequency["Annually"] = "annually";
    UpdateFrequency["AsNeeded"] = "as-needed";
    UpdateFrequency["Irregular"] = "irregular";
    UpdateFrequency["NotPlanned"] = "not-planned";
    UpdateFrequency["Unknown"] = "unknown";
    UpdateFrequency["Semimonthly"] = "semimonthly";
})(exports.UpdateFrequency || (exports.UpdateFrequency = {}));
const getUpdateFrequencyFromMetadata = (metadata, identifier) => {
    const updateFrequencyMap = {
        "001": exports.UpdateFrequency.Continual,
        "002": exports.UpdateFrequency.Daily,
        "003": exports.UpdateFrequency.Weekly,
        "004": exports.UpdateFrequency.Fortnightly,
        "005": exports.UpdateFrequency.Monthly,
        "006": exports.UpdateFrequency.Quarterly,
        "007": exports.UpdateFrequency.Biannually,
        "008": exports.UpdateFrequency.Annually,
        "009": exports.UpdateFrequency.AsNeeded,
        "010": exports.UpdateFrequency.Irregular,
        "011": exports.UpdateFrequency.NotPlanned,
        "012": exports.UpdateFrequency.Unknown,
        "013": exports.UpdateFrequency.Semimonthly,
    };
    return updateFrequencyMap[getValueFromMetadata(metadata, identifier || "updateFrequency")];
};
const getDateInfoFromMetadata = (metadata, identifier) => {
    const metadataDateInfo = parseISODateString(getValueFromMetadata(metadata, identifier));
    return (metadataDateInfo && Object.assign(Object.assign({}, metadataDateInfo), { source: `metadata.${getMetadataPath(identifier)}` }));
};
const getLastEditDateInfo = (content, layerOrServer) => {
    const source = `${layerOrServer}.editingInfo.lastEditDate`;
    const lastEditDate = getProp.getProp(content, source);
    return (lastEditDate && {
        date: new Date(lastEditDate),
        source,
        // NOTE: this default was taken from _enrichDates
        precision: DatePrecision.Day,
    });
};
const getItemDateInfo = (item, createdOrModified) => {
    return {
        date: new Date(item[createdOrModified]),
        // NOTE: this was set to Day in _enrichDates()
        // but I wonder if it should be Time instead?
        precision: DatePrecision.Day,
        source: `item.${createdOrModified}`,
    };
};
const getUpdatedDateInfo = (item, options) => {
    return (
    // prefer metadata revise date
    getDateInfoFromMetadata(options.metadata, "reviseDate") ||
        // then layer last edit date
        getLastEditDateInfo(options, "layer") ||
        // then server last edit date
        getLastEditDateInfo(options, "server") ||
        // fall back to item modified date
        getItemDateInfo(item, "modified"));
};
const getPublishedDateInfo = (item, metadata) => {
    return (
    // prefer metadata publish date
    getDateInfoFromMetadata(metadata, "pubDate") ||
        // then metadata create date
        getDateInfoFromMetadata(metadata, "createDate") ||
        // fall back to item created date
        getItemDateInfo(item, "created"));
};
const getMetadataUpdatedDateInfo = (item, metadata) => {
    // prefer date from metadata
    return (getDateInfoFromMetadata(metadata, "metadataUpdatedDate") ||
        // default to when the item was last modified
        getItemDateInfo(item, "modified"));
};
// public API
// AGO has a util for determining display name and item type icons
// that we can use for reference
// https://devtopia.esri.com/WebGIS/arcgis-app-components/blob/master/src/components/arcgis-item-type/utils.ts
/**
 * Compute the content type calcite-icon based on the content type
 * @param content type
 * @returns content type icon
 */
const getContentTypeIcon = (contentType) => {
    var _a;
    const type = util.camelize(contentType);
    const iconMap = {
        appbuilderExtension: "file",
        appbuilderWidgetPackage: "widgets-source",
        application: "web",
        applicationConfiguration: "app-gear",
        arcgisProMap: "desktop",
        cadDrawing: "file-cad",
        cityEngineWebScene: "urban-model",
        codeAttachment: "file-code",
        codeSample: "file-code",
        colorSet: "palette",
        contentCategorySet: "label",
        csv: "file-csv",
        csvCollection: "file-csv",
        dashboard: "dashboard",
        desktopApplication: "desktop",
        discussion: "speech-bubbles",
        documentLink: "link",
        event: "event",
        excaliburImageryProject: "file",
        explorerMap: "file",
        exportPackage: "file",
        featureCollection: "data",
        featureCollectionTemplate: "file",
        featureLayer: "data",
        featureService: "collection",
        fileGeodatabase: "data",
        form: "survey",
        geocodingService: "file",
        geodataService: "file",
        geometryService: "file",
        geopackage: "file",
        geoprocessingService: "file",
        globeLayer: "layers",
        globeService: "file",
        group: "users",
        hubInitiative: "initiative",
        hubInitiativeTemplate: "initiative-template",
        hubPage: "browser",
        hubProject: "projects",
        hubSiteApplication: "browser",
        image: "file-image",
        imageService: "data",
        insightsModel: "file",
        insightsPage: "graph-moving-average",
        insightsTheme: "palette",
        insightsWorkbook: "graph-moving-average",
        iworkPages: "file-text",
        iworkKeynote: "presentation",
        iworkNumbers: "file-report",
        kml: "data",
        kmlCollection: "data",
        layer: "layers",
        layerPackage: "layers",
        layerTemplate: "file",
        locatorPackage: "file",
        mapArea: "file",
        mapDocument: "map-contents",
        mapImageLayer: "collection",
        mapPackage: "file",
        mapService: "collection",
        microsoftExcel: "file-report",
        microsoftPowerpoint: "presentation",
        microsoftWord: "file-text",
        mission: "file",
        mobileMapPackage: "map-contents",
        nativeApplication: "mobile",
        nativeApplicationInstaller: "file",
        nativeApplicationTemplate: "file",
        mobileApplication: "mobile",
        networkAnalysisService: "file",
        notebook: "code",
        orientedImageryCatalog: "file",
        orthoMappingProject: "file",
        orthoMappingTemplate: "file",
        pdf: "file-pdf",
        quickcaptureProject: "mobile",
        rasterFunctionTemplate: "file",
        rasterLayer: "map",
        realTimeAnalytic: "file",
        relationalDatabaseConnection: "file",
        reportTemplate: "file",
        sceneLayer: "data",
        sceneService: "urban-model",
        serviceDefinition: "file",
        shapefile: "data",
        solution: "puzzle-piece",
        sqliteGeodatabase: "file",
        statisticalDataCollection: "file",
        storymap: "tour",
        storyMap: "tour",
        storymapTheme: "palette",
        symbolSet: "file",
        table: "table",
        urbanModel: "urban-model",
        vectorTilePackage: "file-shape",
        vectorTileService: "map",
        visioDocument: "conditional-rules",
        webExperience: "apps",
        webMap: "map",
        webMappingApplication: "apps",
        webScene: "urban-model",
        wfs: "map",
        wms: "map",
        wmts: "map",
        workflowManagerService: "file",
        workforceProject: "list-check",
    };
    return (_a = iconMap[type]) !== null && _a !== void 0 ? _a : "file";
};
/**
 * get portal URLs (home, API, data, and thumbnail) for an item
 *
 * @param item Item
 * @param requestOptions Request options
 * @returns a hash with the portal URLs
 * @export
 */
const getPortalUrls = (item, requestOptions) => {
    const authentication = requestOptions.authentication;
    const token = authentication && authentication.token;
    // add properties that depend on portal
    const portalHome = getItemHomeUrl.getItemHomeUrl(item.id, requestOptions);
    // the URL of the item's Portal API end point
    const portalApi = getItemApiUrl(item, requestOptions, token);
    // the URL of the item's data API end point
    const portalData = getItemDataUrl(item, requestOptions, token);
    // the full URL of the thumbnail
    const thumbnail = getItemThumbnailUrl(item, requestOptions, {
        token,
    });
    return {
        portalHome,
        portalApi,
        portalData,
        thumbnail,
    };
};
/**
 * If an item is a proxied csv, returns the url for the proxying feature layer.
 * If the item is not a proxied csv, returns undefined.
 *
 * @param item
 * @param requestOptions Hub Request Options (including whether we're in portal)
 * @returns
 */
const getProxyUrl = (item, requestOptions) => {
    let result;
    if (isProxiedCSV(item, requestOptions)) {
        // Sometimes hubApiUrl includes /api/v3, sometimes it doesn't
        const baseUrl = getHubApiUrl(requestOptions).replace("/api/v3", "");
        result = `${baseUrl}/datasets/${item.id}_0/FeatureServer/0`;
    }
    return result;
};
/**
 * parse layer id from a service URL
 * @param {string} url
 * @returns {string} layer id
 */
const getLayerIdFromUrl = (url) => {
    const endsWithNumberSegmentRegEx = /\/\d+$/;
    const matched = url && url.match(endsWithNumberSegmentRegEx);
    return matched && matched[0].slice(1);
};
/**
 * Case-insensitive check if the type is "Feature Service"
 * @param {string} type - item's type
 * @returns {boolean}
 */
const isFeatureService = (type) => {
    return type && type.toLowerCase() === "feature service";
};
/**
 * Determines whether, given a type and typekeywords, the input is
 * a site item type or not
 * @param type - the type value on the item
 * @param typeKeywords - the typeKeywords on the item
 */
function isSiteType(type, typeKeywords = []) {
    return (type === "Site Application" ||
        type === "Hub Site Application" ||
        (type === "Web Mapping Application" && typeKeywords.includes("hubSite")));
}
/**
 * ```js
 * import { normalizeItemType } from "@esri/hub-common";
 * //
 * normalizeItemType(item)
 * > [ 'Hub Site Application' ]
 * ```
 * @param item Item object.
 * @returns type of the input item.
 *
 */
function normalizeItemType(item = {}) {
    let ret = item.type;
    const typeKeywords = item.typeKeywords || [];
    if (isSiteType(item.type, typeKeywords)) {
        ret = "Hub Site Application";
    }
    if (item.type === "Site Page" ||
        (item.type === "Web Mapping Application" &&
            includes(typeKeywords, "hubPage"))) {
        ret = "Hub Page";
    }
    if (item.type === "Hub Initiative" &&
        includes(typeKeywords, "hubInitiativeTemplate")) {
        ret = "Hub Initiative Template";
    }
    if (item.type === "Web Mapping Application" &&
        includes(typeKeywords, "hubSolutionTemplate")) {
        ret = "Solution";
    }
    return ret;
}
/**
 * return the layerId if we can tell that item is a single layer service
 * @param {*} item from AGO
 * @returns {string} layer id
 */
const getItemLayerId = (item) => {
    // try to parse it from the URL, but failing that we check for
    // the Singlelayer typeKeyword, which I think is set when you create the item in AGO
    // but have not verified that, nor that we should alway return '0' in that case
    return (getLayerIdFromUrl(item.url) ||
        (isFeatureService(item.type) &&
            item.typeKeywords &&
            includes(item.typeKeywords, "Singlelayer") &&
            "0"));
};
/**
 * given an item, get the id to use w/ the Hub API
 * @param item
 * @returns Hub API id (hubId)
 */
const getItemHubId = (item) => {
    if (item.access !== "public") {
        // the hub only indexes public items
        return;
    }
    const id = item.id;
    const layerId = getItemLayerId(item);
    return layerId ? `${id}_${layerId}` : id;
};
/**
 * Splits item category strings at slashes and discards the "Categories" keyword
 *
 * ```
 * ["/Categories/Boundaries", "/Categories/Planning and cadastre/Property records", "/Categories/Structure"]
 * ```
 * Should end up being
 * ```
 * ["Boundaries", "Planning and cadastre", "Property records", "Structure"]
 * ```
 *
 * @param categories - an array of strings
 * @private
 */
function parseItemCategories(categories) {
    if (!categories)
        return categories;
    const exclude = ["categories", ""];
    const parsed = categories.map((cat) => cat.split("/"));
    const flattened = parsed.reduce((acc, arr, _) => [...acc, ...arr], []);
    return flattened.filter((cat) => !includes(exclude, cat.toLowerCase()));
}
/**
 * get the layer object for
 * - an item that refers to a specific layer of a service
 * - a multi-layer services (if a layer id was passed in)
 * - a single layer feature service
 * @param item
 * @param layers the layers and tables returned from the service
 * @param layerId a specific id
 * @returns layer definition
 * @private
 */
const getItemLayer = (item, layers, layerId) => {
    // if item refers to a layer we always want to use that layer id
    // otherwise use the layer id that was passed in (if any)
    const _layerIdFromUrl = getLayerIdFromUrl(item.url);
    const _layerId = _layerIdFromUrl ? parseInt(_layerIdFromUrl, 10) : layerId;
    return (layers &&
        (!util.isNil(_layerId)
            ? // find the explicitly set layer id
                layers.find((_layer) => _layer.id === _layerId)
            : // for feature servers with a single layer always show the layer
                isFeatureService(item.type) && getOnlyQueryLayer(layers)));
};
/**
 * determine if a layer is a layer view
 * @param layer
 * @returns
 * @private
 */
const isLayerView = (layer) => layer.isView;
const determineHubId = (item, layer, requestOptions) => {
    // Proxied CSVs are one offs in that we don't index the proxied layer,
    // so we cannot append _0. Return item id instead.
    if (isProxiedCSV(item, requestOptions)) {
        return item.id;
    }
    return canUseHubApiForItem(item, requestOptions)
        ? layer
            ? `${item.id}_${layer.id}`
            : getItemHubId(item)
        : undefined;
};
/**
 * Compose a new content object out of an item, enrichments, and context
 * @param item
 * @param options any enrichments, current state (selected layerId), or context (requestOptions)
 * @returns new content object
 */
const composeContent = (item, options) => {
    // extract enrichments and context out of the options
    const { slug, requestOptions, data, metadata, groupIds, ownerUser, org, errors, server, layers, recordCount, boundary, extent, searchDescription, statistics, } = options || {};
    // set common variables that we will use in the derived properties below
    const layer = getItemLayer(item, layers, options === null || options === void 0 ? void 0 : options.layerId);
    // NOTE: we only set hubId for public items in online
    const hubId = determineHubId(item, layer, requestOptions);
    const identifier = slug || hubId || item.id;
    // whether or not we should show layer info for name, description, etc
    const name = getContentName(item, layer, layers, requestOptions);
    const _layerDescription = shouldUseLayerInfo(item, layer, layers, requestOptions) &&
        layer.description;
    // so much depends on type
    const type = layer
        ? // use layer type (Feature Layer, Table, etc) for layer content
            layer.type
        : // otherwise use the normalized item type
            normalizeItemType(item);
    // all the urls
    const urls = Object.assign({ relative: getHubRelativeUrl(type, identifier, item.typeKeywords) }, (requestOptions && getPortalUrls(item, requestOptions)));
    const _proxyUrl = getProxyUrl(item, requestOptions);
    // NOTE: I'd rather not compute these date values up front,
    // but they are used by several getters below, so we do it here only once
    const _updatedDateInfo = getUpdatedDateInfo(item, {
        metadata,
        layer,
        server,
    });
    const _publishedDateInfo = getPublishedDateInfo(item, metadata);
    const _metadataUpdatedDateInfo = getMetadataUpdatedDateInfo(item, metadata);
    // derive canEdit/canDelete from itemControl
    const _canEdit = item.itemControl === "update" || item.itemControl === "admin";
    const _canDelete = item.itemControl === "admin";
    // return all of the above composed into a content object
    return Object.assign(Object.assign({ 
        // a reference to underlying item
        item }, item), { 
        // item enrichments
        slug,
        data,
        metadata,
        groupIds,
        ownerUser,
        org, errors: errors || [], 
        // server enrichments
        server,
        layers,
        recordCount,
        // enrichments from the Hub API (boundary is below)
        statistics,
        // derived properties
        // NOTE: in the getters below you can **not** use `this`
        // these are not meant to provide live updating computed props
        // their purpose is to avoid computing all these values above
        // especially where we want to defer computation of less used props
        hubId,
        identifier,
        get isProxied() {
            return !!_proxyUrl;
        },
        layer,
        name,
        get canEdit() {
            return _canEdit;
        },
        get canDelete() {
            return _canDelete;
        },
        get title() {
            return name;
        },
        get description() {
            return _layerDescription || item.description;
        },
        type,
        get family() {
            return getFamily.getFamily(type);
        },
        get url() {
            return _proxyUrl
                ? _proxyUrl
                : layer
                    ? `${helpers.parseServiceUrl(item.url)}/${layer.id}`
                    : item.url;
        },
        get categories() {
            return parseItemCategories(item.categories);
        },
        get actionLinks() {
            return item.properties && item.properties.links;
        },
        get hubActions() {
            return item.properties && item.properties.actions;
        },
        get isDownloadable() {
            return isDownloadable(item);
        },
        get structuredLicense() {
            return getStructuredLicense.getStructuredLicense(item.licenseInfo);
        },
        get permissions() {
            return {
                visibility: item.access,
                control: item.itemControl || "view",
            };
        },
        get extent() {
            return determineExtent(item, extent, layer);
        }, 
        // would require us to do client-side projection of server/layer extent
        get boundary() {
            // NOTE: the boundary from the Hub API will be undefined if item.properties.boundary === 'none'
            return (boundary === null || boundary === void 0 ? void 0 : boundary.provenance) === "automatic"
                ? boundary
                : getContentBoundary(item);
        }, get summary() {
            return (searchDescription ||
                // TODO: this should use the logic for the Hub API's searchDescription
                // see: https://github.com/ArcGIS/hub-indexer/blob/b352cfded8221a967ac80447879d493db6476d7a/packages/duke/compose/dataset.js#L238-L250
                item.snippet ||
                item.description);
        },
        urls,
        get portalHomeUrl() {
            return urls.portalHome;
        },
        get portalDataUrl() {
            return urls.portalData;
        },
        get portalApiUrl() {
            return urls.portalApi;
        },
        get thumbnailUrl() {
            return urls.thumbnail;
        },
        /** The date the item was created */
        get createdDate() {
            return new Date(item.created);
        }, createdDateSource: "item.created", get updatedDate() {
            return _updatedDateInfo.date;
        },
        get updatedDateSource() {
            return _updatedDateInfo.source;
        },
        get updatedDatePrecision() {
            return _updatedDateInfo.precision;
        },
        get modified() {
            return _updatedDateInfo.date.getTime();
        },
        get publishedDate() {
            return _publishedDateInfo.date;
        },
        get publishedDateSource() {
            return _publishedDateInfo.source;
        },
        get publishedDatePrecision() {
            return _publishedDateInfo.precision;
        },
        get metadataUpdatedDate() {
            return _metadataUpdatedDateInfo.date;
        },
        get metadataUpdatedDateSource() {
            return _metadataUpdatedDateInfo.source;
        },
        get metadataUpdatedDatePrecision() {
            return _metadataUpdatedDateInfo.precision;
        },
        get updateFrequency() {
            return getUpdateFrequencyFromMetadata(metadata);
        },
        get metadataUpdateFrequency() {
            return getUpdateFrequencyFromMetadata(metadata, "metadataUpdateFrequency");
        },
        get publisher() {
            return getPublisherInfo(item, metadata, org, ownerUser);
        },
        // TODO: is metrics in use?
        get metrics() {
            return item.properties && item.properties.metrics;
        }, get spatialReference() {
            var _a;
            return ((_a = layer === null || layer === void 0 ? void 0 : layer.extent) === null || _a === void 0 ? void 0 : _a.spatialReference) || getItemSpatialReference(item);
        }, get viewDefinition() {
            // if this is a layer view and we have the item data
            // find the definition that corresponds to the current layer
            const dataLayer = layer &&
                isLayerView(layer) &&
                data &&
                Array.isArray(data.layers) &&
                data.layers.find((_layer) => _layer.id === layer.id);
            return dataLayer ? dataLayer.layerDefinition : undefined;
        },
        get orgId() {
            return org ? org.id : getItemOrgId(item, ownerUser);
        },
        get contentTypeIcon() {
            /* Note: only returns calcite-icons */
            return getContentTypeIcon(type);
        },
        get additionalResources() {
            return getAdditionalResources(item, metadata);
        },
        get itemControl() {
            return item.itemControl || "view";
        } });
};

exports._getHubUrlFromPortalHostname = _getHubUrlFromPortalHostname;
exports.arcgisToGeoJSON = arcgisToGeoJSON;
exports.canUseHubApiForItem = canUseHubApiForItem;
exports.categories = categories;
exports.composeContent = composeContent;
exports.deriveLocationFromItem = deriveLocationFromItem;
exports.forceUpdateContent = forceUpdateContent;
exports.geojsonToArcGIS = geojsonToArcGIS;
exports.getAdditionalResources = getAdditionalResources;
exports.getContentEditUrl = getContentEditUrl;
exports.getContentTypeIcon = getContentTypeIcon;
exports.getHubApiUrl = getHubApiUrl;
exports.getHubRelativeUrl = getHubRelativeUrl;
exports.getItemApiUrl = getItemApiUrl;
exports.getItemDataUrl = getItemDataUrl;
exports.getItemHubId = getItemHubId;
exports.getItemLayer = getItemLayer;
exports.getItemLayerId = getItemLayerId;
exports.getItemOrgId = getItemOrgId;
exports.getItemThumbnailUrl = getItemThumbnailUrl;
exports.getLayerIdFromUrl = getLayerIdFromUrl;
exports.getPortalUrls = getPortalUrls;
exports.getProxyUrl = getProxyUrl;
exports.getSchedulerApiUrl = getSchedulerApiUrl;
exports.getShortenedCategories = getShortenedCategories;
exports.includes = includes;
exports.isDownloadable = isDownloadable;
exports.isFeatureService = isFeatureService;
exports.isLayerView = isLayerView;
exports.isPageType = isPageType;
exports.isSiteType = isSiteType;
exports.normalizeItemType = normalizeItemType;
exports.parseItemCategories = parseItemCategories;
