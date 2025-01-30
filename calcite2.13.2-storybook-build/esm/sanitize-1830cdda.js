import { S as Sanitizer } from './index-55cb25f7.js';

/**
 * A decorator factory function that accepts the auto link decorator configuration params
 *
 * @returns The cache decorator function
 */
function SanitizeDecoratorFactory(options) {
  const sanitizer = new Sanitizer(options === null || options === void 0 ? void 0 : options.filterOptions, options === null || options === void 0 ? void 0 : options.extendDefaults);
  /**
   * A decorator function that augments a class method with a sanitizing transformation
   *
   * @param _target A reference to the class prototype
   * @param _propertyKey The name of the method being decorated
   * @param descriptor A PropertyDescriptor for the method being decorated
   * @returns A new PropertyDescriptor that aguments the decorated method with sanitizing behavior
   */
  function SanitizeDecorator(_target, _propertyKey, descriptor) {
    const { get: original } = descriptor;
    const get = function Sanitize() {
      const result = original.call(this);
      return sanitizer.sanitize(result);
    };
    return Object.assign(Object.assign({}, descriptor), { get });
  }
  return SanitizeDecorator;
}

export { SanitizeDecoratorFactory as S };
