import { r as arcgisToGeoJSON, s as getLayerIdFromUrl } from './compose-d5b83ab7.js';
import { c as cache } from './cache-4bea61e0.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import { d as downloadRemoteFile } from './download-list-38d6b571.js';
import './index-55cb25f7.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { g as getFeature, f as fetchContent } from './fetchContent-dbc662af.js';
import { p as parseDatasetId } from './slugs-7b8828d5.js';
import { S as SearchPostsFormat, C as CANNOT_DISCUSS, P as PostSort, d as SortOrder, g as getPostCSVFileName } from './utils-6bf1b713.js';
import { _ as __rest$1 } from './tslib.es6-0e03e357.js';
import { d as discussionsApiRequest } from './discussions-api-request-199cae2d.js';
import { a as getItem } from './get-f0caeb52.js';
import { a as updateItem } from './update-6a7d5697.js';
import { g as getGroup } from './get-850c466d.js';
import { u as updateGroup } from './update-26e2fbc1.js';

/**
 * search posts
 *
 * @export
 * @param {ISearchPostsParams} options
 * @return {*}  {Promise<IPagedResponse<IPost>>}
 */
function searchPosts(options) {
    const url = `/posts/search`;
    return discussionsApiRequest(url, Object.assign(Object.assign({}, options), { data: Object.assign({}, options.data), httpMethod: "POST" }));
}
/**
 * searches for posts and resolves a promise with CSV string representing the results
 *
 * @export
 * @param {IExportPostsParams} options
 * @return {*}  {Promise<string>}
 */
function exportPosts(options) {
    const url = `/posts/search`;
    return discussionsApiRequest(url, Object.assign(Object.assign({}, options), { data: Object.assign(Object.assign({}, options.data), { f: SearchPostsFormat.CSV }), httpMethod: "POST" }));
}
/**
 * create post
 *
 * @export
 * @param {ICreatePostParams} options
 * @return {*}  {Promise<IPost>}
 */
function createPost(options) {
    const url = `/posts`;
    return discussionsApiRequest(url, Object.assign({ httpMethod: "POST" }, getCreateUpdateRequestParams(options)));
}
/**
 * create reply to post
 *
 * @export
 * @param {string} parentId
 * @param {ICreateReplyParams} options
 * @return {*}  {Promise<IPost>}
 */
function createReply(options) {
    const url = `/posts/${options.postId}/reply`;
    return discussionsApiRequest(url, Object.assign({ httpMethod: "POST" }, getCreateUpdateRequestParams(options)));
}
/**
 * fetch post
 *
 * @export
 * @param {IFetchPostParams} params
 * @return {*}  {Promise<IPost>}
 */
function fetchPost(params) {
    const url = `/posts/${params.postId}`;
    params.httpMethod = "GET";
    return discussionsApiRequest(url, params);
}
/**
 * remove post
 *
 * @export
 * @param {IRemovePostParams} options
 * @return {*}  {Promise<IRemovePostResponse>}
 */
function removePost(options) {
    const url = `/posts/${options.postId}`;
    options.httpMethod = "DELETE";
    return discussionsApiRequest(url, options);
}
/**
 * update post
 * NOTE: this method currently only update post.title and post.body
 *
 * @export
 * @param {IUpdatePostParams} options
 * @return {*}  {Promise<IPost>}
 */
function updatePost(options) {
    const url = `/posts/${options.postId}`;
    return discussionsApiRequest(url, Object.assign({ httpMethod: "PATCH" }, getCreateUpdateRequestParams(options)));
}
/**
 * update post status
 * NOTE: this method will only update a post's status
 *
 * @export
 * @param {IUpdatePostStatusParams} options
 * @return {*}  {Promise<IPost>}
 */
function updatePostStatus(options) {
    const url = `/posts/${options.postId}/status`;
    options.httpMethod = "PATCH";
    return discussionsApiRequest(url, options);
}
/**
 * Builds the necessary request options for post/reply create/update requests
 * @param mentionUrl
 */
function getCreateUpdateRequestParams(params) {
    const { mentionUrl } = params, requestOptions = __rest$1(params, ["mentionUrl"]);
    if (mentionUrl) {
        requestOptions.headers = Object.assign(Object.assign({}, requestOptions.headers), { "mention-url": mentionUrl });
    }
    return requestOptions;
}

/**
 * Utility that parses a discussion URI string into its component parts
 *
 * @export
 * @param {string} discussion A discussion URI
 * @return {string}
 */
function parseDiscussionURI(discussion) {
    let url;
    try {
        url = new URL(discussion);
    }
    catch (e) {
        throw new Error(`Invalid URI: ${discussion}`);
    }
    const source = url.protocol.replace(":", "");
    const [, pathname] = discussion.split("://");
    const [type, identifier] = pathname.split("/");
    let id;
    let layer;
    if (identifier) {
        const { itemId, layerId } = parseDatasetId(identifier);
        [id, layer] = [itemId, layerId];
    }
    const searchParams = new URLSearchParams(url.search.replace("?", ""));
    const features = (searchParams.has("id") && searchParams.get("id").split(",")) || null;
    const attribute = (searchParams.has("attribute") && searchParams.get("attribute")) || null;
    return {
        source,
        type,
        id: id || null,
        layer: layer || null,
        features,
        attribute,
    };
}

