/* eslint-disable no-unused-vars */
import { cache } from '../utils/cache';
/**
 * A decorator factory function that accepts the cache decorator configuration params
 *
 * @param params An ICacheDecoratorParams object
 * @returns The cache decorator function
 */
export default function CacheDecoratorFactory(params) {
  /**
   * A decorator function that augments a class method with client caching behavior
   *
   * @param _target A reference to the class prototype
   * @param _propertyKey The name of the method being decorated
   * @param descriptor A PropertyDescriptor for the method being decorated
   * @returns A new PropertyDescriptor that aguments the decorated method with caching behavior
   */
  function CacheDecorator(_target, _propertyKey, descriptor) {
    const value = cache(descriptor.value, params);
    return Object.assign(Object.assign({}, descriptor), { value });
  }
  return CacheDecorator;
}
