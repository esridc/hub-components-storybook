'use strict';

/**
 * Checks if the provided value is `null` or `undefined`.
 * copied from https://github.com/lodash/lodash/blob/d35a9c40beb594d09814ba7f7673b81d4d67a816/lodash.isnil/index.js#L30-L32
 */
function isNil(value) {
  return value == null;
}

exports.isNil = isNil;
