'use strict';

const generateRandomString = require('./generate-random-string-8807d629.js');
const getProp = require('./get-prop-4bd8fc1a.js');

/**
 * A decorator factory function that augments a getter method with caching behavior
 * based on triple-equals comparison of other class member values. The factory accepts
 * zero or more path strings that represent the values to observe for changes. When any
 * of those values change, the underlying getter method will be invoked and it's newly
 * computed value returned vs the previously cached value. Since this decorator uses
 * triple-equals comparison, mutating existing Arrays and other Objects will not trigger
 * a new computation. If you need a the value to be recomputed when observing Arrays
 * or Objects, make sure the observed member(s) is/are updated to a new Arrays or Objects.
 *
 * Example usage:
 * class MyComponent {
 *   @State() usernames = ['user1', 'user2'];
 *
 *   handleAddUsername(username: string) {
 *     // creating a new array here causes `joined` to recompute below
 *     this.usernames = [...this.usernames, username];
 *   }
 *
 *   @Memoize('usernames')
 *   get joined (): string {
 *     // only re-runs when `usernames` array changes to a new array
 *     return this.usernames.join(', ');
 *   }
 *
 *   render() {
 *     {this.joined}
 *   }
 * }
 *
 * @param pathsToWatch An optional array of paths to observe for changes
 * @returns A property descriptor that augments a getter with caching behavior
 */
function MemoizeDecoratorFactory(...pathsToWatch) {
  function MemoizeDecorator(_target, _propertyKey, descriptor) {
    const { get: getter } = descriptor;
    const cacheId = generateRandomString.generateRandomString(32);
    const get = function MemoizeDecorator() {
      // multiple getters can be memoized on any class, conditionally create
      // the _memoizeCache member only if one has not already been created
      if (!this.hasOwnProperty('_memoizeCache')) {
        this._memoizeCache = {};
      }
      const compute = () => {
        const value = getter.call(this);
        const previousPathValues = pathsToWatch.reduce((acc, pathToWatch) => (Object.assign(Object.assign({}, acc), { [pathToWatch]: getProp.getProp(this, pathToWatch) })), {});
        this._memoizeCache[cacheId] = { previousPathValues, value };
        return value;
      };
      // values previously computed
      if (this._memoizeCache[cacheId]) {
        const shouldRecompute = pathsToWatch.some(pathToWatch => this._memoizeCache[cacheId].previousPathValues[pathToWatch] !== getProp.getProp(this, pathToWatch));
        return shouldRecompute ? compute() : this._memoizeCache[cacheId].value;
      }
      else {
        // compute values
        return compute();
      }
    };
    return Object.assign(Object.assign({}, descriptor), { get });
  }
  return MemoizeDecorator;
}

exports.MemoizeDecoratorFactory = MemoizeDecoratorFactory;
