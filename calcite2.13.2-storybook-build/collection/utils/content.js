// I don't know why, but standardx is flagging these interfaces as unused
// despite them being used... suppressing these false positives
/* eslint-disable-next-line no-unused-vars */
import { getItem, updateItem } from '@esri/arcgis-rest-portal';
import { bBoxToExtent, isBBox } from '@esri/hub-common';
import { cloneObject, buildUrl, getHubApiUrl } from '@esri/hub-common';
export const getItemExtent = (item) => {
  const extent = item.extent;
  return isBBox(extent)
    ? Object.assign(Object.assign({}, bBoxToExtent(extent)), { type: 'extent' })
    : undefined;
};
/**
 * Given a content generate an array of sources to use with arcgis-boundary-picker-ui
 * @param content
 * @returns
 */
export const getContentBoundarySources = (content) => {
  var _a;
  const item = content === null || content === void 0 ? void 0 : content.item;
  const selectedSource = (_a = item === null || item === void 0 ? void 0 : item.properties) === null || _a === void 0 ? void 0 : _a.boundary;
  // NOTE: we are relying on the default labels
  const _sources = [
    {
      value: 'none',
      selected: selectedSource === 'none'
    }
  ];
  if (item) {
    const geometry = getItemExtent(item);
    const graphic = geometry && {
      geometry
      // NOTE: we're relying on the default symbol
    };
    _sources.push({
      value: 'item',
      graphic,
      selected: selectedSource === 'item'
    });
  }
  return _sources;
};
// TODO: move this to Hub.js
/**
 * Update a content's boundary
 *
 * @param item
 * @param boundary
 * @param requestOptions
 * @returns
 */
export const updateContentBoundary = async (content, source, requestOptions) => {
  var _a;
  // TODO: fetch the item to ensure these aren't stale
  // first update the item's properties
  const { id, owner, properties } = content.item;
  const boundary = source.value;
  const options = Object.assign({ item: {
      id,
      owner,
      properties: Object.assign(Object.assign({}, properties), { boundary })
    }, authentication: requestOptions.authentication }, requestOptions);
  // determine if we need to update extent too
  const graphic = source.graphic;
  // TODO: we should also check if the geometry was updated
  if (graphic && boundary === 'item') {
    const { xmin, ymin, xmax, ymax } = graphic.geometry;
    options.item.extent = `${xmin}, ${ymin}, ${xmax}, ${ymax}`;
  }
  const response = await updateItem(options);
  // NOTE: skip calling patch endpoint until we resolve:
  // https://devtopia.esri.com/dc/hub/issues/1311#issuecomment-3223784
  // const shouldUpdateHubApi = content.access === 'public' && !requestOptions.isPortal
  const shouldUpdateHubApi = false;
  if (shouldUpdateHubApi) {
    // also call Hub API boundary endpoint for public content
    // NOTE: boundary endpoint can't accept a slug, so we get hubId
    const hubId = content.hubId || content.id;
    // NOTE: we can't use hubApiRequest b/c it puts params (i.e. token)
    // in body for non-GET requests, so we hand-roll a fetch here
    const token = (_a = requestOptions.authentication) === null || _a === void 0 ? void 0 : _a.token;
    const route = `datasets/${hubId}/boundaries/${boundary}/activate`;
    const url = buildUrl({
      host: getHubApiUrl(options),
      path: `/api/v3/${route}`.replace(/\/\//g, "/"),
      query: { token }
    });
    await fetch(url, { method: 'PATCH' });
    // TODO: verify response code 202?
  }
  // return a copy of the content w/ the updated item
  // TODO: use new setContentBoundary()
  const _content = cloneObject(content);
  _content.item = await getItem(response.id, requestOptions);
  return _content;
};
