import { autoLink } from '../utils/string';
/**
 * A decorator factory function that accepts the auto link decorator configuration params
 *
 * @returns The cache decorator function
 */
export default function AutoLinkDecoratorFactory(options) {
  /**
   * A decorator function that augments a class method with an auto link transformation that converts
   * URLs in plain text to either an anchor or calcite-link
   *
   * @param _target A reference to the class prototype
   * @param _propertyKey The name of the method being decorated
   * @param descriptor A PropertyDescriptor for the method being decorated
   * @returns A new PropertyDescriptor that aguments the decorated method with auto linking behavior
   */
  function AutoLinkDecorator(_target, _propertyKey, descriptor) {
    const { get: original } = descriptor;
    const get = function AutoLink() {
      const result = original.call(this);
      return autoLink(result, options);
    };
    return Object.assign(Object.assign({}, descriptor), { get });
  }
  return AutoLinkDecorator;
}
