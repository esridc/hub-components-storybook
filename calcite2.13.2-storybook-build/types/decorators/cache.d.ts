import { ICacheDecoratorParams } from '../utils/cache';
/**
 * A decorator factory function that accepts the cache decorator configuration params
 *
 * @param params An ICacheDecoratorParams object
 * @returns The cache decorator function
 */
export default function CacheDecoratorFactory(params: ICacheDecoratorParams): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
