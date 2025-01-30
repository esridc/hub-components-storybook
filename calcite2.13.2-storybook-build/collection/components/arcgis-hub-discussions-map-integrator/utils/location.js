import { PostRelation, PostSort, SortOrder, searchPosts } from '@esri/hub-discussions';
import { postsToFeatureCollection } from '../../arcgis-hub-discussions/utils/discussions';
// A world geometry object for filtering to any extent
const geometry = {
  type: 'Polygon',
  coordinates: [
    [
      [180, -90],
      [180, 90],
      [-180, 90],
      [-180, -90],
      [180, -90],
    ],
  ],
};
/**
 * A wait function for thottling
 * @param ms Time in MilliSeconds
 */
const wait = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
/**
 * Dynamically calculates a throttle wait time in MilliSeconds to reduce load
 * on Discussions API
 * @param totalResults The total number of results to fetch
 * @param batchSize The number of results per request
 * @param totalWaitTime The total cumulative wait time for all requests to be fired
 * @param numRequestsThreshold The max number of requests to allow at dynamice throttle.  If number
 * of requests exceed this threshold, all requests will be thottled to fixed 500ms.
 * @returns Dynamic thottle time in MilliSeconds
 */
export const getThrottleMS = (totalResults, batchSize, totalWaitTime, numRequestsThreshold, thresholdExceededWaitTime) => {
  const numRequests = Math.ceil(totalResults / batchSize);
  if (numRequests > numRequestsThreshold) {
    console.warn(`Discussions requests exceeds desired threshold, throttling to ${thresholdExceededWaitTime}ms per batch.`);
    return thresholdExceededWaitTime;
  }
  return totalWaitTime / numRequests;
};
/**
 *
 * @param discussion Discussion URI
 * @param hubRequestOptions IHubRequestOptions (serialized)
 * @param token Token
 * @param batchSize Total number of results per paginated post request (Default: 10)
 * @param throttle Optional throttling of requests (Default: true)
 * @returns
 */
export const getPostsWithLocation = async (searchParams, hubRequestOptions, batchSize = 10, throttle = true) => {
  const _searchPosts = async (params) => {
    var _a;
    const start = (_a = params.start) !== null && _a !== void 0 ? _a : 1;
    const options = Object.assign({ data: Object.assign({ num: batchSize, relations: [PostRelation.REPLIES], sortBy: PostSort.UPDATED_AT, sortOrder: SortOrder.DESC, start }, params) }, hubRequestOptions);
    const result = searchPosts(options);
    if (start === 1) {
      // first request must be synchronous to get total
      const { total } = await result;
      let nextStart = start + batchSize;
      const results = [result];
      const throttleMS = throttle ? getThrottleMS(total, batchSize, 2500, 10, 250) : 0;
      while (nextStart <= total) {
        await wait(throttleMS);
        results.push(...(await _searchPosts(Object.assign(Object.assign({ geometry }, params), { start: nextStart }))));
        nextStart = nextStart + batchSize;
      }
      return results;
    }
    return [result];
  };
  try {
    const pagedResponses = await Promise.all([
      // posts with related features
      ...(await _searchPosts(Object.assign(Object.assign({}, searchParams), { discussion: `${searchParams.discussion}%?id=%` }))),
      // posts with geometry
      ...(await _searchPosts(Object.assign(Object.assign({}, searchParams), { geometry, discussion: `${searchParams.discussion}%` }))),
    ]);
    const uniquePostIds = [];
    const posts = pagedResponses
      .map(({ items }) => items)
      .flat()
      .filter(post => {
      if (!uniquePostIds.includes(post.id)) {
        uniquePostIds.push(post.id);
        return true;
      }
      return false;
    });
    return postsToFeatureCollection(posts);
  }
  catch (error) {
    const { message } = error;
    console.error('Could not fetch on-map discussions:', message);
  }
};
