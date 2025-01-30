'use strict';

/**
 * A decorator factory function that accepts the minPromiseDelay decorator
 * configuration params
 * @param options An IMinPromiseDelayOptions object
 * @returns minPromiseDelay decorator
 */
function minPromiseDelayFactory(options) {
  const { delay } = options;
  if (!Number.isInteger(delay) || delay < 0) {
    throw new Error('delay must be a positive integer');
  }
  /**
   * A decorator function that augments a class method with an artificially imposed wait/delay so
   * that the promise is guaranteed to resolve/reject after a minimum amount of time has ellapsed.
   */
  return (_target, _name, descriptor) => {
    const { value: original } = descriptor;
    const value = async function minPromiseDelay(...args) {
      const delayPromise = new Promise(resolve => setTimeout(resolve, delay));
      const resultPromise = original.apply(this, args);
      return delayPromise.then(() => resultPromise);
    };
    return Object.assign(Object.assign({}, descriptor), { value });
  };
}

exports.minPromiseDelayFactory = minPromiseDelayFactory;
