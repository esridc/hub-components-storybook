import { c as checkPermission } from './checkPermission-6c5be250.js';
import { r as request } from './request-fa80ae40.js';
import { a as cloneObject } from './util-3e6872d9.js';

const FILE_FORMATS = ['csv', 'shapefile', 'geojson', 'filegdb', 'featureCollection', 'excel', 'geoPackage', 'sqlite', 'json'];
class CreateReplicaOptionsBuilder {
  constructor() {
    this._createReplicaOptions = {
      layers: '0',
      layerQueries: {
        0: { queryOption: 'all' }
      },
      returnAttachments: true,
      returnAttachmentsDataByUrl: true,
      async: true,
      syncModel: 'none',
      targetType: 'client',
      syncDirection: 'bidirectional',
      attachmentsSyncDirection: 'bidirectional',
    };
  }
  layers(layers) {
    this._createReplicaOptions.layers = layers;
    return this;
  }
  dataFormat(dataFormat) {
    this._createReplicaOptions.dataFormat = dataFormat;
    return this;
  }
  geometry(geometry) {
    // Geometry passed as reference to actual instance of the Geometry from controller:
    // packages/opendata-ui/app/datasets/dataset/explore/controller.js -> get filterGeometry()
    // However, query needs a valid ArcGIS Portal JSON representation of the geometry, which
    // is generated using the toJSON method:
    // https://developers.arcgis.com/rest/services-reference/enterprise/geometry-objects.htm
    const _geometry = (typeof geometry.toJSON === 'function')
      ? geometry.toJSON()
      : geometry;
    this._createReplicaOptions.geometry = _geometry;
    this._createReplicaOptions.geometryType = _getCreateReplicaGeometryType(geometry.type);
    this._createReplicaOptions.inSR = _geometry.spatialReference;
    return this;
  }
  layerQueries(layerQueries) {
    this._createReplicaOptions.layerQueries = layerQueries;
    return this;
  }
  build() {
    return cloneObject(this._createReplicaOptions);
  }
}
function _getCreateReplicaGeometryType(type) {
  const conversionTable = {
    point: 'esriGeometryPoint',
    multipoint: 'esriGeometryMultipoint',
    polyline: 'esriGeometryPolyline',
    polygon: 'esriGeometryPolygon',
    extent: 'esriGeometryEnvelope',
  };
  return conversionTable[type];
}
async function getDownloadUrlFromService(opts) {
  const { authentication, serviceUrl, createReplicaOptions, statusChangeEvent, pollTime = 5000, } = opts;
  const statusUrl = await _initiateCreateReplica({
    serviceUrl,
    authentication,
    createReplicaOptions
  });
  const { resultUrl, authRequired } = await _pollUntilComplete({
    statusUrl,
    authentication,
    statusChangeEvent,
    pollTime
  });
  let finalUrl = resultUrl;
  if (authRequired) {
    const token = await authentication.getToken(resultUrl);
    finalUrl = `${resultUrl}?token=${token}`;
  }
  return finalUrl;
}
async function _initiateCreateReplica(opts) {
  const { authentication, serviceUrl, createReplicaOptions, } = opts;
  const requestOptions = {
    httpMethod: 'POST',
    params: createReplicaOptions,
    authentication
  };
  const { statusUrl } = await request(`${serviceUrl}/createReplica`, requestOptions);
  return statusUrl;
}
async function _pollUntilComplete(opts) {
  const { statusUrl, authentication, statusChangeEvent, pollTime, } = opts;
  const result = await tryAuthenticatedGet(statusUrl, { authentication });
  const { authRequired } = result;
  const { status, resultUrl, recordCount = 0, error = {}, } = result.response;
  if (status === 'Failed') {
    throw Object.assign(Object.assign({}, error), { jobId: /.*\/([^?]+)/.exec(statusUrl)[1] });
  }
  statusChangeEvent.emit({ status, recordCount });
  if (status === 'Completed') {
    return { resultUrl, authRequired };
  }
  else {
    await new Promise(resolve => setTimeout(resolve, pollTime));
    return _pollUntilComplete({
      statusUrl,
      authentication,
      statusChangeEvent,
      pollTime
    });
  }
}
async function getTotalRecordCount(serviceUrl, options, authentication) {
  const { layerQueries, geometry, geometryType, inSR } = options;
  const layerDefinitions = Object.keys(layerQueries).reduce((acc, key) => {
    acc[key] =
      layerQueries[key].queryOption === 'useFilter' ? layerQueries[key].where : '1=1';
    return acc;
  }, {});
  const requestOptions = {
    // Use POST to avoid URL length limits with complex geometries
    httpMethod: 'POST',
    params: {
      f: 'json',
      returnCountOnly: true,
      spatialRel: 'esriSpatialRelIntersects',
      layerDefs: layerDefinitions,
      geometry,
      geometryType,
      inSR
    },
    authentication
  };
  const response = await request(`${serviceUrl}/query`, requestOptions);
  const totalCount = response.layers.reduce((acc, curr) => acc + curr.count, 0);
  return totalCount;
}
async function storeCreateReplicaError(hubUrl, opts) {
  try {
    const { itemId, layers, jobId, format } = opts;
    const promises = layers.split(',').map(layer => {
      const requestUrl = `${hubUrl}/api/download/v1/items/${itemId}/${layer}/jobs/${jobId}?format=${format}`;
      return fetch(requestUrl, { method: 'POST' });
    });
    await Promise.all(promises);
  }
  catch (err) {
    console.error(err);
  }
}
const shouldRecordDownloadErrors = (appContext) => {
  return checkPermission('hub:content:canRecordDownloadErrors', appContext).access;
};
/**
 * Determines whether the specified url requires authentication and makes a get request.
 *
 * This function is particularly useful when interacting with feature
 * services, since there isn't another programmatic way to determine
 * whether a feature service is public or private
 *
 * @param url
 * @param requestOptions Pass-through to request(). Must include authentication.
 *
 * @returns {ITryAuthenticatedGetResponse}
 */
async function tryAuthenticatedGet(url, requestOptions) {
  const rawResponse = await request(url, Object.assign(Object.assign({}, requestOptions), { rawResponse: true, httpMethod: 'GET' }));
  const finalUrl = new URL('', rawResponse.url); // have to pass in a base because of a safari issue (https://bugs.webkit.org/show_bug.cgi?id=216841)
  const response = await rawResponse.json();
  return {
    response,
    authRequired: finalUrl.searchParams.has('token'),
  };
}
const isString = (x) => typeof x === 'string' || x instanceof String;
const isNumberArray = (x) => {
  return Array.isArray(x) && x.every((el) => !isNaN(el));
};
const isILayerOptionsArray = (x) => {
  return Array.isArray(x) && x.every(el => !isNaN(el.id));
};
const isAGORateLimitError = (error) => error.name === 'ArcGISRequestError' && error.code === 429;
const fileFormatToDisplayName = (format) => {
  return {
    csv: "CSV",
    shapefile: "Shapefile",
    sqlite: "SQLite Geodatabase",
    geoPackage: "GeoPackage",
    filegdb: "File Geodatabase",
    featureCollection: "Feature Collection",
    geojson: "GeoJSON",
    excel: "Excel",
    json: "JSON"
  }[format];
};

export { CreateReplicaOptionsBuilder as C, FILE_FORMATS as F, isAGORateLimitError as a, getDownloadUrlFromService as b, storeCreateReplicaError as c, isNumberArray as d, isILayerOptionsArray as e, fileFormatToDisplayName as f, getTotalRecordCount as g, isString as i, shouldRecordDownloadErrors as s };
