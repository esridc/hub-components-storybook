// TODO: split fns, with their param interfaces, into separate files for fn.
// TODO: move remaining, common interfaces into components/arcgis-hub-discussions/types.ts
// TODO: move constants into components/arcgis-hub-discussions/constants.ts
// TODO: delete this file
var __rest = (this && this.__rest) || function (s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
import { PostSort, SortOrder, fetchContent, getLayerIdFromUrl, getPostCSVFileName } from '@esri/hub-common';
import { getGroup, updateGroup, getItem, updateItem } from '@esri/arcgis-rest-portal';
import { parseDiscussionURI, CANNOT_DISCUSS, exportPosts, searchPosts } from '@esri/hub-discussions';
import { getFeature } from '@esri/arcgis-rest-feature-layer';
import { arcgisToGeoJSON } from '@terraformer/arcgis';
import { cache } from '../../../utils/cache';
import { downloadRemoteFile } from '../../../utils';
/**
 * Max post and reply title length
 */
export const MAX_TITLE_LENGTH = 50;
/**
 * Max post and reply body length
 */
export const MAX_BODY_LENGTH = 512;
/**
 * Warning post and reply body lengh
 */
export const WARNING_BODY_LENGTH = MAX_BODY_LENGTH - 37;
export const fetchAndTransformFeature = cache((url, id) => getFeature({ url, id })
  .then(feature => {
  // any needed for https://github.com/terraformer-js/terraformer/issues/98
  return arcgisToGeoJSON(feature);
})
  .catch((e) => {
  console.warn(`Failed to fetch related feature ${id}`, e.message);
  return null;
}), {
  scope: 'relatedFeatures',
  getKey(_url, id) { return id.toString(); }
});
/**
 * Fetches related feature data
 * @param url
 * @param relatedFeatureIds
 * @returns a Feature array
 */
export async function fetchRelatedFeatures(url, relatedFeatureIds) {
  let results = [];
  if (Number(getLayerIdFromUrl(url)) >= 0) {
    results = await Promise.all(relatedFeatureIds.map(id => fetchAndTransformFeature(url, id)));
    results.forEach((feature, index) => {
      if (feature) {
        feature.id = relatedFeatureIds[index];
      }
    });
  }
  return results.filter(Boolean);
}
/**
 * Cache fetchContent call
 */
export const fetchContentFromCache = cache(fetchContent, {
  scope: 'content',
  ttl: 3000,
});
/**
 * Converts IPost[] to GeoJSON Feature Collection
 * @param posts An array of IPost objects
 * @returns GeoJSON Feature Collection
 */
export function postsToFeatureCollection(posts) {
  const hasGeometryOrFeatures = (post) => {
    return Boolean(post.geometry || pluckDiscussionFeatureIds(post.discussion));
  };
  return {
    type: 'FeatureCollection',
    features: posts.filter(hasGeometryOrFeatures).map(postToFeatures).flat(),
  };
}
;
/**
 * Pulls geometry from an IPost and returns array of geojson features
 * @param post An IPost object
 * @returns Array of GeoJSON Features
 */
export function postToFeatures(post) {
  const emptyPoint = {
    type: 'Point',
    coordinates: []
  };
  const { geometry } = post, rest = __rest(post, ["geometry"]);
  const features = [];
  if ((geometry === null || geometry === void 0 ? void 0 : geometry.type) === 'GeometryCollection') {
    geometry.geometries.forEach((geometry, index) => {
      features.push({
        type: 'Feature',
        geometry: geometry || emptyPoint,
        properties: Object.assign(Object.assign({}, rest), { '__index__': index })
      });
    });
  }
  else {
    features.push({
      type: 'Feature',
      geometry: geometry || emptyPoint,
      properties: rest,
    });
  }
  return features;
}
/**
 * Given an array of individual GeoJSON Features, will return geometry collection
 * if number of valid features with geometry > 1, else returns single geometry
 * @param features An array of GeoJSON features
 * @returns Geometry Collection or Geometry if only single valid feature
 */
export function featuresToGeometryCollection(features) {
  const geometries = features
    .map(feature => feature.geometry)
    .filter((geometry) => { var _a; return Boolean((_a = geometry === null || geometry === void 0 ? void 0 : geometry.coordinates) === null || _a === void 0 ? void 0 : _a.length); });
  let result = null;
  if (geometries.length > 1) {
    result = { type: 'GeometryCollection', geometries };
  }
  else if (geometries.length === 1) {
    // If geometry collection filtered to only one geometry, GeometryCollection will fail validation via rule:
    // https://github.com/mapbox/geojsonhint/blob/861d1ee2e3e2afdb26cf3c69d8a5a993a71956eb/lib/object.js#L362-L367
    result = geometries[0];
  }
  return result;
}
;
/**
 * Create discussion URI given existing discussion URI and additional spatial identifiers
 * @param discussion The original discussion URI
 * @param layerId
 * @param featureId
 * @returns Discussions URI assocaited with an individual feature
 */
export function augmentDiscussionURIWithFeature(discussion, layerId, featureIds) {
  const { source, type, id, features } = parseDiscussionURI(discussion);
  let URI = `${source}://${type}/${id}_${layerId}`;
  const originalFeatureIds = features || [];
  const ids = Array.from(new Set([
    ...originalFeatureIds,
    ...featureIds
  ]));
  if (ids.length) {
    URI += `?id=${ids.join(',')}`;
  }
  return URI;
}
;
/**
 * If discussion is associated with a feature, it will return the ID of the first feature
 * @param discussion Discussion URI
 * @returns ID of first feature for discussion
 */
export function pluckDiscussionFeatureIds(discussion) {
  if (!discussion) {
    return;
  }
  const { features } = parseDiscussionURI(discussion);
  if (features) {
    return features;
  }
}
;
/**
 * Determines the base URI for an item.  Example: hub://content/3ef_1?attribute=species -> hub://content/3ef
 * @param discussion Discussion URI
 * @returns the base URI
 */
export function getBaseDiscussionURI(discussion) {
  return discussion.split('_')[0];
}
;
/**
 * Determines if IHubContent layer displayField id valid.  A valid displayField
 * should not be empty or identical the objectId field.
 * @param content IHubContent
 * @returns True if IHubContent layer has valid displayField
 */
export const hasValidDisplayField = (content) => {
  if (!content.layer) {
    return false;
  }
  const { layer: { displayField, fields } } = content;
  const { name: oidFieldName } = fields.find(({ type }) => type === 'esriFieldTypeOID');
  return Boolean(displayField) && displayField !== oidFieldName;
};
/**
 * Takes a Geometry object and returns the type as a simple string
 * @param Geometry
 * @returns string
 */
export function convertGeometryTypeToTelemetryString({ type }) {
  if (type === "Point" || type === "MultiPoint") {
    return 'point';
  }
  else if (type === "LineString" || type === "MultiLineString") {
    return 'line';
  }
  else if (type === "Polygon" || type === "MultiPolygon") {
    return 'polygon';
  }
}
/**
 * Updates the discussability of a subject (IHubContent or IGroup)
 * TODO: hoist to Hub.js
 * @param options An IUpdateDiscussableOptions object
 * @returns Promise that resolves IHubContent or IGroup
 */
export async function updateDiscussable(options) {
  const { subject, discussable } = options, requestOptions = __rest(options, ["subject", "discussable"]);
  const type = subject.isInvitationOnly === undefined ? 'content' : 'group';
  let fetchFn;
  let updateFn;
  let updateKey;
  if (type === 'content') {
    fetchFn = getItem;
    updateFn = updateItem;
    updateKey = 'item';
  }
  else {
    fetchFn = getGroup;
    updateFn = updateGroup;
    updateKey = 'group';
  }
  const { typeKeywords: existingTypeKeywords } = await fetchFn(subject.id, requestOptions);
  const typeKeywords = discussable
    ? existingTypeKeywords.filter(typeword => typeword !== CANNOT_DISCUSS)
    : [...existingTypeKeywords, CANNOT_DISCUSS];
  const { success } = await updateFn(Object.assign({ [updateKey]: {
      id: subject.id,
      owner: subject.owner,
      typeKeywords,
    } }, requestOptions));
  if (!success) {
    throw new Error('Failed to update discussion settings');
  }
  return Object.assign(Object.assign({}, subject), { typeKeywords });
}
export function determineChannelOwner(channel, channelGroups) {
  const accessibleGroups = channelGroups.filter(Boolean);
  const channelOwnerOwnsGroup = (group) => group.owner === channel.creator;
  const doesChannelOwnerOwnGroups = accessibleGroups.some(channelOwnerOwnsGroup);
  const updatedChannelOwnerGroup = doesChannelOwnerOwnGroups
    ? null
    : accessibleGroups.find(group => !channelOwnerOwnsGroup(group));
  return (updatedChannelOwnerGroup === null || updatedChannelOwnerGroup === void 0 ? void 0 : updatedChannelOwnerGroup.owner) || channel.creator;
}
;
export function getChannelName(channel, channelGroups, fallback) {
  var _a, _b, _c;
  return (_c = (_a = channel === null || channel === void 0 ? void 0 : channel.name) !== null && _a !== void 0 ? _a : (_b = channelGroups === null || channelGroups === void 0 ? void 0 : channelGroups.filter(group => group)[0]) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : fallback;
}
export async function downloadPostCSV({ entityTitle, discussion, channels, requestOptions }) {
  const start = Date.now();
  const options = Object.assign({ data: {
      discussion: discussion && !discussion.endsWith('%') ? `${discussion}%` : discussion,
      sortBy: PostSort.UPDATED_AT,
      sortOrder: SortOrder.DESC,
    } }, requestOptions);
  if (channels) {
    options.data.channels = channels;
  }
  const [csvString, { total: count }] = await Promise.all([
    exportPosts(options),
    searchPosts(Object.assign(Object.assign({}, options), { data: Object.assign(Object.assign({}, options.data), { num: 1 }) })),
  ]);
  const csvBlob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(csvBlob);
  const filename = getPostCSVFileName(entityTitle);
  downloadRemoteFile(url, filename);
  const end = Date.now();
  return {
    duration: (end - start) / 1000,
    count,
    size: csvBlob.size,
  };
}
