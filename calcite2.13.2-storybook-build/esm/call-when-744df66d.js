/**
 * A method decorator factory function for the callWhen decorator
 * @param params An ICallWhenDecoratorParams object
 * @returns The callWhen method decorator function
 */
function CallWhenFactory(params) {
  /**
   * A decorator function that conditionally call a method if when function returns truthy
   *
   * @param _target A reference to the class prototype
   * @param _propertyKey The name of the method being decorated
   * @param descriptor A PropertyDescriptor for the method being decorated
   * @returns A new PropertyDescriptor that aguments the decorated method with conditional call behavior
   */
  function callWhen(_target, _propertyKey, descriptor) {
    const { value: original } = descriptor;
    const { when } = params;
    const value = function callWhen(...args) {
      const isTruthy = when.apply(this, args);
      if (isTruthy) {
        // when() condition passed, so call method
        return original.apply(this, args);
      }
    };
    return Object.assign(Object.assign({}, descriptor), { value });
  }
  return callWhen;
}

export { CallWhenFactory as C };
