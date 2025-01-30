'use strict';

/**
 * A util to debounce another function. It will return a function
 * that, as long as it continues to be invoked, will not be triggered
 * until the designated timeout has passed.
 */
function debounce(fn, timeout = 300) {
  let timeoutId;
  return function (context, ...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(context, args), timeout);
  };
}

function DebounceDecoratorFactory(params) {
  function DebounceDecorator(_target, propertyKey, descriptor) {
    const { value: original } = descriptor;
    const debouncedKey = `${propertyKey.toString()}Debounced`;
    const value = function (...args) {
      if (!this[debouncedKey]) {
        Object.defineProperty(this, debouncedKey, {
          value: debounce(original, params.timeout),
        });
      }
      this[debouncedKey](this, ...args);
    };
    return Object.assign(Object.assign({}, descriptor), { value });
  }
  return DebounceDecorator;
}

exports.DebounceDecoratorFactory = DebounceDecoratorFactory;
