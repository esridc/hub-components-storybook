/**
 * TODO: This should be hoisted to hub-common.
 *
 * Util to merge two objects deeply. Will merge the source object into the target object.
 * If replace is false, it will not replace the target value with the source value if the target value is already set.
 *
 * Note: This does not merge two arrays, it only replaces them (i.e. [1, 2] and [3, 4] would become [3, 4]). Objects will be deeply merged instead of immediately replaced.
 *
 * adapted from https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6?permalink_comment_id=3120712#gistcomment-3120712
 * @param target - the object to merge into
 * @param source - the object to merge from
 * @returns the merged object
 */
export const mergeDeep = (target, source) => {
  const isObject = (obj) => obj && typeof obj === 'object' && !Array.isArray(obj);
  if (!isObject(target) || !isObject(source)) {
    return source;
  }
  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];
    // if object, recursive check
    if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    }
    // if anything else, set value if we should
    // this includes arrays -- we do not merge arrays, we only replace them
    else {
      target[key] = sourceValue;
    }
  });
  return target;
};
