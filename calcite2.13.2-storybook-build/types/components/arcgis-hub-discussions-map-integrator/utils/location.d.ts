import { IHubRequestOptions, ISearchPosts } from '@esri/hub-common';
import { FeatureCollection } from 'geojson';
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
export declare const getThrottleMS: (totalResults: number, batchSize: number, totalWaitTime: number, numRequestsThreshold: number, thresholdExceededWaitTime: number) => number;
/**
 *
 * @param discussion Discussion URI
 * @param hubRequestOptions IHubRequestOptions (serialized)
 * @param token Token
 * @param batchSize Total number of results per paginated post request (Default: 10)
 * @param throttle Optional throttling of requests (Default: true)
 * @returns
 */
export declare const getPostsWithLocation: (searchParams: Pick<ISearchPosts, "channels" | "discussion">, hubRequestOptions: IHubRequestOptions, batchSize?: number, throttle?: boolean) => Promise<FeatureCollection>;