// TODO: split fns, with their param interfaces, into separate files for fn.
// TODO: move remaining, common interfaces into components/arcgis-hub-discussions/types.ts
// TODO: move constants into components/arcgis-hub-discussions/constants.ts
// TODO: delete this file
var __rest = (undefined && undefined.__rest) || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
/**
 * Max post and reply title length
 */
const MAX_TITLE_LENGTH = 50;
/**
 * Max post and reply body length
 */
const MAX_BODY_LENGTH = 512;
/**
 * Warning post and reply body lengh
 */
const WARNING_BODY_LENGTH = MAX_BODY_LENGTH - 37;
const fetchAndTransformFeature = cache((url, id) => getFeature({ url, id })
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
async function fetchRelatedFeatures(url, relatedFeatureIds) {
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
const fetchContentFromCache = cache(fetchContent, {
  scope: 'content',
  ttl: 3000,
});
/**
 * Converts IPost[] to GeoJSON Feature Collection
 * @param posts An array of IPost objects
 * @returns GeoJSON Feature Collection
 */
function postsToFeatureCollection(posts) {
  const hasGeometryOrFeatures = (post) => {
    return Boolean(post.geometry || pluckDiscussionFeatureIds(post.discussion));
  };
  return {
    type: 'FeatureCollection',
    features: posts.filter(hasGeometryOrFeatures).map(postToFeatures).flat(),
  };
}
/**
 * Pulls geometry from an IPost and returns array of geojson features
 * @param post An IPost object
 * @returns Array of GeoJSON Features
 */
function postToFeatures(post) {
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
function featuresToGeometryCollection(features) {
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
/**
 * Create discussion URI given existing discussion URI and additional spatial identifiers
 * @param discussion The original discussion URI
 * @param layerId
 * @param featureId
 * @returns Discussions URI assocaited with an individual feature
 */
function augmentDiscussionURIWithFeature(discussion, layerId, featureIds) {
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
/**
 * If discussion is associated with a feature, it will return the ID of the first feature
 * @param discussion Discussion URI
 * @returns ID of first feature for discussion
 */
function pluckDiscussionFeatureIds(discussion) {
  if (!discussion) {
    return;
  }
  const { features } = parseDiscussionURI(discussion);
  if (features) {
    return features;
  }
}
/**
 * Determines if IHubContent layer displayField id valid.  A valid displayField
 * should not be empty or identical the objectId field.
 * @param content IHubContent
 * @returns True if IHubContent layer has valid displayField
 */
const hasValidDisplayField = (content) => {
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
function convertGeometryTypeToTelemetryString({ type }) {
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
async function updateDiscussable(options) {
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
function determineChannelOwner(channel, channelGroups) {
  const accessibleGroups = channelGroups.filter(Boolean);
  const channelOwnerOwnsGroup = (group) => group.owner === channel.creator;
  const doesChannelOwnerOwnGroups = accessibleGroups.some(channelOwnerOwnsGroup);
  const updatedChannelOwnerGroup = doesChannelOwnerOwnGroups
    ? null
    : accessibleGroups.find(group => !channelOwnerOwnsGroup(group));
  return (updatedChannelOwnerGroup === null || updatedChannelOwnerGroup === void 0 ? void 0 : updatedChannelOwnerGroup.owner) || channel.creator;
}
function getChannelName(channel, channelGroups, fallback) {
  var _a, _b, _c;
  return (_c = (_a = channel === null || channel === void 0 ? void 0 : channel.name) !== null && _a !== void 0 ? _a : (_b = channelGroups === null || channelGroups === void 0 ? void 0 : channelGroups.filter(group => group)[0]) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : fallback;
}
async function downloadPostCSV({ entityTitle, discussion, channels, requestOptions }) {
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

export { MAX_TITLE_LENGTH as M, WARNING_BODY_LENGTH as W, fetchAndTransformFeature as a, postsToFeatureCollection as b, postToFeatures as c, downloadPostCSV as d, convertGeometryTypeToTelemetryString as e, fetchContentFromCache as f, getChannelName as g, hasValidDisplayField as h, fetchPost as i, updatePostStatus as j, augmentDiscussionURIWithFeature as k, featuresToGeometryCollection as l, createPost as m, determineChannelOwner as n, updatePost as o, parseDiscussionURI as p, MAX_BODY_LENGTH as q, removePost as r, searchPosts as s, createReply as t, updateDiscussable as u, pluckDiscussionFeatureIds as v, fetchRelatedFeatures as w };
