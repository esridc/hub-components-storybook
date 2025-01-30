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
export declare const mergeDeep: (target: Record<string, any>, source: Record<string, any>) => any;
