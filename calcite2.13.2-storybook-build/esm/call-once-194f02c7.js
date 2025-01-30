/**
 * A decorator factory function for the callOnce decorator
 *
 * @returns The callOnce decorator function
 */
function callOnceFactory() {
  /**
   * A decorator function that augments a class method with functionality that ensures it is only ever called once.
   *
   * @param target A reference to the class prototype
   * @param propertyKey The name of the method being decorated
   * @param descriptor A PropertyDescriptor for the method being decorated
   * @returns A new PropertyDescriptor that aguments the decorated method with functionality that ensures it is only ever called once.
   */
  function callOnce(target, propertyKey, descriptor) {
    // reference to the decorated function
    const { value: original } = descriptor;
    // companion prop to track if the decorated function has been called
    const companionCalledKey = `_${propertyKey}Called`;
    Object.defineProperty(target, companionCalledKey, {
      writable: true,
      value: false
    });
    // companion prop to cache the return value of the decorated function
    const companionCacheKey = `_${propertyKey}Cache`;
    Object.defineProperty(target, companionCacheKey, {
      writable: true
    });
    // decorator method, calls decorated method only once, subsequent
    // calls to decorator method return cached
    const value = function callOnce(...args) {
      if (!this[companionCalledKey]) {
        this[companionCalledKey] = true;
        this[companionCacheKey] = original.apply(this, args);
      }
      return this[companionCacheKey];
    };
    return Object.assign(Object.assign({}, descriptor), { value });
  }
  return callOnce;
}

export { callOnceFactory as c };
