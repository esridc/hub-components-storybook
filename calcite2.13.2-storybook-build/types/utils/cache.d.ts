/**
 * Parameters for the `Cache` class method decorator
 */
export interface ICacheDecoratorParams {
  /**
   * An optional string used to group cache results in isolation from other scopes
   */
  scope?: string;
  /**
   * An optional number representing time-to-live for the cache entries
   */
  ttl?: number;
  /**
   * An optional function used to dynamically compute the cache key from method arguments
   */
  getKey?: (...args: any[]) => string;
}
/**
 * Parameters for the `cache` utility method
 */
export interface ICacheParams extends ICacheDecoratorParams {
  /**
   * An optional context to bind to the function being agumented with caching behavior
   */
  context?: any;
}
/**
 * A utility method to augment a method with caching behavior
 *
 * @param fn The function to augment
 * @param params An ICacheParams object
 * @returns The cache decorator function
 */
export declare function cache<T>(fn: (...args: any[]) => T, params?: ICacheParams): (...args: any[]) => T;
