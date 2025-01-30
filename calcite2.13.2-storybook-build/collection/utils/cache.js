/**
 * The cache
 */
const _cache = new Map();
/**
 * A utility method to augment a method with caching behavior
 *
 * @param fn The function to augment
 * @param params An ICacheParams object
 * @returns The cache decorator function
 */
export function cache(fn, params = {}) {
  const { scope = 'default', // defaults to `default` cache scope
  getKey = (...[first]) => first, // defaults to first method argument
  ttl = 0 // defaults to indefinite caching,
   } = params;
  if (!scope || typeof scope !== 'string') {
    throw new TypeError('must provide a valid cache scope');
  }
  if (ttl && (typeof ttl !== 'number' || ttl < 0)) {
    throw new TypeError('ttl must be a number greater than or equal to zero');
  }
  if (typeof getKey !== 'function') {
    throw new TypeError('getKey must be a function');
  }
  /**
   * A function that wraps a functions implementation
   * with caching behavior.
   *
   * @remarks
   *
   * We could utilize the [Cache Web API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) to do request-level caching, but it
   * requires event assignment and garbage collection which would be more
   * appropriately handled in component lifecycle methods. Stencil does not
   * currently support class-level decorators or class inheritiance, but
   * [Stencil.js issue #2921](https://github.com/ionic-team/stencil/pull/2921) proposes adding a `Mixin` decorator that would
   * allow similar compositional patterns. If the `Mixin` decorator comes to
   * fruition, we can revisit this client caching strategy.
   *
   * @param args An array of method arguments
   * @returns A cached result
   */
  return function (...rawArgs) {
    let args;
    try {
      const [lastArg, ...restArgsReversed] = [...rawArgs].reverse();
      const [key, ...restKeys] = Object.keys(lastArg);
      const isCacheArg = key === 'bust' && !restKeys.length;
      if (!isCacheArg) {
        throw new Error('No cache arg provided');
      }
      args = restArgsReversed.reverse();
    }
    catch (e) {
      args = rawArgs;
    }
    const { context = this } = params;
    let scopeMap = _cache.get(scope);
    // when the scope doesn't already exist
    if (!scopeMap) {
      // create it
      scopeMap = new Map();
      _cache.set(scope, scopeMap);
    }
    // derive the cache key
    const key = getKey.apply(context, args);
    if (!key || typeof key !== 'string') {
      throw new Error('getKey must return a string');
    }
    // check for hits in the cache if bust param not received
    let cacheResult = rawArgs.length === args.length
      ? scopeMap.get(key)
      : undefined;
    const now = Date.now();
    // if no hits in the cache for the key OR the ttl is > 0
    // and the ttl has expired
    if (!cacheResult || (ttl && now > cacheResult.created + ttl)) {
      // create a new cache result
      cacheResult = {
        created: now,
        result: fn.apply(context, args)
      };
      scopeMap.set(key, cacheResult);
    }
    return cacheResult.result;
  };
}
