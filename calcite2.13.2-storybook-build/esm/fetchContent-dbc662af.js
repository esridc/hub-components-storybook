import { _ as __rest } from './tslib.es6-9c17e83a.js';
import { _ as __assign, g as getEnrichmentErrors, f as fetchItemEnrichments } from './_enrichments-8641475c.js';
import { a as cloneObject, i as isNil } from './util-3e6872d9.js';
import { p as parseDatasetId, i as isSlug, a as addContextToSlug } from './slugs-7b8828d5.js';
import { h as hubApiRequest } from './request-3e386aeb.js';
import { i as isMapOrFeatureServerUrl } from './index-edff2d62.js';
import { a as includes, n as normalizeItemType, l as composeContent, m as canUseHubApiForItem, o as getItemLayer, p as getProxyUrl } from './compose-d5b83ab7.js';
import { g as getFamily } from './get-family-543fac52.js';
import { r as request } from './request-fa80ae40.js';
import { c as cleanUrl } from './clean-url-dff2b6ee.js';
import { a as appendCustomParams } from './append-custom-params-4bd856e5.js';
import { p as parseServiceUrl } from './helpers-8c7e5e31.js';
import { g as getLayer } from './getLayer-464ff70e.js';
import { a as getItem } from './get-f0caeb52.js';

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { getFeature } from '@esri/arcgis-rest-feature-layer';
 * //
 * const url = "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0";
 * //
 * getFeature({
 *   url,
 *   id: 42
 * }).then(feature => {
 *  console.log(feature.attributes.FID); // 42
 * });
 * ```
 * Get a feature by id.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the feature or the [response](https://developer.mozilla.org/en-US/docs/Web/API/Response) itself if `rawResponse: true` was passed in.
 */
function getFeature(requestOptions) {
    var url = cleanUrl(requestOptions.url) + "/" + requestOptions.id;
    // default to a GET request
    var options = __assign({ httpMethod: "GET" }, requestOptions);
    return request(url, options).then(function (response) {
        if (options.rawResponse) {
            return response;
        }
        return response.feature;
    });
}
/**
 * ```js
 * import { queryFeatures } from '@esri/arcgis-rest-feature-layer';
 * //
 * queryFeatures({
 *   url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3",
 *   where: "STATE_NAME = 'Alaska'"
 * })
 *   .then(result)
 * ```
 * Query a feature service. See [REST Documentation](https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the query response.
 */
function queryFeatures(requestOptions) {
    var queryOptions = appendCustomParams(requestOptions, [
        "where",
        "objectIds",
        "relationParam",
        "time",
        "distance",
        "units",
        "outFields",
        "geometry",
        "geometryType",
        "spatialRel",
        "returnGeometry",
        "maxAllowableOffset",
        "geometryPrecision",
        "inSR",
        "outSR",
        "gdbVersion",
        "returnDistinctValues",
        "returnIdsOnly",
        "returnCountOnly",
        "returnExtentOnly",
        "orderByFields",
        "groupByFieldsForStatistics",
        "outStatistics",
        "returnZ",
        "returnM",
        "multipatchOption",
        "resultOffset",
        "resultRecordCount",
        "quantizationParameters",
        "returnCentroid",
        "resultType",
        "historicMoment",
        "returnTrueCurves",
        "sqlFormat",
        "returnExceededLimitFeatures",
        "f"
    ], {
        httpMethod: "GET",
        params: __assign({ 
            // set default query parameters
            where: "1=1", outFields: "*" }, requestOptions.params)
    });
    return request(cleanUrl(requestOptions.url) + "/query", queryOptions);
}

/**
 * concat an array of arrays
 * excluding any elements of the top level array
 * that are not actually arrays
 * @param arrays An array of arrays
 * @returns concatenated array
 * @private
 */
const maybeConcat = (arrays) => {
    const result = [].concat.apply([], arrays.filter(Array.isArray));
    return result.length ? result : undefined;
};

// TODO: need to fetch data for client-side layer views as well
// determine if we should fetch data for an item
const shouldFetchData = (item) => {
    const type = normalizeItemType(item);
    const family = getFamily(type);
    const dataFamilies = ["template", "solution"];
    const dataTypes = [
        // needed for web map/scene definition
        "Web Map",
        "Web Scene",
        // needed for popup template definition
        "Feature Service",
    ];
    return includes(dataFamilies, family) || includes(dataTypes, type);
};
/**
 * get the default list of enrichments to fetch for content
 * @param item
 * @returns the default list of enrichments to fetch for content
 * @private
 */
const getContentEnrichments = (item) => {
    // we fetch these enrichments for all content types
    const enrichments = [
        "groupIds",
        "metadata",
        "ownerUser",
        "org",
    ];
    // we only fetch data for certain content
    if (shouldFetchData(item)) {
        enrichments.push("data");
    }
    // we fetch server and layers for map and feature services
    return isMapOrFeatureServerUrl(item.url)
        ? enrichments.concat("server", "layers")
        : enrichments;
};
// build up request options to only include the above enrichments
// that we fetch from the Hub API, and to optionally filter by slug
const getHubEnrichmentsOptions = (requestOptions, slug) => {
    const opts = cloneObject(requestOptions);
    opts.params = Object.assign(Object.assign({}, opts.params), { 
        // TODO: we should fetch errors too
        // TODO: stop fetching recordCount at next breaking change
        "fields[datasets]": "slug,boundary,extent,recordCount,searchDescription,statistics" });
    if (slug) {
        opts.params["filter[slug]"] = slug;
    }
    return opts;
};
// extract the ids and enrichments from the Hub API response
const getDatasetEnrichments = (dataset) => {
    const { itemId, layerId: layerIdString } = parseDatasetId(dataset.id);
    const layerId = layerIdString && parseInt(layerIdString, 10);
    const { slug, boundary, extent, recordCount, searchDescription, statistics } = dataset.attributes;
    return {
        itemId,
        layerId,
        slug,
        boundary,
        extent,
        recordCount,
        searchDescription,
        statistics,
    };
};
/**
 * fetch enrichment from the Hub API by slug
 * @param slug
 * @param requestOptions
 * @returns enrichments from the Hub API (slug, boundary, statistic, etc)
 * @private
 */
const fetchHubEnrichmentsBySlug = async (slug, requestOptions) => {
    // NOTE: we don't catch errors here b/c
    // searching by slug is the first step in fetchContent()
    // and if this fails, we don't have an id to fall back on
    const response = await hubApiRequest(`/datasets`, getHubEnrichmentsOptions(requestOptions, slug));
    return getDatasetEnrichments(response.data[0]);
};
/**
 * fetch enrichment from the Hub API by id
 * @param slug
 * @param requestOptions
 * @returns enrichments from the Hub API (slug, boundary, statistic, etc)
 * @private
 */
const fetchHubEnrichmentsById = async (hubId, requestOptions) => {
    try {
        const response = await hubApiRequest(`/datasets/${hubId}`, getHubEnrichmentsOptions(requestOptions));
        return getDatasetEnrichments(response.data);
    }
    catch (e) {
        // dataset record not found, just log the error
        // b/c we can still look up the item and enrichments by id
        return { errors: getEnrichmentErrors(e) };
    }
};

const hasFeatures = (contentType) => ["Feature Layer", "Table"].includes(contentType);
const maybeFetchLayerEnrichments = async (itemAndEnrichments, options) => {
    const { item } = itemAndEnrichments;
    let { layers } = itemAndEnrichments;
    let layer = layers && getItemLayer(item, layers, options && options.layerId);
    // TODO: Remove once we stop supporting ArcGIS Servers below version 10.5.
    // The /layers endpoint of some earlier servers return layers and tables
    // without certain critical properties, such as type. If this is the case,
    // fetch the fully hydrated target layer and stab it onto the layers array.
    // See https://devtopia.esri.com/dc/hub/issues/3488 for more details
    if (layer && !layer.type) {
        const layerUrl = parseServiceUrl(item.url) + "/" + layer.id;
        const getLayerOptions = Object.assign({ url: layerUrl }, options); // works whether options is defined or not
        layer = await getLayer(getLayerOptions);
        layers = layers.map((unhydratedLayer) => {
            return unhydratedLayer.id === layer.id ? layer : unhydratedLayer;
        });
    }
    return Object.assign(Object.assign({}, itemAndEnrichments), { layers });
};
const fetchItemAndEnrichments = async (itemId, options) => {
    // fetch the item
    const item = await getItem(itemId, options);
    // The Hub Application expects the item url of proxied CSVs to point to the
    // proxying feature service. Stabbing it on here maintains that consistency
    // and also helps us fetch and calculate the correct reference layer
    item.url = getProxyUrl(item, options) || item.url;
    // fetch the enrichments
    const enrichmentsToFetch = (options === null || options === void 0 ? void 0 : options.enrichments) || getContentEnrichments(item);
    const enrichments = await fetchItemEnrichments(item, enrichmentsToFetch, options);
    return maybeFetchLayerEnrichments(Object.assign(Object.assign({}, enrichments), { item }), options);
};
const fetchContentById = async (hubId, options) => {
    // start by fetching the item and item enrichments
    const { itemId } = parseDatasetId(hubId);
    const _a = await fetchItemAndEnrichments(itemId, options), { item } = _a, itemEnrichments = __rest(_a, ["item"]);
    // did the caller request a specific layer
    const specifiedLayerId = options && options.layerId;
    // if this is a public item and we're not in enterprise
    // fetch the slug and remaining enrichments from the Hub API
    // const { slug, layerId, boundary, extent, searchDescription, statistics } =
    const hubEnrichments = canUseHubApiForItem(item, options)
        ? await fetchHubEnrichmentsById(hubId, options)
        : {};
    const layerId = hubEnrichments.layerId;
    // return a new content object composed from the item and enrichments we fetched
    return composeContent(item, Object.assign(Object.assign(Object.assign({ requestOptions: options }, itemEnrichments), hubEnrichments), { 
        // prefer specified layer id if any
        layerId: isNil(specifiedLayerId) ? layerId : specifiedLayerId, 
        // merge error arrays
        errors: maybeConcat([itemEnrichments.errors, hubEnrichments.errors]) }));
};
const fetchContentBySlug = async (fullyQualifiedSlug, options) => {
    // we only have a slug, not an item id, so we start by
    // fetching the item id (and enrichments) from the Hub API
    // NOTE: if we are in enterprise this will throw an error
    let hubEnrichments = await fetchHubEnrichmentsBySlug(fullyQualifiedSlug, options);
    const { itemId } = hubEnrichments;
    let { layerId } = hubEnrichments;
    // now we can fetch the item and item enrichments
    const _a = await fetchItemAndEnrichments(itemId, options), { item } = _a, itemEnrichments = __rest(_a, ["item"]);
    // did the caller request a specific layer
    const specifiedLayerId = options && options.layerId;
    if (!isNil(specifiedLayerId) && specifiedLayerId !== layerId) {
        // we fetched Hub enrichments by slug for another record,
        // most likely the record for the parent service of this layer,
        // so we need to fetch them for the specified layer instead
        layerId = specifiedLayerId;
        hubEnrichments = Object.assign(Object.assign({}, hubEnrichments), (await fetchHubEnrichmentsById(`${itemId}_${layerId}`, options)));
    }
    return composeContent(item, Object.assign(Object.assign(Object.assign({ requestOptions: options }, itemEnrichments), hubEnrichments), { layerId, 
        // Note that we are not extracting the slug for the specified layer.
        // It seems that the old client composer code always populated the slug
        // field with the slug that was passed into the function (typically the
        // slug of the parent service). To maintain parity, we do the same here.
        //
        // TODO: should we prefer the slug of the fetched layer instead?
        // return a new content object composed from the item and enrichments we fetched
        slug: fullyQualifiedSlug, 
        // merge error arrays
        errors: maybeConcat([itemEnrichments.errors, hubEnrichments.errors]) }));
};
const fetchContentRecordCount = async (content, requestOptions) => {
    const { url, viewDefinition } = content;
    const where = viewDefinition === null || viewDefinition === void 0 ? void 0 : viewDefinition.definitionExpression;
    try {
        const response = await queryFeatures(Object.assign(Object.assign({}, requestOptions), { url,
            where, returnCountOnly: true }));
        return response.count;
    }
    catch (_a) {
        // swallow the error and return Infinity as a flag that the caller can act on
        // NOTE: this is what the -ui app currently expects, see:
        // https://github.com/ArcGIS/opendata-ui/blob/300601918eb2dee79a89314880541ecd60f21e68/packages/opendata-ui/app/utils/composer.js#L273-L279
        // however, we should probably push the error message into content.errors instead
        return Infinity;
    }
};
/**
 * Fetch enriched content from the Portal and Hub APIs.
 * @param identifier content slug or id
 * @param options Request options with additional options to control how the content or enrichments are fetched
 * @returns A content object composed of the backing item and enrichments
 *
 * ```js
 * import { fetchContent } from '@esri/hub-common'
 * // fetch content by slug
 * const content = await fetchContent('my-org::item-name')
 * ```
 */
const fetchContent = async (identifier, options) => {
    const content = isSlug(identifier)
        ? await fetchContentBySlug(addContextToSlug(identifier, options === null || options === void 0 ? void 0 : options.siteOrgKey), options)
        : await fetchContentById(identifier, options);
    // fetch record count for content that has features (e.g. layers, tables, or proxied CSVs)
    const { layer, type } = content;
    // it's too expensive to always fetch the live record count up front
    // in order to avoid a breaking change, we're including the cached recordCount
    // in the list of enrichments we fetch from the Hub API and using that
    // and only fetching the live record count in cases where we don't have that
    // TODO: fetchContent() should NOT fetch record count in the next breaking change
    const canQuery = !!layer && hasFeatures(type);
    content.recordCount =
        canQuery && (isNil(content.recordCount) || content.viewDefinition)
            ? // no cached count, or this is client-side layer view, fetch the count
                await fetchContentRecordCount(content, options)
            : content.recordCount;
    return content;
};

export { fetchContent as f, getFeature as g, queryFeatures as q };
