/**
 * A decorator factory function for the callOnce decorator
 *
 * @returns The callOnce decorator function
 */
export default function callOnceFactory<T>(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
