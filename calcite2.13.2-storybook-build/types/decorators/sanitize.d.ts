/// <reference types="xss" />
interface ISantizerOptions {
  filterOptions?: XSS.IFilterXSSOptions;
  extendDefaults?: boolean;
}
/**
 * A decorator factory function that accepts the auto link decorator configuration params
 *
 * @returns The cache decorator function
 */
export default function SanitizeDecoratorFactory(options?: ISantizerOptions): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export {};
